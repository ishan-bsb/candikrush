$(function() {
	$('#radio').addClass('page-active');
	loadTagManagers();
	
	function loadTagManagers() {
		$('#radio_keywords').tagsManager({
			"hiddenTagListName":"search_keywords",
			"hiddenTagListId":"search_keywords"
		});
	}
	
	var srch_id = "";
	var srch_title = "";
	var srch_circle = ",";
	var srch_language = ",";
	var srch_sel_language = "";
	var srch_keywords = "";
	var current_page = 1;
	var srch_sel_circle = "";
	var srch_status="";
	var srch_exclusive="";
	var srch_sponsered="";
	
	$('.search_parameter').change(function() {
		var id = $(this).attr('id');
		var name = $(this).attr('name');
		var val = $(this).val();
		if(id == 'srchradio_id') {
			srch_id = val;
		} else if (name == 'srchradio_circle') {
			if($(this).attr('checked')) {
				srch_circle += (val+',');
			}
		} else if (id == 'all_lang') {
			srch_sel_language = val;
		} else if (id == 'srchradio_title') {
			srch_title = val;
		} else if (name == 'srchradio_language') {
			if($(this).attr('checked')) {
				srch_language += (val+',');
			}
		} else if (id == 'srchradio_status') {
			srch_status = val;
		} else if (id == 'srchradio_sponsered') {
			srch_sponsered = val;
		} else if (id == 'srchradio_exclusive') {
			srch_exclusive = val;
		} else if (id == 'select-circle') {
			srch_sel_circle = val;
		} else if (id == 'search_keywords') {
			srch_keywords = val;
		}
	});
	
	function searchWithCurrentParameters() {
		populateSearchParams();
		populateSearchResult();
	}
	
	$('.cmspag').live('click' ,function() {
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
				url:      '/cms/radio/search?page='+page,        // override for form's 'action' attribute 
				type:      'GET',
				target: '#searchRadioResult'// post-submit callback 
		};
		$('#searchRadio').ajaxSubmit(options);
	}
	
	function populateSearchParams() {
		$('#srchradio_id').val(srch_id);
		$('#srchradio_title').val(srch_title);
		var circleArr = srch_circle.split(',');
		if(circleArr.length > 2) {
			for(var i=1;i<circleArr.size;i++) {
				$( 'input[value="' +circleArr[i]  + '"][name$="srchradio_circle"]').attr("checked","true");
			}
		}
		var langArr = srch_language.split(',');
		if(langArr.length > 2) {
			for(var i=1;i<langArr.size;i++) {
				$( 'input[value="' +langArr[i]  + '"][name$="srchradio_language"]').attr("checked","true");
			}
		}
		$('#search_keywords').val(srch_keywords);
		$('#srchradio_status').val(srch_status);
		$("input[name='select-circle'][value='"+ srch_sel_circle +"']").attr('checked',true);
		$("input[name='all_lang'][value='"+ srch_sel_language +"']").attr('checked',true);
	}
	
	$('.approve-radio').live('click',function(event) {
		event.preventDefault();
		var radioId = $(this)[0].getAttribute("data-id");
		var version = $(this)[0].getAttribute("data-version");
		$.get('/cms/radio/approve?id='+radioId+'&v='+version, function(response) {
			if(response === "") {
				bootbox.alert("Radio approved.", function() {
					searchWithCurrentParameters();
				});
			}
			else {
				bootbox.alert("Radio could not be approved. Error: " + response);
			}
		});
	});
	
	$('#searchRadio').submit(function(event) {
		event.preventDefault();
		var page = 1;
		if(current_page !== undefined) {
			page = current_page;
		}
		var options = {
				url:      '/cms/radio/search?page='+page,        // override for form's 'action' attribute 
				type:      'GET',
//				success:   showResponse,
				target: '#searchRadioResult'// post-submit callback 
		};
		$(this).ajaxSubmit(options);
    });
});