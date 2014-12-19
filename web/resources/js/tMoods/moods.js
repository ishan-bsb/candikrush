$(function() {
	$('.approve-moods').live('click',function(event) {
		event.preventDefault();
		var moodsId = $(this)[0].getAttribute("data-id");
		var version = $(this)[0].getAttribute("data-version");
		$.get('/cms/moods/approve?id='+moodsId+'&v='+version, function(response) {
			if(response === "") {
				bootbox.alert("Moods approved.", function() {
					location.reload();
				});
			}
			else {
				bootbox.alert("Moods could not be approved. Error: " + response);
			}
		});
	});
	
});