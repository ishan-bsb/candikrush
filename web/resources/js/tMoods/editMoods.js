$(function() {
	loadDatePickers();
	
	$('.moveup').live('click', function(event) {
		event.preventDefault();
		var trId = $(this).closest('tr').attr('id');
		var index = $(this).closest('tr').attr('id').split('_')[1];
		var nxtIndex = parseInt(index, 10) - 1;
		if(nxtIndex > 0) {
			var id = $(this)[0].getAttribute("data-id");
			var lowerExclusiveChecked = $('#exclusive_'+id).is(':checked');
			var lowerSponseredChecked = $('#sponsered_'+id).is(':checked');
			var srchTxt = '_' + id + ',';
			var contentIdsList = $("#mood_order").val().trim();
			if(contentIdsList.indexOf(srchTxt) !== -1) {
				var lengthSrchTxt = srchTxt.length;
				var wholeTxt = contentIdsList.substring(contentIdsList.indexOf(srchTxt)-3,contentIdsList.indexOf(srchTxt)+lengthSrchTxt-1);
				var idsArr = contentIdsList.split(',');
				var upperIdString = idsArr[nxtIndex];
				var upperId = upperIdString.split("_")[1];
				var upperExclusiveChecked = $('#exclusive_'+upperId).is(':checked');
				var upperSponseredChecked = $('#sponsered_'+upperId).is(':checked');
				idsArr.splice(index,1);
				idsArr.splice(index-1,0,wholeTxt);
				var contentIdsListNew = idsArr.join();
				$("#mood_order").val(contentIdsListNew);
				var newTrId = 'addedmoods_' + nxtIndex;
				var upperTrHtml = $('#' + newTrId).html();
				var lowerTrHtml = $('#' + trId).html();
				$('#' + trId).html(upperTrHtml);
				$('#' + newTrId).html(lowerTrHtml);
				$('#exclusive_'+upperId).attr("checked", upperExclusiveChecked);
				$('#sponsered_'+upperId).attr("checked", upperSponseredChecked);
				$('#exclusive_'+id).attr("checked", lowerExclusiveChecked);
				$('#sponsered_'+id).attr("checked", lowerSponseredChecked);
				updateTdPositions();
			}
		}
	});
	
	$('#reverseorder').live('click', function() {
		event.preventDefault();
		var contentIdsList = $("#mood_order").val().trim();
		var size = 0;
		if(contentIdsList !== "") {
			size = contentIdsList.split(',').length;
		}
		var htmlArr = new Array();
		var checkBoxesMap = new Object();;
		htmlArr[0]="";
		htmlArr[size-1]="";
		var idsArr = contentIdsList.split(',');
		var fields = ["exclusive","sponsered"];
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
			htmlArr[i]=$('#addedmoods_'+i).html();
		}
		var j=1;
		for (var i=size-2;i>=1;i--) {
			$('#addedmoods_'+i).html(htmlArr[j]);
			j++;
		}
		for(var chkBoxId in checkBoxesMap) {
			$("#"+chkBoxId).attr("checked",checkBoxesMap[chkBoxId]);
		}
		idsArr.reverse();
		var contentIdsListNew = idsArr.join();
		$("#mood_order").val(contentIdsListNew);
		updateTdPositions();
	});
	
	//moving the track down
	$('.movedown').live('click', function(event) {
		event.preventDefault();
		var contentIdsList = $("#mood_order").val().trim();
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
			var srchTxt = '_' + id + ',';
			if(contentIdsList.indexOf(srchTxt) !== -1) {
				var lengthSrchTxt = srchTxt.length;
				var wholeTxt = contentIdsList.substring(contentIdsList.indexOf(srchTxt)-3,contentIdsList.indexOf(srchTxt)+lengthSrchTxt-1);
				var idsArr = contentIdsList.split(',');
				var lowerIdString = idsArr[nxtIndex];
				var lowerId = lowerIdString.split("_")[1];
				var lowerExclusiveChecked = $('#exclusive_'+lowerId).is(':checked');
				var lowerSponseredChecked = $('#sponsered_'+lowerId).is(':checked');
				idsArr.splice(index,1);
				idsArr.splice(nxtIndex,0,wholeTxt);
				var contentIdsListNew = idsArr.join();
				$("#mood_order").val(contentIdsListNew);
				var newTrId = 'addedmoods_' + nxtIndex;
				var upperTrHtml = $('#' + trId).html();
				var lowerTrHtml = $('#' + newTrId).html();
				$('#' + trId).html(lowerTrHtml);
				$('#' + newTrId).html(upperTrHtml);
				$('#exclusive_'+lowerId).attr("checked", lowerExclusiveChecked);
				$('#sponsered_'+lowerId).attr("checked", lowerSponseredChecked);
				$('#exclusive_'+id).attr("checked", upperExclusiveChecked);
				$('#sponsered_'+id).attr("checked", upperSponseredChecked);
				updateTdPositions();
			}
		}
	});
	
	//selecting tracks to be saved
	$('.addedMoods').live('change',function() {
		var contentIdsList = $("#mood_order").val().trim();
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
	            $("#mood_order").val(contentIdsList);
	        } 
			else {
	        	if(contentIdsList.indexOf(contentIdSrch) !== -1) {
	        		contentIdsList = contentIdsList.replace(contentIdSrch,",rem_" + contentId + "," );
	        		$("#mood_order").val(contentIdsList);
	        	}
	        }
		}
	});
	
	function loadDatePickers() {
		var components = ["validfrom","validupto"];
		for(var i=0;i<components.length;i++) {
			$('#moods_'+components[i]).datetimepicker({ 
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
	
	$('#addMood').live('click', function(event) {
		event.preventDefault();
		var mood = $('#newMood').val();
		var id=mood.replace(' ','--');
		var contentIdsList = $("#mood_order").val().trim();
		var title = $(this)[0].getAttribute("data-title");
		var thumbnailUrl = $(this)[0].getAttribute("data-thumbnailUrl");
		
		var size = 0;
		if(contentIdsList !== "") {
			size = contentIdsList.split(',').length+1-2;
			index = size-1;
		}
		var contentIdSrch = ',add_' + id + ',';
		if(id != "") {
			if(contentIdsList.indexOf(contentIdSrch) === -1) {
				contentIdsList += ("add_" + id + ',');
				$("#mood_order").val(contentIdsList);
				var html='<tr id="addedmoods_' + size + '">' +
				'<td style="word-break: break-word;" class="tdposition">'+size+'</td>' +
				'<td style="word-break: break-word;"><input type="checkbox" class="addedMoods" name="addedMoods" value="' + id +'" checked /></td>'+
				'<td style="word-break: break-word;">'+mood+'</td>' +
				'<td style="word-break: break-word;"><input type="checkbox" id="exclusive_' + id + '" name="exclusive_' + id + '" value="true"/></td>' +
				'<td style="word-break: break-word;"><input type="checkbox" id="sponsered_' + id + '" name="sponsered_' + id + '" value="true"/></td>' +
				'<td style="word-break: break-word;">'+
				'<a class="moveup" data-id="' + id + '" href="#"><i class="glyphicon glyphicon-circle-arrow-up"></i></a>' +
				'<a class="movedown" href="#" data-id="' + id + '"><i class="glyphicon glyphicon-circle-arrow-down"></i></a>' +
				'</td></tr>';
				$('#moodsTable').append(html);
				updateTdPositions();
			}
		}
	});
	
	function updateTdPositions() {
		var allPositionTds = $(".tdposition");
		$.each(allPositionTds, function (i, item) {
			var trId = $(item).closest('tr').attr('id');
			var index = $(item).closest('tr').attr('id').split('_')[1];
			$(item).html(index);
		});
	}
	
	
	//processing modal
	function loading(){
		$('#modalBox').show();
	}
	
	// post-submit callback 
	function showResponse(responseText, statusText, xhr, $form)  {
		$('#modalBox').hide();
		if(responseText == true) {
			$('#editMoodsResult').css("color","#0f0");
			$('#editMoodsResult').html('Moods saved successfully.');
			bootbox.alert("Moods Package Saved Successfully!", function() {
				window.location.href = "/cms/moods";
			});
		} else {
			$('#editMoodsResult').css("color","#f00");
			$('#editMoodsResult').html('Moods upload failed.');
			bootbox.alert("Moods upload Failed");
		}
	}
	
	function validateTMoodsData() {
		var validFromDate = $('#validfrom').val();
		var validToDate = $('#validUpto').val();
		var dateValidateResult = true;
		var today = new Date();
		var validateDateMsg;
		var validateLangMsg;
		var langValidateResult = true;
		if($("input[name='moods_content_languages']:checked") == undefined || $("input[name='moods_content_languages']:checked").length == 0) {
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
		var checkedItems = $('input[name="addedMoods"]:checked');
		var count = $('input[name="addedMoods"]:checked').length;
		if(count < 6) {
			return "Please add at least 6 moods";
		}
		return '';
	}
	
	$('#moods-form').submit(function() {
		event.preventDefault();
		var validContent = true;
		var validateData = validateTMoodsData();
		if(validateData != '') {
			validContent = false;
			$('#editMoodsResult').css("color","#f00");
			$('#editMoodsResult').html(validateData);
		}
		var result = $('#moods-form').parsley('validate');
		var modtype = $('#modtype').val();
		var url = '/cms/moods/save';
		if(modtype !== 'edit') {
			url = '/cms/moods/create';
		}
		if(result === true && validContent == true) {
			var options = {
				url:      url,        // override for form's 'action' attribute 
				type:      'POST',
				success:       showResponse,  // post-submit callback
				beforeSubmit: loading()  // post-submit callback 
			};
	        $('#moods-form').ajaxSubmit(options);
		}
	});
});