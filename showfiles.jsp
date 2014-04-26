<%@ page import="java.io.*, java.util.*" %>
<HTML>
    <HEAD>
        <TITLE>Index of Files</TITLE>
    </HEAD>

    <BODY>
        <H1>Index of Files</H1>
         <A target="_blank" HREF="<%= "/implicit/research/data/jsprefresh.jsp?user="+request.getParameter("user")%>">clear jsp cache </A> 
            <br/>
        
        <% 
            
            String loc=request.getRequestURL().toString();
            //start path after implicit/ , end before showFiles.jsp 
            loc=loc.substring(loc.indexOf("it/")+2,loc.lastIndexOf("/"));
            String file= application.getRealPath("/")+"user/"+request.getParameter("user")
            +"/"+request.getParameter("study")+"/";
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
          <A target="_blank" HREF="<%= "/implicit/user/"+request.getParameter("user")
            +"/"+request.getParameter("study")+"/"+fileNames[i] %>"><%= fileNames[i] %></A>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <%
          if( fileNames[i].contains("expt.xml"))
          {%>
          <A target="_blank" HREF="<%= "/implicit/Validate?study=/user/"+request.getParameter("user")
            +"/"+request.getParameter("study")+"/"+fileNames[i] %>">Run study validator </A> &nbsp;&nbsp;&nbsp;&nbsp;
        
        <A target="_blank" HREF="<%= "/implicit/Launch?study=/user/"+request.getParameter("user")
            +"/"+request.getParameter("study")+"/"+fileNames[i]+"&refresh=true" %>">Test the study </A>
            &nbsp;&nbsp;&nbsp;&nbsp;
             <A target="_blank" HREF="<%= "/implicit/StudyTest?study=Launch?study=/user/"+request.getParameter("user")
            +"/"+request.getParameter("study")+"/"+fileNames[i] %>">Run data tester </A>
            &nbsp;&nbsp;&nbsp;&nbsp;
          <%
          }else{
            if (fileNames[i].contains(".js") && (!(fileNames[i].contains(".jsp")))){
              %>
                <A target="_blank" HREF="<%= "/implicit/user/bgoldenberg/validateFile.jsp?study=/user/"+request.getParameter("user")
                +"/"+request.getParameter("study")+"/"+fileNames[i]+"&file="+fileNames[i] %>">Run JShint </A>

              <%

            }

          }
          
          %>
          (<%= Long.toString(((File)sizeMap.get(fileNames[i])).length()) %> bytes long)
        <%
                }
            }
        %>
        </UL>
    </BODY>
</HTML>