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
        font: normal 14px courier !important;

      }

      
      </style>
      
      <script src="jshint.js"></script>
      <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
      <script>

      function parseline(str,a,b,c,d){
        var res = str.replace('{a}',a);
        res = res.replace('{b}',b);
        res = res.replace('{c}',c);
        res = res.replace('{d}',d);

        return res;


      }

        $(document).ready( function(){
          var path = $('#debug').val();
          console.log(path);
          var cont = $('#rulename').val();
          console.log(cont);

          JSHINT(cont);
          var res = JSON.stringify(JSHINT.errors, null, 2);
          if (JSHINT.errors.length==0){
            $('#result').html('No Errors were Found');
            return;

          }
          for (var i=0;i<JSHINT.errors.length;i++){

            console.log(JSHINT.errors[i]);
            var obj = JSHINT.errors[i];
            var a = obj.a;
            var b = obj.b;
            var c = obj.c;            
            var d = obj.d;            
            var objerr = obj.id;
            var rawobj = obj.raw;
            var rawS = parseline(rawobj,a,b,c,d);
            var line = obj.line;
            var char = obj.character;
            var error = 'Error: '+objerr+'     '+'Description: '+rawS+'     '+'line: '+line+'     '+'charecter: '+char;
            //var error = JSON.stringify(obj, null, 2);
            var html = $('#result').html() + '<br/>'+ error;
            $('#result').html(html);



          }
          


      
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
        
       
			
	 	    <textarea id="rulename" style="display:none;" name="Language"><%=content%></textarea>
        <input type="hidden" id="debug" name="Language" value="<%=path%>">  
        <div id="resultdiv" style="">
        </br>

         <label id="result" ></label>
     
       </div>

       
       
       
       
    </BODY>
</HTML>