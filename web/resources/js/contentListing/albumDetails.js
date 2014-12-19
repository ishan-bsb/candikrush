$(document).ready(function() {
	loadKeywords();
	loadCircles();
	
	/** For tags manager of keywords **/
	function loadKeywords() {
		var keywordsForTags = "";
		if($('#orig_keyword') !== undefined && $('#orig_keyword').val() != undefined ) {
			keywordsForTags = $('#orig_keyword').val().split(',');
		}
		$('#keyword_tags').tagsManager({
			"prefilled": keywordsForTags,
			"hiddenTagListName":"txt_keyword",
			"hiddenTagListId":"txt_keyword"
		});
//		$('#keyword_tags').attr("type","hidden");
//		if(keywords !== null && keywords !== '') {
//			var keyTags = keywords.split(',');
//			for(var i=0;i<keyTags.length;i++) {
//				$('#keyword_tags').tagsManager('pushTag',keyTags[i]);
//			}
//		}
	}
	
	function loadCircles() {
		$('.circle-chkbox').attr("disabled",true);
	}
	
//	$('#date_fromdate').datepicker({
//        format : '#DD# #MMM# #YYYY#',
//        onRender: function(date) {
//                                var nowTemp = new Date();
//                                var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
//                                return date.valueOf() > now.valueOf() ? 'disabled' : '';
//                          }
//	});
//	
//	$('#date_todate').datepicker({
//        format : '#DD# #MMM# #YYYY#',
//        onRender: function(date) {
//                                var nowTemp = new Date();
//                                var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
//                                return date.valueOf() > now.valueOf() ? 'disabled' : '';
//                          }
//	});

	
});