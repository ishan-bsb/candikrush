$(function() {
	$('#keywords').addClass('page-active');
	
	var srch_id = "";
	var srch_language = ",";
	var srch_sel_language = "";
	var current_page = 1;
	var srch_status="";
	
	$('.search_parameter').change(function() {
		var id = $(this).attr('id');
		var name = $(this).attr('name');
		var val = $(this).val();
		if(id == 'srchkeywords_id') {
			srch_id = val;
		} else if (id == 'all_lang') {
			srch_sel_language = val;
		} else if (name == 'srchkeywords_language') {
			if($(this).attr('checked')) {
				srch_language += (val+',');
			}
		} else if (id == 'srchkeywords_status') {
			srch_status = val;
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
				url:      '/cms/keywords/search?page='+page,        // override for form's 'action' attribute 
				type:      'GET',
				target: '#searchKeywordsResult'// post-submit callback 
		};
		$('#searchKeywords').ajaxSubmit(options);
	}
	
	function populateSearchParams() {
		$('#srchkeywords_id').val(srch_id);
		var langArr = srch_language.split(',');
		if(langArr.length > 2) {
			for(var i=1;i<langArr.size;i++) {
				$( 'input[value="' +langArr[i]  + '"][name$="srchkeywords_language"]').attr("checked","true");
			}
		}
		$('#srchkeywords_status').val(srch_status);
		$("input[name='all_lang'][value='"+ srch_sel_language +"']").attr('checked',true);
	}
	
	$('.approve-keywords').live('click',function(event) {
		event.preventDefault();
		var keywordsId = $(this)[0].getAttribute("data-id");
		var version = $(this)[0].getAttribute("data-version");
		$.get('/cms/keywords/approve?id='+keywordsId+'&v='+version, function(response) {
			if(response === "") {
				bootbox.alert("Keywords approved.", function() {
					searchWithCurrentParameters();
				});
			}
			else {
				bootbox.alert("Keywords could not be approved. Error: " + response);
			}
		});
	});
	
	$('#searchKeywords').submit(function(event) {
		event.preventDefault();
		var page = 1;
		var options = {
				url:      '/cms/keywords/search?page='+page,        // override for form's 'action' attribute 
				type:      'GET',
				target: '#searchKeywordsResult'// post-submit callback 
		};
		$(this).ajaxSubmit(options);
    });
});