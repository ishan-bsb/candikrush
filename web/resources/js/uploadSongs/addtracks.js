$(function() {
	loadAddKeywordAll();
//	loadSpinEdits();
	loadDatePickers();
	
	function loadSpinEdits() {
		$('#txt_mobile_streaming_price').spinedit();
		$('#txt_mobile_downloding_price').spinedit();
		$('#txt_web_streaming_price').spinedit();
		$('#txt_web_downloding_price').spinedit();
	}
	
	function loadAddKeywordAll() {
		//for track keywords
		var fields = ["artist","lyricist","instrument","composer","keyword","singer","actor","Tag"];
		for(var i=0;i<fields.length;i++) {
			var field = fields[i];
			$('#'+field+'_track_add_tags').tagsManager({
				"hiddenTagListName":"txt_track_add_" + field,
				"hiddenTagListId":"txt_track_add_" + field
			});
		}
	}
	
	$('#addT').addClass('page-active');
	$('#tracks').addClass('page-active');
	
	
	$('#date_releasedate').datepicker({ 
		format : 'dd M yyyy',
		autoclose: true,
		onRender: function(date) {
					var nowTemp = new Date();
					var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
					return date.valueOf();// > now.valueOf() ? 'disabled' : '';
				  }
	});
	
	function loadDatePickers() {
		var components = ["startdate","enddate"];
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
	
	
	$('#addTrack').ajaxForm();
	
	$('#addTrack').submit(function(event) {

		event.preventDefault();
		var startdate = $('#startdate').val();
		var enddate = $('#enddate').val();
		var dateValidateResult = true;
		var musicFile =true;
		var prevMusicFile =true;
		var thumbnailRes = true;
		var prevThumbnailRes = true;
		var validateThumbnailMsg;
		var singerValidateMsg;
		var singerRes = true;
		var releaseYear = true;
		var releaseYearValidateMsg;
		
		if(startdate != "" && enddate != "" && new Date(startdate) > new Date(enddate)) {
			dateValidateResult = false;
		} 
		if(!dateValidateResult) {
			$('#saveTrackResult').css("color","#f00");
			$('#saveTrackResult').html('Start date should be less than or equal to End date.');
		}
		
		if($('#txt_track_add_singer').val() == false){
			singerRes = false;
			singerValidateMsg = "Singer Can not be Empty.";
		}
		if(!singerRes) {
			$('#saveTrackResult').css("color","#f00");
			$('#saveTrackResult').html(singerValidateMsg);
			$("#singer_track_add_tags").focus();
		}
		
		if($('#yearpicker').val() == false){
			releaseYear = false;
			releaseYearValidateMsg = "Release Year Can not be Empty.";
		}
		if(!releaseYear) {
			$('#saveTrackResult').css("color","#f00");
			$('#saveTrackResult').html(releaseYearValidateMsg);
			$("#yearpicker").focus();
		}
		
		if(($('#music_file_name').val() == undefined || $('#music_file_name').val().trim() == "") && 
				($('#upload-music-file-info').html() == "")) {
			musicFile = false;
			validateMusicFileMsg = "Music File cannot be empty";
		}
		if(musicFile == true && $('#music_file_name').val() != "" && !($('#music_file_name').val().match(/\.(mp3|mp4)$/i))) {
			musicFile = false;
			validateMusicFileMsg = "Music file can only mp3 OR mp4 file.";
		}
		if(musicFile == true && $('#music_file_name').val() != ""){
			var musicFileSize = document.getElementById('music_file_name').files[0].size;
			if(musicFileSize > 52428800){
				musicFile = false;
				validateMusicFileMsg = "Music file size can not be more than 50 MB.";
			}
		}
		if(!musicFile) {
			$('#saveTrackResult').css("color","#f00");
			$('#saveTrackResult').html(validateMusicFileMsg);
		}
		
		if(prevMusicFile == true && $('#music_prev_file_name').val() != "" && !($('#music_prev_file_name').val().match(/\.(mp3|mp4)$/i))) {
			prevMusicFile = false;
			validatePrevMusicFileMsg = "Preview Music file can only mp3 OR mp4 file.";
		}
		if(prevMusicFile == true && $('#music_prev_file_name').val() != ""){
			var prevMusicFileSize = document.getElementById('music_prev_file_name').files[0].size;
			if(prevMusicFileSize > 52428800){
				prevMusicFile = false;
				validatePrevMusicFileMsg = "Prev. Music file size can not be more than 50 MB.";
			}
		}
		if(!prevMusicFile) {
			$('#saveTrackResult').css("color","#f00");
			$('#saveTrackResult').html(validatePrevMusicFileMsg);
		}
		
		if(($('#thumbnai_url').val() == undefined || $('#thumbnai_url').val().trim() == "") && 
				($('#upload-thumbnail').html() == "")) {
			thumbnailRes = false;
			validateThumbnailMsg = "Thumbnail cannot be empty";
		}
		if(thumbnailRes == true && $('#thumbnai_url').val() != "" && !($('#thumbnai_url').val().match(/\.(gif|jpg|jpeg|tiff|png|bmp)$/i))) {
			thumbnailRes = false;
			validateThumbnailMsg = "Thumbnail can only be a image file.";
		}
		if(thumbnailRes == true && $('#thumbnai_url').val() != ""){
			var thumbnailFileSize = document.getElementById('thumbnai_url').files[0].size;
			if(thumbnailFileSize > 1048576){
				thumbnailRes = false;
				validateThumbnailMsg = "Thumbnail file size can not be more than 1 MB.";
			}
		}
		if(!thumbnailRes) {
			$('#saveTrackResult').css("color","#f00");
			$('#saveTrackResult').html(validateThumbnailMsg);
		}
		
		if(prevThumbnailRes == true && $('#prev_thumbnai_url').val() != "" && !($('#prev_thumbnai_url').val().match(/\.(gif|jpg|jpeg|tiff|png|bmp)$/i))) {
			prevThumbnailRes = false;
			validatePrevThumbnailMsg = "Preview Thumbnail can only be a image file.";
		}
		if(prevThumbnailRes == true && $('#prev_thumbnai_url').val() != ""){
			var prevThumbnailFileSize = document.getElementById('prev_thumbnai_url').files[0].size;
			if(prevThumbnailFileSize > 1048576){
				prevThumbnailRes = false;
				validatePrevThumbnailMsg = "Prev. Thumbnail file size can not be more than 1 MB.";
			}
		}
		if(!prevThumbnailRes) {
			$('#saveTrackResult').css("color","#f00");
			$('#saveTrackResult').html(validatePrevThumbnailMsg);
		}
		
		if (dateValidateResult == true && singerRes == true && thumbnailRes == true && musicFile == true && prevMusicFile == true && prevThumbnailRes == true) {
			$('#saveTrackResult').css("color","#0f0");
			$('#saveTrackResult').html(" ");
			
			var result = $('#addTrack').parsley('validate');
			if(result === true) {
				var options = { 
					url:      '/cms/savetrack',        // override for form's 'action' attribute 
					type:      'POST',
					success:       showResponse,  // post-submit callback
					beforeSubmit: loading()
				};
		        $(this).ajaxSubmit(options); 
			}
		}
    });
	
	function loading(){
//		var x=document.getElementById("modalBox");
//		x.style.display="block";
		$('#modalBox').show();

	}
	
	// post-submit callback 
	function showResponse(responseText, statusText, xhr, $form)  {
		$('#modalBox').hide();
		if(responseText === "true") {
			$('#saveTrackResult').css("color","#0f0");
			$('#saveTrackResult').html('Content successfully uploaded.');
			bootbox.alert("Content Saved Successfully!", function() {
			    console.log("Alert dismissed");
			    location.reload();
			});
		} else {
			$('#saveTrackResult').css("color","#f00");
			$('#saveTrackResult').html('Content upload failed.');
			bootbox.alert("Content upload Failed : "+responseText);
		}
		
	}
	
	$('#btn-upload').click(function() {
		$.post(
                "async",
                function( data ) {
                  $(".result").html(data);
                }
        );
	});
	
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
	

	//To create html for new language text box in vernac titles modal
	function inputCompleteHtml(code, value) {
		var divHtml = '<div id="vtitleDiv_'+ code + '">';
		var fullname = $('#langchk_'+code)[0].getAttribute('data-fullname');
		divHtml+='<label class="control-label">' + fullname + '</label>';
		divHtml+='<input type="text" class="input-small" data-required="true" id="contentVtitle_' + code + '" name="contentVtitle_' + code 
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
	
	$('#addVTitles').click(function () {
		event.preventDefault();
		var chosenLanguages = $("input[name='content_ltitles']:checked");
		if(chosenLanguages != undefined && chosenLanguages.length > 0) {
			$('#addEditVTitles').modal('show');
		} else {
			bootbox.alert("No languages selected.");
		}
	});
	
	
//	$('select[name="genre"]').change(function(){
//	    if ($(this).val() == "2")
//	        alert("call the do something function on option 2");
//	    
//	});
    function addList(){
        var select = document.getElementById("yearpicker");
        for(var i = 2014; i >= 1900; --i) {
        var option = document.createElement('option');
        option.text = option.value = i;
        select.add(option, 0);
          }
         }
    	addList();
});