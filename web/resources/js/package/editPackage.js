$(document).ready(function() {
	loadDatePickers();
	loadTags();
	loadSlider();
	contentSelectionBinding();
	
	var srch_content_type = "";
	var srch_query = "";
	var srch_category = "";
	var srch_content_id = "";
	var srch_language = "";
	var srch_keyword = "";
	var srch_title = "";
	var srch_album = "";
	var srch_publisher = "";
	var srch_language = "";
	var srch_release_year = "";
	var srch_mood = "";
	var srch_genre = "";
	var srch_sub_genre = "";
	var srch_price =  new Array();
	var current_page = 1;
	var srch_content_partner = "";
	var reorderTriggerCount = "0";
	var srcIndex = "";
	var srcContentId = "";
	
	$('.search_parameter').change(function() {
		var id = $(this).attr('id');
		var name = $(this).attr('name');
		var val = $(this).val();
		if(id == 'pic_datatype') {
			srch_content_type = val;
		} else if (id == 'txt_search_criteria') {
			srch_query = val;
		} else if (id == 'txt_contentid') {
			srch_content_id = val;
		} else if (name == 'txt_keyword') {
			srch_keyword = val;
		} else if (id == 'txt_title') {
			srch_title = val;
		} else if (id == 'txt_album') {
			srch_album = val;
		} else if (id == 'txt_publisher') {
			srch_publisher = val;
		} else if (id == 'pic_language') {
			srch_language = val;
		} else if (id == 'txt_release_year') {
			srch_release_year = val;
		} else if (id == 'mooditem') {
			srch_mood = val;
		} else if (id == 'genre') {
			srch_genre = val;
		} else if (id == 'subgenre') {
			srch_sub_genre = val;
		} else if (id == 'pic_partner') {
			srch_content_partner = val;
		}
	});
	
	$('.cmspag').live('click' ,function() {
		event.preventDefault();
		current_page = $(this)[0].getAttribute('data-pageno');
		populateSearchParams();
		populateSearchResult();
	});
	
	function populateSearchResult() {
		event.preventDefault();
		var contentStatus = $("#contentStatus").val();
		var statusSearchCheck = true;
		var validationMsg = "";
		if(contentStatus != "PUBLISH_PUBLISHED"){
			statusSearchCheck = false;
			validationMsg = "You Have selected Non-Published Status in search. Please change";
		}
		var page = 0;
		if(current_page !== undefined) {
			page = current_page;
		}
		if(statusSearchCheck == true){
			var options = {
					url:      '/cms/tracks/search?page='+page,       // override for form's 'action' attribute 
					type:      'GET',
					target: '#searchTracksForPackage'// post-submit callback 
			};
			$('#search-tracks').ajaxSubmit(options);
		}
		else{
			bootbox.alert(validationMsg);
		}
	}
	
	function populateSearchParams() {
		$('#pic_partner').val(srch_content_partner);
		$('#txt_search_criteria').val(srch_query);
		$('#pic_datatype').val(srch_content_type);
		$('#txt_contentid').val(srch_content_id);
		$('#txt_keyword').val(srch_keyword);
		$('#txt_title').val(srch_title);
		$('#txt_album').val(srch_album);
		$('#txt_publisher').val(srch_publisher);
		$('#pic_language').val(srch_language);
		$('#txt_release_year').val(srch_release_year);
		$('#mooditem').val(srch_mood);
		$('#genre').val(srch_genre);
		$('#subgenre').val(srch_sub_genre);
		$('#search_language').val(srch_language);
		$("#slider-range").slider('setValue',srch_price);
	}
	
	function loadSlider() {
		if($("#slider-range") !== undefined && $("#slider-range").length > 0) {
			$("#slider-range").slider(
					{
						range : true,
						min : 0,
						max : 200,
						value : [0,200]
					}).on('slide', function() {
						$("#amount").val(
								"Rs. "+ $("#slider-range").slider('getValue').val()[0]+ " - Rs. "+ $("#slider-range").slider('getValue').val()[1]);
						srch_price[0] = $("#slider-range").slider('getValue').val()[0];
						srch_price[1] = $("#slider-range").slider('getValue').val()[1];
					});
		}
	}
	
	function loadTags() {
		var keywordsForTags = "";
		if($('#orig_pkg_tags') !== undefined && $('#orig_pkg_tags').val() != undefined ) {
			keywordsForTags = $('#orig_pkg_tags').val().split(',');
		}
		$('#package_edit_tags').tagsManager({
			"prefilled": keywordsForTags,
			"hiddenTagListName":"txt_pkg_tags",
			"hiddenTagListId":"txt_pkg_tags"
		});
	}
	
	$('#search-tracks').ajaxForm();
	$('#search-tracks').submit(function() {
		event.preventDefault();
		var contentStatus = $("#contentStatus").val();
		var statusSearchCheck = true;
		var validationMsg = "";
		if(contentStatus != "PUBLISH_PUBLISHED"){
			statusSearchCheck = false;
			validationMsg = "You Have selected Non-Published Status in search. Please change";
		}
		var page = 0;

		if(statusSearchCheck == true){
			var options = {
					url:      '/cms/tracks/search?page='+page,       // override for form's 'action' attribute 
					type:      'GET',
					target: '#searchTracksForPackage',
					success: panelControl()
			};
			$(this).ajaxSubmit(options);
		}
		else{
			bootbox.alert(validationMsg);
		}
		
    });

// Package Auto-Save request

	setInterval(function editPreserveAddedItems(){

		var reqParamVal="";
		var modType = $("#modtype").val();
		var isAutosaved = $("#checkAutoSave").val();
		var packageId = $("#txt_packageId").val();
		var version = $("#txt_version").val();
		var title = $("#txt_pkg_title").val();
		var keywords = $("#txt_pkg_keyword").val();
		var tag = $("#txt_pkg_tags").val();
		var validTill = $("#validUpto").val();
		var validFrom = $("#validfrom").val();
		var category = $("#txt_category").val();
		var contentIds = $("#pkg_contentIds").val();
		var description = $("#txt_desc").val();
		var packageType = $("#txt_package_type").val();
		var thumbnailExisting = $("#pkg_thumbnail").val();
		
		var contentLanguages ="";
		$("input[name='contentLang']:checked").each( function () {
			contentLanguages = contentLanguages+","+$(this).val();
		});
		var varnacTitle = "";
		$("input[name='pkg_ltitles']:checked").each( function () {
			var vLang = $(this).val();
			var title = $("#pkg_localizedTitle_"+vLang).val();
			if(title != undefined && title != ""){
				varnacTitle = varnacTitle+"#"+vLang+"@"+title;
			}else{
				title = $("input[name=pkg_localizedTitle_"+vLang+"]").val();
				varnacTitle = varnacTitle+"#"+vLang+"@"+title;
			}
		});
		
		if(packageId !=""){
			reqParamVal="packageId="+packageId;
		}
		if(version !=""){
			reqParamVal=reqParamVal+"&version="+version;
		}
		if(title !=""){
			reqParamVal=reqParamVal+"&title="+title;
		}
		if(keywords !=""){
			reqParamVal=reqParamVal+"&keywords="+keywords;
		}
		if(tag !=""){
			reqParamVal=reqParamVal+"&tag="+tag;
		}
		if(validTill !=""){
			reqParamVal=reqParamVal+"&validTill="+validTill;
		}
		if(validFrom !=""){
			reqParamVal=reqParamVal+"&validFrom="+validFrom;
		}
		if(category !=""){
			reqParamVal=reqParamVal+"&category="+category;
		}
		if(contentIds !=""){
			reqParamVal=reqParamVal+"&contentIds="+contentIds;
		}
		if(description !=""){
			reqParamVal=reqParamVal+"&description="+description;
		}
		if(packageType !=""){
			reqParamVal=reqParamVal+"&packageType="+packageType;
		}
		if(contentLanguages !=""){
			reqParamVal=reqParamVal+"&contentLanguages="+contentLanguages;
		}
		if(varnacTitle !=""){
			reqParamVal=reqParamVal+"&varnacTitle="+varnacTitle;
		}
		
		var resetModType = modType;
		if(modType === 'create' || modType === 'dup'){
			resetModType = "edit";
		}
		
		var action = "save";
		if((isAutosaved != "AutoSaved") && (modType === 'create' || modType === 'dup')) {
			action = "create";
		}
		var data = new FormData();
		data.append("queryString", reqParamVal);
		data.append("action", action);
		data.append("thumbnailUrl", thumbnail.files[0]);
		data.append("thumbnailExisting", thumbnailExisting);
		
		$.ajax({
			url:"/cms/package/auto-save",
			type : "POST",
			data : data,
			processData : false,
			contentType : false,
			success : function(response) {
				if(response != ""){
					var obj = jQuery.parseJSON(response);
					$('#txt_version').val(obj.version);
					$('#modtype').val(resetModType);
					$('#checkAutoSave').val("AutoSaved");
				}
			},
			error : function(jqXHR, textStatus, errorMessage) {
				console.log("Save failed"+errorMessage);
			}
		});
		
	}, 500000);
	
	function loadDatePickers() {
		var components = ["validfrom","validupto"];
		for(var i=0;i<components.length;i++) {
			$('#pkg_'+components[i]).datetimepicker({ 
				format : 'dd M yyyy hh:ii',
				 autoclose: true,
				 todayBtn: true,
				 autoSize: false,
				onRender: function(date) {
							var nowTemp = new Date();
							var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
							return date.valueOf();
						  }
			});
		}
	}
	
	function updateTdPositions() {
		var allPositionTds = $(".tdposition");
		$.each(allPositionTds, function (i, item) {
			var trId = $(item).closest('tr').attr('id');
			var index = $(item).closest('tr').attr('id').split('_')[1];
			$(item).html(index);
		});
	}
	
	//selecting tracks to be saved
	$('.addedTracks').live('change',function() {
		var contentIdsList = $("#pkg_contentIds").val().trim();
		var contentId = $(this).val();
		var contentIdSrch = ',add_' + contentId + ',';
		if(contentId != "") {
			if($(this).attr("checked")) {
				var contentIdSrchRem = ',rem_' + contentId + ',';
	            if(contentIdsList.indexOf(contentIdSrch) === -1 && contentIdsList.indexOf(contentIdSrchRem) === -1) {
	            	contentIdsList += ('add_'+contentId + ',');
	            } else if(contentIdsList.indexOf(contentIdSrchRem) !== -1) {
	            	contentIdsList =  contentIdsList.replace(contentIdSrchRem, ",add_" + contentId + ",");
	            }
	            $("#pkg_contentIds").val(contentIdsList);
	        } 
			else {
	        	if(contentIdsList.indexOf(contentIdSrch) !== -1) {
	        		contentIdsList = contentIdsList.replace(contentIdSrch,",rem_" + contentId + "," );
//	        		var startIdx = contentIdsList.indexOf(contentIdSrch);
//	        		contentIdsList = contentIdsList.substring(0,startIdx) + contentIdsList.substring(startIdx+contentIdSrch.length-1,contentIdsList.length);
	        		$("#pkg_contentIds").val(contentIdsList);
	        	}
	        }
		}
	});
	
	//adding the track to package
	$('.searchedTracks').live('click',function(event) {
		event.preventDefault();
		var contentIdsList = $("#pkg_contentIds").val().trim();
		var size = 0;
		if(contentIdsList !== "") {
			size = contentIdsList.split(',').length+1-2;
		}	
		var contentId = $(this)[0].getAttribute("data-id");
		var contentIdSrch = ',add_' + contentId + ',';
		if(contentId != "") {
			if(contentIdsList.indexOf(contentIdSrch) === -1) {
				contentIdsList += ("add_" + contentId + ',');
				$("#pkg_contentIds").val(contentIdsList);
				var title = $(this)[0].getAttribute('data-title');
				var imgSrc = $(this)[0].getAttribute('data-src');
				var type = $(this)[0].getAttribute('data-ctype');
				var icon = '<a href="/cms/albumdetails?albumid=' + contentId + '" target="_blank"><i class="glyphicon glyphicon-folder-close"></i></a>';
				var previewComp = '';
				var countHtml='';
				if(type === 'content') {
					var prevUrl = $(this)[0].getAttribute("data-preview");
					previewComp = '<audio controls><source src="' + prevUrl + '" type="audio/mpeg"></source>Not supported</audio>';
					icon='<a href="/cms/showcontent?contId=' + contentId + '" target="_blank"><i class="glyphicon glyphicon-music"></i></a>';
				} else {
					var itemsCount = $(this)[0].getAttribute('data-count');
					countHtml = ' ('+itemsCount+' tracks)';
				}
				if(type == 'playlist') {
					icon = '<a href="/cms/albumdetails?albumid=' + contentId + '" target="_blank"><i class="glyphicon glyphicon-list-alt"></i></a>';
				}
				if(type == 'compilation') {
					icon = '<a href="/cms/albumdetails?albumid=' + contentId + '" target="_blank"><i class="glyphicon glyphicon-briefcase"></i></a>';
				}
				
				$('#table-body').append('<tr id="addedtracks_'+ size + '">'+
						'<td style="word-break: break-word;" class="tdposition">' + size + '</td>'+
						'<td style="word-break: break-word;"><input type="checkbox" class="addedTracks" id="contentIdsList" name="contentIdsList" value="'+ contentId +'" checked data-ctype="'+ type + '"/></td>'+
						'<td style="word-break: break-word;"><img src="'+ imgSrc +'" />'+ previewComp +'</td>' +
						'<td style="word-break: break-word;">'+ icon + ' ' + title + countHtml + '</td>'+
						'<td style="word-break: break-word;"><input type="checkbox" class="reorderContentSet" id="reorderSet" name="reorderSet" value="'+ contentId +'" unchecked/></td>'+
						'<td style="word-break: break-word;"><input type="radio" class="reorderContent" id="reorder" name="reorder" value="'+ contentId +'" unchecked/></td>'+
						'</tr>');
				$('#contentCount').val(parseInt($('#contentCount').val())+1);
				updateTdPositions();
				contentSelectionBinding();
			}
		}
	});
	
	//moving the track up
	$('.moveup').live('click', function(event) {
		event.preventDefault();
		var trId = $(this).closest('tr').attr('id');
		var index = $(this).closest('tr').attr('id').split('_')[1];
		var nxtIndex = parseInt(index, 10) - 1;
		if(nxtIndex > 0) {
			var id = $(this)[0].getAttribute("data-id");
			var srchTxt = '_' + id + ',';
			var contentIdsList = $("#pkg_contentIds").val().trim();
			if(contentIdsList.indexOf(srchTxt) !== -1) {
				var lengthSrchTxt = srchTxt.length;
				var wholeTxt = contentIdsList.substring(contentIdsList.indexOf(srchTxt)-3,contentIdsList.indexOf(srchTxt)+lengthSrchTxt-1);
				var idsArr = contentIdsList.split(',');
				idsArr.splice(index,1);
				idsArr.splice(index-1,0,wholeTxt);
				var contentIdsListNew = idsArr.join();
				$("#pkg_contentIds").val(contentIdsListNew);
				var newTrId = 'addedtracks_' + nxtIndex;
				var upperTrHtml = $('#' + newTrId).html();
				var lowerTrHtml = $('#' + trId).html();
				$('#' + trId).html(upperTrHtml);
				$('#' + newTrId).html(lowerTrHtml);
				updateTdPositions();
			}
		}
	});
	
	//moving the track down
	$('.movedown').live('click', function(event) {
		event.preventDefault();
		var contentIdsList = $("#pkg_contentIds").val().trim();
		var size = 0;
		if(contentIdsList !== "") {
			size = contentIdsList.split(',').length-2;
		}
		var trId = $(this).closest('tr').attr('id');
		var index = $(this).closest('tr').attr('id').split('_')[1];
		var nxtIndex = parseInt(index, 10)+1;
		if(nxtIndex <= size) {
			var id = $(this)[0].getAttribute("data-id");
			var srchTxt = '_' + id + ',';
			if(contentIdsList.indexOf(srchTxt) !== -1) {
				var lengthSrchTxt = srchTxt.length;
				var wholeTxt = contentIdsList.substring(contentIdsList.indexOf(srchTxt)-3,contentIdsList.indexOf(srchTxt)+lengthSrchTxt-1);
				var idsArr = contentIdsList.split(',');
				idsArr.splice(index,1);
				idsArr.splice(nxtIndex,0,wholeTxt);
				var contentIdsListNew = idsArr.join();
				$("#pkg_contentIds").val(contentIdsListNew);
				var newTrId = 'addedtracks_' + nxtIndex;
				var upperTrHtml = $('#' + trId).html();
				var lowerTrHtml = $('#' + newTrId).html();
				$('#' + trId).html(lowerTrHtml);
				$('#' + newTrId).html(upperTrHtml);
				updateTdPositions();
			}
		}
	});
	
	//reverse the track list
	$('#reverseorder').live('click', function() {
		event.preventDefault();
		var contentIdsList = $("#pkg_contentIds").val().trim();
		var size = 0;
		if(contentIdsList !== "") {
			size = contentIdsList.split(',').length;
		}
		var htmlArr = new Array();
		htmlArr[0]="";
		htmlArr[size-1]="";
		for(var i=1;i<size-1;i++) {
			htmlArr[i]=$('#addedtracks_'+i).html();
		}
		var j=1;
		for (var i=size-2;i>=1;i--) {
			$('#addedtracks_'+i).html(htmlArr[j]);
			j++;
		}
		var idsArr = contentIdsList.split(',');
		idsArr.reverse();
		var contentIdsListNew = idsArr.join();
		$("#pkg_contentIds").val(contentIdsListNew);
		contentSelectionBinding();
		updateTdPositions();
	});
	
	$('.reorderContent').live('click', function(event) {
		event.preventDefault();
		var contentLstArr = [];
		var contentLstIndexArr = [];
		$(".reorderContentSet:checked").each(function() {
			var tmpIndex = $(this).closest('tr').attr('id').split('_')[1]
			contentLstArr.push("add_"+$(this).val()+"_"+tmpIndex);
			contentLstIndexArr.push(tmpIndex);
	    });
		var trId = $(this).closest('tr').attr('id');
		var destTrIdIndx = trId.split("_")[1];
//			var index = $(this).closest('tr').attr('id').split('_')[1];
		var id = $(this).val();
		var srchTxt = '_' + id + ',';
		var contentIdsList = $("#pkg_contentIds").val().trim();
		if((contentIdsList.indexOf(srchTxt) !== -1) && (contentLstIndexArr.indexOf(destTrIdIndx) == -1)) {
			var idsArr = contentIdsList.split(',');
			for(var i =0; i <contentLstArr.length; i++){
				var tmp = contentLstArr[i];
				var srcNode = tmp.split('_');
				var srcIndex = srcNode.pop()-i;
				idsArr.splice(srcIndex,1);
			}
			var index = idsArr.indexOf("add_"+id);
			for(var i = contentLstArr.length-1; i >=0; i--){
				var tmp = contentLstArr[i];
				var srcNode = tmp.split('_');
				var srcIndex = srcNode.pop();
				var srcContentId = srcNode.join("_");
				if(idsArr.indexOf(srcContentId) == -1)
					idsArr.splice(index+1,0,srcContentId);
			}
			var contentIdsListNew = idsArr.join();
			$("#pkg_contentIds").val(contentIdsListNew);

			var allPositionTds = $(".tdposition");
			var trIdStr = "";
			$.each(allPositionTds, function (i, item) {
				var trId = $(item).closest('tr').attr('id');
				trIdStr = trIdStr + trId+",";
			});
			var trIdsArr = trIdStr.split(',');
			var trIdsArrOprat = [];
			for(var i =contentLstArr.length-1; i >=0; i--){
				var tmp = contentLstArr[i];
				var srcNode = tmp.split('_');
				var srcIndex = srcNode.pop()-1;
				var tmpTrId = trIdsArr[srcIndex];
				trIdsArrOprat.push(tmpTrId);
			}
			for(var i =0; i <trIdsArrOprat.length; i++){
				var tmpTrIdIndx = trIdsArr.indexOf(trIdsArrOprat[i]);
				trIdsArr.splice(tmpTrIdIndx, 1);
				var trLoc = trIdsArr.indexOf(trId);
				trIdsArr.splice(trLoc+1,0,trIdsArrOprat[i]);
			}
			
			var tableTdHtml = "";
			tableTdHtml = '<tr>'
					+ '<th><span class="label-modified">Position</span></th>'
					+ '<th><span class="label-modified">+/-</span></th>'
					+ '<th><span class="label-modified">Thumbnail</span></th>'
					+ '<th><span class="label-modified">Title</span></th>'
					+ '<th colspan="2"><span class="label-modified"><i class="glyphicon glyphicon-arrow-up"></i>/<i class="glyphicon glyphicon-arrow-down"></i></span></th>'
					+ '</tr>'
			for(var i =0; i <trIdsArr.length; i++){
				if(trIdsArr[i] != ""){
					$('#' + trIdsArr[i]).find('#serialNo').html((i+1));
					var tdHtml = $('#' + trIdsArr[i]).html();
					tableTdHtml = tableTdHtml+"<tr id=addedtracks_"+(i+1)+">"+tdHtml+"</tr>";
				}
			}
			
			$('#contentIdsTable tbody').empty();
			
			$('#table-body').html(tableTdHtml);
			updateTdPositions();
		}
		else{
			$(".reorderContent").each(function() {
				$( "#reorder" ).prop( "unchecked", true );
		    });
			bootbox.alert("Please choose different Re-Position Location");
			
		}
		contentSelectionBinding();
	});
	
	function contentSelectionBinding() {
		$("input[name=contentIdsList]").off();
		$("input[name=contentIdsList]").bind('change', function(){
			var trackId = $(this).val();
			if(!$(this).is(':checked')){
				var posterId = $('#txt_poster_content_id').val();
				$('#contentCount').val(parseInt($('#contentCount').val())-1);
			}
			else if($(this).is(':checked')){
				$('#contentCount').val(parseInt($('#contentCount').val())+1);
			}
			
		});
	}
	
	function validateItemsCount() {
		var packageType = $('#txt_package_type').val();
		var checkedItems = $('input[name="contentIdsList"]:checked');
		var count = $('input[name="contentIdsList"]:checked').length;
		if(checkedItems != undefined && count > 0) {
			if(packageType == 'Featured') {
				if(count<3) {
					return "Items count should be minimum 3.";
				}
			} else if(packageType == 'Search') {
				if(count < 6) {
					return "There should be at least 6 items.";
				}
			} else if(packageType == 'New Releases') {
				if(count < 6) {
					return "There should be at least 6 tracks.";
				} else {
					var albumCount=0, playlistCount=0, tracksCount=0;
					for(var i=0;i<count;i++) {
						var elem = checkedItems[i];
						var dataType = $(checkedItems[i])[0].getAttribute("data-ctype");
						if(dataType == "content") {
							tracksCount++;
						} else if(dataType == "album") {
							albumCount++;
						} else {
							playlistCount++;
						}
					}
					var errorCountMsg;
					if(albumCount > 0 || playlistCount > 0) {
						errorCountMsg = " Albums/playlists not allowed; ";
					} else if(tracksCount < 6) {
						errorCountMsg = " Please include at least 6 tracks;";
					} else {
						return "";
					}
					return errorCountMsg;
				}
			} else if(packageType == 'best_compilations') {
				if(count < 6) {
					return "There should be at least 6 items.";
				} else {
					var albumCount=0, playlistCount=0, compilationCount=0, tracksCount=0;
					for(var i=0;i<count;i++) {
						var elem = checkedItems[i];
						var dataType = $(checkedItems[i])[0].getAttribute("data-ctype");
						if(dataType == "content") {
							tracksCount++;
						} else if(dataType == "album") {
							albumCount++;
						} else if(dataType == "compilation") {
							compilationCount++;
						} else {
							playlistCount++;
						}
					}
					var errorCountMsg = 'Please include ';
					if(albumCount < 6) {
						errorCountMsg += " at least 6 albums; ";
					} else if(playlistCount > 0) {
						errorCountMsg += " Playlists not allowed;";
					} else if(tracksCount > 0) {
						errorCountMsg = "Tracks not allowed;";
					} else {
						return "";
					}
					return errorCountMsg;
				}
			} else {
				return "";
			}
		} else {
			return "Please add some items to proceed.";
		}
		return "";
	}
	
	//package edit submit ajax
	$('#package-form').submit(function() {
		event.preventDefault();
		var validFromDate = $('#validfrom').val();
		var validToDate = $('#validUpto').val();
		var dateValidateResult = true;
		var today = new Date();
		var validateDateMsg;
		if(validFromDate == "" || validToDate == "") {
			dateValidateResult = false;
			validateDateMsg = "Dates cannot be empty.";
		}
		if(validFromDate != undefined && validToDate != undefined && validFromDate != "" && validToDate != "" && new Date(validFromDate) > new Date(validToDate)) {
			dateValidateResult = false;
			validateDateMsg = 'Start date should be less than end date.';
		}
		if(dateValidateResult == true && validToDate != undefined && new Date(validToDate) <= today) {
			dateValidateResult = false;
			validateDateMsg = 'End date has to be future date.';
		}
		if(!dateValidateResult) {
			$('#editPkgResult').css("color","#f00");
			$('#editPkgResult').html(validateDateMsg);
		}
		var langValidateResult = true;
		if($("input[name='contentLang']:checked") == undefined || $("input[name='contentLang']:checked").length == 0) {
			langValidateResult = false;
			$('#editPkgResult').css("color","#f00");
			$('#editPkgResult').html('Please select at least one content language.');
		}
//		data-regexp="^(https?|ftp)://.*(jpeg|jpg|png|gif|bmp)"
		//([^\s]+(\.(?i)(jpg|png|gif|bmp))$)
		
		var modtype = $('#modtype').val();
		var url = '/cms/package/save';
		if(modtype === 'create' || modtype === 'dup') {
			url = '/cms/package/create';
		}
		var validateItemsMsg = validateItemsCount();
		if(validateItemsMsg != "") {
			$('#editPkgResult').css("color","#f00");
			$('#editPkgResult').html(validateItemsMsg);
		}
		var result = $('#package-form').parsley('validate');
		if(result === true && dateValidateResult == true && validateItemsMsg == '' && langValidateResult == true) {
			var options = {
				url:      url,        // override for form's 'action' attribute 
				type:      'POST',
				success:       showResponse,  // post-submit callback
				beforeSubmit: loading()  // post-submit callback 
			};
	        $(this).ajaxSubmit(options);
		}
    });
	
	//processing modal
	function loading(){
		$('#modalBox').show();
	}
	
	// post-submit callback 
	function showResponse(responseText, statusText, xhr, $form)  {
		$('#modalBox').hide();
		if(responseText == true) {
			$('#editPkgResult').css("color","#0f0");
			$('#editPkgResult').html('Package saved successfully.');
			bootbox.alert("Content Saved Successfully!", function() {
				window.location.href = "/cms/package";
			});
		} else {
			$('#editPkgResult').css("color","#f00");
			$('#editPkgResult').html('Package upload failed.');
			bootbox.alert("Content upload Failed");
		}
	}

	//To create html for new language text box in vernac titles modal
	function inputCompleteHtml(code, value) {
		var divHtml = '<div id="vtitleDiv_'+ code + '">';
		var fullname = $('#langchk_'+code)[0].getAttribute('data-fullname');
		divHtml+='<label class="control-label">' + fullname + '</label>';
		divHtml+='<input type="text" class="input-small" data-required="true" id="pkgVtitle_' + code + '" name="pkgVtitle_' + code 
		+ '" value="' + value + '"/></div>'
		return divHtml;
	}
	
	//for change action of vernace titles language checkboxes
	$('.ltitlesChkBox').live('change',function() {
		var code = $(this).attr("value");
		if($(this).attr("checked")) {
			var value = "";
			if($('#pkg_localizedTitle_'+code) !== undefined && $('#pkg_localizedTitle_'+code).length > 0) {
				value=$('#pkg_localizedTitle_'+code).val();
			}
			$('#vTitleDiv').append(inputCompleteHtml(code,value));
		} else {
			if($('#vtitleDiv_'+code) !== undefined) {
				$('#vtitleDiv_'+code).remove();
			}
		}
	});
	
	
	//for validating vernac titles input in add vernac titles modal box
	function validateTextBoxes() {
		var chosenLanguages = $("input[name='pkg_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			for(var i=0;i<chosenLanguages.length;i++) {
				var code = $(chosenLanguages[i]).val();
				var value = $('#pkgVtitle_'+code).val();
				if(value === undefined || value.trim() === '') {
					return false;
				}
			}
		}
		return true;
	}
	
	//Save button click action for add vernac titles modal
	$('#save_vtitles').click(function() {
		var result = validateTextBoxes();
		if(result == true) {
			var chosenLanguages = $("input[name='pkg_ltitles']:checked");
			if(chosenLanguages != undefined && chosenLanguages.length > 0) {
				for(var i=0;i<chosenLanguages.length;i++) {
					var code = $(chosenLanguages[i]).val();
					var value = $('#pkgVtitle_'+code).val();
					if($('#pkg_localizedTitle_'+code) === undefined || $('#pkg_localizedTitle_'+code).length == 0) {
						var newHtml = '<input type="hidden" id="pkg_localizedTitle_' + code + '" name="pkg_localizedTitle_' + 
						code + '" value="' +value + '"/>';
						$('#origLocalizedTitles').append(newHtml);
					} else {
						$('#pkg_localizedTitle_'+code).val(value);
					}
				}
			}
			$('#addEditVTitles').modal('hide');
		} else {
			$('#validationResultVTitles').css("color","#f00");
			$('#validationResultVTitles').html('Titles cannot be empty.');
		}
	});
	
	//Cancel button click action for add vernac titles modal
	$('#cancel_vtitles').click(function() {
		var chosenLanguages = $("input[name='pkg_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			for(var i=0;i<chosenLanguages.length;i++) {
				var code = $(chosenLanguages[i]).val();
				if($('#pkg_localizedTitle_'+code) == undefined) {
					$('#langchk_'+code).attr("checked",false);
				}
			}
		}
		$('#addEditVTitles').modal('hide');
	});
	
	//Add button click action for adding vernac titles button
	$('#addVTitles').click(function () {
		event.preventDefault();
		var chosenLanguages = $("input[name='pkg_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			$('#addEditVTitles').modal('show');
		} else {
			bootbox.alert("No languages selected.");
		}
	});
	
	function panelControl(){
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
	$('#panelButton').click (panelControl);

});
