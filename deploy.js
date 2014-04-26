 	

$(document).ready(function(){

	if ($('#restrictionshide').val()!='parent'){

		$('#restrictions').text($('#restrictionshide').val());
		
	}
	
	$("#ReviewerYes").click( function(){
   		if( $(this).is(':checked') ){
   			$("#ReviewerNo").attr('checked', false); 
   		} 
	});
	$("#ReviewerNo").click( function(){
   		if( $(this).is(':checked') ){
   			$("#ReviewerYes").attr('checked', false); 
   		} 
	});
	$("#confirmationYes").click( function(){
   		if( $(this).is(':checked') ){
   			$("#confirmationNo").attr('checked', false); 
   		} 
	});
	$("#confirmationNo").click( function(){
   		if( $(this).is(':checked') ){
   			$("#confirmationYes").attr('checked', false); 
   		} 
	});
	
})


function getFile(){

	var date = new Date();
	var year    = date.getFullYear();
	var month   = date.getMonth() +1;
	//var day     = date.getDay();
	var day     = date.getDate();
	var hour    = date.getHours();
	var minute  = date.getMinutes();
	var timestamp  = month+ "/"+day+"/"+year+", "+hour+":"+minute;
	
	//'<tr><td>8/19/2011 16:23:30</td><td>colintest</td><td>cts2e@virginia.edu</td><td>colin</td><td>1</td><td>non</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td><td></td><td></td><td></td></tr>'
	var filedata = '<tr><td>'+timestamp+'</td><td>'+value('folder')+'</td><td>'+value('researchEmail')+'</td><td>'+value('researchName')+'</td><td>'+
	value('targetNumber')+'</td><td>'+value('rulename')+'</td><td>'+value('restrictions')+'</td><td>'+value('restrictionsComments')+'</td><td>'+getCheckBoxVal('ReviewerYes')+'</td><td>'+getCheckBoxVal('studyComplete')+
	'</td><td>'+getCheckBoxVal('Virtual')+'</td><td>'+getCheckBoxVal('necessary')+'</td><td>'+getCheckBoxVal('approved')+'</td><td>'+
	value('experimentFile')+'</td><td>'+getCheckBoxVal('confirmationYes')+'</td><td>'+value('comments')+'</td></tr>';



	// var filedata= '\t\t\t'+'Submission Form for: '+$('#researchName').val()+'\t\t\t\r\n\r\n'+
	// 	'Researcher name: '+$('#researchName').val()+'\r\n'+
	// 	'Researcher email address: '+$('#researchEmail').val() + '\r\n'+
	// 	'Study folder location : '+$('#folder').val() + '\r\n'+
	// 	'Name of experiment file: '+$('#experimentFile').val()+'\r\n'+
	// 	'Target number of completed study sessions: '+$('#targetNumber').val() + '\r\n'+
	// 	'Participant restrictions' +$('#restrictions').val() + '\r\n'+
	// 	'This study has been approved by the appropriate IRB: yes:'+getCheckBoxVal('approved')+ '\r\n'+
	// 	'All items on "Study Testing" and "Study Approval" from Project Implicit Study Development Checklist completed yes: '+getCheckBoxVal('studyComplete')+'\r\n'+
	// 	'My study folder on dev2 includes ZERO files that arent necessary for the study: yes: '+getCheckBoxVal('necessary')+'\r\n'+
	// 	'Study approved by a User Experience Reviewer: yes: '+getCheckBoxVal('ReviewerYes')+ ' no: '+getCheckBoxVal('ReviewerNo')+'\r\n'+
	// 	'If you are building this study for another researcher (e.g. a contract study), has the researcher received the standard final launch confirmation email and confirmed that the study is ready to be launched? Yes: '+getCheckBoxVal('confirmationYes')+
	// 	' no: '+getCheckBoxVal('confirmationNo')+'\r\n'+
	// 	'Study submitted to the Virtual Lab: yes: '+getCheckBoxVal('Virtual')+'\r\n'+
	// 	'additional comments: '+ $('#comments').val()+'\r\n';

		return filedata;

}
function value(field){

	var value;

	if (field==='restrictions'){

		value = $('#'+field).text();
		if (value==='' || value===undefined || value===null){
			value= '&nbsp';
		}

	}else{
		value = $('#'+field).val();
		if (value==='' || value===undefined || value===null){
			value= '&nbsp';
		}
		console.log(value);

	}
	if (value==='parent') return 'None';
	return value; 
}
/**
* Get true or false if the box was checked
*
* @param {box} check Box id
* 
*/
function getCheckBoxVal(box){

	var res = $('#'+box).attr('checked') ? "Yes" : "No";
	return res;

}

