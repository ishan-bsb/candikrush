package com.candikrush.dto;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


public class Role extends BaseObject {

	private String name;

	private String storeType;

	private String moduleName;

	private Set<CKUserPermissions> permissions;

	public String getStoreType() {
		return storeType;
	}

	public void setStoreType(String storeType) {
		this.storeType = storeType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<CKUserPermissions> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<CKUserPermissions> permissions) {
		this.permissions = EnumSet.copyOf(permissions);
	}

	@SuppressWarnings("unchecked")
	@Override
	protected void toJsonInternal(JSONObject object) {
		object.put("name", getName());
		object.put("moduleName", getStoreType());
		JSONArray permissionJson = new JSONArray();
		Set<CKUserPermissions> permissionList = getPermissions();
		if (permissionList != null) {
			for (CKUserPermissions permission : permissionList) {
				permissionJson.add(permission.name());
			}
			object.put("permissions", permissionJson);
		}
	}

	@Override
	protected void fromJsonInternal(JSONObject jsonObj) {
		Object name = jsonObj.get("name");
		if (name != null) {
			setName((String) name);
		}
		Object moduleName = jsonObj.get("moduleName");
		if (name != null) {
			setStoreType((String) moduleName);
		}
		List<CKUserPermissions> permissionList = new ArrayList<CKUserPermissions>();
		JSONArray pmArray = (JSONArray) jsonObj.get("permissions");
		if (pmArray != null) {
			for (int i = 0; i < pmArray.size(); i++) {
				CKUserPermissions keyword = CKUserPermissions
						.valueOf((String) pmArray.get(i));
				permissionList.add(keyword);
			}
		}
		setPermissions(permissionList);

	}

	@Override
	public String toString() {
		return super.toString() + "<br><br>";
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

}
