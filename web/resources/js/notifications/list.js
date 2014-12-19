$(document).ready(function() {

	var srch_processed = "";
	var srch_notificationId = "";
	var srch_title = "";
	var srch_targetContentId = "";
	var srch_targetContentLanguage = "";
	var srch_targetScreen = "";
	var srch_targetContentType = "";
	var srch_workflowState = ";"
	var current_page = 1;

	$('.search_parameter').change(function() {
		var id = $(this).attr('id');
		var name = $(this).attr('name');
		var val = $(this).val();
		if(id == 'srch_processed') {
			srch_processed = val;
		} else if (id == 'srch_notificationId') {
			srch_notificationId = val;
		} else if (id == 'srch_title') {
			srch_title = val;
		} else if (name == 'srch_targetContentId') {
			srch_targetContentId = val;
		} else if (id == 'srch_targetContentLanguage') {
			srch_targetContentLanguage = val;
		} else if (id == 'srch_targetScreen') {
			srch_targetScreen = val;
		} else if (id == 'srch_targetContentType') {
			srch_targetContentType = val;
		} else if (id == 'srch_workflowState') {
			srch_workflowState = val;
		}
	});
	
	function searchWithCurrentParameters() {
		populateSearchParams();
		populateSearchResult();
	}
	
	$('.cmspag').live('click' ,function(event) {
		event.preventDefault();
		current_page = $(this)[0].getAttribute('data-pageno');
		searchWithCurrentParameters();
	});
	
	function populateSearchResult() {
		var page = 1;
		if(current_page !== undefined) {
			page = current_page;
		}
		var options = {
				url:      '/cms/notifications/search?page='+page,        // override for form's 'action' attribute 
				type:      'GET',
				target: '#searchNotificationResult'// post-submit callback 
		};
		$('#searchNotification').ajaxSubmit(options);
	}
	
	function populateSearchParams() {
		$('#srch_processed').val(srch_processed);
		$('#srch_notificationId').val(srch_notificationId);
		$('#srch_title').val(srch_title);
		$('#srch_targetContentId').val(srch_targetContentId);
		$('#srch_targetContentLanguage').val(srch_targetContentLanguage);
		$('#srch_targetScreen').val(srch_targetScreen);
		$('#srch_targetContentType').val(srch_targetContentType);
		$('#srch_workflowState').val(srch_workflowState);
	}
	
	$('#searchNotification').submit(function(event) {
		event.preventDefault();
		var options = {
				url:      '/cms/notifications/search',        // override for form's 'action' attribute 
				type:      'GET',
				target: '#searchNotificationResult'// post-submit callback 
		};
		$(this).ajaxSubmit(options);
    });
});