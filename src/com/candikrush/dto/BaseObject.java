package com.candikrush.dto;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.data.annotation.Id;

import com.candikrush.common.JsonAdaptable;


/**
 * Created with IntelliJ IDEA. User: bhuvangupta Date: 20/09/12 Time: 11:01 PM To change this
 * template use File | Settings | File Templates.
 */
public abstract class BaseObject implements JsonAdaptable {

    // byte[] byts = Base64.decodeBase64(redisIdOrUID);
    // query.put("_id", new ObjectId(byts));
    @Id
    private String  id;
    private boolean deleted;
    private String  createUserId;
    private String  modifiedUserId;
    private long    creationDate;
    private long    lastUpdated;
    private String  etag;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public JSONObject toJsonObject() {
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("_id", getId());
        jsonObj.put("deleted", isDeleted());
        jsonObj.put("cdate", getCreationDate());
        jsonObj.put("lastUpdated", getLastUpdated());
        jsonObj.put("createuserid", getCreateUserId());
        jsonObj.put("modifieduserid", getModifiedUserId());
        jsonObj.put("etag", getEtag());
        toJsonInternal(jsonObj);
        return jsonObj;
    }

    @Override
    public void fromJsonObject(JSONObject jsonObj) {
        Object idobj = jsonObj.get("_id");
        if(idobj instanceof String) {
            setId((String) idobj);
        }
        else if(idobj instanceof JSONObject) {
            setId((String) ((JSONObject) jsonObj.get("_id")).get("$oid"));
        }
        if(jsonObj.get("deleted") != null) {
            setDeleted((Boolean) jsonObj.get("deleted"));
        }
        if(jsonObj.get("cdate") != null) {
            long time = (Long) jsonObj.get("cdate");
            setCreationDate(time);
        }
        if(jsonObj.get("lastUpdated") != null) {
            long time = (Long) jsonObj.get("lastUpdated");
            setLastUpdated(time);
        }
        setCreateUserId((String) jsonObj.get("createuserid"));
        setModifiedUserId((String) jsonObj.get("modifieduserid"));
        setEtag((String) jsonObj.get("etag"));
        fromJsonInternal(jsonObj);
    }

    public String toJson() {
        JSONObject object = toJsonObject();
        toJsonInternal(object);
        return object.toString();
    }

    protected abstract void toJsonInternal(JSONObject jsonObj);

    public void fromJson(String json) {
        JSONObject jsonObj = (JSONObject) JSONValue.parse(json);
        fromJsonObject(jsonObj);
        fromJsonInternal(jsonObj);
    }

    protected abstract void fromJsonInternal(JSONObject jsonObj);

    @Override
    public String toString() {
        try {
            return getClass().getName() + ":" + toJson();
        }
        catch (Exception e) {
            e.printStackTrace();
            return super.toString();
        }
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean isDeleted) {
        this.deleted = isDeleted;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public String getModifiedUserId() {
        return modifiedUserId;
    }

    public void setModifiedUserId(String modifiedUserId) {
        this.modifiedUserId = modifiedUserId;
    }

    public long getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(long creationDate) {
        this.creationDate = creationDate;
    }

    public long getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(long lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getEtag() {
        return etag;
    }

    public void setEtag(String etag) {
        this.etag = etag;
    }

}
