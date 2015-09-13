package com.candikrush.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.candikrush.property.PropertyReader;
import com.mongodb.MongoClient;


/**
 * Server configurations.
 */
@Configuration
@ComponentScan({"com.candikrush"})
@PropertySource("classpath:environment.properties")
@EnableWebMvc
@EnableScheduling
public class ConfigurationService extends WebMvcConfigurerAdapter
{
    protected static Logger logger = LoggerFactory.getLogger(ConfigurationService.class);

    private @Autowired Environment env;
    private @Autowired MongoDbFactory mongo;
    private @Autowired PropertyReader propertyReader;

    public ConfigurationService() {
        System.err.println("ConfigurationService "+this);
        System.out.println("env : "+env);
    }
    
    public @Bean
	MongoDbFactory mongoDbFactory() throws Exception {
		return new SimpleMongoDbFactory(new MongoClient("localhost", 27017), "cmsdb");
	}

    @Bean
    public MongoTemplate mongoCMSDB() throws Exception {
        return new MongoTemplate(mongo);
    }

}
