package com.candikrush.utils;

import java.io.InputStream;
import java.text.DateFormat;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TimeZone;
import java.util.UUID;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import com.candikrush.dto.BaseObject;


/**
 * Created with IntelliJ IDEA. User: bhuvangupta Date: 20/09/12 Time: 11:52 PM
 * To change this template use File | Settings | File Templates.
 */
public class Utils {

	// This method calls fromJSONObject which is present in Baseobject and other
	// derived classes
	public static <E extends BaseObject> List<E> convertBaseObjectList(
			JSONArray arrList, Class<E> klass) {
		List<E> objList = new ArrayList<E>();
		if (arrList != null) {
			for (Object obj : arrList) {
				try {
					JSONObject jsonObject = (JSONObject) obj;
					E newInstance = klass.newInstance();
					newInstance.fromJsonObject(jsonObject);
					objList.add(newInstance);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return objList;
	}

	public static JSONArray convertToJSONArray(List<String> list) {
		JSONArray result = new JSONArray();
		if (list != null) {
			for (String str : list) {
				result.add(str);
			}
		}
		return result;
	}

	public static JSONArray convertToJSONArray(Set<String> set) {
		JSONArray result = new JSONArray();
		if (set != null) {
			for (String str : set) {
				result.add(str);
			}
		}
		return result;
	}
	
	public static boolean isJson(String str){
		JSONParser parser = new JSONParser();
		try {
			parser.parse(str);
	    } catch (org.json.simple.parser.ParseException e) {
	    	return false;
		}
	    return true;
	}

	public static JSONObject convertToJSONMap(Map<String, String> map) {
		JSONObject result = new JSONObject();
		if (map != null) {
			Iterator<Map.Entry<String, String>> it = map.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry<String, String> pairs = it.next();
				result.put(pairs.getKey(), pairs.getValue());
			}
		}
		return result;
	}

	public static List<String> convertToStringList(JSONArray array) {
		if (array != null) {
			List<String> result = new ArrayList<String>(array);
			return result;
		}
		return new ArrayList<String>();
	}

	public static Set<String> convertToStringSet(JSONArray array) {
		if (array != null) {
			Set<String> result = new LinkedHashSet<String>(array);
			return result;
		}
		return new HashSet<String>();
	}

	public static Map<String, String> convertToLinkedHashMap(JSONObject object) {
		if (object != null) {
			Map<String, String> result = new LinkedHashMap<String, String>(
					object);
			return result;
		}
		return new LinkedHashMap<String, String>();
	}

	public static <E extends BaseObject> JSONArray convertJsonArray(
			List<E> objectList) {
		JSONArray arr = new JSONArray();
		if (objectList != null) {
			for (BaseObject baseObj : objectList) {
				try {
					String json = baseObj.toJson();
					JSONObject jsonObject = (JSONObject) JSONValue.parse(json);
					arr.add(jsonObject);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return arr;
	}

	public static Date toNormalDateTime(long updateTime) {

		Date date = new Date(updateTime);
		Format format = new SimpleDateFormat("dd/MM/yyyy");
		format.format(date).toString();
		return date;
	}

	public static String getDate(long milliSeconds) {
		DateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
		formatter.setTimeZone(TimeZone.getTimeZone("Asia/Calcutta"));
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(milliSeconds);
		return formatter.format(calendar.getTime());
	}
	
	public static String getDateTime(long milliSeconds) {
		DateFormat formatter = new SimpleDateFormat("dd MMM yyyy HH:mm");
		formatter.setTimeZone(TimeZone.getTimeZone("Asia/Calcutta"));
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(milliSeconds);
		return formatter.format(calendar.getTime());
	}
	
	public static String getCurrentDateInMili(){
		
		DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm");
		Calendar cal = Calendar.getInstance();
		String currDateTime = dateFormat.format(cal.getTime());
		String currDateTimeInMili = dateToMilisecond(currDateTime);
		return currDateTimeInMili;
	}

	public static Date inputDateToDateFormat(String inputDate) {

		SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
		Date date = null;
		try {
			date = formatter.parse(inputDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	public static String dateToMilisecond(String date_dd_MMM_yyyy) {

		if (date_dd_MMM_yyyy == null || date_dd_MMM_yyyy.isEmpty())
			return null;
		SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy");
		sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
		Date date = null;
		try {
			date = sdf.parse(date_dd_MMM_yyyy);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		String dateMiliSec = String.valueOf(date.getTime());
		return dateMiliSec;
	}
	
	public static String dateToSimpleDateTime(String inputDateTime) {
		
		SimpleDateFormat inputFormat = new SimpleDateFormat("dd MMM yyyy");
		SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
		Calendar c = Calendar.getInstance();
		try {
			c.setTime(inputFormat.parse(inputDateTime));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		String dateTime = outputFormat.format(c.getTime());
		return dateTime;
	}
	
	public static String dateTimeToMilisecond(String date_dd_MMM_yyyy) {

		if (date_dd_MMM_yyyy == null || date_dd_MMM_yyyy.isEmpty())
			return null;
		SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy HH:mm");
		sdf.setTimeZone(TimeZone.getTimeZone("IST"));
		Date date = null;
		try {
			date = sdf.parse(date_dd_MMM_yyyy);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		String dateMiliSec = String.valueOf(date.getTime());
		return dateMiliSec;
	}
	
	public static List<String> getJSonArr( JSONArray list){
		
		List<String> listObj = new ArrayList<String>();
		if(list!=null){
			int size = list.size();
			for(int i =0; i <size; i++)
				listObj.add((String) list.get(i));
		}
		return listObj;
	}
	public static long getLongNumberFromJSon(Number number){

		long total=0;
		if(number!=null)
			total = number.longValue();
		return total;
	}
	public static int getIntDataFromJSon(Number number){

		int total=0;
		if(number!=null)
			total = number.intValue();
		return total;
	}
	
	public static HttpEntity<String> createUTF8Entity (String jsonBody){
		HttpHeaders headers = new HttpHeaders();
		final Map<String, String> parameterMap = new HashMap<String, String>();
		parameterMap.put("charset", "utf-8");
		headers.setContentType(new MediaType("application","json", parameterMap));
		
		HttpEntity<String> entity = new HttpEntity<String>(jsonBody, headers);
		
		return entity;
	}
	
    public static String generateUUID(String prefix) {
        String uuid = prefix + "_" + System.currentTimeMillis();
        return uuid;
    }
    
    public static int getBitrate(InputStream in){
        byte[] header = new byte[4];
        try {
            while(in.read(header)>0){
                if(isMP3FrameHeader(header)){
                    int bitrate = getBitRateFromMP3Header(header);
                   return bitrate;
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }
    
    public static boolean isMP3FrameHeader(byte[] header){
        if(header.length!=4){
            return false;
        }
        if((header[0]&0xFF)==0xFF){
            if(((header[1]&0xFf)>>5)==7){
                return true;
            }
        }
        return false;
    }
    
    public static int getBitRateFromMP3Header(byte[] header){

        int k = (header[2] & 0xFF) >> 4;
        int version = 0;
        int v = ((header[1] & 0xFF) >> 3) & 3;
        version = v == 3? 1 : 2;
        int layer = 0;
        int la = ((header[1] & 0xFF) >> 1) & 3;
        layer = 4 - la;
        int bitrate = 0;
//        System.out.println("k = "+k+" layer = "+layer+" version = "+version+" v= "+v+" la = "+la);
        switch (k){
            case 0:
                break;
            case 1:
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 32;
                    }
                    else if(layer == 2) {
                        bitrate = 32;
                    }
                    else if(layer == 3) {
                        bitrate = 32;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 32;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 8;
                    }
                }
                break;
            case 2:
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 64;
                    }
                    else if(layer == 2) {
                        bitrate = 48;
                    }
                    else if(layer == 3) {
                        bitrate = 40;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 48;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 16;
                    }
                }
                break;
            case 3:
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 96;
                    }
                    else if(layer == 2) {
                        bitrate = 56;
                    }
                    else if(layer == 3) {
                        bitrate = 48;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 56;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 24;
                    }
                }
                break;
            case 4:
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 128;
                    }
                    else if(layer == 2) {
                        bitrate = 64;
                    }
                    else if(layer == 3) {
                        bitrate = 56;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 64;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 32;
                    }
                }
                break;
            case 5:
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 160;
                    }
                    else if(layer == 2) {
                        bitrate = 80;
                    }
                    else if(layer == 3) {
                        bitrate = 64;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 80;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 40;
                    }
                }
                break;
            case 6://192    96  80  96  48
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 192;
                    }
                    else if(layer == 2) {
                        bitrate = 96;
                    }
                    else if(layer == 3) {
                        bitrate = 80;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 96;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 48;
                    }
                }
                break;
            case 7://224    112     96  112     56
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 224;
                    }
                    else if(layer == 2) {
                        bitrate = 112;
                    }
                    else if(layer == 3) {
                        bitrate = 96;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 112;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 56;
                    }
                }
                break;
            case 8://256    128     112     128     64
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 256;
                    }
                    else if(layer == 2) {
                        bitrate = 128;
                    }
                    else if(layer == 3) {
                        bitrate = 112;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 128;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 64;
                    }
                }
                break;
            case 9://288    160     128     144     80
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 288;
                    }
                    else if(layer == 2) {
                        bitrate = 160;
                    }
                    else if(layer == 3) {
                        bitrate = 128;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 144;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 80;
                    }
                }
                break;
            case 10://320   192     160     160     96
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 320;
                    }
                    else if(layer == 2) {
                        bitrate = 192;
                    }
                    else if(layer == 3) {
                        bitrate = 160;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 160;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 96;
                    }
                }
                break;
            case 11://352   224     192     176     112
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 352;
                    }
                    else if(layer == 2) {
                        bitrate = 224;
                    }
                    else if(layer == 3) {
                        bitrate = 192;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 176;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 112;
                    }
                }
                break;
            case 12://384   256     224     192     128
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 384;
                    }
                    else if(layer == 2) {
                        bitrate = 256;
                    }
                    else if(layer == 3) {
                        bitrate = 224;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 192;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 128;
                    }
                }
                break;
            case 13://416   320     256     224     144
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 416;
                    }
                    else if(layer == 2) {
                        bitrate = 320;
                    }
                    else if(layer == 3) {
                        bitrate = 256;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 224;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 144;
                    }
                }
                break;
            case 14://448   384     320     256     160
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = 448;
                    }
                    else if(layer == 2) {
                        bitrate = 384;
                    }
                    else if(layer == 3) {
                        bitrate = 320;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = 256;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = 160;
                    }
                }
                break;
            case 15:
                if(version == 1) {
                    if(layer == 1) {
                        bitrate = -1;
                    }
                    else if(layer == 2) {
                        bitrate = -1;
                    }
                    else if(layer == 3) {
                        bitrate = -1;
                    }
                }
                else if(version == 2) {
                    if(layer == 1) {
                        bitrate = -1;
                    }
                    else if(layer == 2 || layer == 3) {
                        bitrate = -1;
                    }
                }
                break;

        }
        return bitrate;
    }

    public static String get10DigitMsisdn(String msisdn) {
        if (org.apache.commons.lang.StringUtils.isNotEmpty(msisdn) && msisdn.length() > 10) {
            return msisdn.substring(msisdn.length() - 10, msisdn.length());
        }
        return msisdn;

    }
}
