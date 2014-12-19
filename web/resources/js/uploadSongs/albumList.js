$(document).ready(function() {

	loadSubGenreBinderAlbum();
	
	/*
	 * bulk delete events
	 */
	$('.deleteAlbum').click(function(){
        var thisID    = $(this).attr('id');
        var checked = 0;
        var total = 0;
        $('.deleteAlbum').each(function(index, val) {
            if ($(this).attr('id') == thisID) {
                total++;
            }
        });
        $('.deleteAlbum:checked').each(function(index, val) {
            if ($(this).attr('id') == thisID) {
                checked++;
            }
        });
        if (total == checked) {
        	$(".selectDeselectAlbums").prop("checked", true);
        	$(".selectDeselectAlbums").prop("indeterminate", false);
        } else if (checked == 0) {
        	$(".selectDeselectAlbums").prop("checked", false);
        	$(".selectDeselectAlbums").prop("indeterminate", false);
        } else {
        	$(".selectDeselectAlbums").prop("indeterminate", true);
        }
    }); 
	
	$("#selectDeselectAll").click(function(){
        $(".deleteAlbum").prop("checked",$("#selectDeselectAll").prop("checked"))
        $('#deleteAll').prop("disabled", !this.checked);
    })
	
	var checkboxes = $(':checkbox:not(#selectDeselectAll)').click(function(event){
        $('#deleteAll').prop("disabled", checkboxes.filter(':checked').length == 0);
    });
	
	$(".deleteAllAlbum").on('click', function (event) {
		var albumIdList = "";
		$('input[type="checkbox"]:checked').each(function(){
			var albumId = $(this).parent('td').parent('tr').children('td.idToDelete').text();
			albumIdList = albumIdList + "," + albumId;
        });
		
		bootbox.confirm("Are you sure you want to delete All contents", function(result) {
			if(result){
				$.ajax({
					type:"POST",
					url:"/cms/deleteallalbum?albumIdList="+albumIdList,
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
	$(".delete").on('click', function (event) {

		 var tr = $(this).closest('tr');
		 var albumId = tr.find('.idToDelete').text();
		  bootbox.confirm("Are you sure you want to delete Album ID : " +  albumId + "?", function(result) {
			  if(result) {
				  var finalData;
				  $.ajax({
						type:"GET",
						url:"/cms/deletealbum?albumId="+albumId,
						success:function (data) {
							location.reload();
					    }
					});
			  	}
		  });
    });
	
	/*
	 * Clear cache
	 */
	$(".clearcache").on('click', function (event) {

		 var tr = $(this).closest('tr');
		 var albumId = tr.find('.idToDelete').text();
		  bootbox.confirm("Are you sure you want to clear cache of Album ID : " +  albumId + "?", function(result) {
			  if(result) {
				  var finalData;
				  $.ajax({
						type:"GET",
						url:"/cms/clearcache?contentId=" + albumId+"&type=album",
						success:function (data) {
							bootbox.alert("Cache Clear of ID "+albumId+" : "+data);
					    }
					});
			  	}
		  });
    });
	
	//selecting Album to be deleted
	$('.addedAlbum').live('change',function() {
		var contentIdsList = $("#album_Ids").val().trim();
		var albumId = $(this).val();
		var albumIdChecked = ',add_' + albumId + ',';
		if(contentId != "") {
			if($(this).attr("checked")) {
				var contentIdSrchRem = ',rem_' + contentId + ',';
	            if(contentIdsList.indexOf(contentIdSrch) === -1 && contentIdsList.indexOf(contentIdSrchRem) === -1) {
	            	contentIdsList += ('add_'+contentId + ',');
	            } else if(contentIdsList.indexOf(contentIdSrchRem) !== -1) {
	            	contentIdsList =  contentIdsList.replace(contentIdSrchRem, ",add_" + contentId + ",");
	            }
	            $("#album_Ids").val(contentIdsList);
				
			}
			else{
				if(contentIdsList.indexOf(contentIdSrch) !== -1) {
	        		contentIdsList = contentIdsList.replace(contentIdSrch,",rem_" + contentId + "," );
//	        		var startIdx = contentIdsList.indexOf(contentIdSrch);
//	        		contentIdsList = contentIdsList.substring(0,startIdx) + contentIdsList.substring(startIdx+contentIdSrch.length-1,contentIdsList.length);
	        		$("#album_Ids").val(contentIdsList);
	        	}
			}
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
	
//	$(".deleteAll").on('click', function (event) {
//		alert("Delete All Clicked");
//		 var tr = $(this).closest('tr');
//		 var albumId = tr.find('.id').text();
//		  bootbox.confirm("Are you sure you want to delete Album ID : " +  albumId + "?", function(result) {
//			  if(result) {
//				  var finalData;
//				  $.ajax({
//						type:"GET",
//						url:"/cms/deletealbum?albumId="+albumId,
//						success:function (data) {
//							location.reload();
//					    }
//					});
//			  	}
//		  
//		  });
//   });
	
	$('#albumL').addClass('page-active');
	$('#albums').addClass('page-active');
	
	
});