/**
* Insert new file.
*
* @param {File} fileData File object to read data from.
* @param {Function} callback Function to call when the request is complete.
*/



function setParametersInURL(){

	
	var a = document.getElementById("rulaTableAnch");
	var url = 'ruletable.html';
	


	
	var ruletable = window.open(url, "Rule Generator", "width=1100,height=900,scrollbars=yes");
	
}

function validate(){

	var notFilled = '';
	var mistake=false;

	$('#researchName_error').css("visibility","hidden");
    $('#researchEmail_error').css("visibility","hidden");
    $('#folder_error').css("visibility","hidden");
	$('#experimentFile_error').css("visibility","hidden");
	$('#ReviewerYes_error').css("visibility","hidden");
	$('#confirmationYes_error').css("visibility","hidden");
	$('#targetNumber_error').css("visibility","hidden");
	$('#approved_error').css("visibility","hidden");
	$('#studyComplete_error').css("visibility","hidden");
	$('#necessary_error').css("visibility","hidden");
	$('#Virtual_error').css("visibility","hidden");

 


if (!($("#researchName").val())){
	notfilled  = "Researcher name is not filled";
	$('#researchName_error').css("visibility","visible");
	mistake=true;
}

if (!($('#researchEmail').val())){
	notfilled  = "Researcher mail is not filled";
	mistake=true;
	$('#researchEmail_error').css("visibility","visible");
}

if (!($('#folder').val())){

	notfilled  = "Researcher folder is not filled";
	mistake=true;
	$('#folder_error').css("visibility","visible");
}

if (!($('#experimentFile').val())){

	notfilled  = "Name of experiment file is not filled";
	mistake=true;
	$('#experimentFile_error').css("visibility","visible");

}
if (!($('#targetNumber').val())){

	notfilled  = "Name of experiment file is not filled";
	mistake=true;
	$('#targetNumber_error').css("visibility","visible");

}
if (!($('#approved').attr('checked'))){

	notfilled  = "Name of experiment file is not filled";
	mistake=true;
	$('#approved_error').css("visibility","visible");

}
if (!($('#studyComplete').attr('checked'))){

	notfilled  = "Name of experiment file is not filled";
	mistake=true;
	$('#studyComplete_error').css("visibility","visible");

}
if (!($('#necessary').attr('checked'))){

	notfilled  = "Name of experiment file is not filled";
	mistake=true;
	$('#necessary_error').css("visibility","visible");

}
if (!($('#Virtual').attr('checked'))){

	notfilled  = "Name of experiment file is not filled";
	mistake=true;
	$('#Virtual_error').css("visibility","visible");

}



if (!($('#ReviewerYes').attr('checked'))){
	if (!($('#ReviewerNo').attr('checked'))){

	notfilled  = "Name of experiment file is not filled";
	mistake=true;
	$('#ReviewerYes_error').css("visibility","visible");
	}

}
if (!($('#confirmationYes').attr('checked'))){
	if (!($('#confirmationNo').attr('checked'))){

	notfilled  = "Name of experiment file is not filled";
	mistake=true;
	$('#confirmationYes_error').css("visibility","visible");
	}

}

return mistake;


}
function clearAnchor(){

	$('#hide').val('parent');
	$('#rulename').val('parent');
	$('#restrictionshide').val('parent');
	$('#restrictions').text('None');

}

function clearForm(){

	$('#researchName').val('');
    $('#researchEmail').val('');
    $('#folder').val('');
	$('#experimentFile').val('');
	//$('#restrictions').val('None');
	$('#targetNumber').val('');
	$('#restrictions').text('None');
	$('#comments').val('');
	$('#restrictionsComments').val('None');	
	

	//hidden 
	$('#hide').val('parent');
	$('#rulename').val('parent');
	$('#restrictionshide').val('parent');

	
	//checkbox
	$('#ReviewerYes').removeAttr('checked');
	$('#ReviewerNo').removeAttr('checked');
	$('#confirmationNo').removeAttr('checked');
	$('#Virtual').removeAttr('checked');

	$('#confirmationYes').removeAttr('checked');
	$('#approved').removeAttr('checked');
	$('#studyComplete').removeAttr('checked');
	$('#necessary').removeAttr('checked');


}

