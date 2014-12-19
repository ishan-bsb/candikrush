$(function() {
	$('.approve-artists').live('click',function(event) {
		event.preventDefault();
		var artistsId = $(this)[0].getAttribute("data-id");
		var version = $(this)[0].getAttribute("data-version");
		$.get('/cms/artists/approve?id='+artistsId+'&v='+version, function(response) {
			if(response === "") {
				bootbox.alert("Artists approved.", function() {
					location.reload();
				});
			}
			else {
				bootbox.alert("Artists could not be approved. Error: " + response);
			}
		});
	});
	
});