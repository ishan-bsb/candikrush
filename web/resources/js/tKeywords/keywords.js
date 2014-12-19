$(function() {
	$('.approve-keywords').live('click',function(event) {
		event.preventDefault();
		var keywordsId = $(this)[0].getAttribute("data-id");
		var version = $(this)[0].getAttribute("data-version");
		$.get('/cms/keywords/approve?id='+keywordsId+'&v='+version, function(response) {
			if(response === "") {
				bootbox.alert("Keywords approved.", function() {
					location.reload();
				});
			}
			else {
				bootbox.alert("Keywords could not be approved. Error: " + response);
			}
		});
	});
	
});