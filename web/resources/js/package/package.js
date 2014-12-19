$(document).ready(function() {
	loadKeywords();
	
	function loadKeywords() {
		var keywordsForTags = "";
		if($('#orig_package_tags') !== undefined && $('#orig_package_tags').val() != undefined ) {
			keywordsForTags = $('#orig_package_tags').val().split(',');
		}
		$('#package_tags').tagsManager({
			"prefilled": keywordsForTags
		});
	}
	
	$('.approve-pack').live('click',function(event) {
		event.preventDefault();
		var packageId = $(this)[0].getAttribute("data-id");
		var version = $(this)[0].getAttribute("data-version");
		$.get('/cms/package/approve?id='+packageId+'&v='+version, function(response) {
			if(response === "SUCCESS") {
				bootbox.alert("Package approved.", function() {
					location.reload();
				});
			}
			else {
				bootbox.alert("Package could not be approved.");
			}
		});
	});
});