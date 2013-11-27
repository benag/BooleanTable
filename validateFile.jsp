<%@ page import="java.io.*, java.util.*,java.lang.*" %>
<HTML>

    <HEAD>
      <style>
      #resultdiv{

        background-color: #f3f3f3;
        margin-left:20%;
        margin-top:30px;
        width: 55%;
        min-height:70%;
        border:3px solid;
        border-color:#8fadff;
        border-radius:25px;

      }
      #result{

        padding:30px;
        font: normal 12px courier !important;

      }

      
      </style>
      <script src="jshint.js"></script>
      <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
      <script>

        $(document).ready( function(){
          var path = $('#debug').val();
          console.log(path);
          var cont = $('#rulename').val();
          JSHINT(cont);
          var res = JSON.stringify(JSHINT.errors, null, 2);
          console.log(res);
          $('#result').text(res);


      
        });




      </script>
        <TITLE>JSHint Checker</TITLE>
     
    </HEAD>

    <BODY>
       <br/>
        <H1 style="mergin-top:20px; margin-left:40%;">JSHint check</H1>
    
          
            <br/>
        
        <% 
          String path = org.uva.Implicit.REALPATH+request.getParameter("study");
          //String file = request.getParameter("file");
        //String path =  new String ("C:/projects/workspace/rc1/app/user/bgoldenberg/study1/local.js");
          String content = null;
          File file = new File(path);
           try {
                 FileReader reader = new FileReader(file);
                 char[] chars = new char[(int) file.length()];
                 reader.read(chars);
                 content = new String(chars);
                 reader.close();
           } catch (IOException e) {
               e.printStackTrace();
           }
         
         
        %>
        
       
			
	 	    <input type="hidden" id="rulename" name="Language" value="<%=content%>">  
        <input type="hidden" id="debug" name="Language" value="<%=path%>">  
        <div id="resultdiv" style="">
        </br>

         <label id="result" ></label>
     
       </div>

       
       
       
       
    </BODY>
</HTML>