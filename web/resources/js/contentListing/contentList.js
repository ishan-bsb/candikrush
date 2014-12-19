$(document).ready(function() {
//	loadCirclesComp();
//	loadLanguagesComp();
	loadSlider();
	loadAddKeywordAll();
	
	function loadAddKeywordAll() {
		var fields = ["keyword", "tag"];
		for(var i=0;i<fields.length;i++) {
			var field = fields[i];
			$('#add_'+field).tagsManager({
				"hiddenTagListName":"txt_add_"+field,
				"hiddenTagListId":"txt_add_"+field
			});
		}
	}
	/*
	 * Save Edited Attribute of All Contents.
	 */
	$('#save_attribute').click(function () {
		alert("Save Clicked");
		var contentIdList = "";
		var action = $("input:radio:checked").val();
		var attribute = $("#editAttribute").val();
		$('input[type="checkbox"]:checked').each(function(){
			var contentId = $(this).parent('td').parent('tr').children('td.id').text();
            contentIdList = contentIdList + "," + contentId;
        });
		alert("Content List : "+contentIdList);
		alert("Action : "+action);
		if(attribute == "keyword"){
			alert("Keyword : "+ $('#txt_add_keyword').val());
		}
		else if(attribute == "tag"){
			alert("Tag : "+ $('#txt_add_tag').val());
		}
		else if(attribute == "price"){
			alert("Price : "+ $('#txt_add_price').val());
		}
		
		$.ajax({
			type:"GET",
			url:"/cms/bulkeditcontent?contentIdList="+contentIdList,
			success:function (data) {
				location.reload();
	    }
	});
		
		
	});
	/*
	 * Select Attribute From The List to be Edited
	 */
	$("#editAttribute").change(function (event) {
		event.preventDefault();
		var attribute = $("#editAttribute").val();
		alert($("#editAttribute").val());
		
		if(attribute == "keyword"){
			$("#editKeyword").show();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editThumbnail").hide();
		}
		else if(attribute == "tag"){
			$("#editKeyword").hide();
			$("#editTag").show();
			$("#editPrice").hide();
			$("#editThumbnail").hide();
		}
		else if(attribute == "price"){
			$("#editKeyword").hide();
			$("#editTag").hide();
			$("#editPrice").show();
			$("#editThumbnail").hide();
		}
		else if(attribute == "thumbnail"){
			$("#editKeyword").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editThumbnail").show();
		}
		else{
			$("#editKeyword").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editThumbnail").hide();
		}
	});
	
	
	function loadSlider() {
	//	console.log(($("#slider-range") , $("#slider-range").length);
		if($("#slider-range") !== undefined && $("#slider-range").length > 0) {
			$("#slider-range").slider(
					{
						range : true,
						min : 0,
						max : 50,
						value : [0,50]
					}).on('slide', function() {
						$("#amount").val(
								"Rs. "+ $("#slider-range").slider('getValue').val()[0]+ " - Rs. "+ $("#slider-range").slider('getValue').val()[1]);
					}).click(function(){
						$("#amount").val(
								"Rs. "+ $("#slider-range").slider('getValue').val()[0]+ " - Rs. "+ $("#slider-range").slider('getValue').val()[1]);
					});
		}
	}
	
	/*
	 * bulk delete events
	 */
	$('.deleteTrack').click(function(){
        var thisID    = $(this).attr('id');
        var checked = 0;
        var total = 0;
        $('.deleteTrack').each(function(index, val) {
            if ($(this).attr('id') == thisID) {
                total++;
            }
        });
        $('.deleteTrack:checked').each(function(index, val) {
            if ($(this).attr('id') == thisID) {
                checked++;
            }
        });
        if (total == checked) {
        	$(".selectDeselectContents").prop("checked", true);
        	$(".selectDeselectContents").prop("indeterminate", false);
        } else if (checked == 0) {
        	$(".selectDeselectContents").prop("checked", false);
        	$(".selectDeselectContents").prop("indeterminate", false);
        } else {
        	$(".selectDeselectContents").prop("indeterminate", true);
        }
    }); 
	
	$("#selectDeselectAll").click(function(){
        $(".deleteTrack").prop("checked",$("#selectDeselectAll").prop("checked"))
        $('#deleteAll').prop("disabled", !this.checked);
    });
	
	var checkboxes = $(':checkbox:not(#selectDeselectAll)').click(function(event){
        $('#deleteAll').prop("disabled", checkboxes.filter(':checked').length == 0);
    });
	
	$(".deleteAllContent").on('click', function (event) {
		var contentIdList = "";
		$('input[type="checkbox"]:checked').each(function(){
			var contentId = $(this).parent('td').parent('tr').children('td.id').text();
            contentIdList = contentIdList + "," + contentId;
        });
		
		bootbox.confirm("Are you sure you want to delete All contents", function(result) {
			if(result){
				$.ajax({
					type:"POST",
					url:"/cms/deleteallcontent?contentIdList="+contentIdList,
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
	$(".deletecontent").on('click', function (event) {
        
		  var tr = $(this).closest('tr');
			 var contentId = tr.find('.id').text();
			  var finalData;
			  bootbox.confirm("Are you sure you want to delete content ID : " +  contentId + "?", function(result) {
				  if(result) {
					  $.ajax({
							type:"GET",
							url:"/cms/deletecontent?contentId="+contentId,
							success:function (data) {
								location.reload();
					    }
					});
				  }
			});
	});
	
//	$(".contentSize").on('click', function (event) {
//		
//		var size = $("#pic_contentSize").val();
//		alert("Reset Size Clicked : "+size);
//		$.ajax({
//			type:"GET",
//			url:"/cms/contentlisting?size="+size,
//			success:function (data) {
//				location.reload();
//			}
//		});
//	});
	
	$(".contentsBulkEdit").on('click', function (event) {
		event.preventDefault();
		alert("Bulk Edit Clicked : ");
		$('#bulkEditAttributes').modal().show();
	});
	
	
	$(".downloadSearchResult").on('click', function (event) {
		event.preventDefault();
		var searchParams="";
		if ($('#txt_search_criteria').val() != false) {
			var searchCrt = $("#txt_search_criteria").val();
			searchParams = searchParams +"s="+searchCrt;
		}
		if ($('#txt_contentid').val() != false) {
			var contentId = $("#txt_contentid").val();
			searchParams = searchParams +"&contentId="+contentId;
		}
		if ($('#txt_keyword').val() != false) {
			var keyword = $("#txt_keyword").val();
			searchParams = searchParams +"&keyword="+keyword;
		}
		if ($('#txt_title').val() != false) {
			var title = $("#txt_title").val();
			searchParams = searchParams +"&title="+title;
		}
		if ($('#txt_album').val() != false) {
			var album = $("#txt_album").val();
			searchParams = searchParams +"&album="+album;
		}
		if ($('#txt_publisher').val() != false) {
			var publisher = $("#txt_publisher").val();
			searchParams = searchParams +"&publisher="+publisher;
		}
		if ($('#pic_content_type').val() != false) {
			var contentType = $("#pic_content_type").val();
			searchParams = searchParams +"&contentType="+contentType;
		}
		if ($('#filetype').val() != false) {
			var fileType = $("#filetype").val();
			searchParams = searchParams +"&fileType="+fileType;
		}
		if ($('#pic_partner').val() != false) {
			var partner = $("#pic_partner").val();
			searchParams = searchParams +"&cpId="+partner;
		}
		if ($('#pic_language').val() != false) {
			var language = $("#pic_language").val();
			searchParams = searchParams +"&language="+language;
		}
		if ($('#txt_release_year').val() != false) {
			var releaseYear = $("#txt_release_year").val();
			searchParams = searchParams +"&publishedYear="+releaseYear;
		}
		if ($('#mooditem').val() != false) {
			var mood = $("#mooditem").val();
			searchParams = searchParams +"&mood="+mood;
		}
		if ($('#genre').val() != false) {
			var genre = $("#genre").val();
			searchParams = searchParams +"&genre="+genre;
		}
		if ($('#subgenre').val() != false) {
			var subGenre = $("#subgenre").val();
			searchParams = searchParams +"&subGenre="+subGenre;
		}
		if ($('#amount').val() != false) {
			var price = $("#amount").val();
			searchParams = searchParams +"&price="+price;
		}
		
		alert("SearchCriteria : "+searchParams);
//    	var PageURL = window.location.search.substring(1);
//		var pageParameter = PageURL.split('=');
//		alert("Url : "+pageParameter[1]);
//		if (pageParameter[0] == "mid"){
//			
			$.ajax({
				type:"GET",
				url:"/cms/downloadcontentsearch",
				contentType: "application/csv",
				success:function (data) {
			        $(".downloadSearchResult").attr({
						'download' : 'ContentSearchResult.csv',
						'href' : 'data:application/csv;charset=utf-8,'+ encodeURIComponent(data),
						'target' : '_blank'
					});
			    }
			});
//		}
    });
	
//	 $(".downloadSearchResult").on('click', function (event) {
//	        
//			  var finalData;
//			  $.ajax({
//					type:"GET",
//					url:"/cms/downloadcontentsearch",
//					contentType: "application/octet-stream",
//					success:function (data) {
//				        $(".downloadSearchResult").attr({
//							'download' : 'ContentSearchResult.csv',
//							'href' : 'data:application/csv;charset=utf-8,'+ encodeURIComponent(data),
//							'target' : '_blank'
//						});
//				    }
//				});
//	    });
	
	

		
	
});

