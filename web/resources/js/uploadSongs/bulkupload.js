$(document).ready(function(){
	
	$('#albumUpload').change(function() {
	    $("#uploadType").prop('checked', false);
	    $("#uploadType").prop("disabled", true);
	});
	
	$('#trackUpload').change(function() {
	    $("#uploadType").prop("disabled", false);
	});
	
	$('.bulkUpload').live('click' ,function(event) {
		var uploadType ="";
		var isSelective = false;
		var uploadContentType ="";
		var uploadContentTypeChecked = false;
		var priority = $("#set_priority").val();
		
		uploadContentType = $('input:radio[name=uploadType]:checked').val();
		if($("input:radio[name='uploadType']:checked").length == 1) {
			uploadContentTypeChecked = true;
		}
		var msg = "";
		if ($("#uploadType").is(":checked")) {
			uploadType = "Selective";
			isSelective = true;
			msg = "Are You Sure For SELECTIVE BULK Upload";
		}else{
			uploadType = "";
			isSelective = false;
			msg = "Are You Sure For FULL BULK Upload";
		}
		
		if (uploadContentTypeChecked == true){
			var data = new FormData();
			data.append("bulkUploadFile", bulk_content.files[0]);
			data.append("uploadType", uploadType);
			data.append("uploadContentType", uploadContentType);
			if(priority !== undefined)
				data.append("priority", priority);
			
			bootbox.confirm(msg + " ?", function(result) {
				if(result) {
					$('#bulkUploadResult').html("Uploading Please Wait ...");
					$.ajax({
						url:"/cms/bulkupload",
						type : "POST",
						data : data,
						processData : false,
						contentType : false,
						success : function(response) {
							$('#bulkUploadResult').html(response);
						},
						error : function(jqXHR, textStatus, errorMessage) {
							console.log("Upload failed"+errorMessage);
						}
					});
				}
			});
		}else{
			bootbox.alert("Please Select Content Data Type");
		}
    });
	
	// post-submit callback 
	function showResponse(responseText, statusText, xhr, $form)  {
		if(responseText === true) {
			$('#uploadResult').css("color","#0f0");
			$('#uploadResult').html('Content successfully uploaded.');
		} else {
			$('#uploadResult').css("color","#f00");
			$('#uploadResult').html('Content upload failed.');
		}
	}
	
});

