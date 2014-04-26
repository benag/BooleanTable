package org.uva.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;

import javax.xml.parsers.ParserConfigurationException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Category;
import org.apache.log4j.Logger;
import org.implicit.Implicit;
import org.implicit.random.Condition;
import org.json.JSONException;
import org.json.JSONObject;
import org.uva.dao.oracle.TaskDAO;

import java.io.IOException;
/*
import org.jsoup.*;
import org.jsoup.helper.*;
import org.jsoup.nodes.*;
import org.jsoup.select.*;
*/

public class RuleController extends HttpServlet{
	
	private static Category cat = Logger.getLogger(TaskDAO.class);
	String msg =new String("1");
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException { 
		try {
						
			processRequest(request,response);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
	} 
	
	
	
	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request,HttpServletResponse response)
		throws IOException, ServletException{
		msg="1";
		doGet(request,response);
		
		
			
	}

		
	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws IOException, ParserConfigurationException{
		
		
		
		try {
			
			response.setStatus(HttpServletResponse.SC_OK);
			response.setContentType("text/html");
			String str;
			String key = null;
			String val= null;
			Object o = null;
			StringBuilder sb = new StringBuilder();
		    BufferedReader br = request.getReader();
		     
		    cat.debug("starting save file");		    
		    while( (str = br.readLine()) != null ){
		        sb.append(str);
		    }    
			try {
				JSONObject jObj = new JSONObject(sb.toString());
				Iterator it = jObj.keys(); //gets all the keys
				HashMap map = new HashMap(); 
				while(it.hasNext())
				{
					key = (String)it.next();
					val  = (String) jObj.get(key).toString();
					map.put(key,val);
				}
				writeXML(map,request);
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				msg = e1.getMessage();
				e1.printStackTrace();
				
			}
					
						
			
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			msg =e.getMessage();
			if (cat.isDebugEnabled())
				cat.debug(e.getMessage());
			e.printStackTrace();
		}catch (IOException e){
			msg =e.getMessage();
			if (cat.isDebugEnabled())
				cat.debug(e.getMessage());
			e.printStackTrace();
			
		}
		
		PrintWriter out = response.getWriter();
		out.println(msg);
		out.close();
		
	
	}
	
	public void processHTML(String filepath,String tr) throws IOException{
		
			
		 FileWriter out;
		 out = new FileWriter(filepath, true);
         out.write(tr);
         out.close();
		//"http://localhost/implicit/forms/checklist.html"
		//Document doc = null;
		//System.out.println("before calling method");
		
		//String html = "<html><head><title>First parse</title></head><body><p>Parsed HTML into a doc.</p></body></html>";
		//System.out.println("after calling method");
		//doc = Jsoup.connect("http://en.wikipedia.org/").get();
		//Document doc = Jsoup.parse(html);
		
	}
	
	protected void writeXML(HashMap dataMap,HttpServletRequest request) throws ParserConfigurationException, IOException{
		
		String path = (String) dataMap.get("path");
		String fileName = (String) dataMap.get("FileName");
		String xml = (String) dataMap.get("xml");
		String submit = (String) dataMap.get("submit");
		String real = (String) dataMap.get("realPath");
		String ending = new String(".xml");
		String pathlocale = org.uva.Implicit.REALPATH;
		String filePath = new String("");
		
		
		if (submit.equals("true")){
			ending = ".html";
			filePath = (pathlocale+"/"+path);
			processHTML(filePath,xml);
			
		}else{
			filePath = (pathlocale+"/"+path+"/"+fileName+ending);
			if (!real.equals("")){
				filePath=real+"/"+fileName+ending;
				
			}
			
			File file = new File(filePath);
			//File file = new File(path);
			
			 
			// if file doesnt exists, then create it
			if (!file.exists()) {
				
				file.createNewFile();
				FileWriter fw = new FileWriter(file.getAbsoluteFile());
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write(xml);
				bw.close();
			}else{
				msg = "21";//code for file exist
			}
	
			
	
			//	System.out.println("Done");
		}
				
	
		
	}


}
