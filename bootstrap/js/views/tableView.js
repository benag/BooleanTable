// Filename: bootstrap\js\views/tableView
console.log('loading view');
define([
  'jquery',
  'underscore',
  'backbone',
  'models/project',
   // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!templates/list.html',
  'bootstrap',
  'jasny-bootstrap.min'
], function($,_,Backbone,ProjectModel,projectListTemplate){

  console.log('calling tableView');
  var projectTableView = Backbone.View.extend({
    
    el: $('#container'),
    down:true,
    

    events: {
      "click #button0"   : "processTable",
      "click #button1"   : "addRow",
      "click .link"      : "remove",
      "click #button3"   : "addBooleanR",
      "click #button5"   : "moveLeft",
      "click #button6"   : "moveRight",
      "click #button9"   : "clear",      
      "click #button10"   : "reset",
      "click #saveChange" : "save",
      "click #ruleDone" : "sendII",
      //"Click #done-button" : "send",
      "click #LoadTemplate" : "loadTemplate",
      "change #files" : "load",
      "click #collapse": "collapse",
     // "change  #conditionLabel" : "labelChanged",
      "change .inputMysize" : "labelChanged",
      "click #cancel-button" : "cancel",

      

      "click .dropdown-menu li"   : "manageDrop"
            
      
    },
    ///////////////////////////
    //
    // Input:
    // Output:
    // Description:
    //
    //////////////////////////

    initialize: function(){
    
       console.log('start init view');
       var compiledTemplate = _.template( projectListTemplate, { } );
       //_.bindAll(this,'render');

       this.model = new ProjectModel();
       this.chosenID ='0';
       //this.counter = this.model.counter;
       this.rSelected =false;
       this.summery='';
       this.level=this.model.level;
       this.$el.html( compiledTemplate );
       //alert(this.$el.find('#hide').val());
       //this.model.bind('setRowText', this.updateSummeryText); // collection event binder
       var hidden = window.opener.$('#hide' ).val();
       if (hidden != 'parent'){
        this.model.TRows=[];
        var parser = new DOMParser();
        xmlDom = parser.parseFromString(hidden, "text/xml");
        this.model.loadXML(xmlDom);

       }
       this.render();
       //alert(this.$el.find('#hide').val());

    },
    load:function(evt){
      // Check for the various File API support.
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        var files = evt.target.files;
        var f = files[0];
        var self = this;
        this.model.loadFile(f,function(){
          
          console.log('model after load');
          console.log(self.model.TRows);
          self.render();


        });
        

        
      $('#files').val("");
      } else {
        alert('The File APIs are not fully supported in this browser.');
      }

    },

    save:function(){

      var modalr =this.$el.find('#Mymodal');
      console.log(modalr);
      $(modalr).modal('hide');
      var self=this;
      
      this.model.formValidation( function(errmsg,error){

        if (error===true){
          alert(errmsg);
        }else{

          $('.fileupload').fileupload();
          var rulename = self.$el.find('#ruleInput');
          var text = $(rulename).val();
          console.log(text);
          self.model.ruleName=text;
          self.model.ruleSetName=text;
          self.$el.find('#sendRuleInput').attr('placeholder',text);
          var xml = self.model.makeXML();
          self.model.saveToDisk(xml.flush());
          self.model.closeXW(xml);
          self.model.changeStudyR();//change

        }

      });
  
    },
    sendII: function(){

      //var folderName = window.opener.$("#folder").val();
      // if (folderName===''){
      //   alert('Please Enter Folder Name on the Deploy Form.');
      // }
      //var index = folderName.lastIndexOf("/") + 1;
      //var length = folderName.length;
      //var filename = folderName.substr(index,length);
      //var rulename = filename+'.rule';
      var xml = this.model.makeXML();
      //this.model.sendToServer(xml.flush(),'C:\\Program Files',fileName);
      this.passtoParentWindow(xml,'');
      this.model.closeXW(xml);

    },
    send:function(){

      var modalr =this.$el.find('#Mymodal2');
      //console.log(modalr);
      if ( $(modalr).find('#sendRuleInput').val() ){
        $(modalr).modal('hide');
        var rulename = this.$el.find('#sendRuleInput');
        var fileName = $(rulename).val();
        var xml = this.model.makeXML();
        //this.model.sendToServer(xml.flush(),'C:\\Program Files',fileName);
        this.passtoParentWindow(xml,fileName);
        this.model.closeXW(xml);

      }

    },

    loadTemplate: function (){

      var templateChose; 
      if ($('#optionsRadios1').is(':checked')) templateChose = 'US_only';
      if ($('#optionsRadios2').is(':checked')) templateChose = 'Over18Priority26';
      if ($('#optionsRadios3').is(':checked')) templateChose = 'US_over_18';
      if ($('#optionsRadios4').is(':checked')) templateChose = 'US_White';
      if ($('#optionsRadios5').is(':checked')) templateChose = 'Whites_Non_hispanics';
      if ($('#optionsRadios6').is(':checked')) templateChose = 'blacks_Non_hispanics';
      if ($('#optionsRadios7').is(':checked')) templateChose = 'Asians_Non_hispanics';
      if ($('#optionsRadios8').is(':checked')) templateChose = 'All_Hispanics';
      if ($('#optionsRadios9').is(':checked')) templateChose = 'Only_Women';
      if ($('#optionsRadios10').is(':checked')) templateChose = 'Only_Men';
      if ($('#optionsRadios11').is(':checked')) templateChose = 'US_Women';
      if ($('#optionsRadios12').is(':checked')) templateChose = 'US_Men';

      $('#modaTemplate').modal('hide');
      this.model.loadTemplate(templateChose);
      this.render();
      


    },
    cancel:function(){ window.close();},

    passtoParentWindow:function(xml,name){

      var id='restrictionshide';
      var summeryValue = this.$el.find('#summery').text();
      window.opener.$("#rulename").val(name);
      window.opener.$("#" + id).val(summeryValue);
      window.opener.$('#restrictions').html(summeryValue);
      window.opener.$("#hide").val(xml.flush());

      window.close();
    },

    updateSummery: function(){
      var label = this.$el.find('#summery');
      var rows = this.model.TRows;
      var paranthesis = ['{','('];
      var result ='';  
      var numOfBRows=0;
      var numOfCRows=0;
      var last='';
      
      _.each(rows,function(v,k){
        if (v.typeR==='B'){
          var bValue = v.rowValue.booleanValue;
          if (bValue != '' ) {
            
            if(numOfBRows===0){
              result = result+' '+bValue;
              result=result+'{ ';
            }else{
              if (last!='B'){
                result = result+', '+bValue;
              }else{
                result = result+' '+bValue;
              }
              
              result=result+'( ';

            }
            numOfBRows++;          

          }

          numOfCRows=0;
        }
        if (v.typeR==='C'){
          var rowValue = v.rowValue;
          var dropOne = rowValue.dropdownOne;
          var dropTwo = rowValue.dropdownTwo;
          var dropThree = rowValue.dropdownThree;
          if (dropOne === undefined || dropOne==='Condition' ) dropOne='';
          if (dropTwo === undefined || dropTwo==='Expression') dropTwo='';
          if (dropThree === undefined || dropThree==='Value') dropThree='';
          if ((dropOne!=''||dropTwo!=''||dropThree!='')){
            if (numOfCRows!=0){
              result=result+' , '+dropOne+' '+dropTwo+' '+dropThree;
            }else{
              result=result+dropOne+' '+dropTwo+' '+dropThree;

            }
          }
          numOfCRows++;
        }

        if (v.typeR==='EB'){
          if (numOfBRows==1) {
            result=result+' }';
          }else{
            result=result+' )';
          } 
          numOfBRows--;          
        }
        if (v.typeR==='EC'){
          
        }
      last =v.typeR;
      })
      label.html(result); 

   },


    render: function(){
        console.log('starting render');
        var self=this;
        //self.$el.find("#error").fadeOut();
        this.loadModel();
        this.updateSummery();
        this.model.formValidation(function(errmsg,error) {
          var label;
          label = self.$el.find("#error");
          if (error===true){

             
             //$(label).fadeIn();
             //$(label).show();
             $(label).css("visibility","visible"); 
          }else{

             //self.$el.find("#error").fadeOut();
             //self.$el.find("#error").hide();
             $(label).css("visibility","hidden");
        
          }

       });
       
      console.log(this.model.TRows);
      console.log(this.model.counter);
      console.log(this.counter);
    },
    clear:function(){
      this.model.clearModel();
      this.model.counter=0;
      this.render();
      //this.loadModel(); 
      //this.updateSummery();

    },
    reset:function(){
      this.model.loadDefaultModel();
      this.render();
      //this.loadModel();
      //this.updateSummery();

    },
    ///////////////////////////
    // Name: loadModel
    // Input: model
    // Output: dom
    // Description: goes over the model and update the dom tree refreshes the view.
    //
    //////////////////////////
    loadModel:function(){
      var self=this;
      

      $("#ruleTable tbody tr").remove(); 
      _.each(this.model.TRows,function(v,i){
        if (v.typeR=='C'){
          
          //add the drop downs load them without setting them according to the model
          self.$el.find("#ruleTable tbody").append(self.addTableRaw(self.model.counter,v.level,v.ID,v.cType));//add row to the dom
          self.$el.find('#'+v.ID).find('#droponeDiv').find('.dropdown-toggle').html(v.rowValue.dropdownOne+' <span class="caret"></span>');
          if (v.cType!='none'){
             self.$el.find('#'+v.ID).find('#droptwoDiv').find('.dropdown-toggle').html(v.rowValue.dropdownTwo+' <span class="caret"></span>');
          }
          if (v.cType!='none'){
            self.$el.find('#'+v.ID).find('#dropthreeDiv').find('.dropdown-toggle').html(v.rowValue.dropdownThree+' <span class="caret"></span>');
          }
          
          if (v.cType==='label'){
            self.$el.find('#'+v.ID).find('#conditionLabel').val(v.rowValue.dropdownThree);
          }
          self.installDropOneDiv(v.ID,v.rowValue.dropdownOne,'');
        }else{
          if (v.typeR=='B'){
            var text='';
            if (v.rowValue.booleanValue==''){
              text='Boolean Logic';
            }else{
              text = v.rowValue.booleanValue;
            }
            self.$el.find("#ruleTable tbody").append(self.addBoolean(self.model.counter,v.level,v.ID));
            self.$el.find('#'+v.ID).find('#booleanDiv').find('.dropdown-toggle').html(text+' <span class="caret"></span>');
          }
          if(v.typeR=='EB'){
            
            self.addEndBoolean('',v.level,v.rowValue.booleanValue,v.ID)

          }
        }
      })
    
    },
    processTable: function(){

    },
    addRow: function(id,level){
        console.log('starting add row');
        console.log(this.model.counter);
        if(level===undefined){
          level = this.level;
        }

        //this.$el.find("#ruleTable tbody").append(this.addTableRaw(this.counter,level,id));
        this.model.addC(this.model.counter,this.level,id);
        this.model.counter++;
        
    },
    addTableRaw: function(counter,level,id,type){
        console.log('starting add table row');
        if (id===undefined){
          id = 'rowC' + counter + 'l'+level;

        }
        var raw = ''+
        '<tr id="'+id+'" class="clickableRow" ><td style="'+this.addPadding(level)+';">'+this.addDropOne(counter)+this.addDropTwo(counter,type)+this.addDropThree(counter,type)+this.addButtons()+'</td></tr>';
        console.log(raw);
        return raw;

    },
    addPadding: function(level){
      var padding = 'padding-left:'+level*50+'px';
      return padding;
    },
    addButtons:function(){
      var html =''+
                    '<div id="buttonsDiv" class="btn-group btn-mini" style="float:right;">'+ 
                       '<button class="btn dropdown-toggle btn-mini" data-toggle="dropdown" href="#" style="padding-left:5px;"><i class="icon-plus-sign"></i>'+
                       '<span class="caret"></span>'+ 
                       '</button>'+ 
                       '<ul class="dropdown-menu">'+
                       '<li id="liOr1"><a>Add Condition</a></li>'+
                       '<li id="liOr1"><a>Add All</a></li>'+
                       '<li id="liOr1"><a>Add Any</a></li>'+
                       '<li id="liOr2"><a>End Any</a></li>'+
                       '<li id="liOr3"><a>End All</a></li>'+
                       '</ul>'+
                       '<button class="btn btn-mini link" id="button2" data-original-title="Delete Row" style="margin-left: 1px;"><i class="icon-minus-sign"></i></button>'+
                
                    '</div>';
      return html;


    },
    addDropOne:function(counter){
        console.log('starting add drop one');
        var conditionsArray = new Array();
       _.each(this.model.conditions,function(v,i){
             var cName = v.cName;
             conditionsArray.push(cName);
             
       });
       conditionsArray.sort(); 
       conditionsArray.reverse();
       var drop = ''+
       '<div id="droponeDiv" class="btn-group">'+ 
         '<button id ="dropone" class="btn dropdown-toggle btn-mini" data-toggle="dropdown" href="#">'+
             'Condition <span class="caret"></span>'+ 
           '</button>'+ 
           '<ul class="dropdown dropdown-menu">';
           //  _.each(this.model.conditions,function(v,i){
           //   var cName = v.cName;
           //   drop =drop + '<li id="li1"><a>'+cName+'</a></li>';
           // });
            var size =conditionsArray.length;
            for (var index=0;index<size;index++){
              drop =drop + '<li id="li1"><a>'+conditionsArray.pop()+'</a></li>';
            }
            drop = drop+'</ul>'+
       '</div>';
     return drop;

    },

    addDropTwo:function(counter,type){
        if (type=='none') return "";
        return this.model.getHtml('DropTwo');
    },

    addDropThree:function(counter,type){
      if (type==='none') return "";
      if(type==='label'){
        return this.model.getHtml('Clabel');
      }else{
        return this.model.getHtml('DropThree');

      }
        
    },


    addBooleanR: function(id,level,text){
      
      //this.$el.find("#ruleTable tbody").append(this.addBoolean(this.counter,level,id));
      var booleanText;
      if (text==='Add All'){
        booleanText='All';
      }else{
        booleanText='Any';
      }
      this.model.addB(this.model.counter,this.level,id,booleanText);
      this.level++;
      this.model.counter++;
    },
    addBoolean:function(counter,level,id){
      if(id===undefined || id==''){
        id = 'rowB' + counter + 'l'+level;
      }
      var raw = ''+
                '<tr id="'+id+'" class="clickableRow" ><td style="'+this.addPadding(level)+';">'+this.addBooleanDropBox()+
                this.addButtons();+'</td></tr>';
             
          return raw;
    },

    addBooleanDropBox:function(){
         var drop = ''+
            '<div id="booleanDiv" class="btn-group">'+
                '<button class="btn dropdown-toggle btn-mini" data-toggle="dropdown" href="#">'+
                'Boolean Logic'+
                '<span class="caret"></span>'+
                '</button>'+
                '<ul class="dropdown-menu">'+
                  '<li id="liOr"><a>Any</a></li>'+
                  '<li id="liOr"><a>All</a></li>'+
                '</ul>'+
            '</div>';
          return drop;

    },
   
    setButtonDiv: function(id,setText){

        if (setText==='Add All'||setText==='Add Any'){
          this.addBooleanR(id,this.level,setText);
          
        }
        if(setText==='Add Condition'){
          console.log(this.model.counter);
          this.addRow(id);
         
        }
        if(setText==='End Any' || setText==='End All'){
          if(this.level>0) this.level--;
          //this.addEndBoolean(this.counter,this.level,setText);
          this.model.addEB(this.model.counter,this.level,id,setText);
          this.model.counter++;

        }
       
    },
    addEndBoolean:function(counter,level,setText,id){
      if(id===undefined){
        id = 'rowEB' + counter + 'l'+level;
      }
      var row='<tr id="'+id+'" class="clickableRow" ><td style="'+this.addPadding(level)+';">'+
          '<button class="btn btn-mini" id="endB">'+setText+'</button>'+this.addButtons()+'</td></tr>';
      this.$el.find("#ruleTable tbody").append(row);

    },

    setBooleanDiv:function(rowID,setText,target){

     // $(target).parents('.btn-group').find('.dropdown-toggle').html(setText+' <span class="caret"></span>');
      this.model.updateB(rowID,setText);
      //this.$el.find('#summery').append(setText+'{');
    },

    installDropOneDiv:function(rowID,setText,target){
      console.log('inside droponeDiv');
      condition = setText;
      var thisContex = this; 
   
      console.log('condition'+condition);
      _.each(this.model.conditions,function(v,i){

        if (v.cName===condition){
          thisContex.installDropThree(v,rowID,setText,target);
          thisContex.installDropTwo(v,rowID,setText,target);
        }
          
        
     });
       
    },

    installDropTwo:function(v,rowID,setText,target){
      // this.model.updateOne(rowID,setText);
      // this.render();
      var values = v.equal;
      var div = $('#'+rowID).find('#droptwoDiv'); 
      var ul = $(div).children('ul');
      
      _.each(values,function(v,i){
         $(ul).append('<li><a>'+v+'</a></li>');
      });
            

    },
    installDropThree:function(v,rowID,setText,target){
      if (v.cType==='none') return;
      var values = v.values;
      var div = $('#'+rowID).find('#dropthreeDiv'); 
      var ul = $(div).children('ul');
      //var ul = $('#'+'dropthreeDiv'+countIndex).children('ul');
      _.each(values,function(v,i){
         $(ul).append('<li><a>'+v+'</a></li>');
      });
      //$(ul).parents('#dropthreeDiv').find('.dropdown-toggle').html(values[0]+' <span class="caret"></span>');
      //set label if needed 
      
      if (v.cType==='label') $(div).replaceWith(this.model.getHtml('Clabel'));



    },
    setDropOneDiv:function(rowID,setText,target){
      this.model.updateOne(rowID,setText);

    },
    setDropThreeDiv:function(rowID,setText,target){
      //$(target).parents('.btn-group').find('.dropdown-toggle').html(setText+' <span class="caret"></span>');
      this.model.updateThree(rowID,setText);
      //$(ul).parents('#dropthreeDiv').find('.dropdown-toggle').html(setText+' <span class="caret"></span>');

    },
    setDroptwoDiv:function(rowID,setText,target){
      //$(target).parents('.btn-group').find('.dropdown-toggle').html(setText+' <span class="caret"></span>');
      this.model.updateTwo(rowID,setText);


    },

    ///////////Processing Events///////////////////

    labelChanged:function(e){

      //var divID = $(e.target).parents('.btn-group').attr("id");
      var rowID = $(e.target).parents('.clickableRow').attr("id");
      var setText = $(e.target).val();
      this.model.updateThree(rowID,setText);
      this.render();



    },


    manageDrop:function(e){
      
      var divID = $(e.target).parents('.btn-group').attr("id");
      var rowID = $(e.target).parents('.clickableRow').attr("id");
      var setText = $(e.target).text();

      if (divID==='buttonsDiv'){
       this.setButtonDiv(rowID,setText);
      }else{
        if (divID==='booleanDiv') this.setBooleanDiv(rowID,setText,e.target);
        if (divID === 'droponeDiv') this.setDropOneDiv(rowID,setText,e.target);
        if (divID === 'droptwoDiv') this.setDroptwoDiv(rowID,setText,e.target);
        if (divID==='dropthreeDiv') this.setDropThreeDiv(rowID,setText,e.target);
      }
      console.log(this.model.TRows);
      this.render();
      //this.updateSummery();

    },
    collapse : function(){
      if (this.down==true){
        $("#explain").slideUp("slow");
        $("#collapse span span").text('Show');

        this.down=false;

      }else{
        $("#explain").slideDown("slow");
        this.down=true;
        $("#collapse span span").text('Hide');

      }
      
    },

    remove: function(e){
      var rowID = $(e.target).parents('.clickableRow').attr("id");
      //this.$el.find('#ruleTable tr#'+rowID).remove();
      console.log(this.model.TRows);
       if (this.model.getType(rowID)==='B'){
        this.level--;
      }
      this.model.remove(rowID);
      console.log(this.model.TRows);
      this.render();
      this.updateSummery();

    
    },


  });
  
  return projectTableView;
});
    




