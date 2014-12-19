$(document).ready(function() {
	loadSlider();
	loadAddKeywordAll();
	loadSubGenreBinderAlbum();
	
	function loadAddKeywordAll() {
		var fields = ["keyword", "tag","singer","actor","composer","artist"];
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
		var contentIdList = "";
		var reqParamVal="";
		var isAction =true;
		var isAttribute = true;
		var isInput = true;
		var message ="";
		var dataAvailable = false;
		
		var action = $("input:radio:checked").val();
		var attribute = $("#editAttribute").val();
		$('input[type="checkbox"]:checked').each(function(){
			var contentId = $(this).parent('td').parent('tr').children('td.id').text();
            contentIdList = contentIdList + "," + contentId;
        });
//		alert("Content List : "+contentIdList);
//		alert("Action : "+action);
		if(attribute == "keyword" && $('#txt_add_keyword').val() !=""){
			reqParamVal="&keywords="+$('#txt_add_keyword').val();
			dataAvailable = true;
		}
		else if(attribute == "singer" && $('#txt_add_singer').val() != ""){
			reqParamVal="&singers="+$('#txt_add_singer').val();
			dataAvailable = true;
		}
		else if(attribute == "album" && $('#txt_add_album').val() != ""){
			reqParamVal="&album="+$('#txt_add_album').val();
			dataAvailable = true;
		}
		else if(attribute == "actor" && $('#txt_add_actor').val()!=""){
			reqParamVal="&actors="+$('#txt_add_actor').val();
			dataAvailable = true;
		}
		else if(attribute == "composer" && $('#txt_add_composer').val() !=""){
			reqParamVal="&composers="+$('#txt_add_composer').val();
			dataAvailable = true;
		}
		else if(attribute == "artist" && $('#txt_add_artist').val() !=""){
			reqParamVal="&artists="+$('#txt_add_artist').val();
			dataAvailable = true;
		}
		else if(attribute == "director" && $('#txt_add_director').val() !=""){
			reqParamVal="&musicDirector="+$('#txt_add_director').val();
			dataAvailable = true;
		}
		else if(attribute == "mood" && $("#editmooditem").val() !=""){
			reqParamVal="&mood="+$("#editmooditem").val();
			dataAvailable = true;
		}
		else if(attribute == "language" && $("#language").val() !=""){
			reqParamVal="&language="+$("#language").val();
			dataAvailable = true;
		}
		else if(attribute == "genre" && $('#pik_genre').val() !=""){
			reqParamVal="&genre="+$("#pik_genre").val();
			if($('#pik_subgenre').val() !="None")
				reqParamVal=reqParamVal+"&subgenre="+$("#pik_subgenre").val();
			dataAvailable = true;
		}
		else if(attribute == "subgenre" && $('#pik_subgenre').val() !=""){
			reqParamVal="&subgenre="+$("#pik_subgenre").val();
			dataAvailable = true;
		}
		else if(attribute == "tag" && $('#txt_add_tag').val() !=""){
			reqParamVal="&tags="+$('#txt_add_tag').val();
			dataAvailable = true;
		}
		else if(attribute == "price" && $('#txt_add_price').val()!=""){
			reqParamVal="&price="+$('#txt_add_price').val();
			dataAvailable = true;
		}
		else if(attribute == "publisher" && $('#txt_add_publisher').val() != ""){
			reqParamVal="&publisher="+$('#txt_add_publisher').val();
			dataAvailable = true;
		}
		else if(attribute == "releaseyear" && $('#txt_add_release_year').val() != ""){
			reqParamVal="&publishedYear="+$('#txt_add_release_year').val();
			dataAvailable = true;
		}
		
		if((action == undefined || action == "")) {
			isAction = false;
			message = "PLease select Any Operation";
		}
		if(dataAvailable == false){
			message = "PLease Give Input Data To Edit";
		}
		
		var data = new FormData();
//		data.append("categoryId", BulkEdit.category);
		data.append("fileData", fileData.files[0]);
		data.append("queryString", "contentIdList="+contentIdList+"&action="+action+reqParamVal);
		if (isAction == true){
			$.ajax({
//				url:"/cms/bulkeditcontent?contentIdList="+contentIdList+"&action="+action+reqParamVal,
				url:"/cms/bulkeditcontent",
				type : "POST",
				data : data,
				processData : false,
				contentType : false,
				success : function(response) {
					bootbox.alert(response);
				},
				error : function(jqXHR, textStatus, errorMessage) {
					console.log("Upload failed"+errorMessage);
				}
			});
		}
		else{
			bootbox.alert(message);
		}
		
	});
	
	$("#mooditem").change(function (event) {
		event.preventDefault();
		var attribute = $("#mooditem").val();
//		alert(attribute);
	});

	/*
	 * Select Attribute From The List to be Edited
	 */
	$("#editAttribute").change(function (event) {
		event.preventDefault();
		var attribute = $("#editAttribute").val();
		$('input:radio').removeAttr('checked');
		if(attribute == "keyword"){
			$("#editKeyword").show();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").removeAttr("disabled");
			$("input.deletecheck").removeAttr("disabled");
			$("input.replaceCheck").attr("disabled", true);
		}
		else if(attribute == "singer"){
			$("#editKeyword").hide();
			$("#editSinger").show();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").removeAttr("disabled");
			$("input.deletecheck").removeAttr("disabled");
			$("input.replaceCheck").attr("disabled", true);
		}
		else if(attribute == "album"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").show();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").attr("disabled", true);
			$("input.deletecheck").attr("disabled", true);
			$("input.replaceCheck").removeAttr("disabled");
		}
		else if(attribute == "actor"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").show();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").removeAttr("disabled");
			$("input.deletecheck").removeAttr("disabled");
			$("input.replaceCheck").removeAttr("disabled");
		}
		else if(attribute == "composer"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").show();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").removeAttr("disabled");
			$("input.deletecheck").removeAttr("disabled");
			$("input.replaceCheck").attr("disabled", true);
		}
		else if(attribute == "artist"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").show();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").removeAttr("disabled");
			$("input.deletecheck").removeAttr("disabled");
			$("input.replaceCheck").attr("disabled", true);
		}
		else if(attribute == "director"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").show();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").attr("disabled", true);
			$("input.deletecheck").attr("disabled", true);
			$("input.replaceCheck").removeAttr("disabled");
		}
		else if(attribute == "mood"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").show();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").attr("disabled", true);
			$("input.deletecheck").attr("disabled", true);
			$("input.replaceCheck").removeAttr("disabled");
		}
		else if(attribute == "language"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").show();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").attr("disabled", true);
			$("input.deletecheck").attr("disabled", true);
			$("input.replaceCheck").removeAttr("disabled");
		}
		else if(attribute == "tag"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").show();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").removeAttr("disabled");
			$("input.deletecheck").removeAttr("disabled");
			$("input.replaceCheck").attr("disabled", true);
		}
		else if(attribute == "price"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").show();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").attr("disabled", true);
			$("input.deletecheck").attr("disabled", true);
			$("input.replaceCheck").removeAttr("disabled");
		}
		else if(attribute == "publisher"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").show();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").attr("disabled", true);
			$("input.deletecheck").attr("disabled", true);
			$("input.replaceCheck").removeAttr("disabled");
		}
		else if(attribute == "releaseyear"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").show();
			
			$("input.addCheck").attr("disabled", true);
			$("input.deletecheck").attr("disabled", true);
			$("input.replaceCheck").removeAttr("disabled");
		}
		else if(attribute == "genre" || attribute == "subgenre"){
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").show();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").attr("disabled", true);
			$("input.deletecheck").attr("disabled", true);
			$("input.replaceCheck").removeAttr("disabled");
		}
		else{
			$("#editKeyword").hide();
			$("#editSinger").hide();
			$("#editActor").hide();
			$("#editComposer").hide();
			$("#editArtist").hide();
			$("#editDirector").hide();
			$("#editMood").hide();
			$("#editLanguage").hide();
			$("#editTag").hide();
			$("#editPrice").hide();
			$("#editGenreSubgenre").hide();
			$("#editAlbum").hide();
			$("#editPublisher").hide();
			$("#editReleaseYear").hide();
			
			$("input.addCheck").removeAttr("disabled");
			$("input.deletecheck").removeAttr("disabled");
			$("input.replaceCheck").removeAttr("disabled");
		}
	});
	
	/*
	 * POPup for bulk edit
	 */
	$(".contentsBulkEdit").on('click', function (event) {
		event.preventDefault();
//		alert("Bulk Edit Clicked : ");
		$('#bulkEditAttributes').modal().show();
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
        $(".deleteTrack").prop("checked",$("#selectDeselectAll").prop("checked"));
        
		if($('#txt_cpId').val() == "srch_bsb"){
//	        $('#deleteAll').prop("disabled", !this.checked);
	        $('#contentBulkEdit').prop("disabled", !this.checked);
	        $('#approve').prop("disabled", !this.checked);
	        $('#disapprove').prop("disabled", !this.checked);
		}
    })
	
	var checkboxes = $(':checkbox:not(#selectDeselectAll)').click(function(event){
		if($('#txt_cpId').val() == "srch_bsb"){
//	        $('#deleteAll').prop("disabled", checkboxes.filter(':checked').length == 0);
	        $('#contentBulkEdit').prop("disabled", checkboxes.filter(':checked').length == 0);
	        $('#approve').prop("disabled", checkboxes.filter(':checked').length == 0);
	        $('#disapprove').prop("disabled", checkboxes.filter(':checked').length == 0);
		}
    });
	
	/*
	 * Delete All Selected Contents
	 */
	$(".deleteAllContent").on('click', function (event) {
		event.preventDefault();
		var contentIdList = "";
		$('input[type="checkbox"]:checked').each(function(){
			var contentId = $(this).parent('td').parent('tr').children('td.id').text();
            contentIdList = contentIdList + "," + contentId;
        });

		bootbox.confirm("Are you sure you want to delete All Selected Contents : " + "?", function(result) {
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
	$(".deletecontent").on('click', function(event) {
		event.preventDefault();
		var tr = $(this).closest('tr');
		var contentId = tr.find('.id').text();
		bootbox.confirm("Are you sure you want to delete content ID : " +  contentId + "?", function(result) {
			if(result) {
				$.ajax({
					type : "GET",
					url : "/cms/deletecontent?contentId=" + contentId,
					success : function(data) {
						location.reload();
					}
				});
			}
		});
	});
	
	/*
	 * Approve Contents
	 */
	$('#approve').click(function (event) {
		event.preventDefault();
		var contentIdList = "";
		var isAllForReview =true;
		var action = $("input:radio:checked").val();
		var attribute = $("#editAttribute").val();
		$('input[type="checkbox"]:checked').each(function(){
			var contentId = $(this).parent('td').parent('tr').children('td.id').text();
            contentIdList = contentIdList + "," + contentId;
            var state = $(this).parent('td').parent('tr').children('td.contentState').text();
            if(state != "Wait To Review" && state != "" && contentId != "")
                isAllForReview = false;
        });
		
		var data = new FormData();
		data.append("fileData", fileData.files[0]);
		data.append("contentList", contentIdList);
		if(isAllForReview == true )
		{
			bootbox.confirm("Are you sure you want to Approve All contents", function(result) {
				if(result){
					$.ajax({
		//				url:"/cms/bulkeditcontent?contentIdList="+contentIdList+"&action="+action+reqParamVal,
						url:"/cms/approvecontent",
						type : "POST",
						data : data,
						processData : false,
						contentType : false,
						success : function(response) {
							bootbox.dialog({
								message: response,
								title: "Review Result : Approve",
								buttons: {
									success: {
										label: "Success!",
										className: "btn-success",
										callback: function() {
											location.reload();}
									}
							  	}
							});
						},
						error : function(jqXHR, textStatus, errorMessage) {
							console.log("Upload failed"+errorMessage);
						}
					});
				}
			});
		}
		else{
			bootbox.alert("Please select only, Contents in "+'"'+ "Wait To Review"+'"'+" State");
		}
		
		
	});
	
	/*
	 * Disapprove Contents
	 */
	$('#disapprove').click(function (event) {
		event.preventDefault();
		var contentIdList = "";
		var isAllForReview =true;
		var action = $("input:radio:checked").val();
		var attribute = $("#editAttribute").val();
		$('input[type="checkbox"]:checked').each(function(){
			var contentId = $(this).parent('td').parent('tr').children('td.id').text();
            contentIdList = contentIdList + "," + contentId;
        });
        
        $('input[type="checkbox"]:checked').each(function(){
            var state = $(this).parent('td').parent('tr').children('td.contentState').text();
            if(state != "Wait To Review")
                isAllForReview = false;
        });
        var data = new FormData();
        data.append("fileData", fileData.files[0]);
        data.append("contentList", contentIdList);
        if(isAllForReview == true )
        {
            bootbox.confirm("Are you sure you want to Disapprove All Selected contents", function(result) {
                if(result){
                    $.ajax({
        //                url:"/cms/bulkeditcontent?contentIdList="+contentIdList+"&action="+action+reqParamVal,
                        url:"/cms/disapprovecontent",
                        type : "POST",
                        data : data,
                        processData : false,
                        contentType : false,
                        success : function(response) {
                            bootbox.dialog({
                                message: response,
                                title: "Review Result : Disapprove",
                                buttons: {
                                    success: {
                                        label: "Success!",
                                        className: "btn-success",
                                        callback: function() {
                                            location.reload();}
                                    }
                                  }
                            });
                        },
                        error : function(jqXHR, textStatus, errorMessage) {
                            console.log("Upload failed"+errorMessage);
                        }
                    });
                }
            });
        }
        else{
            bootbox.alert("Please select only, Contents in "+'"'+ "Wait To Review"+'"'+" State");
        }
        
    });
	
	/*
	 * Download Contents
	 */
//	$(".downloadSearchResult").on('click', function (event) {
//		event.preventDefault();
//		$.ajax({
//			type:"GET",
//			url:"/cms/downloadcontentsearch",
//			contentType: "application/csv",
//			success:function (data) {
//		        $(".downloadSearchResult").attr({
//					'download' : 'ContentSearchResult.csv',
//					'href' : 'data:application/csv;charset=utf-8,'+ encodeURIComponent(data),
//					'target' : '_blank'
//				});
//		    }
//		});
//	});
	
	$(".downloadSearchResult").on('click', function (event) {
        event.preventDefault();
    	var toDate = $("#todate").val();
    	var fromDate = $("#fromdate").val();
		var partner = $("#cpName").val();
		var domain = "http://"+window.location.host
		window.open(domain+'/cms/downloadcontentsearch.csv');
//		  $.ajax({
//				type:"GET",
//				url:"/cms/downloadingestionreport?partnerselected="+partner+"&from="+fromDate+"&to="+toDate,
//				contentType: "application/csv",
//				success:function (data) {
//			        $(".dwnLink").attr({
//						'download' : 'IngesationReport.csv',
//						'href' : 'data:application/csv;charset=utf-8,'+ encodeURIComponent(data),
//						'target' : '_blank'
//					});
//			    }
//			});
    });
	
	
	function loadSubGenreBinderAlbum() {
		if($('#pik_genre') !== undefined && $('#pik_genre').length > 0) {
			$('#pik_genre').bind('change', function(){
				var mapping = {
					'Dance' : ["None","Accoustic Guitar","Baisakhi","Ballad","Basant panchami","Bhai Dooj","Bhangra","Birthday","Carols","Chhath Pooja","Children's Day","Christmas","Country","Diwali","Drums","Durga Puja","Dussehra","Easter","Eid","Father's Day","Flute","Ganesh Chaturthi","Ganesha","Good Friday","Guitar","Guru Purnima","Hanuman Jayanti","Hip Hop","Holi","Indian Classical","Item","Janmasthami","Jazz","Karva Chauth","Krishna","Lakshmi","Lounge","Mahavir Jayanti","Medley","Mother's Day","Naag Panchami","Navratri","New Year","New Year - Ugaadi ","Onam","Party","Piano","Pongala","Pop","Radha ","Rakhi","Raksha Bandhan","Ramanavami","Ramzan","Rath Yatra","Rock","Sai Jayanti","Shiva","Shivratri","Valentine","Voilin","Wedding","Western Classical","Women's Day"],	
					'Romance': ["None","Accoustic Guitar","Ballad","Bhangra","Christmas","Country","Drums","Flute","Guitar","HipHop","Holi","Indian Classical","Item","Jazz","Karva Chauth","Lounge","Medley","New Year","Party","Piano","Pop","Rock","Sad","Unplugged","Valentines","Voilin","Weddings","Western Classical"],
					'Fusion' : ["None","Aarti","Accoustic Guitar","Art of Living","Azaan","Baisakhi","Ballad","Bhangra","Birthday","Carols","Chants","Christmas","Country","Drums","Flute","Guitar","Gurbani","Hip Hop","Holi ","Hymns","Indian Classical","Inspirational","Item","Jazz","Lounge","Mantras","Meditation","Medley","Navratri","New Year","Nursery Rhymes","Party","Piano","Pop","Raag","Rock","Sad","Shabad","Stuti","Unplugged","Valentines","Voilin","Weddings","Western Classical"],
					'Remix': ["None","Accoustic Guitar","Baisakhi","Ballad","Bhangra","Birthday","Carols","Children's Day","Christmas","Country","Drums","Father's Day","Flute","Guitar","Gurbani","Hip Hop","Holi ","Indian Classical","Inspirational","Item","Jazz","Lounge","Meditation","Medley","Mother's Day","Navratri","New Year","Nursery Rhymes","Party","Piano","Pop","Raag","Rock","Sad","Stuti","Unplugged","Valentines","Voilin","Weddings","Western Classical","Women's Day"],
					'Classical': ["None","Aarti","Accoustic Guitar","Art of Living","Ballad","Bhai Dooj","Carols","Chants","Chhath Pooja","Country","Drums","Durga Puja","Dussehra","Easter","Eid Ul Fitr","Father's Day","Flute","Gandhi Jayanti","Ganesh Chaturthi","Ganesha","Good Friday","Guitar","Gurbani","Guru Gobind Jayanti","Guru Nanak Jayanti","Guru Purnima","Hanuman","Hanuman Jayanti","Independence Day","Indian Classical","Inspirational","Janmasthami","Jazz","Karva Chauth","Krishna","Lakshmi","Lord Ram","Lounge","Mahavir Jayanti","Makara Sankranti","Mantras","Meditation","Medley","Mother's Day","Naag Panchami","Navratri","New Year - Ugaadi","Onam","Piano","Pongala","Pop","Raag","Radha","Raksha Bandhan","Ramanavami","Ramzan","Rath Yatra","Republic Day","Rock","Sad","Sai Baba","Sai Jayanti","Shabad","Shiva","Shivratri","Sita","Stuti","Unplugged","Valentines","Voilin","Western Classical","Women's Day","basant panchami"],
					'Occasions': ["None","Baisakhi","Basant panchami","Bhai Dooj","Birthday","Carols","Chhath Pooja","Children's Day","Christmas","Diwali","Durga Puja","Dussehra","Easter","Eid","Eid Ul Fitr","Father's Day","Gandhi Jayanti","Ganesh Chaturthi","Ganesha","Good Friday","Gurbani","Guru Gobind Jayanti","Guru Nanak Jayanti","Guru Purnima","Hanuman","Hanuman Jayanti","Holi","Independence Day","Janmasthami","Karva Chauth","Krishna","Lakshmi","Lord Ram","Mahavir Jayanti","Makara Sankranti","Mother's Day","Naag Panchami","Navratri","New Year","New Year - Ugaadi","Onam","Party","Pongala","Radha","Rakhi","Raksha Bandhan","Ramanavami","Ramzan","Rath Yatra","Republic Day","Sai Baba","Sai Jayanti","Shabad","Shiva","Shivratri","Sita","Stuti","Valentines","Weddings","Women's Day"],
					'Ghazals' : ["None","Accoustic Guitar","Drums","Flute","Guitar","Indian Classical","Inspirational","Lounge","Medley","Piano","Pop","Sad","Unplugged","Voilin"],
					'Others': ["None","Aarti","Accoustic Guitar","Art of Living","Azaan","Ballad","Bhangra","Birthday","Carols","Chants","Children's Day","Christmas","Country","Drums","Easter","Eid","Eid Ul Fitr","Father's Day","Flute","Good Friday","Guitar","Hip Hop","Hymns","Independence Day","Indian Classical","Inspirational","Item","Jazz","Lounge","Mantras","Meditation","Medley","Mother's Day","New Year","Nursery Rhymes","Party","Piano","Pop","Raag","Republic Day","Rock","Sad","Unplugged","Valentines","Voilin","Weddings","Western Classical","Women's Day"],
					'International' : ["Aarti","Accoustic Guitar","Alternative","Art of Living","Azaan","Ballad","Bhangra","Birthday","Blues","Carols","Chants","Children's Day","Christmas","Country","Drums","Easter","Eid","Eid Ul Fitr","Father's Day","Flute","Good Friday","Guitar","Hip Hop","Hymns","Independence Day","Indian Classical","Inspirational","Item","Jazz","Lounge","Mantras","Meditation","Medley","Metal","Mother's Day","New Year","Nursery Rhymes","Party","Piano","Pop","Punk Rock","RnB","Raag","Rap","Reggae","Republic Day","Rock","Sad","Unplugged","Valentines","Voilin","Weddings","Western Classical","Women's Day"],
					'Patriotic': ["None","Accoustic Guitar","Baisakhi","Drums","Flute","Gandhi Jayanti ","Guitar","Guru Gobind Jayanti","Guru Nanak Jayanti","Independence Day","Indian Classical","Inspirational","Piano","Republic Day","Sad","Voilin","Western Classical"],
					'Childhood' : ["None","Accoustic Guitar","Baisakhi","Ballad","Bhai Dooj","Bhangra","Carols","Children's Day","Christmas","Country","Diwali","Drums","Easter","Flute","Good Friday","Guitar","Hip Hop","Holi","Indian Classical","Inspirational","Jazz","Lounge","Medley","New Year","Nursery Rhymes","Party","Piano","Pop","Rakhi","Raksha Bandhan","Rock","Sad","Stuti","Unplugged","Voilin","Western Classical"],
					'Qawwalis' : ["None","Ballad","Bhangra","Hip Hop ","Item","Jazz","Lounge","Medley","Party","Pop","Rock ","Sad","Unplugged","Weddings"],
					'Spiritual' : ["None","Aarti","Accoustic Guitar","Art of Living","Azaan","Baisakhi","Basant panchami","Bhai Dooj","Carols","Chants","Chhath Pooja","Christmas","Diwali","Drums","Durga Puja","Dussehra","Easter","Eid","Eid Ul Fitr","Flute","Ganesh Chaturthi","Ganesha","Good Friday","Guitar","Gurbani","Guru Gobind Jayanti","Guru Nanak Jayanti","Guru Purnima","Hanuman","Hanuman Jayanti","Hymns","Indian Classical","Inspirational","Janmasthami","Karva Chauth","Krishna","Lakshmi","Lord Ram","Mahavir Jayanti","Makara Sankranti","Mantras","Meditation","Medley ","Naag Panchami","Navratri","New Year - Ugaadi","Onam","Piano","Pongala","Raag","Radha","Raksha Bandhan","Ramanavami","Ramzan","Rath Yatra","Sad","Sai Baba","Sai Jayanti","Shabad","Shiva","Shivratri","Sita","Stuti","Voilin","Western Classical"],
					'Sufi' : ["None","Accoustic Guitar","Azaan","Ballad","Chants ","Country","Drums","Flute","Guitar","Hip Hop","Indian Classical ","Inspirational","Jazz","Lounge","Meditation","Party","Piano","Pop","Raag","Rock","Sad","Unplugged","Valentines ","Voilin","Weddings"],
					'Instrumental': ["None","Aarti","Accoustic Guitar","Art of Living","Azaan","Baisakhi","Ballad","Basant panchami","Bhai Dooj","Bhangra","Birthday","Carols","Chants","Chhath Pooja","Children's Day","Christmas","Country","Diwali","Drums","Durga Puja","Dussehra","Easter","Eid","Eid Ul Fitr","Father's Day","Flute","Gandhi Jayanti","Ganesh Chaturthi","Ganesha","Good Friday","Guitar","Gurbani","Guru Gobind Jayanti","Guru Nanak Jayanti","Guru Purnima","Hanuman","Hanuman Jayanti","Hip Hop","Holi","Hymns","Independence Day","Indian Classical","Inspirational","Item","Janmasthami","Jazz","Karva Chauth","Krishna","Lakshmi","Lord Ram","Lounge","Mahavir Jayanti","Makara Sankranti","Mantras","Meditation","Medley","Mother's Day","Naag Panchami","Navratri","New Year","New Year - Ugaadi","Nursery Rhymes","Onam","Party","Piano","Pongala","Pop","Raag","Radha","Rakhi","Raksha Bandhan","Ramanavami","Ramzan","Rath Yatra","Republic Day","Rock","Sad","Sai Baba","Sai Jayanti","Shabad","Shiva","Shivratri","Sita","Stuti","Unplugged","Valentines","Voilin","Weddings","Western Classical","Women's Day"]
				};
				$('#pik_subgenre option').remove();
				
				//data-category
				var subGenreArr = mapping[$(this).val()];
				if(subGenreArr != undefined || subGenreArr != null) {
					$.each(subGenreArr, function (i, item) {
					    $('#pik_subgenre').append($('<option>', { 
					        value: item,
					        text : item 
					    }));
					});
				}
				if($('#pik_subgenre')[0].getAttribute('data-category') == 'search') {
					$("#pik_subgenre").prepend("<option value=''>All</option>")
				}
			});
		}
	}
});
