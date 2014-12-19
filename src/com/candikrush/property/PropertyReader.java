package com.candikrush.property;

import java.io.IOException;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class PropertyReader {
	
	private static final Logger logger = LoggerFactory.getLogger(PropertyReader.class.getCanonicalName());

	public String loadProperty(String propName) {
		
		Properties prop = new Properties();
		String propValue =null;
		try {
			prop.load(getClass().getClassLoader().getResourceAsStream("environment.properties"));
			propValue = prop.getProperty(propName);
			
		} catch (IOException e) {
			logger.error("Exception while loading properties ", e);
		}
		return propValue;
	}
}