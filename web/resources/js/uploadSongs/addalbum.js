$(document).ready(function() {
	loadSubGenreBinderAlbum();
	cposterContentChangeBinding();
	contentSelectionBinding();
	
	loadSlider();
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
	
	function loadSubGenreBinderAlbum() {
		if($('#genreAlbum') !== undefined && $('#genreAlbum').length > 0) {
			$('#genreAlbum').bind('change', function(){
				var mapping = {
					'Dance' : ["Accoustic Guitar","Baisakhi","Ballad","Basant panchami","Bhai Dooj","Bhangra","Birthday","Carols","Chhath Pooja","Children's Day","Christmas","Country","Diwali","Drums","Durga Puja","Dussehra","Easter","Eid","Father's Day","Flute","Ganesh Chaturthi","Ganesha","Good Friday","Guitar","Guru Purnima","Hanuman Jayanti","Hip Hop","Holi","Indian Classical","Item","Janmasthami","Jazz","Karva Chauth","Krishna","Lakshmi","Lounge","Mahavir Jayanti","Medley","Mother's Day","Naag Panchami","Navratri","New Year","New Year - Ugaadi ","Onam","Party","Piano","Pongala","Pop","Radha ","Rakhi","Raksha Bandhan","Ramanavami","Ramzan","Rath Yatra","Rock","Sai Jayanti","Shiva","Shivratri","Valentine","Voilin","Wedding","Western Classical","Women's Day"],	
					'Romance': ["Accoustic Guitar","Ballad","Bhangra","Christmas","Country","Drums","Flute","Guitar","HipHop","Holi","Indian Classical","Item","Jazz","Karva Chauth","Lounge","Medley","New Year","Party","Piano","Pop","Rock","Sad","Unplugged","Valentines","Voilin","Weddings","Western Classical"],
					'Fusion' : ["Aarti","Accoustic Guitar","Art of Living","Azaan","Baisakhi","Ballad","Bhangra","Birthday","Carols","Chants","Christmas","Country","Drums","Flute","Guitar","Gurbani","Hip Hop","Holi ","Hymns","Indian Classical","Inspirational","Item","Jazz","Lounge","Mantras","Meditation","Medley","Navratri","New Year","Nursery Rhymes","Party","Piano","Pop","Raag","Rock","Sad","Shabad","Stuti","Unplugged","Valentines","Voilin","Weddings","Western Classical"],
					'Remix': ["Accoustic Guitar","Baisakhi","Ballad","Bhangra","Birthday","Carols","Children's Day","Christmas","Country","Drums","Father's Day","Flute","Guitar","Gurbani","Hip Hop","Holi ","Indian Classical","Inspirational","Item","Jazz","Lounge","Meditation","Medley","Mother's Day","Navratri","New Year","Nursery Rhymes","Party","Piano","Pop","Raag","Rock","Sad","Stuti","Unplugged","Valentines","Voilin","Weddings","Western Classical","Women's Day"],
					'Classical': ["Aarti","Accoustic Guitar","Art of Living","Ballad","Bhai Dooj","Carols","Chants","Chhath Pooja","Country","Drums","Durga Puja","Dussehra","Easter","Eid Ul Fitr","Father's Day","Flute","Gandhi Jayanti","Ganesh Chaturthi","Ganesha","Good Friday","Guitar","Gurbani","Guru Gobind Jayanti","Guru Nanak Jayanti","Guru Purnima","Hanuman","Hanuman Jayanti","Independence Day","Indian Classical","Inspirational","Janmasthami","Jazz","Karva Chauth","Krishna","Lakshmi","Lord Ram","Lounge","Mahavir Jayanti","Makara Sankranti","Mantras","Meditation","Medley","Mother's Day","Naag Panchami","Navratri","New Year - Ugaadi","Onam","Piano","Pongala","Pop","Raag","Radha","Raksha Bandhan","Ramanavami","Ramzan","Rath Yatra","Republic Day","Rock","Sad","Sai Baba","Sai Jayanti","Shabad","Shiva","Shivratri","Sita","Stuti","Unplugged","Valentines","Voilin","Western Classical","Women's Day","basant panchami"],
					'Occasions': ["Baisakhi","Basant panchami","Bhai Dooj","Birthday","Carols","Chhath Pooja","Children's Day","Christmas","Diwali","Durga Puja","Dussehra","Easter","Eid","Eid Ul Fitr","Father's Day","Gandhi Jayanti","Ganesh Chaturthi","Ganesha","Good Friday","Gurbani","Guru Gobind Jayanti","Guru Nanak Jayanti","Guru Purnima","Hanuman","Hanuman Jayanti","Holi","Independence Day","Janmasthami","Karva Chauth","Krishna","Lakshmi","Lord Ram","Mahavir Jayanti","Makara Sankranti","Mother's Day","Naag Panchami","Navratri","New Year","New Year - Ugaadi","Onam","Party","Pongala","Radha","Rakhi","Raksha Bandhan","Ramanavami","Ramzan","Rath Yatra","Republic Day","Sai Baba","Sai Jayanti","Shabad","Shiva","Shivratri","Sita","Stuti","Valentines","Weddings","Women's Day"],
					'Ghazals' : ["Accoustic Guitar","Drums","Flute","Guitar","Indian Classical","Inspirational","Lounge","Medley","Piano","Pop","Sad","Unplugged","Voilin"],
					'Others': ["Aarti","Accoustic Guitar","Art of Living","Azaan","Ballad","Bhangra","Birthday","Carols","Chants","Children's Day","Christmas","Country","Drums","Easter","Eid","Eid Ul Fitr","Father's Day","Flute","Good Friday","Guitar","Hip Hop","Hymns","Independence Day","Indian Classical","Inspirational","Item","Jazz","Lounge","Mantras","Meditation","Medley","Mother's Day","New Year","Nursery Rhymes","Party","Piano","Pop","Raag","Republic Day","Rock","Sad","Unplugged","Valentines","Voilin","Weddings","Western Classical","Women's Day"],
					'International' : ["Aarti","Accoustic Guitar","Alternative","Art of Living","Azaan","Ballad","Bhangra","Birthday","Blues","Carols","Chants","Children's Day","Christmas","Country","Drums","Easter","Eid","Eid Ul Fitr","Father's Day","Flute","Good Friday","Guitar","Hip Hop","Hymns","Independence Day","Indian Classical","Inspirational","Item","Jazz","Lounge","Mantras","Meditation","Medley","Metal","Mother's Day","New Year","Nursery Rhymes","Party","Piano","Pop","Punk Rock","RnB","Raag","Rap","Reggae","Republic Day","Rock","Sad","Unplugged","Valentines","Voilin","Weddings","Western Classical","Women's Day"],
					'Patriotic': ["Accoustic Guitar","Baisakhi","Drums","Flute","Gandhi Jayanti ","Guitar","Guru Gobind Jayanti","Guru Nanak Jayanti","Independence Day","Indian Classical","Inspirational","Piano","Republic Day","Sad","Voilin","Western Classical"],
					'Childhood' : ["Accoustic Guitar","Baisakhi","Ballad","Bhai Dooj","Bhangra","Carols","Children's Day","Christmas","Country","Diwali","Drums","Easter","Flute","Good Friday","Guitar","Hip Hop","Holi","Indian Classical","Inspirational","Jazz","Lounge","Medley","New Year","Nursery Rhymes","Party","Piano","Pop","Rakhi","Raksha Bandhan","Rock","Sad","Stuti","Unplugged","Voilin","Western Classical"],
					'Qawwalis' : ["Ballad","Bhangra","Hip Hop ","Item","Jazz","Lounge","Medley","Party","Pop","Rock ","Sad","Unplugged","Weddings"],
					'Spiritual' : ["Aarti","Accoustic Guitar","Art of Living","Azaan","Baisakhi","Basant panchami","Bhai Dooj","Carols","Chants","Chhath Pooja","Christmas","Diwali","Drums","Durga Puja","Dussehra","Easter","Eid","Eid Ul Fitr","Flute","Ganesh Chaturthi","Ganesha","Good Friday","Guitar","Gurbani","Guru Gobind Jayanti","Guru Nanak Jayanti","Guru Purnima","Hanuman","Hanuman Jayanti","Hymns","Indian Classical","Inspirational","Janmasthami","Karva Chauth","Krishna","Lakshmi","Lord Ram","Mahavir Jayanti","Makara Sankranti","Mantras","Meditation","Medley ","Naag Panchami","Navratri","New Year - Ugaadi","Onam","Piano","Pongala","Raag","Radha","Raksha Bandhan","Ramanavami","Ramzan","Rath Yatra","Sad","Sai Baba","Sai Jayanti","Shabad","Shiva","Shivratri","Sita","Stuti","Voilin","Western Classical"],
					'Sufi' : ["Accoustic Guitar","Azaan","Ballad","Chants ","Country","Drums","Flute","Guitar","Hip Hop","Indian Classical ","Inspirational","Jazz","Lounge","Meditation","Party","Piano","Pop","Raag","Rock","Sad","Unplugged","Valentines ","Voilin","Weddings"],
					'Instrumental': ["Aarti","Accoustic Guitar","Art of Living","Azaan","Baisakhi","Ballad","Basant panchami","Bhai Dooj","Bhangra","Birthday","Carols","Chants","Chhath Pooja","Children's Day","Christmas","Country","Diwali","Drums","Durga Puja","Dussehra","Easter","Eid","Eid Ul Fitr","Father's Day","Flute","Gandhi Jayanti","Ganesh Chaturthi","Ganesha","Good Friday","Guitar","Gurbani","Guru Gobind Jayanti","Guru Nanak Jayanti","Guru Purnima","Hanuman","Hanuman Jayanti","Hip Hop","Holi","Hymns","Independence Day","Indian Classical","Inspirational","Item","Janmasthami","Jazz","Karva Chauth","Krishna","Lakshmi","Lord Ram","Lounge","Mahavir Jayanti","Makara Sankranti","Mantras","Meditation","Medley","Mother's Day","Naag Panchami","Navratri","New Year","New Year - Ugaadi","Nursery Rhymes","Onam","Party","Piano","Pongala","Pop","Raag","Radha","Rakhi","Raksha Bandhan","Ramanavami","Ramzan","Rath Yatra","Republic Day","Rock","Sad","Sai Baba","Sai Jayanti","Shabad","Shiva","Shivratri","Sita","Stuti","Unplugged","Valentines","Voilin","Weddings","Western Classical","Women's Day"]
				};
				$('#subgenreAlbum option').remove();
				
				//data-category
				var subGenreArr = mapping[$(this).val()];
				if(subGenreArr != undefined || subGenreArr != null) {
					$.each(subGenreArr, function (i, item) {
					    $('#subgenreAlbum').append($('<option>', { 
					        value: item,
					        text : item 
					    }));
					});
				}
				if($('#subgenreAlbum')[0].getAttribute('data-category') == 'search') {
					$("#subgenreAlbum").prepend("<option value=''>All</option>")
				}
			});
		}
	}
	
	$('.cmspag').live('click' ,function(event) {
		event.preventDefault();
		current_page = $(this)[0].getAttribute('data-pageno');
		populateSearchParams();
		populateSearchResult();
	});
	
	function populateSearchResult() {
		var contentStatus = $("#contentStatus").val();
		var statusSearchCheck = true;
		var validationMsg = "";
		var page = 0;
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
					url:      '/cms/tracks/searchforalbum?page='+page,       // override for form's 'action' attribute 
					type:      'GET',
					target: '#trackSearchForAlbum'// post-submit callback 
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
	
	$('#addA').addClass('page-active');
	$('#albums').addClass('page-active');
	
	
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
	
	function updateTdPositions() {
		var allPositionTds = $(".tdposition");
		$.each(allPositionTds, function (i, item) {
			var trId = $(item).closest('tr').attr('id');
			var index = $(item).closest('tr').attr('id').split('_')[1];
			$(item).html(index);
		});
	}
	
	$('#search-tracks').ajaxForm();
	$('#search-tracks').submit(function(event) {
		event.preventDefault();
		var contentStatus = $("#contentStatus").val();
		var statusSearchCheck = true;
		var validationMsg = "";
		var page = 0;
		if(contentStatus != "PUBLISH_PUBLISHED"){
			statusSearchCheck = false;
			validationMsg = "You Have selected Non-Published Status in search. Please change";
		}
		if(statusSearchCheck == true){
			
			var options = {
	//				url:      '/cms/tracks/search?page='+page,       // override for form's 'action' attribute 
					url:      '/cms/tracks/searchforalbum?page='+page,
					type:      'GET',
					target: '#trackSearchForAlbum',// post-submit callback 
					success: panelControl()
			};
			$(this).ajaxSubmit(options);
		}
		else{
			bootbox.alert(validationMsg);
		}
    });

//selecting tracks to be saved
	$('.addedTracks').live('change',function() {
		var albumType = $("#album_creatorType").val();
		var contentIdsList = $("#album_contentIds").val().trim();
		var contentId = $(this).val();
		var contentIdSrch = ',add_' + contentId + ',';
		if(contentId != "" && albumType == "bsb-playlist") {
			if($(this).attr("checked")) {
				var contentIdSrchRem = ',rem_' + contentId + ',';
	            if(contentIdsList.indexOf(contentIdSrch) === -1 && contentIdsList.indexOf(contentIdSrchRem) === -1) {
	            	contentIdsList += ('add_'+contentId + ',');
	            } else if(contentIdsList.indexOf(contentIdSrchRem) !== -1) {
	            	contentIdsList =  contentIdsList.replace(contentIdSrchRem, ",add_" + contentId + ",");
	            }
	            $("#album_contentIds").val(contentIdsList);
	        } 
			else {
	        	if(contentIdsList.indexOf(contentIdSrch) !== -1) {
	        		contentIdsList = contentIdsList.replace(contentIdSrch,",rem_" + contentId + "," );
//	        		var startIdx = contentIdsList.indexOf(contentIdSrch);
//	        		contentIdsList = contentIdsList.substring(0,startIdx) + contentIdsList.substring(startIdx+contentIdSrch.length-1,contentIdsList.length);
	        		$("#album_contentIds").val(contentIdsList);
	        	}
	        }
		}
	});
	

	//adding the track to Album
	$('.searchedTracks').live('click',function(event) {
		event.preventDefault();
		var title = $("#txt_album_title").val();
		var contentIdsList = $("#album_contentIds").val().trim();
		var size = 0;
		if(contentIdsList !== "") {
			size = contentIdsList.split(',').length+1-2;
		}	
		var contentId = $(this)[0].getAttribute("data-id");
		var contentIdSrch = ',add_' + contentId + ',';
		var selectedContentCount = parseInt($('#contentCount').val());
		if(contentId != "") {
			if(contentIdsList.indexOf(contentIdSrch) === -1) {
				contentIdsList += ("add_" + contentId + ',');
				$("#album_contentIds").val(contentIdsList);
				var title = $(this)[0].getAttribute('data-title');
				var imgSrc = $(this)[0].getAttribute('data-src');
				var type = $(this)[0].getAttribute('data-type');
				var icon = '<i class="glyphicon-folder-close"></i>';
				var previewComp = '';
				if(type === 'content') {
					var prevUrl = $(this)[0].getAttribute("data-preview");
					previewComp = '<audio controls style="width: 152px;"><source src="' + prevUrl + '" type="audio/mpeg"></source>Not supported</audio>';
					icon='<i class="glyphicon glyphicon-folder-music"></i>';
				}
				$('#contentIdsTable').append('<tr id="addedtracks_'+ size + '"><td style="word-break: break-word;" class="tdposition">' + size + '</td><td style="word-break: break-word;"><input type="checkbox" id="contentIdsList" class="addedTracks" name="contentIdsList" value="'+ contentId +
						'" checked/></td><td style="word-break: break-word;"><img src="'+ imgSrc +'" />'+ previewComp +'</td><td style="word-break: break-word;">'+ title +'</td><td style="word-break: break-word;"><input type="radio" class="addedTracksPoster" id="posterContentIdsList" name="posterContentIdsList" value="'+ contentId +
						'" unchecked/></td><td style="word-break: break-word;"><input type="checkbox" class="reorderContentSet" id="reorderSet" name="reorderSet" value="'+ contentId +'"/></td><td style="word-break: break-word;"><input type="radio" class="reorderContent" id="reorder" name="reorder" value="'+ contentId +
						'" unchecked/></td></tr>');
				
				$('#contentCount').val(parseInt($('#contentCount').val())+1);
				updateTdPositions();
				cposterContentChangeBinding();
				contentSelectionBinding();
//					editPreserveAddedItems();
			}
		}
	});
	
// Album Auto-Save request

	setInterval(function editPreserveAddedItems(){
		
		var reqParamVal="";
		var albumMongoId = $("#txt_album_mongoId").val();
		var albumId = $("#txt_album_id").val();
		var albumCreatorType = $("#album_creatorType").val();
		var title = $("#txt_album_title").val();
		var keywords = $("#txt_album_keyword").val();
		var language = $("#language").val();
		var partner = $("#pic_album_partner").val();
		var partnerOnEdit = $("#album_contentPartner_edit").val();
//		var tag = $("#albumTags").val();
		var posterContentId = $("#txt_poster_content_id").val();
		var contentIdsList = $("#album_contentIds").val();
		var category = $("#txt_category").val();
		var mood = $("#albummooditem").val();
		var genre = $("#genreAlbum").val();
		var subGenre = $("#subgenreAlbum").val();
		var validFrom = $("#validfrom").val();
		var validTo = $("#valid_upto").val();
		var rank = $("#txt_rank").val();
		var publishedYear = $("#txt_releaseYear").val();
		var mobDwn = $("#mobile_download").val();
		var webDwn = $("#web_download").val();
		var desc = $("#txt_description").val();
		var circleType = $('input[name=select-circle]:checked').val();
		var varnacTitle = "";
		var tag ="";
		var priority = $("#txt_Album_priority").val();
		
		$("input[name='albumTags']:checked").each( function () {
			tag = tag+","+$(this).val();
		});
		
		$("input[name='album_ltitles']:checked").each( function () {
			var vLang = $(this).val()
			var title = $("#album_localizedTitle_"+vLang).val();
			varnacTitle = varnacTitle+"#"+vLang+"@"+title;
		});
		
		
		if(albumCreatorType !=""){
			reqParamVal="albumCreatorType="+albumCreatorType;
		}
		if(title !=""){
			reqParamVal=reqParamVal+"&title="+title;
		}
		if(albumId !=""){
			reqParamVal=reqParamVal+"&albumId="+albumId;
		}
		if(keywords !=""){
			reqParamVal=reqParamVal+"&keywords="+keywords;
		}
		if(language !=""){
			reqParamVal=reqParamVal+"&language="+language;
		}
		
		if(partner !="" && partner !== undefined){
			reqParamVal=reqParamVal+"&partnerAdd="+partner;
		}
		else if(partnerOnEdit !="" && partnerOnEdit !== undefined){
			reqParamVal=reqParamVal+"&partnerEdit="+partnerOnEdit;
		}
		
		if(tag !=""){
			reqParamVal=reqParamVal+"&tag="+tag;
		}
		if(posterContentId !=""){
			reqParamVal=reqParamVal+"&posterContentId="+posterContentId;
		}
		if(contentIdsList !="" && contentIdsList !=","){
			reqParamVal=reqParamVal+"&contentIdsList="+contentIdsList;
		}
		if(category !=""){
			reqParamVal=reqParamVal+"&category="+category;
		}
		if(mood !=""){
			reqParamVal=reqParamVal+"&mood="+mood;
		}
		if(genre !=""){
			reqParamVal=reqParamVal+"&genre="+genre;
		}
		if(subGenre !=""){
			reqParamVal=reqParamVal+"&subGenre="+subGenre;
		}
		if(validFrom !=""){
			reqParamVal=reqParamVal+"&validFrom="+validFrom;
		}
		if(validTo !=""){
			reqParamVal=reqParamVal+"&validTo="+validTo;
		}
		if(publishedYear != ""){
			reqParamVal=reqParamVal+"&publishedYear="+publishedYear;
		}
		if(rank !=""){
			reqParamVal=reqParamVal+"&rank="+rank;
		}
		if(desc !=""){
			reqParamVal=reqParamVal+"&desc="+desc;
		}
		if(circleType != "" && circleType == 1){
			reqParamVal=reqParamVal+"&circle=all";
		}
		if(priority != ""){
			reqParamVal=reqParamVal+"&priority="+priority;
		}
		if(circleType != "" && circleType == 2){
			var loc = "";
			$("input[name='cityName']:checked").each( function () {
				loc = loc +","+$(this).val();
			});
			reqParamVal=reqParamVal+"&circle="+loc;
		}
		if(varnacTitle != ""){
			reqParamVal=reqParamVal+"&varnacTitle="+varnacTitle;
		}
		reqParamVal=reqParamVal+"&mobDwn="+mobDwn;
		
		var data = new FormData();
		data.append("queryString", reqParamVal);
		
		data.append("thumbnailUrl", thumbnai_url.files[0]);
		data.append("previewThumbnailUrl", prev_thumbnai_url.files[0]);
		
		$.ajax({
//			url:"/cms/bulkeditcontent?contentIdList="+contentIdList+"&action="+action+reqParamVal,
			url:"/cms/albumautosave",
			type : "POST",
			data : data,
			processData : false,
			contentType : false,
			success : function(response) {
				albumMongoId = response;
//				bootbox.alert(response);
				$("#txt_album_id").val(albumMongoId);
			},
			error : function(jqXHR, textStatus, errorMessage) {
				console.log("Save failed"+errorMessage);
			}
		});
		
		$("#txt_album_mongoId").val(albumMongoId);
		
	}, 300000);

//	setInterval(function FetchData() {
//		alert("hello timer");
//	}, 10000);
		
	
	//moving the track up
	$('.moveup').live('click', function(event) {
		event.preventDefault();
		var trId = $(this).closest('tr').attr('id');
		var index = $(this).closest('tr').attr('id').split('_')[1];
		var nxtIndex = parseInt(index, 10) - 1;
		if(nxtIndex > 0) {
			var id = $(this)[0].getAttribute("data-id");
			var srchTxt = '_' + id + ',';
			var contentIdsList = $("#album_contentIds").val().trim();
			if(contentIdsList.indexOf(srchTxt) !== -1) {
				var lengthSrchTxt = srchTxt.length;
				var wholeTxt = contentIdsList.substring(contentIdsList.indexOf(srchTxt)-3,contentIdsList.indexOf(srchTxt)+lengthSrchTxt-1);
				var idsArr = contentIdsList.split(',');
				idsArr.splice(index,1);
				idsArr.splice(index-1,0,wholeTxt);
				var contentIdsListNew = idsArr.join();
				$("#album_contentIds").val(contentIdsListNew);
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
		var contentIdsList = $("#album_contentIds").val().trim();
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
				$("#album_contentIds").val(contentIdsListNew);
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
		var contentIdsList = $("#album_contentIds").val().trim();
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
		$("#album_contentIds").val(contentIdsListNew);

		cposterContentChangeBinding();
                contentSelectionBinding();
		updateTdPositions();
	});
	
	function cposterContentChangeBinding() {
		$("input[name=posterContentIdsList]").off();
		$("input[name=posterContentIdsList]").bind('change', function(){
			var trackId = $(this).val();
		   $('#txt_poster_content_id').val(trackId)
		});
	}
	
	$('.reorderContent').live('click', function(event) {
		event.preventDefault();
		var contentLstArr = [];
		$(".reorderContentSet:checked").each(function() {
			contentLstArr.push("add_"+$(this).val()+"_"+$(this).closest('tr').attr('id').split('_')[1]);
	    });
		var trId = $(this).closest('tr').attr('id');
//			var index = $(this).closest('tr').attr('id').split('_')[1];
		var id = $(this).val();
		var srchTxt = '_' + id + ',';
		var contentIdsList = $("#album_contentIds").val().trim();
		if(contentIdsList.indexOf(srchTxt) !== -1) {
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
			$("#album_contentIds").val(contentIdsListNew);

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
			for(var i =0; i <trIdsArr.length; i++){
				if(trIdsArr[i] != ""){
					$('#' + trIdsArr[i]).find('#serialNo').html((i+1));
					var tdHtml = $('#' + trIdsArr[i]).html();
					tableTdHtml = tableTdHtml+"<tr id=addedtracks_"+(i+1)+">"+tdHtml+"</tr>";
				}
			}
			$('#table-body').html(tableTdHtml);
		}
		updateTdPositions();
		cposterContentChangeBinding();
		contentSelectionBinding();
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
	
	function contentSelectionBinding() {
		$("input[name=contentIdsList]").off();
		$("input[name=contentIdsList]").bind('change', function(){
			var trackId = $(this).val();
			if(!$(this).is(':checked')){
				var posterId = $('#txt_poster_content_id').val();
				$('#contentCount').val(parseInt($('#contentCount').val())-1);
				var contentSelected = $(this).val();
				if(contentSelected == posterId)
					bootbox.alert("Unchecked ID is PosterId. Please Re-Set PosterContent.");
			}
			else if($(this).is(':checked')){
				$('#contentCount').val(parseInt($('#contentCount').val())+1);
			}
			
		});
	}
	
	
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
	
	$("#loginLink").click (function toggleTable(){
         var elem=document.getElementById("audioControl");
         var hide = elem.style.display =="none";
         if (hide) {
             elem.style.display="table";
        } 
        else {
           elem.style.display="none";
        }
    });
	
});