function processForm(){

	if (validate()){
		alert('Some of the fields above were not filled');
		return;
	}

    var msg1 ={};
    var msg2={
    	success: true,
    	text :'No Rule File'
    };


    //var url="/implicit/rules";//on implicit
    var url="/implicit/rules";//for local
    var msgurl = "/ruleGenerator/msg.html";//for local
    //var msgurl = "/implicit/user/bgoldenberg/ruleGenerator/msg.html";//on implicit
	
	var xml = $('#hide' ).val();
	var name = $('#researchName').val();
	//var ruleName = $('#rulename').val();
	var path = $('#folder').val();
	var index = path.lastIndexOf("/") + 1;
    var length = path.length;
    var filename = path.substr(index,length);
    if (filename=='') {
    	var folders = path.split("/");
    	var size = folders.length;
    	filename = folders[size-2];
    }
    var ruleName = filename+'.rules';
    if (xml!='parent'){
    	$('#rulename').val(ruleName);
    }else{
    	$('#rulename').val('None');
    }
    
	var text = getFile();
	if (xml!='parent'){
		sendToServer(xml,path,ruleName,url,msg2,'false');
	}
	if (msg2.success===false && msg2.text==='File was not saved, a file with this name already exist on the server.'){
 		$('#ruleModel').modal('show');
 		$('#overwriteB').on('click',function(){
 			//alert('click');
 			$('#ruleModel').modal('hide');
 			sendToServer(xml,path,ruleName,url,msg2,'true');
 			if (msg2.success!=false){
 				sendFormToServer(name,text,msg1,url);
 				window.location.assign(msgurl+'?success1='+msg1.success+'&msg1='+msg1.text+'&success2='+msg2.success+'&msg2='+msg2.text);
 			}
 			

 		});
 		$('#overwriteClose').on('click',function(){
 			$('#ruleModel').modal('hide');
 			
 		});
 	}else{


		if (msg2.success!=false){
			sendFormToServer(name,text,msg1,url);
			window.location.assign(msgurl+'?success1='+msg1.success+'&msg1='+msg1.text+'&success2='+msg2.success+'&msg2='+msg2.text);
			
	 	}else{
	 		$('#folderModel').modal('show');
	 		$('#OkClose').on('click',function(){
 				$('#folderModel').modal('hide');
 			
 			});
	 		//msg1.sucess=false;
	 		//msg1.text = "Deploy Form Was not Sent because there was a problem saving the rule file. "
	 	}
	 
 	}
 

 }

function sendFormToServer(name,text,msg1,url){
	var timeStamp = Math.round(+new Date()/1000); 
	var data={};
        //data.path='/user/'+'bgoldenberg';
        data.path='/forms/checklistold.html';
        data.FileName =name+timeStamp;
        console.log('name: '+data.FileName+ ', folder: '+data.path);
        data.xml = text;
        data.submit='true';
        data.realPath = '';
        console.log(text);

	$.ajax({
              type: 'POST',
              url: url,
              data: JSON.stringify(data),
              success: function(result) {

                      var res = result.length;
                      if(res === 3){
                        //alert('File was saved successfully.');
						    msg1.success=true;
							msg1.text = "The Deploy form was sent successfully ";
                      }else{
                        //alert('File was not saved on our servers, check your study folder name.');
							msg1.success=false;
							msg1.text = "There was a problem sending the deploy form";
                      }
                          
                  },
              fail: function(jqXHR, textStatus, errorThrown){
                  console.log(jqXHR);
                  console.log(textStatus);
                  console.log(errorThrown);

                  alert('fail');

              },
              dataType: 'text',
              async:false
   });
}
//send rule file 
 function sendToServer(xml,path,name,url,msg2,overwrite){
        
        
        var data={};
        //var path = this.params.folder;
        
        data.path='/user/'+path;
        data.FileName =name;
        data.submit='false';
        data.realPath = '';
        console.log('name: '+data.FileName+ ', folder: '+data.path);
        data.xml = xml;
        data.overwrite = overwrite;
        console.log(xml);
        $.ajax({
              type: 'POST',
              url: url,
              data: JSON.stringify(data),
              success: function(result) {

                      var res = result.length;
                      if(res === 3){
                        //alert('File was saved successfully.');
                        msg2.success=true;
                        msg2.text = "File was saved successfully, on: "+path+'/'+name;
                      }else{
                      	if (res=== 4){
                      		msg2.success=false;
                      		msg2.text = "File was not saved, a file with this name already exist on the server.";
                      	}else{
                      		msg2.success =false;
                      		//alert('File was not saved on our servers, check your study folder name.');
                        	msg2.text = 'Study Folder was not Found, check your study folder name.';


                      	}
                        
                      }
                          
                  },
              fail: function(jqXHR, textStatus, errorThrown){
                  console.log(jqXHR);
                  console.log(textStatus);
                  console.log(errorThrown);

                  alert('fail');

              },
              dataType: 'text',
              async:false
        });
 	
 }
     