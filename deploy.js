 	

var CLIENT_ID = '830511155079-lpa46t9sorc26lc73opn1iq9klk0sn6v.apps.googleusercontent.com';//localhost
//var CLIENT_ID = '997602208608-g9p9tkq0eev8qpqnqe7a5gaep98t4j4a.apps.googleusercontent.com';//localhost
//var CLIENT_ID = '997602208608.apps.googleusercontent.com';//dev2
var SCOPES = 'https://www.googleapis.com/auth/drive';
var token =false;
var submit=false;
/**
* Called when the client library is loaded to start the auth flow.
*/
// function handleClientLoad() {
// 	window.setTimeout(checkAuth, 1);
// }

/**
* Check if the current user has authorized the application.
*/
// function checkAuth() {
// 	gapi.auth.authorize(
// 	    {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
// 	    handleAuthResult);
// }
  /**
   * Called when the client library is loaded to start the auth flow.
   */
  function handleClientLoad() {
    window.setTimeout(checkAuth, 1);
  }

  /**
   * Check if the current user has authorized the application.
   */
  function checkAuth() {
    gapi.auth.authorize(
        {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
        handleAuthResult);
  }

/**
* Called when authorization server replies.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
	
	if (authResult && !authResult.error) {
	  token=true;
	  if (submit===true) uploadFile();

	} else {
	//  No access token could be retrieved, show the button to start the authorization flow.
	    gapi.auth.authorize(
	          {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
	          handleAuthResult);
	 
	}
}

/**
* Start the file upload.
*
* @param {Object} evt Arguments from the file selector.
*/
function uploadFile() {

	gapi.client.load('drive', 'v2', function() {
		var filedata =getFile();
		


	  insertFile(filedata);
	});
}


function getFile(){

	var date = new Date();
	var year    = date.getFullYear();
	var month   = date.getMonth() +1;
	var day     = date.getDay();
	var hour    = date.getHours();
	var minute  = date.getMinutes();
	var timestamp  = day + "/"+month+"/"+year+","+hour+":"+minute+':'+minute;
	
	//'<tr><td>8/19/2011 16:23:30</td><td>colintest</td><td>cts2e@virginia.edu</td><td>colin</td><td>1</td><td>non</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td><td></td><td></td><td></td></tr>'
	var filedata = '<tr><td>'+date+'</td><td>'+$('#folder').val()+'</td><td>'+$('#researchEmail').val()+'</td><td>'+$('#researchName').val()+'</td><td>'+
	$('#targetNumber').val()+'</td><td>'+$('#restrictions').val()+'</td><td>'+$('#restrictionsComments').val()+'</td><td>'+getCheckBoxVal('ReviewerYes')+'</td><td>'+getCheckBoxVal('studyComplete')+
	'</td><td>'+getCheckBoxVal('Virtual')+'</td><td>'+getCheckBoxVal('necessary')+'</td><td>'+getCheckBoxVal('approved')+'</td><td>'+
	$('#experimentFile').val()+'</td><td>'+$('#comments').val()+'</td></tr>';



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

function processForm(){

	if (validate()){
		alert('Some of the fields above were not filled');
		return;
	}

    var msg1 ={};
    var msg2={};


    var url="/implicit/rules";
    var msgurl = "/ruleGenerator/msg.html";
	var text = getFile();
	var xml = $('#hide' ).val();
	var name = $('#researchName').val();
	var ruleName = $('#rulename').val();
	var path = $('#folder').val();
	
	if (xml!='parent'){
		sendToServer(xml,path,ruleName,url,msg2);
	}
	
	var timeStamp = Math.round(+new Date()/1000); 
	var data={};
        //data.path='/user/'+'bgoldenberg';
        data.path='/forms/checklist.html';
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
 
 window.location.assign(msgurl+'?success1='+msg1.success+'&msg1='+msg1.text+'&success2='+msg2.success+'&msg2='+msg2.text);

 }


//send rule file 
 function sendToServer(xml,path,name,url,msg2){
        
        
        var data={};
        //var path = this.params.folder;
        
        data.path='/user/'+path;
        data.FileName =name;
        data.submit='false';
        data.realPath = '';
        console.log('name: '+data.FileName+ ', folder: '+data.path);
        data.xml = xml;
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
                        	msg2.text = 'File was not saved on our servers, check your study folder name.';


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
       //  $.post(this.url,JSON.stringify(data),function(data){
       //     // alert(data);
       //      alert('success');
       // },"html").fail(function ( jqXHR, textStatus, errorThrown){
       //   console.log(jqXHR);
       //   console.log(textStatus);
       //   console.log(errorThrown);

       //  alert('fail');




       // });
        // promise.fail(function(){
        //     //$('.alert').alert();
        //     //$('.alert').show();
        //     alert('File was not saved on our servers, check your study folder name.');
        //    // $('#Errormodal').modal('toggle');

        // });
        // // }).fail( function(xhr, textStatus, errorThrown) {
        // // alert(xhr.responseText);}
        // promise.done(function(){

        //     alert('File was saved successfully.');


        // });
        


   