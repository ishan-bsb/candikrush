<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../common/header.jsp"%>

	<script type="text/javascript">  
  
		function getFileName(filePath)  
		{	
		    if(filePath.indexOf("fakepath") > 0){
				indx = filePath.lastIndexOf("\\");
				fileName = filePath.substring(indx+1, filePath.length);
				return fileName;
			}
			else if(filePath.length > 0)
				return filePath;
			else
				return null;
		}  
  
	</script>  

	<div class="container page_content">
		<div id="main-container" class="container">
			<h2 style="font-size:30px">Bulk Upload</h2>
				<table class="table table-bordered">
					<tr>
						<td width=10%><label for="name" class="control-label">
							<p class="text-info">Content Data Type</p></label>
						</td>
						<td width=10%>
							<div>
								<input type="radio" name="uploadType" id="trackUpload" value="content" style="margin-left: 0px;"> Track
								<input type="radio" name="uploadType" id="albumUpload" value="album" style="margin-left: 25px;"> Album
							</div>
						</td>
						<td>
							<input type="checkbox" id="uploadType" name="uploadType" value="selective" />Selective upload</label>
						</td>
					</tr>
					<c:if test="${ (cpId == 'srch_bsb') }">
						<tr>
							<td><label for="name" class="control-label"><p
										class="text-info">Priority</label></td>
							<td colspan="2">
								<div class="span3">
									<select class="form-control span3" name=set_priority id=set_priority>
									    <option value="0">Default</option>
									    <option value="1">Normal</option>
									    <option value="2">Medium</option>
									    <option value="3">High</option>
									</select>
								</div>
							</td>
						</tr>
					</c:if>
					<tr>
						<td width=10%>
							<label for="name" class="control-label">
								<p class="text-info">Select Bulk Content</p>
							</label>
						</td>
                        <td colspan="2">
                        	<div style="position: relative;">
                            	<a class='btn btn-info btn-large' href='javascript:;'><i class="glyphicon glyphicon-white glyphicon glyphicon-folder-open"></i> Choose
                                                File... <input type="file" id="bulk_content" name="files[0]"
                                                style='position: absolute; padding-bottom: 12px; z-index: 2; top: 0; left: 0; filter: alpha(opacity = 0); -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"; opacity: 0; background-color: transparent; color: transparent;'
                                                name="file_source" size="40"
                                                onchange='$("#upload-bulk-content").html(getFileName($(this).val()));'>
                                </a> &nbsp; 
                                	<span class='label label-info' id="upload-bulk-content"></span>
                        	</div> 
                        </td>
					</tr>
					<tr>
						<td colspan="3" style="text-align:right">
							<button class="bulkUpload btn btn-primary" id="uploadZip" name="uploadZip" style="padding: 10px 20px 10px 20px;margin-left: 1150px;">Upload</button>
							<label class="control-label"><p class="text-info" style=" margin: 15px 0px 0px 1011px;">${uploadStatus}</p></label>
							<label class="control-label"><p class="text-info" style=" margin: 15px 0px 0px 1011px;">${uploadStatusReason}</p></label>
							<span id="bulkUploadResult" name="bulkUploadResult"></span>
						</td>
					</tr>
			</table>
		</div>
	</div>
	
	<%@ include file="../common/footer.jsp"%>
	<script src="<c:url value="../resources/js/uploadSongs/bulkupload.js" />"></script>
	<script>
    	window.onload = function(){
    		$('#uploadZ').addClass('page-active');
    	}
    </script>
	</body>
	</html>