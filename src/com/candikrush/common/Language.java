package com.candikrush.common;

public enum Language {

    ENGLISH("en", "English"), HINDI("hi", "Hindi"), TAMIL("ta", "Tamil"), TELUGU("te", "Telugu"), 
    MALAYALAM("ml", "Malayalam"), KANNADA("kn", "Kannada"), BENGALI("bn", "Bengali"),
    PUNJABI("pa", "Punjabi"), ORIYA("or", "Oriya"), GUJRATI("gu", "Gujrati"),MARATHI("mr", "Marathi"), UNKNOWN("unknown", "Unknown");

    private String id;
    private String name;

    private Language(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return getName();
    }

    public static Language getLanguageByName(String name){
    	
    	for(Language langName : Language.values()){
    		if(langName.getName().equalsIgnoreCase(name))
    			return langName;
    	}
    	return Language.UNKNOWN;
    }
    
    public static Language getLanguageById(String id) {
        for(Language lang : Language.values()) {
            if(lang.getId().equals(id))
                return lang;
        }
        return Language.UNKNOWN;
    }
}
