$(document).ready(function() {
	loadKeywords();
	loadDatePickers();
	addList();
	
//	$('#contentIdsList').sortable();
	
	$("#addContentBtn").click(function (e) {
	    e.preventDefault();
	    var text = $("input[name='add1']").val();
	    var $li = $("<li class='ui-state-default'/>").text(text);
	    $("#contentIdsList").append($li);
	    $("#contentIdsList").sortable('refresh');
	});
	
	function loadDatePickers() {
		var components = ["validfrom","validupto"];
		for(var i=0;i<components.length;i++) {
			$('#date_'+components[i]).datepicker({ 
				format : 'dd M yyyy',
				autoclose: true,
				onRender: function(date) {
							var nowTemp = new Date();
							var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
							return date.valueOf();
						  }
			});
		}
	}
	/** For tags manager of keywords **/	
	function loadKeywords() {
		var keywordsForTags = "";
		var fields = ["Tag","keyword"];
		for(var i=0;i<fields.length;i++) {
			var field = fields[i];
			if($('#orig_album_' + field) !== undefined && $('#orig_album_' + field).val() != undefined ) {
				keywordsForTags = $('#orig_album_' + field).val().split(',');
			}
			$('#'+field+'_album_tags').tagsManager({
				"prefilled": keywordsForTags,
				"hiddenTagListName":"txt_album_" + field,
				"hiddenTagListId":"txt_album_" + field
			});
		}
	}
	
	function addList(){
		var select = document.getElementById("txt_releaseYear");
		var currentTime = new Date();
		var currentYear = currentTime.getFullYear();
        for(var i = currentYear; i >= 1900; --i) {
            $('#txt_releaseYear').append($('<option>', { 
		        value: i,
		        text : i 
		    }));
        }
	}
	
	$('#editAlbum').submit(function(e) {
		
		e.preventDefault();
		var albumId = $("#txt_album_id").val();
		var validFromDate = $('#validfrom').val();
		var validToDate = $('#valid_upto').val();
		var rank = $("#txt_rank").val();
		var rankDoubleFormat = parseFloat(rank);
		var rankValidateResult = true;
		var validateRankMsg;
		var dateValidateResult = true;
		var contentList = $('#txt_content_id').val();
		var contentListValidateStatus = true;
		var posterContent = $('#txt_poster_content_id').val();
		var posterContentValidateStatus = true;
		var thumbnailRes = true;
		var validateThumbnailMsg;
		if(validFromDate != "" && validToDate != "" && new Date(validFromDate) > new Date(validToDate)) {
			dateValidateResult = false;
		} 
		if(!dateValidateResult) {
			$('#editAlbumResult').css("color","#f00");
			$('#editAlbumResult').html('Valid from date should be less than or equal to valid to date.');
		}
		
		if(contentList !=undefined && contentList !=""){
			contentListValidateStatus = validateSpecialChar(contentList);
		}
		if(!contentListValidateStatus) {
			$('#editAlbumResult').css("color","#f00");
			$('#editAlbumResult').html('Content List have some Special Character');
		}
		
		if(posterContent !== undefined && posterContent !=""){
			posterContentValidateStatus = validateSpecialChar(posterContent);
		}
		if(!posterContentValidateStatus) {
			$('#editAlbumResult').css("color","#f00");
			$('#editAlbumResult').html('Poster Content have some Special Character');
		}
		if(($('#thumbnai_url').val() == undefined || $('#thumbnai_url').val().trim() == "") && 
				($('#upload-thumbnail').html() == "") && $('#modtype').val() == "add") {
			thumbnailRes = false;
			validateThumbnailMsg = "Thumbnail cannot be empty";
		}
		if(thumbnailRes == true && $('#thumbnai_url').val() != "" && !($('#thumbnai_url').val().match(/\.(gif|jpg|jpeg|tiff|png|bmp)$/i))) {
			thumbnailRes = false;
			validateThumbnailMsg = "Thumbnail can only be a image file.";
		}
		if(thumbnailRes == true && $('#thumbnai_url').val() != ""){
			var prevThumbnailFileSize = document.getElementById('thumbnai_url').files[0].size;
			if(prevThumbnailFileSize > 1048576){
				thumbnailRes = false;
				validateThumbnailMsg = "Thumbnail file size can not be more than 1 MB.";
			}
		}
		if(!thumbnailRes) {
			$('#editAlbumResult').css("color","#f00");
			$('#editAlbumResult').html(validateThumbnailMsg);
		}
		
		if(rankDoubleFormat > 100.0 || rankDoubleFormat <-100.0){
			rankValidateResult = false;
			validateRankMsg = "Range Of Rank is -100.0 To 100.0."
		}
		if(!rankValidateResult){
			$('#editAlbumResult').css("color","#f00");
			$('#editAlbumResult').html(validateRankMsg);
		}
		
		if(dateValidateResult == true && contentListValidateStatus == true && posterContentValidateStatus == true && thumbnailRes == true && rankValidateResult == true){
			$('#editAlbumResult').css("color","#f00");
			$('#editAlbumResult').html('');
		}
		
		
		var result = $('#editAlbum').parsley('validate');
		var modtype = $('#modtype').val();
		var url = '/cms/savealbum';
		if(modtype === 'add' && albumId =="") {
			url = '/cms/createalbum';
		}
		if(result === true && dateValidateResult == true && contentListValidateStatus == true && posterContentValidateStatus == true && thumbnailRes == true && rankValidateResult == true) {
			var options = {
				url:      url,        // override for form's 'action' attribute 
				type:      'POST',
				success:   showResponse,  // post-submit callback
				beforeSubmit: loading()
			};
	        $(this).ajaxSubmit(options);
		}
    });
	function loading(){
		$('#modalBox').show();

	}
	
	function validateSpecialChar(validationStr){
		var status=validationStr.match(/[#@!$%^&*()+|~=`{}\[\]:";'<>?.\/]/);
		if (status!=null) {
	        return false;
	    }
	    return true; 
	}
	
	// post-submit callback 
	function showResponse(responseText, statusText, xhr, $form)  {
		if(responseText == true) {
			$('#editAlbumResult').css("color","#0f0");
			$('#editAlbumResult').html('Album saved successfully.');
			bootbox.alert("Content Saved Successfully!", function() {
			    window.location="/cms/showalbumlist";
			});
		} else {
			$('#editAlbumResult').css("color","#f00");
			$('#editAlbumResult').html('Content upload failed.');
			bootbox.alert("Content upload Failed");
			$('#modalBox').hide();
		}
	}

	//To create html for new language text box in vernac titles modal
	function inputCompleteHtml(code, value) {
		var divHtml = '<div id="vtitleDiv_'+ code + '">';
		var fullname = $('#langchk_'+code)[0].getAttribute('data-fullname');
		divHtml+='<label class="control-label">' + fullname + '</label>';
		divHtml+='<input type="text" class="input-small form-control" data-required="true" id="albumVtitle_' + code + '" name="albumVtitle_' + code 
		+ '" value="' + value + '"/></div>'
		return divHtml;
	}
	

	//for change action of vernace titles language checkboxes
	$('.ltitlesChkBox').live('change',function() {
		var code = $(this).attr("value");
		if($(this).attr("checked")) {
			var value = "";
			if($('#album_localizedTitle_'+code) !== undefined && $('#album_localizedTitle_'+code).length > 0) {
				value=$('#album_localizedTitle_'+code).val();
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
		var chosenLanguages = $("input[name='album_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			for(var i=0;i<chosenLanguages.length;i++) {
				var code = $(chosenLanguages[i]).val();
				var value = $('#albumVtitle_'+code).val();
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
			var chosenLanguages = $("input[name='album_ltitles']:checked");
			if(chosenLanguages != undefined && chosenLanguages.length > 0) {
				for(var i=0;i<chosenLanguages.length;i++) {
					var code = $(chosenLanguages[i]).val();
					var value = $('#albumVtitle_'+code).val();
					if($('#album_localizedTitle_'+code) === undefined || $('#album_localizedTitle_'+code).length == 0) {
						var newHtml = '<input type="hidden" id="album_localizedTitle_' + code + '" name="album_localizedTitle_' + 
						code + '" value="' +value + '"/>';
						$('#origLocalizedTitles').append(newHtml);
					} else {
						$('#album_localizedTitle_'+code).val(value);
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
		var chosenLanguages = $("input[name='album_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			for(var i=0;i<chosenLanguages.length;i++) {
				var code = $(chosenLanguages[i]).val();
				if($('#album_localizedTitle_'+code) == undefined) {
					$('#langchk_'+code).attr("checked",false);
				}
			}
		}
		$('#addEditVTitles').modal('hide');
	});
	
	$('#addVTitles').click(function () {
		event.preventDefault();
		var chosenLanguages = $("input[name='album_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			$('#addEditVTitles').modal('show');
		} else {
			bootbox.alert("No languages selected.");
		}
	});
	/*
	 * alert if uncheck the contentList which is PosterId
	 */
//	$('.addedTracks').on('click', function(){
//	    if(!$(this).is(':checked')){
//	    	var posterId = $('#txt_poster_content_id').val();
//	    	$('#contentCount').val(parseInt($('#contentCount').val())-1);
//	    	var contentSelected = $(this).val();
//	    	if(contentSelected == posterId)
//	    		bootbox.alert("Unchecked ID is PosterId.");
//	    }
//	    else if($(this).is(':checked')){
//	    	$('#contentCount').val(parseInt($('#contentCount').val())+1);
//	    }
//	});
	
	$('input[id="select-circle"]').click(function(){
	    if ($(this).is(':checked'))
	    {
	    	$("#circle-grp-table").removeClass('hide');
	    }
	  });
	$('input[id="pan-india"]').click(function(){
	    if ($(this).is(':checked'))
	    {
	    	$("#circle-grp-table").addClass('hide');
	    }
	  });
});