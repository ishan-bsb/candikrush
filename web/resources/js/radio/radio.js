$(function() {
	loadKeywords();
	
	function loadKeywords() {
		var fields = ["tags", "keywords"];
		fields.forEach(function(field) {
			var keywordsForTags = "";
			if($('#orig_radio_'+field) !== undefined && $('#orig_radio_'+field).val() != undefined ) {
				keywordsForTags = $('#orig_radio_'+field).val().split(',');
			}
			$('#radio_'+field).tagsManager({
				"prefilled": keywordsForTags
			});
		});
	}
	
	$('.approve-radio').live('click',function(event) {
		event.preventDefault();
		var radioId = $(this)[0].getAttribute("data-id");
		var version = $(this)[0].getAttribute("data-version");
		$.get('/cms/radio/approve?id='+radioId+'&v='+version, function(response) {
			if(response === "") {
				bootbox.alert("Radio approved.", function() {
					location.reload();
				});
			}
			else {
				bootbox.alert("Radio could not be approved. Error: " + response);
			}
		});
	});
	
});
