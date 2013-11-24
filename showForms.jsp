<%@ page import="java.io.*, java.util.*" %>
<HTML>
    <HEAD>
        <TITLE>Index of Files</TITLE>
    </HEAD>

    <BODY>
        <H1>Index of Files</H1>
         
            <br/>
        
        <% 
            
            //String loc=request.getRequestURL().toString();
            //start path after implicit/ , end before showFiles.jsp 
            //loc=loc.substring(loc.indexOf("it/")+2,loc.lastIndexOf("/"));
            String file= application.getRealPath("/")+"forms";
            //String file= "C:\\projects\\workspace\\rc1\\app\\forms\\";
            //String file= "\\home\\dev2users\\dev2\\forms";
            File f = new File(file);
            String [] fileNames = f.list();
            
            File [] fileObjects= f.listFiles();
            HashMap sizeMap=new HashMap();
            for (int i = 0; i < fileObjects.length; i++) {
                
                sizeMap.put(fileNames[i],fileObjects[i]);
                }
              java.util.Arrays.sort(fileNames, String.CASE_INSENSITIVE_ORDER);  
            
        %>
        <UL>
        <%
            for (int i = 0; i < fileNames.length; i++) {
                if(!((File)sizeMap.get(fileNames[i])).isDirectory()){
        %>
        <LI>
          <A target="_blank" HREF="<%= "/implicit/forms/"+"/"+fileNames[i] %>"><%= fileNames[i] %></A>
          &nbsp;&nbsp;&nbsp;&nbsp;
          
          
          (<%= Long.toString(((File)sizeMap.get(fileNames[i])).length()) %> bytes long)
        <%
                }
            }
        %>
        </UL>
    </BODY>
</HTML>