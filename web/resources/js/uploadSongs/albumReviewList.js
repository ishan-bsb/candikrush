$(document).ready(function() {

/*
 * Pop-Up for bulk edit
 */
	$('.albumReviewList').live('click', function (event) {
		event.preventDefault();
		var thisID    = $(this).attr('data-id');
		$('#mergeAlbumListModel_'+thisID).modal().show();
	});
	
	$("#selectDeselectAllMerge").click(function(){
        $(".mergeAlbum").prop("checked",$("#selectDeselectAllMerge").prop("checked"));
    })
    
/*
 * bulk delete events
 */
	$("#mergeAlbumId").live('click' ,function(event) {
	    var thisID    = $(this).attr('data-id');
	    var checked = 0;
	    var total = 0;
	    $('.mergeAlbum').each(function(index, val) {
	        if ($(this).attr('id') == thisID) {
	            total++;
	        }
	    });
	    $('.mergeAlbum:checked').each(function(index, val) {
	        if ($(this).attr('id') == thisID) {
	            checked++;
	        }
	    });
	    if (total == checked) {
	    	$('.selectDeselectAllMerge').prop("checked", true);
	    	$('.selectDeselectAllMerge').prop("indeterminate", false);
	    } else if (checked == 0) {
	    	$('.selectDeselectAllMerge').prop("checked", false);
	    	$('.selectDeselectAllMerge').prop("indeterminate", false);
	    } else {
	    	$('.selectDeselectAllMerge').prop("indeterminate", true);
	    }
	}); 
	
/*
 * Merge Albums
 */
	$('#merge_albums').live('click' ,function(event) {
		var contentIdList = "";
		var totalChecked = 0;
		var message ="";
		var isSelected=true;
		var landingPageUrl = $("#pageUrl").val();
		var parentID    = $(this).attr('data-id');
		$('input[type="checkbox"]:checked').each(function(){
			var contentId = $(this).val();
            contentIdList = contentIdList + "," + contentId;
        });
		$('.mergeAlbum:checked').each(function(index, val) {
        	totalChecked++;
	    });
		if(totalChecked == 0){
			isSelected=false;
			message = "Please Select At Least One Item To Merge.";
		}
		var data = new FormData();
		data.append("parentId", parentID);
		data.append("albumListForMerge", contentIdList);
		if (isSelected == true){
			bootbox.confirm("Are you sure you want to Merge All Selected", function(result) {
	            if(result){
	                $.ajax({
	                    url:"/cms/mergealbum",
	                    type : "POST",
	                    data : data,
	                    processData : false,
	                    contentType : false,
	                    success : function(response) {
	                    	bootbox.alert("Merge Status : "+response);
	                    	$(".mergeAlbum").prop("checked",false);
	                    	window.location.href = landingPageUrl;
	                    }
	                });
	            }
	        });
		}
		else{
			bootbox.alert(message);
		}
	});
	
/*
 * Approve Albums
 */
	$('#approve_album').live('click' ,function(event) {
		var landingPageUrl = $("#pageUrl").val();
		var albumID    = $(this).attr('data-id');
		var data = new FormData();
		data.append("albumId", albumID);
		bootbox.confirm("Are you sure you want to Approve This Album", function(result) {
            if(result){
                $.ajax({
                    url:"/cms/approvealbum",
                    type : "POST",
                    data : data,
                    processData : false,
                    contentType : false,
                    success : function(response) {
                    	bootbox.alert("Approve Status : "+response);
                    	window.location.href = landingPageUrl;
                    }
                });
            }
        });
	});
	
	
	$(".downloadSearchResult").on('click', function (event) {
	    event.preventDefault();
		var toDate = $("#todate").val();
		var fromDate = $("#fromdate").val();
		var partner = $("#cpName").val();
		var domain = "http://"+window.location.host
		window.open(domain+'/cms/downloadreviewalbum.csv');
	});
	
	
	$('#albumR').addClass('page-active');
	$('#albums').addClass('page-active');
});