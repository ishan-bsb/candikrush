$(document).ready(function() {
	loadDatePickers();
	loadTags();
	
	function loadTags() {
			var keywordsForTags = "";
			if($('#orig_radio_keywords') !== undefined && $('#orig_radio_keywords').val() != undefined ) {
				keywordsForTags = $('#orig_radio_keywords').val().split(',');
			}
			$('#radio_edit_keywords').tagsManager({
				"prefilled": keywordsForTags,
				"hiddenTagListName":"txt_radio_keywords",
				"hiddenTagListId":"txt_radio_keywords"
			});
	}
	
	function loadDatePickers() {
		var components = ["validfrom","validupto"];
		for(var i=0;i<components.length;i++) {
			$('#radio_'+components[i]).datetimepicker({ 
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
	
	$('#radio-form').submit(function() {
		event.preventDefault();
		var validFromDate = $('#validfrom').val();
		var validToDate = $('#validUpto').val();
		var dateValidateResult = true;
		var keywordsValidateResult = true;
		var thumbnailRes = true;
		var today = new Date();
		var validateDateMsg;
		var validateThumbnailMsg;
		var validateKeywordsMsg;
		var validateLangMsg;
		var langValidateResult = true;
		if($("input[name='radio_content_languages']:checked") == undefined || $("input[name='radio_content_languages']:checked").length == 0) {
			langValidateResult = false;
			$('#editRadioResult').css("color","#f00");
			$('#editRadioResult').html('Please select at least one content language.');
		}
		if($('#txt_radio_keywords').val() == "") {
			keywordsValidateResult = false;
			validateKeywordsMsg = "Keywords cannot be empty.";
		}
		if(!keywordsValidateResult) {
			$('#editRadioResult').css("color","#f00");
			$('#editRadioResult').html(validateKeywordsMsg);
		}
		if(validFromDate == "" || validToDate == "") {
			dateValidateResult = false;
			validateDateMsg = "Dates cannot be empty.";
		}
		if(validFromDate != undefined && validToDate != undefined && validFromDate != "" && validToDate != "" && new Date(validFromDate) >= new Date(validToDate)) {
			dateValidateResult = false;
			validateDateMsg = 'Start date should be less than end date.';
		}
		if(dateValidateResult == true && validToDate != undefined && new Date(validToDate) <= today) {
			dateValidateResult = false;
			validateDateMsg = 'End date has to be future date.';
		}
		if(!dateValidateResult) {
			$('#editRadioResult').css("color","#f00");
			$('#editRadioResult').html(validateDateMsg);
		}
		if(($('#radio_thumbnail').val() == undefined || $('#radio_thumbnail').val().trim() == "") && 
				($('#upload-thumbnail').html() == "")) {
			thumbnailRes = false;
			validateThumbnailMsg = "Thumbnail cannot be empty";
		}
//		data-regexp="^(https?|ftp)://.*(jpeg|jpg|png|gif|bmp)"
		//([^\s]+(\.(?i)(jpg|png|gif|bmp))$)
		if(thumbnailRes == true && $('#thumbnail').val() != "" && !($('#thumbnail').val().match(/\.(gif|jpg|jpeg|tiff|png|bmp)$/i))) {
			thumbnailRes = false;
			validateThumbnailMsg = "Thumbnail can only be a image file.";
		}
		
		if(!thumbnailRes) {
			$('#editRadioResult').css("color","#f00");
			$('#editRadioResult').html(validateThumbnailMsg);
		}
		var result = $('#radio-form').parsley('validate');
		var modtype = $('#modtype').val();
		var url = '/cms/radio/save';
		if(modtype !== 'edit') {
			url = '/cms/radio/create';
		}
		if(result === true && dateValidateResult == true && thumbnailRes == true && keywordsValidateResult == true
				&& langValidateResult == true) {
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
			$('#editRadioResult').css("color","#0f0");
			$('#editRadioResult').html('Radio saved successfully.');
			bootbox.alert("Radio saved successfully!", function() {
				window.location.href = "/cms/radio";
			});
		} else {
			$('#editRadioResult').css("color","#f00");
			$('#editRadioResult').html('Radio upload failed.');
			bootbox.alert("Radio save operation failed");
		}
	}

	//To create html for new language text box in vernac titles modal
	function inputCompleteHtml(code, value) {
		var divHtml = '<div id="vtitleDiv_'+ code + '">';
		var fullname = $('#langchk_'+code)[0].getAttribute('data-fullname');
		divHtml+='<label class="control-label">' + fullname + '</label>';
		divHtml+='<input type="text" class="input-small" data-required="true" id="radioVtitle_' + code + '" name="radioVtitle_' + code 
		+ '" value="' + value + '"/></div>'
		return divHtml;
	}
	
	//for change action of vernace titles language checkboxes
	$('.ltitlesChkBox').live('change',function() {
		var code = $(this).attr("value");
		if($(this).attr("checked")) {
			var value = "";
			if($('#radio_localizedTitle_'+code) !== undefined && $('#radio_localizedTitle_'+code).length > 0) {
				value=$('#radio_localizedTitle_'+code).val();
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
		var chosenLanguages = $("input[name='radio_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			for(var i=0;i<chosenLanguages.length;i++) {
				var code = $(chosenLanguages[i]).val();
				var value = $('#radioVtitle_'+code).val();
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
			var chosenLanguages = $("input[name='radio_ltitles']:checked");
			if(chosenLanguages != undefined && chosenLanguages.length > 0) {
				for(var i=0;i<chosenLanguages.length;i++) {
					var code = $(chosenLanguages[i]).val();
					var value = $('#radioVtitle_'+code).val();
					if($('#radio_localizedTitle_'+code) === undefined || $('#radio_localizedTitle_'+code).length == 0) {
						var newHtml = '<input type="hidden" id="radio_localizedTitle_' + code + '" name="radio_localizedTitle_' + 
						code + '" value="' +value + '"/>';
						$('#origLocalizedTitles').append(newHtml);
					} else {
						$('#radio_localizedTitle_'+code).val(value);
					}
				}
			}
			$('#addEditVPTitles').modal('hide');
		} else {
			$('#validationResultVTitles').css("color","#f00");
			$('#validationResultVTitles').html('Titles cannot be empty.');
		}
	});
	
	//Cancel button click action for add vernac titles modal
	$('#cancel_vtitles').click(function() {
		var chosenLanguages = $("input[name='radio_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			for(var i=0;i<chosenLanguages.length;i++) {
				var code = $(chosenLanguages[i]).val();
				if($('#radio_localizedTitle_'+code) == undefined || $('#radio_localizedTitle_'+code).length == 0) {
					$('#langchk_'+code).attr("checked",false);
					$('#vtitleDiv_'+code).remove();
				}
			}
		}
		$('#addEditVPTitles').modal('hide');
	});
	
	//Add button click action for adding vernac titles button
	$('#addVTitles').click(function () {
		event.preventDefault();
		$('#validationResultVTitles').html('');
		var chosenLanguages = $("input[name='radio_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			for(var i=0;i<chosenLanguages.length;i++) {
				var code = $(chosenLanguages[i]).val();
				$('#radioVtitle_'+code).val($('#radio_localizedTitle_'+code).val());
			}
			$('#addEditVPTitles').modal('show');
		} else {
			bootbox.alert("No languages selected.");
		}
	});
});