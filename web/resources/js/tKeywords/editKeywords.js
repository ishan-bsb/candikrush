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
			var contentIdsList = $("#keyword_order").val().trim();
			if(contentIdsList.indexOf(srchTxt) !== -1) {
				var lengthSrchTxt = srchTxt.length;
				var wholeTxt = contentIdsList.substring(contentIdsList.indexOf(srchTxt)-3,contentIdsList.indexOf(srchTxt)+lengthSrchTxt-1);
				var idsArr = contentIdsList.split(',');
				var upperIdString = idsArr[nxtIndex];
				var upperId = upperIdString.split("_")[1];
				idsArr.splice(index,1);
				idsArr.splice(index-1,0,wholeTxt);
				var contentIdsListNew = idsArr.join();
				$("#keyword_order").val(contentIdsListNew);
				var newTrId = 'addedkeywords_' + nxtIndex;
				var upperTrHtml = $('#' + newTrId).html();
				var lowerTrHtml = $('#' + trId).html();
				$('#' + trId).html(upperTrHtml);
				$('#' + newTrId).html(lowerTrHtml);
				updateTdPositions();
			}
		}
	});
	
	$('#reverseorder').live('click', function() {
		event.preventDefault();
		var contentIdsList = $("#keyword_order").val().trim();
		var size = 0;
		if(contentIdsList !== "") {
			size = contentIdsList.split(',').length;
		}
		var htmlArr = new Array();
		var checkBoxesMap = new Object();;
		htmlArr[0]="";
		htmlArr[size-1]="";
		var idsArr = contentIdsList.split(',');
		for(var i=1;i<size-1;i++) {
			htmlArr[i]=$('#addedkeywords_'+i).html();
		}
		var j=1;
		for (var i=size-2;i>=1;i--) {
			$('#addedkeywords_'+i).html(htmlArr[j]);
			j++;
		}
		idsArr.reverse();
		var contentIdsListNew = idsArr.join();
		$("#keyword_order").val(contentIdsListNew);
		updateTdPositions();
	});
	
	//moving the track down
	$('.movedown').live('click', function(event) {
		event.preventDefault();
		var contentIdsList = $("#keyword_order").val().trim();
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
				var lowerIdString = idsArr[nxtIndex];
				var lowerId = lowerIdString.split("_")[1];
				idsArr.splice(index,1);
				idsArr.splice(nxtIndex,0,wholeTxt);
				var contentIdsListNew = idsArr.join();
				$("#keyword_order").val(contentIdsListNew);
				var newTrId = 'addedkeywords_' + nxtIndex;
				var upperTrHtml = $('#' + trId).html();
				var lowerTrHtml = $('#' + newTrId).html();
				$('#' + trId).html(lowerTrHtml);
				$('#' + newTrId).html(upperTrHtml);
				updateTdPositions();
			}
		}
	});
	
	//selecting tracks to be saved
	$('.addedKeywords').live('change',function() {
		var contentIdsList = $("#keyword_order").val().trim();
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
	            $("#keyword_order").val(contentIdsList);
	        } 
			else {
	        	if(contentIdsList.indexOf(contentIdSrch) !== -1) {
	        		contentIdsList = contentIdsList.replace(contentIdSrch,",rem_" + contentId + "," );
	        		$("#keyword_order").val(contentIdsList);
	        	}
	        }
		}
	});
	
	function loadDatePickers() {
		var components = ["validfrom","validupto"];
		for(var i=0;i<components.length;i++) {
			$('#keywords_'+components[i]).datetimepicker({ 
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
	
	function getOneLangElement(lang, pos) {
		var value = "";
		if(pos >= 0) {
			var compName = '#'+lang+'_'+pos;
			if($(compName).length > 0) {
				value = $(compName).val();
			}
		} else {
			pos = $('#keywordsTable tr').length-1;
		}
		var html = '<label class="control-label">' + lang + '</label><input type="text" class="input-small form-control" id="modalKeyword_' +
			lang+'_'+pos+'" data-required="true" value="' + value + '" /><br/>';
		return html;
	}
	
	$('#cancel_vtitles').live('click', function(event) {
		$('#addEditVTitles').hide();
	});
	
	$('#save_vtitles').live('click', function(event) {
		event.preventDefault();
		var chosenLanguages = $("input[name='keywords_ltitles']:checked");
		var newId=0;
		if($('#modalPosition').val() == -1) {
			newId = $('#keywordsTable tr').length-1;
		} else {
			newId = $('#modalPosition').val();
		}
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			var modalDivHtml = '';
			for(var i=0;i<chosenLanguages.length;i++) {
				var lang = $(chosenLanguages[i]).val();
				var compName = '#'+lang+'_'+newId;
				var modalCompName = '#modalKeyword_'+lang+'_'+newId;
				var modalCompValue = $(modalCompName).val();
				if($(compName).length > 0) {
					$(compName).val(modalCompValue);
				} else {
					var newDomId = lang + '_' +newId;
					var newHtml = '<input type="hidden" id="'+ newDomId + '" name="' + newDomId +
					'" value="' +modalCompValue + '"/>';
					$('#vernacValues').append(newHtml);
				}
			}
			if($('#modalPosition').val() == -1) {
				var trId = newId+1;
				var newRowHtml = '<tr id="addedkeywords_'+ trId + '">'+
				'<td style="word-break: break-word;" class="tdposition">' + trId + '</td>' +
				'<td style="word-break: break-word;"><input type="checkbox" class="addedKeywords" id="addedKeywords" name="addedKeywords"' +
				'value="' + newId + '" checked /></td>'+
				'<td style="word-break: break-word;"><a href="#" class="keyword_edit" data-id="' + newId + '">Edit Keywords</a></td>' +
				'<td style="word-break: break-word;"><a class="moveup" data-id="' + newId +'" href="#"><i class="glyphicon glyphicon-circle-arrow-up"></i></a>' +
				'<a class="movedown" href="#" data-id="' + newId +'"><i class="glyphicon glyphicon-circle-arrow-down"></i></a>' +
				'</td></tr>';
				$('#keywordsTable').append(newRowHtml);
				updateTdPositions();
			}
		}
		var contentIdsList = $("#keyword_order").val().trim();
if(contentIdsList.indexOf("add_" + newId + ',') === -1) {		
contentIdsList += ("add_" + newId + ',');
}
		$("#keyword_order").val(contentIdsList);
		$('#addEditVTitles').hide();
	});
	
	function updateTdPositions() {
		var allPositionTds = $(".tdposition");
		$.each(allPositionTds, function (i, item) {
			var trId = $(item).closest('tr').attr('id');
			var index = $(item).closest('tr').attr('id').split('_')[1];
			$(item).html(index);
		});
	}
	
	$('.keyword_edit').live('click', function(event) {
		event.preventDefault();
		var pos = $(this)[0].getAttribute("data-id");
		$('#vTitleDiv').html('');
		var chosenLanguages = $("input[name='keywords_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			var modalDivHtml = '';
			for(var i=0;i<chosenLanguages.length;i++) {
				var code = $(chosenLanguages[i]).val();
				modalDivHtml+=getOneLangElement(code,pos);
			}
			$('#vTitleDiv').html(modalDivHtml);
			$('#modalPosition').val(pos);
			$('#addEditVTitles').modal('show');
		} else {
			bootbox.alert("No languages selected.");
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
			$('#editKeywordsResult').css("color","#0f0");
			$('#editKeywordsResult').html('Keywords saved successfully.');
			bootbox.alert("Keywords Package Saved Successfully!", function() {
				window.location.href = "/cms/keywords";
			});
		} else {
			$('#editKeywordsResult').css("color","#f00");
			$('#editKeywordsResult').html('Keywords upload failed.');
			bootbox.alert("Keywords upload Failed");
		}
	}
	
	function validateTKeywordsData() {
		var validFromDate = $('#validfrom').val();
		var validToDate = $('#validUpto').val();
		var dateValidateResult = true;
		var today = new Date();
		var validateDateMsg;
		var validateLangMsg;
		var langValidateResult = true;
		if($("input[name='keywords_content_languages']:checked") == undefined || $("input[name='keywords_content_languages']:checked").length == 0) {
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
		if($("input[name='keywords_ltitles']:checked") == undefined || $("input[name='keywords_ltitles']:checked").length == 0) {
			return 'Please select at least one vernac language for the list.';
		}
		var checkedItems = $('input[name="addedKeywords"]:checked');
		var count = $('input[name="addedKeywords"]:checked').length;
		if(count < 6 || count > 9) {
			return "Please add at least 6 and at most 9 keywords";
		}
		return '';
	}
	
	$('#keywords-form').submit(function() {
		event.preventDefault();
		var validContent = true;
		var validateData = validateTKeywordsData();
		if(validateData != '') {
			validContent = false;
			$('#editKeywordsResult').css("color","#f00");
			$('#editKeywordsResult').html(validateData);
		}
		var result = $('#keywords-form').parsley('validate');
		var modtype = $('#modtype').val();
		var url = '/cms/keywords/save';
		if(modtype !== 'edit') {
			url = '/cms/keywords/create';
		}
		if(result === true && validContent == true) {
			var options = {
				url:      url,        // override for form's 'action' attribute 
				type:      'POST',
				success:       showResponse,  // post-submit callback
				beforeSubmit: loading()  // post-submit callback 
			};
	        $('#keywords-form').ajaxSubmit(options);
		}
	});
});
