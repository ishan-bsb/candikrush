package com.candikrush.utils;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.zip.GZIPInputStream;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.InputStreamEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//import fr.xebia.audit.Auditor;

/**
 * Created by IntelliJ IDEA. User: bhuvangupta Date: 10/10/12
 */
public class HttpClient {

    private static final Logger logger        = LoggerFactory.getLogger(HttpClient.class.getCanonicalName());

    // Create a trust manager that does not validate certificate chains
    static TrustManager[]       trustAllCerts = new TrustManager[]{ new X509TrustManager() {

                                                  public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                                                      return null;
                                                  }

                                                  public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType) {
                                                  }

                                                  public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType) {
                                                  }
                                              } };


    public static String postData(String url, String data, String result) {
    	HttpPost post = null;
        try {
            org.apache.http.client.HttpClient client = new DefaultHttpClient();
            post = new HttpPost(url);
            post.setHeader("Content-Type", "text/xml");
            org.springframework.http.HttpEntity<String> utfData = Utils.createUTF8Entity(data);
            ByteArrayInputStream bis = new ByteArrayInputStream(utfData.getBody().getBytes());
            HttpEntity entity = new InputStreamEntity(bis, bis.available());
            post.setEntity(entity);
            HttpResponse response = client.execute(post);
            InputStream in = response.getEntity().getContent();
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            String line = null;
             while((line=br.readLine())!=null){
            	System.out.println(line);
            	logger.info("posted to " + url + " , status = " + response.getStatusLine().toString());
            	if(line != null && line.contains("error")) {
//            		Auditor.audit("Error while Save is  :: "+ line +"  ");
            		return "Content saved Fail Due To Internal Error While Saving";
            	}
            	else{
            		return line;
            	}
            }
//            System.out.println("posted to " + url + " , status = " + response.getStatusLine().toString());
//            logger.info("posted to " + url + " , status = " + response.getStatusLine().toString());
//            int statusCode = response.getStatusLine().getStatusCode();
//            return line;
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        finally {
            if(post != null)
                post.releaseConnection();
        }
        return "Content saved Fail Due To Internal Error While Saving";
    	
    }
    
    public static Object getData(String url) {
    	Object obj = null;
    	DefaultHttpClient client = new DefaultHttpClient();
    	HttpGet get = new HttpGet(url);
		try {
			HttpResponse httpResponse = client.execute(get);
			if(httpResponse.getStatusLine().getStatusCode()==200){
				InputStream in = httpResponse.getEntity().getContent();
				ByteArrayOutputStream bos = new ByteArrayOutputStream();
				byte[] buff =new byte[1024];
				int i =0;
				while((i=in.read(buff))!=-1){
					bos.write(buff,0,i);
				}
				String content = new String(bos.toByteArray(), "utf-8");
				if(content!=null){
					JSONParser parser = new JSONParser();
					try {
						obj = parser.parse(content);
					} catch (ParseException e) {
						logger.error("Error while parsing Content for search url " + url, e);
					}
				}
			}
		}catch (Exception e) {
	        logger.error(e.getMessage(), e);
		}
    	
    	return obj;
    }
    
    public static boolean postData(String url, String data) {
        HttpPost post = null;
        try {
            org.apache.http.client.HttpClient client = new DefaultHttpClient();
            post = new HttpPost(url);
            post.setHeader("Content-Type", "text/xml");
            org.springframework.http.HttpEntity<String> utfData = Utils.createUTF8Entity(data);
            ByteArrayInputStream bis = new ByteArrayInputStream(utfData.getBody().getBytes());
            HttpEntity entity = new InputStreamEntity(bis, bis.available());
            post.setEntity(entity);
            HttpResponse response = client.execute(post);
            InputStream in = response.getEntity().getContent();
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            String line = null;
             while((line=br.readLine())!=null){
            	System.out.println(line);
            	if(line != null && line.contains(" Error ")) {
            		return false;
            	}
            }
            System.out.println("posted to " + url + " , status = " + response.getStatusLine().toString());
            logger.info("posted to " + url + " , status = " + response.getStatusLine().toString());
            int statusCode = response.getStatusLine().getStatusCode();
            return statusCode == 200;
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        finally {
            if(post != null)
                post.releaseConnection();
        }
        return false;
    }
    
    public static String postDataForAutoSave(String url, String data) {
        HttpPost post = null;
        try {
            org.apache.http.client.HttpClient client = new DefaultHttpClient();
            post = new HttpPost(url);
            post.setHeader("Content-Type", "text/xml");
            org.springframework.http.HttpEntity<String> utfData = Utils.createUTF8Entity(data);
            ByteArrayInputStream bis = new ByteArrayInputStream(utfData.getBody().getBytes());
            HttpEntity entity = new InputStreamEntity(bis, bis.available());
            post.setEntity(entity);
            HttpResponse response = client.execute(post);
            InputStream in = response.getEntity().getContent();
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            String line = null;
        	logger.info("posted to " + url + " , status = " + response.getStatusLine().toString());
            while((line=br.readLine())!=null){
            	System.out.println(line);
            	if(line != null && line.contains("error")) {
            		return "Content saved Fail Due To Internal Error While Saving";
            	}
            	else{
            		return line;
            	}
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        finally {
            if(post != null)
                post.releaseConnection();
        }
        return "Content saved Fail Due To Internal Error While Saving";
    }

  
    public static String postData(String url, byte[] dataBytes) {
        HttpPost post = null;
        try {
            org.apache.http.client.HttpClient client = new DefaultHttpClient();
            post = new HttpPost(url);
            ByteArrayInputStream bis = new ByteArrayInputStream(dataBytes);
            HttpEntity entity = new InputStreamEntity(bis, bis.available());
            post.setEntity(entity);
            HttpResponse response = client.execute(post);
            logger.info("posted to " + url + " , status = " + response.getStatusLine().toString());
            System.out.println("posted to " + url + " , status = " + response.getStatusLine().toString());
            int statusCode = response.getStatusLine().getStatusCode();
            if(statusCode==200){
            	InputStream in = response.getEntity().getContent();
            	ByteArrayOutputStream bos = new ByteArrayOutputStream();
            	byte[] buffer = new byte[1024];
            	int i=0;
            	while((i=in.read(buffer))>0){
            		bos.write(buffer, 0, i);
            	}
            	String s = new String(bos.toByteArray());
            	return s;
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        finally {
            if(post != null)
                post.releaseConnection();
        }
        return null;
    }

    /**
     * User Apache HTTP Library
     * 
     * @param photoUrl
     * @return
     */
    public static String getContent(String photoUrl) {
        HttpGet get = null;
        try {
            org.apache.http.client.HttpClient client = new DefaultHttpClient();
            get = new HttpGet(photoUrl);
            HttpResponse response = client.execute(get);
            if(response.getStatusLine().getStatusCode() == 200) {
                InputStream is = response.getEntity().getContent();
                String content = "";
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String line = null;
                while((line = br.readLine()) != null) {
                    content += line;
                    content += '\n';
                }
                return content;
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        finally {
            if(get != null) {
                get.releaseConnection();
            }
        }
        return null;
    }

    /**
     * User Apache HTTP Library
     * 
     * @param photoUrl
     * @return
     */
    public static String getContent(String photoUrl, int timeOut) {
        HttpGet get = null;
        try {
            org.apache.http.client.HttpClient client = new DefaultHttpClient();
            HttpParams params = client.getParams();
            HttpConnectionParams.setConnectionTimeout(params, timeOut);
            HttpConnectionParams.setSoTimeout(params, timeOut);
            get = new HttpGet(photoUrl);
            HttpResponse response = client.execute(get);
            if(response.getStatusLine().getStatusCode() == 200) {
                InputStream is = response.getEntity().getContent();
                String content = "";
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String line = null;
                while((line = br.readLine()) != null) {
                    content += line;
                    content += '\n';
                }
                return content;
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        finally {
            if(get != null) {
                get.releaseConnection();
            }
        }
        return null;
    }

    static HostnameVerifier hostnameVerifier = new HostnameVerifier() {

                                                 public boolean verify(String urlHostName, SSLSession session) {
                                                     System.out.println("Warning: URL Host: " + urlHostName + " vs. " + session.getPeerHost());
                                                     return true;
                                                 }
                                             };

    public static String getContent(String url, String charset) {
        HttpPost postRequest = null;
        try {
            org.apache.http.client.HttpClient client = new DefaultHttpClient();
            postRequest = new HttpPost(url);
            postRequest.addHeader("charset", charset);

            HttpResponse response = client.execute(postRequest);
            StatusLine statusLine = response.getStatusLine();
            if(statusLine.getStatusCode() == 200) {
                InputStream is = response.getEntity().getContent();
                String content = new String();
                BufferedReader br = new BufferedReader(new InputStreamReader(is, charset));
                String line = null;
                while((line = br.readLine()) != null) {
                    content += line;
                    content += '\n';
                }
                return content;
            }
            else {
                logger.warn("Error response : " + statusLine + ". For : " + url);
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        finally {
            if(postRequest != null) {
                postRequest.releaseConnection();
            }
        }
        return null;
    }

    public static String getCompressedContent(String url, String charset) {
        HttpPost postRequest = null;
        try {
            org.apache.http.client.HttpClient client = new DefaultHttpClient();
            postRequest = new HttpPost(url);
            postRequest.addHeader("charset", charset);
            // postRequest.addHeader("Content-Encoding", "gzip");
            HttpResponse response = client.execute(postRequest);
            StatusLine statusLine = response.getStatusLine();
            if(statusLine.getStatusCode() == 200) {
                InputStream is = response.getEntity().getContent();
                GZIPInputStream gis = new GZIPInputStream(is);
                String content = new String();
                BufferedReader br = new BufferedReader(new InputStreamReader(gis, charset));
                String line = null;
                while((line = br.readLine()) != null) {
                    content += line;
                    content += '\n';
                }
                return content;
            }
            else {
                logger.warn("Error response : " + statusLine + ". For : " + url);
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        finally {
            if(postRequest != null) {
                postRequest.releaseConnection();
            }
        }
        return null;
    }

}
