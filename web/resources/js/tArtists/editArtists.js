$(function() {
	loadDatePickers();
	
	var srch_id = "";
	var srch_name = "";
	var current_page = 1;
	
	$('.search_parameter').change(function() {
		var id = $(this).attr('id');
		var val = $(this).val();
		if(id == 'srchartist_title') {
			srch_name = val;
		} else if (id == 'srchartist_id') {
			srch_id = val;
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
		var page = 1;
		if(current_page != undefined) {
			page=current_page;
		}
		var options = {
				url:      '/cms/artist/search?page='+page,        // override for form's 'action' attribute 
				type:      'GET',
				target: '#searchArtistResult'// post-submit callback 
		};
		$('#searchArtist').ajaxSubmit(options);
	}
	
	function populateSearchParams() {
		$('#srchartist_title').val(srch_name);
		$('#srchartist_id').val(srch_id);
	}
	
	$('.moveup').live('click', function(event) {
		event.preventDefault();
		var trId = $(this).closest('tr').attr('id');
		var index = $(this).closest('tr').attr('id').split('_')[1];
		var nxtIndex = parseInt(index, 10) - 1;
		if(nxtIndex > 0) {
			var id = $(this)[0].getAttribute("data-id");
			var lowerExclusiveChecked = $('#exclusive_'+id).is(':checked');
			var lowerSponseredChecked = $('#sponsered_'+id).is(':checked');
			var lowerAomChecked = $("#artistOfTheMonth_"+id).is(':checked');
			var srchTxt = '_' + id + ',';
			var contentIdsList = $("#artist_order").val().trim();
			if(contentIdsList.indexOf(srchTxt) !== -1) {
				var lengthSrchTxt = srchTxt.length;
				var wholeTxt = contentIdsList.substring(contentIdsList.indexOf(srchTxt)-3,contentIdsList.indexOf(srchTxt)+lengthSrchTxt-1);
				var idsArr = contentIdsList.split(',');
				var upperIdString = idsArr[nxtIndex];
				var upperId = upperIdString.split("_")[1];
				var upperExclusiveChecked = $('#exclusive_'+upperId).is(':checked');
				var upperSponseredChecked = $('#sponsered_'+upperId).is(':checked');
				var upperAomChecked = $("#artistOfTheMonth_"+upperId).is(':checked');
				idsArr.splice(index,1);
				idsArr.splice(index-1,0,wholeTxt);
				var contentIdsListNew = idsArr.join();
				$("#artist_order").val(contentIdsListNew);
				var newTrId = 'addedartists_' + nxtIndex;
				var upperTrHtml = $('#' + newTrId).html();
				var lowerTrHtml = $('#' + trId).html();
				$('#' + trId).html(upperTrHtml);
				$('#' + newTrId).html(lowerTrHtml);
				$('#exclusive_'+upperId).attr("checked", upperExclusiveChecked);
				$('#sponsered_'+upperId).attr("checked", upperSponseredChecked);
				$('#artistOfTheMonth_'+upperId).attr("checked", upperAomChecked);
				$('#exclusive_'+id).attr("checked", lowerExclusiveChecked);
				$('#sponsered_'+id).attr("checked", lowerSponseredChecked);
				$('#artistOfTheMonth_'+id).attr("checked", lowerAomChecked);
				updateTdPositions();
			}
		}
	});
	
	$('#reverseorder').live('click', function() {
		event.preventDefault();
		var contentIdsList = $("#artist_order").val().trim();
		var size = 0;
		if(contentIdsList !== "") {
			size = contentIdsList.split(',').length;
		}
		var htmlArr = new Array();
		var checkBoxesMap = new Object();;
		htmlArr[0]="";
		htmlArr[size-1]="";
		var idsArr = contentIdsList.split(',');
		var fields = ["exclusive","sponsered","artistOfTheMonth"];
		for(var i=0;i<idsArr.length;i++) {
			if(idsArr[i] != "") {
				var id = idsArr[i].split("_")[1];
				for(var j=0;j<fields.length;j++) {
					var chkBoxId = fields[j]+"_"+id;
					checkBoxesMap[chkBoxId] = $("#"+chkBoxId).is(':checked');
				}
			}
		}
		for(var i=1;i<size-1;i++) {
			htmlArr[i]=$('#addedartists_'+i).html();
		}
		var j=1;
		for (var i=size-2;i>=1;i--) {
			$('#addedartists_'+i).html(htmlArr[j]);
			j++;
		}
		for(var chkBoxId in checkBoxesMap) {
			$("#"+chkBoxId).attr("checked",checkBoxesMap[chkBoxId]);
		}
		idsArr.reverse();
		var contentIdsListNew = idsArr.join();
		$("#artist_order").val(contentIdsListNew);
		updateTdPositions();
	});
	
	//moving the track down
	$('.movedown').live('click', function(event) {
		event.preventDefault();
		var contentIdsList = $("#artist_order").val().trim();
		var size = 0;
		if(contentIdsList !== "") {
			size = contentIdsList.split(',').length-2;
		}
		var trId = $(this).closest('tr').attr('id');
		var index = $(this).closest('tr').attr('id').split('_')[1];
		var nxtIndex = parseInt(index, 10)+1;
		if(nxtIndex <= size) {
			var id = $(this)[0].getAttribute("data-id");
			var upperExclusiveChecked = $('#exclusive_'+id).is(':checked');
			var upperSponseredChecked = $('#sponsered_'+id).is(':checked');
			var upperAomChecked = $("#artistOfTheMonth_"+id).is(':checked');
			var srchTxt = '_' + id + ',';
			if(contentIdsList.indexOf(srchTxt) !== -1) {
				var lengthSrchTxt = srchTxt.length;
				var wholeTxt = contentIdsList.substring(contentIdsList.indexOf(srchTxt)-3,contentIdsList.indexOf(srchTxt)+lengthSrchTxt-1);
				var idsArr = contentIdsList.split(',');
				var lowerIdString = idsArr[nxtIndex];
				var lowerId = lowerIdString.split("_")[1];
				var lowerExclusiveChecked = $('#exclusive_'+lowerId).is(':checked');
				var lowerSponseredChecked = $('#sponsered_'+lowerId).is(':checked');
				var lowerAomChecked = $("#artistOfTheMonth_"+lowerId).is(':checked');
				idsArr.splice(index,1);
				idsArr.splice(nxtIndex,0,wholeTxt);
				var contentIdsListNew = idsArr.join();
				$("#artist_order").val(contentIdsListNew);
				var newTrId = 'addedartists_' + nxtIndex;
				var upperTrHtml = $('#' + trId).html();
				var lowerTrHtml = $('#' + newTrId).html();
				$('#' + trId).html(lowerTrHtml);
				$('#' + newTrId).html(upperTrHtml);
				$('#exclusive_'+lowerId).attr("checked", lowerExclusiveChecked);
				$('#sponsered_'+lowerId).attr("checked", lowerSponseredChecked);
				$('#artistOfTheMonth_'+lowerId).attr("checked", lowerAomChecked);
				$('#exclusive_'+id).attr("checked", upperExclusiveChecked);
				$('#sponsered_'+id).attr("checked", upperSponseredChecked);
				$('#artistOfTheMonth_'+id).attr("checked", upperAomChecked);
				updateTdPositions();
			}
		}
	});
	
	//selecting tracks to be saved
	$('.addedArtists').live('change',function() {
		var contentIdsList = $("#artist_order").val().trim();
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
	            $("#artist_order").val(contentIdsList);
	        } 
			else {
	        	if(contentIdsList.indexOf(contentIdSrch) !== -1) {
	        		contentIdsList = contentIdsList.replace(contentIdSrch,",rem_" + contentId + "," );
	        		$("#artist_order").val(contentIdsList);
	        	}
	        }
		}
	});
	
	function loadDatePickers() {
		var components = ["validfrom","validupto"];
		for(var i=0;i<components.length;i++) {
			$('#artists_'+components[i]).datetimepicker({ 
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
	
	$('.addArtistBtn').live('click', function(event) {
		event.preventDefault();
		var id = $(this)[0].getAttribute("data-id");
		var contentIdsList = $("#artist_order").val().trim();
		if(contentIdsList.indexOf)
		var title = $(this)[0].getAttribute("data-title");
		var thumbnailUrl = $(this)[0].getAttribute("data-thumbnailUrl");
		var atype = $(this)[0].getAttribute("data-atype");
		var size = 0;
		if(contentIdsList !== "") {
			size = contentIdsList.split(',').length+1-2;
			index = size-1;
		}
		var contentIdSrch = ',add_' + id + ',';
		if(id != "") {
			if(contentIdsList.indexOf(contentIdSrch) === -1) {
				contentIdsList += ("add_" + id + ',');
				$("#artist_order").val(contentIdsList);
				var html='<tr id="addedartists_' + size + '">' +
				'<td style="word-break: break-word;" class="tdposition">' + size + '</td>' +
				'<td style="word-break: break-word;" ><input type="checkbox" class="addedArtists" name="addedArtists" value="' + id +'" checked /></td>'+
				'<td style="word-break: break-word;">' +
				'<img src="'+ thumbnailUrl + '"/>' + 
				'</td>'+
				'<td style="word-break: break-word;">'+title+'</td>' +
				'<td style="word-break: break-word;">'+atype+'</td>' +
				'<td style="word-break: break-word;"><input type="checkbox" id="exclusive_' + id + '" name="exclusive_' + id + '" value="true"/></td>' +
				'<td style="word-break: break-word;"><input type="checkbox" id="sponsered_' + id + '" name="sponsered_' + id + '" value="true"/></td>' +
				'<td style="word-break: break-word;"><input type="checkbox" id="artistOfTheMonth_' + id + '" name="artistOfTheMonth_' + id + '" value="true"/></td>'+
				'<td style="word-break: break-word;">'+
				'<a class="moveup" data-id="' + id + '" href="#"><i class="glyphicon glyphicon-circle-arrow-up"></i></a>' +
				'<a class="movedown" href="#" data-id="' + id + '"><i class="glyphicon glyphicon-circle-arrow-down"></i></a>' +
				'</td></tr>';
				$('#artistsTable').append(html);
				updateTdPositions();
			}
		}
	});
	
	
	//processing modal
	function loading(){
		$('#modalBox').modal('show');
	}
	
	// post-submit callback 
	function showResponse(responseText, statusText, xhr, $form)  {
		$('#modalBox').modal('hide');
		if(responseText == true) {
			$('#editArtistsResult').css("color","#0f0");
			$('#editArtistsResult').html('Artists saved successfully.');
			bootbox.alert("Artist Saved Successfully!", function() {
				window.location.href = "/cms/artists";
			});
		} else {
			$('#editArtistsResult').css("color","#f00");
			$('#editArtistsResult').html('Artists upload failed.');
			bootbox.alert("Artists upload Failed");
		}
	}
	
	function validateTArtistsData() {
		var validFromDate = $('#validfrom').val();
		var validToDate = $('#validUpto').val();
		var today = new Date();
		if($("input[name='artists_content_languages']:checked") == undefined || $("input[name='artists_content_languages']:checked").length == 0) {
			return 'Please select at least one content language.';
		}
		if(validFromDate == "" || validToDate == "") {
			return "Dates cannot be empty.";
		}
		if(validFromDate != undefined && validToDate != undefined && validFromDate != "" && validToDate != "" && new Date(validFromDate) >= new Date(validToDate)) {
			return 'Start date should be less than end date.';
		}
		if(validToDate != undefined && new Date(validToDate) <= today) {
			return 'End date has to be future date.';
		}
		var checkedItems = $('input[name="addedArtists"]:checked');
		var count = $('input[name="addedArtists"]:checked').length;
		if(count < 6) {
			return "Please add at least 6 artists";
		}
		return '';
	}
	
	$('#artists-form').submit(function() {
		event.preventDefault();
		var validContent = true;
		var validateData = validateTArtistsData();
		if(validateData != '') {
			validContent = false;
			$('#editArtistsResult').css("color","#f00");
			$('#editArtistsResult').html(validateData);
		}
		var result = $('#artists-form').parsley('validate');
		var modtype = $('#modtype').val();
		var url = '/cms/artists/save';
		if(modtype !== 'edit') {
			url = '/cms/artists/create';
		}
		if(result === true && validContent == true) {
			var options = {
				url:      url,        // override for form's 'action' attribute 
				type:      'POST',
				success:       showResponse,  // post-submit callback
				beforeSubmit: loading()  // post-submit callback 
			};
	        $('#artists-form').ajaxSubmit(options);
		}
	});
	
	function showArtistResponse(responseText, statusText, xhr, $form)  {
		if(responseText == true) {
			$('#saveArtistResult').css("color","#0f0");
			$('#saveArtistResult').html('Artist saved successfully.');
			cleanCreateArtistModel();
			$('#modalBox').modal('hide');
			$('#addArtist').modal('hide');
			cleanModal();
			populateSearchParams();
			populateSearchResult();
			bootbox.alert("Artist added successfully.");
		} else {
			$('#saveArtistResult').css("color","#f00");
			$('#saveArtistResult').html('Artist creation failed.');
		}
	}
	
	$('#cancel_save_artist').live('click', function() {
		cleanCreateArtistModel();
		$('#addArtist').modal('hide');
	});
	
	$('#createArtist').live('submit', function() {
		event.preventDefault();
		var thumbnailValidateRes =true;
		var typeValidate = true;
		if(($('#artist_thumbnail').val() == undefined || $('#artist_thumbnail').val().trim() == "") && 
				($('#upload-thumbnail').html() == "")) {
			thumbnailValidateRes = false;
			$('#saveArtistResult').css("color","#f00");
			$('#saveArtistResult').html("Thumbnail cannot be empty");
		}
		if($('#artist_type').val() == undefined || $('#artist_type').val().trim() == "") {
			typeValidate = false;
			$('#saveArtistResult').css("color","#f00");
			$('#saveArtistResult').html("Type cannot be empty");
		}
 		var result = $('#createArtist').parsley('validate');
		var id = $('#artist_id').val();
		var url = '/cms/artist/create';
		if(id !== '') {
			url = '/cms/artist/edit';
		}
		if(result === true && thumbnailValidateRes == true && typeValidate == true) {
			var options = {
				url:      url,        // override for form's 'action' attribute 
				type:      'POST',
				success:       showArtistResponse,  // post-submit callback
				beforeSubmit: loading()  // post-submit callback 
			};
	        $(this).ajaxSubmit(options);
		}
    });
	
	function cleanCreateArtistModel() {
		$('#artist_id').val("");
		$('#artist_thumbnail').val("");
		$('#artist_summary').val("");
		$('#createArtist')[0].reset();
		$('#saveArtistResult').html("");
		$('#upload-thumbnail').html("");
		$('#artistthumbnailFile').val("");
		$('#img_thumbnail').replaceWith('<img src="" id="img_thumbnail" name="img_thumbnail">');
	}
	
	$('#addNewArtist').live('click',function() {
		$('#addArtist').modal('show');
		cleanCreateArtistModel();
	});
	
	$('.editArtistBtn').live('click',function() {
		$('#addArtist').modal('show');
		var id = $(this)[0].getAttribute("data-id");
		var title = $(this)[0].getAttribute("data-title");
		var thumbnailUrl = $(this)[0].getAttribute("data-thumbnailUrl");
		var type = $(this)[0].getAttribute("data-atype");
		var summary = $(this)[0].getAttribute("data-summary");
		$('#artist_id').val(id);
		$('#artist_title').val(title);
		$('#artist_thumbnail').val(thumbnailUrl);
		$('#img_thumbnail').attr("src", thumbnailUrl);
		$('#artist_type').val(type);
		$('#artist_summary').val(summary);
//		$('#addArtist').modal('show');
	});
	
	$('#searchArtist').submit(function(event) {
		event.preventDefault();
		var page = 1;
		var options = {
				url:      '/cms/artist/search?page='+page,        // override for form's 'action' attribute 
				type:      'GET',
				target: '#searchArtistResult'// post-submit callback 
		};
		$(this).ajaxSubmit(options);
    });
});