package com.candikrush.utils;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.FileReader;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.CDATASection;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.Text;


public class XMLUtils {

    private static final Logger logger = LoggerFactory.getLogger(XMLUtils.class.getCanonicalName());

    public static Element getElement(Document document, String elementName) {
        NodeList itemList = document.getElementsByTagName(elementName);
        if(itemList == null || itemList.getLength() <= 0)
            return null;
        return (Element) itemList.item(0);
    }

    public static String getValue(Element itemElem, String nodeName) {
        NodeList elementsByTagName = itemElem.getElementsByTagName(nodeName);
        if(elementsByTagName == null || elementsByTagName.getLength() == 0) {
            return null;
        }
        Node node = elementsByTagName.item(0);
        NodeList childNodes = node.getChildNodes();
        if(childNodes != null) {
            for(int i = 0; i < childNodes.getLength(); i++) {
                Node item = childNodes.item(i);
                if(item.getNodeType() == Node.TEXT_NODE || item.getNodeType() == Node.CDATA_SECTION_NODE) {
                    return item.getNodeValue();
                }
            }
        }
        return null;
    }

    public static long getLongValue(Element itemElem, String nodeName) {
        try {
            String val = getValue(itemElem, nodeName);
            if(val != null) {
                long longVal = Long.parseLong(val);
                return longVal;
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return 0;
    }

    public static double getDoubleValue(Element itemElem, String nodeName) {
        try {
            String val = getValue(itemElem, nodeName);
            if(val != null) {
                double doubleVal = Double.parseDouble(val);
                return doubleVal;
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return 0;
    }

    public static List<String> getValues(Element itemElem, String nodeName) {
        List<String> valList = new ArrayList<>();
        NodeList elementsByTagName = itemElem.getElementsByTagName(nodeName);
        if(elementsByTagName == null || elementsByTagName.getLength() == 0) {
            return valList;
        }
        for(int i = 0; i < elementsByTagName.getLength(); i++) {
            Node node = elementsByTagName.item(i);
            NodeList childNodes = node.getChildNodes();
            if(childNodes != null) {
                for(int j = 0; j < childNodes.getLength(); j++) {
                    Node item = childNodes.item(j);
                    if(item.getNodeType() == Node.TEXT_NODE || item.getNodeType() == Node.CDATA_SECTION_NODE) {
                        String val = item.getNodeValue();
                        valList.add(val);
                    }
                }
            }
        }

        return valList;
    }

    public static String getAttributeValue(Element itemElem, String nodeName, String attributeName) {
        NodeList elementsByTagName = itemElem.getElementsByTagName(nodeName);
        if(elementsByTagName == null || elementsByTagName.getLength() == 0) {
            return null;
        }
        Node node = elementsByTagName.item(0);
        if(node == null) {
            return null;
        }
        NamedNodeMap map = node.getAttributes();
        if(map == null) {
            return null;
        }
        Node attributeNode = map.getNamedItem(attributeName);
        if(attributeNode == null) {
            return null;
        }
        return attributeNode.getNodeValue();
    }

    public static String getNodeValue(Node node) {
        NodeList childNodes = node.getChildNodes();
        if(childNodes != null) {
            for(int i = 0; i < childNodes.getLength(); i++) {
                Node item = childNodes.item(i);
                if(item.getNodeType() == Node.TEXT_NODE || item.getNodeType() == Node.CDATA_SECTION_NODE) {
                    return item.getNodeValue();
                }
            }
        }
        return null;
    }

    public static String stripInvalidXMLCharacters(String s) {
        StringBuilder sb = new StringBuilder();

        if(s == null || s.equals(""))
            return "";
        for(int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if((c == 0x9) || (c == 0xA) || (c == 0xD) || ((c >= 0x20) && (c <= 0xD7FF)) || ((c >= 0xE000) && (c <= 0xFFFD)) || ((c >= 0x10000) && (c <= 0x10FFFF)))
                sb.append(c);
        }
        return sb.toString();
    }

    public static Document parseIgnoreInvalidChar(String xml) {
        try {
            String validXML = stripInvalidXMLCharacters(xml);
            return parse(new ByteArrayInputStream(validXML.getBytes("UTF-8")));
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return null;
    }

    public static Document parse(String xml) {
        try {
            // return parse(new ByteArrayInputStream(xml.getBytes("UTF-8")));
            return parseIgnoreInvalidChar(xml);
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return null;
    }

    public static Document parse(InputStream in) {
        try {
            DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            Document document = documentBuilder.parse(in, "UTF-8");
            return document;
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return null;
    }

    public static void addFieldToDocElem(Document doc, Element rootElem, String name, String value, boolean isCDATA) {
        if(value == null) {
            return;
        }
        Element elem = doc.createElement("field");
        elem.setAttribute("name", name);
        if(isCDATA) {
            CDATASection cdataSection = doc.createCDATASection(value);
            elem.appendChild(cdataSection);
        }
        else {
            Text textNode = doc.createTextNode(value);
            elem.appendChild(textNode);
        }

        rootElem.appendChild(elem);
    }

    public static void convertJsonToXML(JSONObject obj, Document doc, Node parentNode) {
        if(obj == null) {
            return;
        }
        Set entrySet = obj.entrySet();
        for(Object en : entrySet) {
            if(en instanceof Entry) {
                Entry entry = (Entry) en;
                String key = (String) entry.getKey();
                Element elem = doc.createElement(key);
                Object object = entry.getValue();
                if(object instanceof JSONObject) {
                    JSONObject childJsonObj = (JSONObject) object;
                    convertJsonToXML(childJsonObj, doc, elem);
                }
                else if(object instanceof JSONArray) {
                    JSONArray arr = (JSONArray) object;
                    for(int i = 0; i < arr.size(); i++) {
                        JSONObject childJsonObj = (JSONObject) arr.get(i);
                        Element arrElem = doc.createElement(key);
                        convertJsonToXML(childJsonObj, doc, arrElem);
                        parentNode.appendChild(arrElem);
                    }
                }
                else {
                    String text = object == null? "" : object.toString();
                    Text textNode = doc.createTextNode(text);
                    elem.appendChild(textNode);
                }
                parentNode.appendChild(elem);
            }
        }
    }

    public static String serialize(Node node) {
        StringWriter sw = new StringWriter();
        try {
            Transformer transformer = TransformerFactory.newInstance().newTransformer();
            transformer.transform(new DOMSource(node), new StreamResult(sw));
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return sw.toString();
    }

    public static JSONObject convertNodeToJson(Node elem) {
        if(elem == null) {
            return null;
        }
        String name = elem.getNodeName();
        JSONObject jsonObject = new JSONObject();
        NodeList childNodes = elem.getChildNodes();
        if(childNodes != null) {
            JSONArray arr = new JSONArray();
            boolean isTextNode = false;
            for(int i = 0; i < childNodes.getLength(); i++) {
                Node node = childNodes.item(i);
                if(node.getNodeType() == Node.TEXT_NODE || node.getNodeType() == Node.CDATA_SECTION_NODE) {
                    jsonObject.put(name, node.getNodeValue());
                    isTextNode = true;
                }
                else if(node.getNodeType() == Node.ELEMENT_NODE) {
                    JSONObject obj = convertNodeToJson(node);
                    NamedNodeMap attributes = node.getAttributes();
                    if(attributes != null) {
                        for(int j = 0; j < attributes.getLength(); j++) {
                            Node attribute = attributes.item(j);
                            obj.put(attribute.getNodeName(), attribute.getNodeValue());
                        }
                    }
                    arr.add(obj);
                }
            }
            if(!isTextNode || childNodes.getLength() > 1) {
                jsonObject.put(name, arr);
            }
        }
        return jsonObject;
    }

    public static String formatDuration(String duration) {
        try {
            int i = Integer.parseInt(duration);
            if(i >= 0) {
                int min = i / 60;
                int sec = i % 60;
                String formattedString = (min < 10? "0" + min : "" + min) + ":" + (sec < 10? "0" + sec : "" + sec);
                return formattedString;
            }
            else {
                return "";
            }
        }
        catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return duration;
    }

    public static void main(String[] args) throws Exception {
        String s = "";
        String line = null;
        BufferedReader br = new BufferedReader(new FileReader("config/dev/FeedDetails.xml"));
        while((line = br.readLine()) != null) {
            s += line;
        }
        System.out.println("before: " + s);
        String stripInvalidXMLCharacters = stripInvalidXMLCharacters(s);
        System.out.println("after: " + stripInvalidXMLCharacters);
        Document parse = parse(stripInvalidXMLCharacters);
        // getCategoryDetails(new file)
    }

    public static double getDoubleAttributeValue(Element elem, String attributeName) {
        if(elem != null) {
            String attribute = elem.getAttribute(attributeName);
            if(attribute != null) {
                try {
                    double d = Double.parseDouble(attribute);
                    return d;
                }
                catch (Exception e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
        return 0;
    }

    public static long getLongAttributeValue(Element elem, String attributeName) {
        if(elem != null) {
            String attribute = elem.getAttribute(attributeName);
            if(attribute != null) {
                try {
                    long val = Long.parseLong(attribute);
                    return val;
                }
                catch (Exception e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
        return 0;
    }

    public static int getIntegerAttributeValue(Element elem, String attributeName) {
        if(elem != null) {
            String attribute = elem.getAttribute(attributeName);
            if(attribute != null) {
                try {
                    int val = Integer.parseInt(attribute);
                    return val;
                }
                catch (Exception e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
        return 0;
    }

    
    public static List<String> getAttributeValues(Element itemElem, String nodeName, String attributeName) {
        List<String> values = new ArrayList<>();
        NodeList elementsByTagName = itemElem.getElementsByTagName(nodeName);
        if(elementsByTagName == null || elementsByTagName.getLength() == 0) {
            return values;
        }
        for(int i=0;i<elementsByTagName.getLength();i++){
            Node node = elementsByTagName.item(i);
            if(node == null) {
                continue;
            }
            NamedNodeMap map = node.getAttributes();
            if(map == null) {
                continue;
            }
            Node attributeNode = map.getNamedItem(attributeName);
            if(attributeNode == null) {
                continue;
            }
             String nodeValue = attributeNode.getNodeValue();
             values.add(nodeValue);
        }
       return values;
    }

}
