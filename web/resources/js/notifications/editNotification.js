$(document).ready(function() {
	loadDatePickers();

	function loadDatePickers() {
		$('#notification_sentTime').datetimepicker({ 
			format : 'dd M yyyy hh:ii',
			autoclose: true,
			todayBtn: true,
			autoSize: false,
			onRender: function(date) {
				var nowTemp = new Date();
				var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
				return date.valueOf();
			}
		});
	}

	//notification edit submit ajax
	$('#notification-form').submit(function() {
		event.preventDefault();
		var sentTime = $('#sentTime').val();
		var dateValidateResult = true;
		var today = new Date();
		var validateDateMsg;
		if(sentTime != undefined && sentTime != "" && new Date(sentTime) <= today) {
			dateValidateResult = false;
			validateDateMsg = 'Send date has to be future date.';
		}
		if(!dateValidateResult) {
			$('#editNotificationResult').css("color","#f00");
			$('#editNotificationResult').html(validateDateMsg);
		}
		var langValidateResult = true;
		if($("#targetContentLanguage").val() == undefined || $("#targetContentLanguage").val() == "") {
			langValidateResult = false;
			$('#editNotificationResult').css("color","#f00");
			$('#editNotificationResult').html('Please select at least one content language.');
		}
//		data-regexp="^(https?|ftp)://.*(jpeg|jpg|png|gif|bmp)"
		//([^\s]+(\.(?i)(jpg|png|gif|bmp))$)
		
		var modtype = $('#modtype').val();
		var url = '/cms/notifications/save';
		if(modtype === 'create') {
			url = '/cms/notifications/create';
		}
		var result = $('#notification-form').parsley('validate');
		if(result === true && dateValidateResult == true && langValidateResult == true) {
			var options = {
				url:      url,        // override for form's 'action' attribute 
				type:      'POST',
				success:       showResponse,  // post-submit callback
				beforeSubmit: loading()  // post-submit callback 
			};
	        $(this).ajaxSubmit(options);
		}
    });
	
	//processing modal
	function loading(){
		$('#modalBox').show();
	}
	
	// post-submit callback 
	function showResponse(responseText, statusText, xhr, $form)  {
		$('#modalBox').hide();
		if(responseText == true) {
			$('#editNotificationResult').css("color","#0f0");
			$('#editNotificationResult').html('Notification saved successfully.');
			bootbox.alert("Notification Saved Successfully!", function() {
				window.location.href = "/cms/notifications";
			});
		} else {
			$('#editNotificationResult').css("color","#f00");
			$('#editNotificationResult').html('Notification upload failed.');
			bootbox.alert("Notification upload Failed");
		}
	}

});
