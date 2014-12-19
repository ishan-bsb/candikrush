$(document).ready(function() {

	loadKeywords();
	var srch_id = "";
	var srch_title = "";
	var srch_category = "";
	var srch_circle = ",";
	var srch_language = "";
	var srch_tags = "";
	var srch_query = "";
	var srch_status = "";
	var srch_packageType = "";
	var current_page = 1;
	var srch_sel_circle = "";
	var srch_keyword = "";
	setSearchFilters();
	
	$('#pkgOrderLink').live("click", function(event) {
		var link = "/cms/package/order?pkgType=" + $('#order_packageType').val();
		window.location.href = link;
	});
	
	function setSearchFilters(){
		$('#srchpack_s').val($("#srch_searchQuery").val());
		srch_query = $("#srch_searchQuery").val();
		$('#srchpack_status').val($("#srch_status").val());
		srch_status = $("#srch_status").val();
		$('#srchpack_id').val($("#srch_packageId").val());
		srch_id = $("#srch_packageId").val();
		$('#srchpack_title').val($("#srch_title").val());
		srch_title = $("#srch_title").val();
		$('#srchpack_category').val($("#srch_packageCategory").val());
		srch_category = $("#srch_packageCategory").val();
		$('#srchpack_packageType').val($("#srch_packageType").val());
		srch_packageType = $("#srch_packageType").val();
		$('#search_tags').val($("#srch_tags").val());
		srch_tags = $("#srch_tags").val();
		if($("#srch_languageCat").val() == 0){
			$('input[name=all-lang][value=0]').attr('checked', true);
			var langArr = $("#srch_languageIds").val().split(';');
			for(var i=1;i<langArr.length;i++) {
				$( 'input[value="' +langArr[i]  + '"][name$="search_language"]').attr("checked","true");
			}
		}else{
			$('input[name=all-lang][value=1]').attr('checked', true);
		}
	}
	
	$('.search_parameter').change(function() {
		var id = $(this).attr('id');
		var name = $(this).attr('name');
		var val = $(this).val();
		if(id == 'srchpack_id') {
			srch_id = val;
		} else if (id == 'srchpack_title') {
			srch_title = val;
		} else if (id == 'srchpack_category') {
			srch_category = val;
		} else if (name == 'srchpack_circle') {
			if($(this).attr('checked')) {
				srch_circle += (val+',');
			}
		} else if (id == 'search_language') {
			srch_language = val;
		} else if (id == 'search_tags') {
			srch_tags = val;
		} else if (id == 'srchpack_s') {
			srch_query = val;
		} else if (id == 'srchpack_status') {
			srch_status = val;
		} else if(id == 'srchpack_packageType') {
			srch_packageType = val;
		} else if (id == 'select-circle') {
			srch_sel_circle = val;
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
				url:      '/cms/package/search?page='+page,        // override for form's 'action' attribute 
				type:      'GET',
				target: '#searchPackageResult'// post-submit callback 
		};
		$('#searchPackage').ajaxSubmit(options);
	}
	
	function populateSearchParams() {
		$('#srchpack_id').val(srch_id);
		$('#srchpack_title').val(srch_title);
		$('#srchpack_category').val(srch_category);
		$('#srchpack_packageType').val(srch_packageType);
		var circleArr = srch_circle.split(',');
		if(circleArr.length > 2) {
			for(var i=1;i<circleArr.size;i++) {
				$( 'input[value="' +circleArr[i]  + '"][name$="srchpack_circle"]').attr("checked","true");
			}
		}
		$('#search_language').val(srch_language);
		$('#search_tags').val(srch_tags);
		$('#srchpack_s').val(srch_query);
		$('#srchpack_status').val(srch_status);
		$("input[name='select-circle'][value='"+ srch_sel_circle +"']").attr('checked',true);
	}
	
	function loadKeywords() {
		var keywordsForTags = "";
		if($('#srch_tags').val() !== undefined && $('#srch_tags').val() != ""){
			keywordsForTags = $('#srch_tags').val().split(';');
		}
		$('#keyword_package_tags').tagsManager({
			"prefilled": keywordsForTags,
			"hiddenTagListName":"search_tags",
			"hiddenTagListId":"search_tags"
		});
	}
	
	$('#package').addClass('page-active');
	
	
	$('#searchPackage').submit(function(event) {
		event.preventDefault();
		var options = {
				url:      '/cms/package/search',        // override for form's 'action' attribute 
				type:      'GET',
//				success:   showResponse,
				target: '#searchPackageResult'// post-submit callback 
		};
		$(this).ajaxSubmit(options);
    });
	
	$('.approve-pack').live('click',function(event) {
		event.preventDefault();
		var packageId = $(this)[0].getAttribute("data-id");
		var version = $(this)[0].getAttribute("data-version");
		$.get('/cms/package/approve?id='+packageId+'&v='+version, function(response) {
			if(response === "SUCCESS") {
				bootbox.alert("Package approved.", function() {
					searchWithCurrentParameters();
				});
			}
			else {
				bootbox.alert("Package could not be approved.");
			}
		});
	});
	
/*
 * Cache Clear From App Side
 */
	$("#clear-cache").live('click' ,function(event) {
		event.preventDefault();
		var tr = $(this).closest('tr');
		var contentId = tr.find('.id').text();
		var packageId = $(this)[0].getAttribute("data-id");
		bootbox.confirm("Are you sure you want to clear cache of content ID : " +  packageId + "?", function(result) {
			if(result) {
				$.ajax({
					type : "GET",
					url : "/cms/clearcache?contentId=" + packageId+"&type=package",
					success : function(data) {
						bootbox.alert("Cache Clear of ID "+packageId+" : "+data);
					}
				});
			}
		});
	});

	
});