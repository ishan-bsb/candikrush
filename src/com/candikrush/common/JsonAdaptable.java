package com.candikrush.common;

import org.json.simple.JSONObject;

public interface JsonAdaptable {

    public JSONObject toJsonObject();

    public void fromJsonObject(JSONObject jsonObject);

}
