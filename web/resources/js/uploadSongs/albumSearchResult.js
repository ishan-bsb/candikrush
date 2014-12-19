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
 * bulk Select events
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

	
	
/*
 * bulk delete events
 */
	$('.deleteAlbum').click(function(){
        var thisID    = $(this).attr('id');
        var checked = 0;
        var total = 0;
        $('.deleteAlbum').each(function(index, val) {
            if ($(this).attr('id') == thisID) {
                total++;
            }
        });
        $('.deleteAlbum:checked').each(function(index, val) {
            if ($(this).attr('id') == thisID) {
                checked++;
            }
        });
        if (total == checked) {
        	$(".selectDeselectAlbums").prop("checked", true);
        	$(".selectDeselectAlbums").prop("indeterminate", false);
        } else if (checked == 0) {
        	$(".selectDeselectAlbums").prop("checked", false);
        	$(".selectDeselectAlbums").prop("indeterminate", false);
        } else {
        	$(".selectDeselectAlbums").prop("indeterminate", true);
        }
    });
	
	$("#selectDeselectAll").click(function(){
        $(".deleteAlbum").prop("checked",$("#selectDeselectAll").prop("checked"))
        $('#deleteAll').prop("disabled", !this.checked);
    })
	
	var checkboxes = $(':checkbox:not(#selectDeselectAll)').click(function(event){
        $('#deleteAll').prop("disabled", checkboxes.filter(':checked').length == 0);
    });
	
	$(".deleteAllAlbum").on('click', function (event) {
		var albumIdList = "";
		$('input[type="checkbox"]:checked').each(function(){
			var albumId = $(this).parent('td').parent('tr').children('td.idToDelete').text();
			albumIdList = albumIdList + "," + albumId;
        });
		
		bootbox.confirm("Are you sure you want to delete All contents", function(result) {
			if(result){
				$.ajax({
					type:"POST",
					url:"/cms/deleteallalbum?albumIdList="+albumIdList,
					success:function (data) {
						location.reload();
				    }
				});
			}
		});
	});
	
	/*
	 * single delete
	 */
	$(".delete").on('click', function (event) {

		 var tr = $(this).closest('tr');
		 var albumId = tr.find('.id').text();
		  bootbox.confirm("Are you sure you want to delete Album ID : " +  albumId + "?", function(result) {
			  if(result) {
				  var finalData;
				  $.ajax({
						type:"GET",
						url:"/cms/deletealbum?albumId="+albumId,
						success:function (data) {
							location.reload();
					    }
					});
			  }
			  
		  });
    });
	
/*
 * Clear cache
 */
	$(".clearcache").on('click', function (event) {

		 var tr = $(this).closest('tr');
		 var albumId = tr.find('.idToDelete').text();
		  bootbox.confirm("Are you sure you want to clear cache of Album ID : " +  albumId + "?", function(result) {
			  if(result) {
				  var finalData;
				  $.ajax({
						type:"GET",
						url:"/cms/clearcache?contentId=" + albumId+"&type=album",
						success:function (data) {
							bootbox.alert("Cache Clear of ID "+albumId+" : "+data);
					    }
					});
			  	}
		  });
    });
	
/*	function panelControl(){
		if(!displayPanel){
			displayPanel = true;
	        $("#innerVisible").fadeOut();
	    }
	    else{
	    	displayPanel = false;
	        $("#innerVisible").fadeIn();
	    }
	}
	
	var displayPanel = false;
	$('#panelButton').click (panelControl);*/
	
});