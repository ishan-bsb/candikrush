(function($) {
	loadKeywordsAll();
	loadCircles();
	loadDatePickers();
	addList();
//	loadSpinEdits();
	
	function loadCircles() {
		var circleGrp = $('#circle-grp-table');
		if(circleGrp !== undefined && circleGrp.length > 0) {
			$('#circle-grp-table').removeClass('hide');
		}
		/*$('.circle-select').attr("disabled", true);
		$('.circle-chkbox').attr("disabled",true);*/
	}
		
	function loadDatePickers() {
		var components = ["enddate","startdate","releasedate"];
		for(var i=0;i<components.length;i++) {
			$('#edit_track_'+components[i]+'div').datepicker({ 
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
	
	function loadKeywordsAll() {
		//for track keywords
		var keywordsForTags = "";
		var fields = ["artist","lyricist","instruments","composer","keyword","singer","actor","Tag"];
		for(var i=0;i<fields.length;i++) {
			var field = fields[i];
			if($('#orig_track_' + field) !== undefined && $('#orig_track_' + field).val() != undefined ) {
				keywordsForTags = $('#orig_track_' + field).val().split(',');
			}
			$('#'+field+'_track_tags').tagsManager({
				"prefilled": keywordsForTags,
				"hiddenTagListName":"txt_track_" + field,
			});
		}
	}
	
	$('#editTrack').submit(function(e) {
		e.preventDefault();
		var releaseYear = true;
		var releaseYearValidateMsg;
		
		if($('#txt_releaseYear').val() == false){
			releaseYear = false;
			releaseYearValidateMsg = "Release Year Can not be Empty.";
		}
		if(!releaseYear) {
			$('#editTrackResult').css("color","#f00");
			$('#editTrackResult').html(releaseYearValidateMsg);
			$("#txt_releaseYear").focus();
		}
		
		var result = $('#editTrack').parsley('validate');
		if(result === true && releaseYear==true) {
			var options = {
				url:      '/cms/editcontent',        // override for form's 'action' attribute 
				type:      'POST',
				success:       showResponse,  // post-submit callback 
				beforeSubmit: loading
			};
	        $(this).ajaxSubmit(options);
		}
    });
	
	function loading(){
		$('#modalBox').show();
	}
	

	//To create html for new language text box in vernac titles modal
	function inputCompleteHtml(code, value) {
		var divHtml = '<div id="vtitleDiv_'+ code + '">';
		var fullname = $('#langchk_'+code)[0].getAttribute('data-fullname');
		divHtml+='<label class="control-label">' + fullname + '</label>';
		divHtml+='<input type="text" class="input-small form-control" data-required="true" id="contentVtitle_' + code + '" name="contentVtitle_' + code 
		+ '" value="' + value + '"/></div>'
		return divHtml;
	}
	
	//for change action of vernace titles language checkboxes
	$('.ltitlesChkBox').live('change',function() {
		var code = $(this).attr("value");
		if($(this).attr("checked")) {
			var value = "";
			if($('#content_localizedTitle_'+code) !== undefined && $('#content_localizedTitle_'+code).length > 0) {
				value=$('#content_localizedTitle_'+code).val();
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
		var chosenLanguages = $("input[name='content_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			for(var i=0;i<chosenLanguages.length;i++) {
				var code = $(chosenLanguages[i]).val();
				var value = $('#contentVtitle_'+code).val();
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
			var chosenLanguages = $("input[name='content_ltitles']:checked");
			
			
			
			if(chosenLanguages != undefined && chosenLanguages.length > 0) {
				for(var i=0;i<chosenLanguages.length;i++) {
					var code = $(chosenLanguages[i]).val();
					var value = $('#contentVtitle_'+code).val();
					
//					alert(code +"  "+value);
					
					if($('#content_localizedTitle_'+code) === undefined || $('#content_localizedTitle_'+code).length == 0) {
						var newHtml = '<input type="hidden" id="content_localizedTitle_' + code + '" name="content_localizedTitle_' + 
						code + '" value="' +value + '"/>';
						$('#origLocalizedTitles').append(newHtml);
					} else {
						$('#content_localizedTitle_'+code).val(value);
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
		var chosenLanguages = $("input[name='content_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			for(var i=0;i<chosenLanguages.length;i++) {
				var code = $(chosenLanguages[i]).val();
				if($('#content_localizedTitle_'+code) == undefined) {
					$('#langchk_'+code).attr("checked",false);
				}
			}
		}
		$('#addEditVTitles').modal('hide');
	});
	
	$('#addVTitles').click(function (event) {
		event.preventDefault();
		var chosenLanguages = $("input[name='content_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			$('#addEditVTitles').modal('show');
		} else {
			bootbox.alert("No languages selected.");
		}
	});

	
	// post-submit callback 
	function showResponse(responseText, statusText, xhr, $form)  {
		$('#modalBox').hide();
		if(responseText === true) {
			$('#editTrackResult').css("color","#0f0");
			$('#editTrackResult').html('Content successfully uploaded.');
			bootbox.alert("Content Saved Successfully!", function() {
			    console.log("Alert dismissed");
			    window.location.href = "/cms/contentlisting";
			});
		} else {
			$('#editTrackResult').css("color","#f00");
			$('#editTrackResult').html('Content upload failed.');
			bootbox.alert("Content upload Failed");
		}
	}
		
//	$('#txt_mobile_streaming_price').spinedit();
//	$('#txt_mobile_downloding_price').spinedit();
//	$('#txt_web_streaming_price').spinedit();
//	$('#txt_web_downloding_price').spinedit();
	function loadSpinEdits() {
		$('#txt_mobile_streaming_price').spinedit();
		$('#txt_mobile_downloding_price').spinedit();
		$('#txt_web_streaming_price').spinedit();
		$('#txt_web_downloding_price').spinedit();
	}
	

})(jQuery);