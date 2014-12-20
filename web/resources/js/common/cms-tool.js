function cleanModal() {
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
	}

$(document).ready(function() {
	loadCirclesComp();
	loadSubGenreBinder();
	loadDatePickers();
	loadLanguageSelectors();
	loadCommonComps();
	loadAllLanguageSelector();

	function loadAllLanguageSelector() {
		if($('#selectAllClang') !== undefined && $('#selectAllClang').length > 0) {
			$('#selectAllClang').live('click',function() {
				var compName = $(this)[0].getAttribute("data-compname");
				if($(this).attr("checked")) {
					$('input[name="' + compName  + '"]').attr("checked",true);
				} else {
					$('input[name="' + compName  + '"]').attr("checked",false);
				}
			});
		}
	}
	
	function loadDatePickers() {
		if($('#date_startdate') !== undefined && $('#date_startdate').length > 0) {
			$('#date_startdate').datetimepicker({
				format : 'yyyy-mm-dd hh:ii',
				autoclose: true,
				onRender: function(date) {
							var nowTemp = new Date();
							return nowTemp.getMilliseconds();
							
						  }
			});
		}
		
		if($('#date_enddate') !== undefined && $('#date_enddate').length > 0) {
			$('#date_enddate').datepicker({ 
				format : 'yyyy-mm-dd hh:ii',
				autoclose: true,
				onRender: function(date) {
							var nowTemp = new Date();
							return nowTemp.getMilliseconds();
						  }
			});
		}
	}
	
	function loadSubGenreBinder() {
		if($('#genre') !== undefined && $('#genre').length > 0) {
			$('#genre').bind('change', function(){
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
				$('#subgenre option').remove();
				
				//data-category
				var subGenreArr = mapping[$(this).val()];
				if(subGenreArr != undefined || subGenreArr != null) {
					$.each(subGenreArr, function (i, item) {
					    $('#subgenre').append($('<option>', { 
					        value: item,
					        text : item 
					    }));
					});
				}
				if($('#subgenre')[0].getAttribute('data-category') == 'search') {
					$("#subgenre").prepend("<option value=''>All</option>")
				}
			});
		}
	}
	
	function loadLanguageSelectors() {
		var inputLang = $('input[name="all-lang"][value="0"]');
		if(inputLang !== undefined && inputLang.length >0) {
			$('input[name="all-lang"][value="0"]').click(function(){
			    if ($(this).is(':checked'))
			    {
			    	$("#languagesTable").removeClass('hide');
			    }
			  });
		}
		var inputAllLang = $('input[name="all-lang"][value="1"]');
		if(inputAllLang !== undefined && inputAllLang.length >0) {
			$('input[name="all-lang"][value="1"]').click(function(){
			    if ($(this).is(':checked'))
			    {
			    	$("#languagesTable").addClass('hide');
			    }
			  });
		}
	}
	
	function loadCirclesComp() {
		var inputCircle = $('input[name="select-circle"][value="2"]');
		if(inputCircle !== undefined && inputCircle.length >0) {
			$('input[name="select-circle"][value="2"]').click(function(){
			    if ($(this).is(':checked'))
			    {
			    	$("#circle-grp-table").removeClass('hide');
			    }
			  });
		}
		var inputPanIndia = $('input[name="select-circle"][value="1"]');
		if(inputPanIndia !== undefined && inputPanIndia.length >0) {
			$('input[name="select-circle"][value="1"]').click(function(){
			    if ($(this).is(':checked'))
			    {
			    	$("#circle-grp-table").addClass('hide');
			    }
			  });
		}
		var inputCircleNone = $('input[name="select-circle"][value=""]');
		if(inputCircleNone !== undefined && inputCircleNone.length >0) {
			$('input[name="select-circle"][value=""]').attr('checked',true);
			$('input[name="select-circle"][value=""]').click(function(){
			    if ($(this).is(':checked'))
			    {
			    	$("#circle-grp-table").addClass('hide');
			    }
			  });
		}
	}
	
	function loadCommonComps() {
		if($('.delete-pack') !== undefined && $('.delete-pack').length > 0) {
			$('.delete-pack').live('click',function(event) {
				event.preventDefault();
				var packageId = $(this)[0].getAttribute("data-id");
				var version = $(this)[0].getAttribute("data-version");
				var packageName = $(this)[0].getAttribute("data-name");
				bootbox.confirm("Are you sure you want to delete package " +  packageId + " with title " + packageName+ "?", function(result) {
					if(result) {
						$.get('/cms/package/delete?id='+packageId+'&v='+version, function(response) {
							if(response === "") {
								bootbox.alert("Package deleted successfully.", function() {
									location.reload();
								});
							}
							else {
								bootbox.alert("Package could not be deleted. Error is " + response);
							}
						});
					}
				}); 
			});
		}
		if($('.delete-radio') !== undefined && $('.delete-radio').length > 0) {
			$('.delete-radio').live('click',function(event) {
				event.preventDefault();
				var radioId = $(this)[0].getAttribute("data-id");
				var version = $(this)[0].getAttribute("data-version");
				var radioName = $(this)[0].getAttribute("data-name");
				bootbox.confirm("Are you sure you want to delete radio " +  radioId + " with title " + radioName+ "?", function(result) {
					if(result) {
						$.get('/cms/radio/delete?id='+radioId+'&v='+version, function(response) {
							if(response === "") {
								bootbox.alert("Radio deleted successfully.", function() {
									location.reload();
								});
							}
							else {
								bootbox.alert("Radio could not be deleted. Error is " + response);
							}
						});
					}
				}); 
			});
		}
		if($('.delete-artists') !== undefined && $('.delete-artists').length > 0) {
			$('.delete-artists').live('click',function(event) {
				event.preventDefault();
				var artistsId = $(this)[0].getAttribute("data-id");
				var version = $(this)[0].getAttribute("data-version");
				bootbox.confirm("Are you sure you want to delete artists " +  artistsId +"?", function(result) {
					if(result) {
						$.get('/cms/artists/delete?id='+artistsId+'&v='+version, function(response) {
							if(response === "") {
								bootbox.alert("Artists deleted successfully.", function() {
									location.reload();
								});
							}
							else {
								bootbox.alert("Artists could not be deleted. Error is " + response);
							}
						});
					}
				}); 
			});
		}
		if($('.delete-moods') !== undefined && $('.delete-moods').length > 0) {
			$('.delete-moods').live('click',function(event) {
				event.preventDefault();
				var moodsId = $(this)[0].getAttribute("data-id");
				var version = $(this)[0].getAttribute("data-version");
				bootbox.confirm("Are you sure you want to delete moods " +  moodsId +"?", function(result) {
					if(result) {
						$.get('/cms/moods/delete?id='+moodsId+'&v='+version, function(response) {
							if(response === "") {
								bootbox.alert("Moods deleted successfully.", function() {
									location.reload();
								});
							}
							else {
								bootbox.alert("Moods could not be deleted. Error is " + response);
							}
						});
					}
				}); 
			});
		}
		if($('.delete-keywords') !== undefined && $('.delete-keywords').length > 0) {
			$('.delete-keywords').live('click',function(event) {
				event.preventDefault();
				var keywordsId = $(this)[0].getAttribute("data-id");
				var version = $(this)[0].getAttribute("data-version");
				bootbox.confirm("Are you sure you want to delete keywords " +  keywordsId +"?", function(result) {
					if(result) {
						$.get('/cms/keywords/delete?id='+keywordsId+'&v='+version, function(response) {
							if(response === "") {
								bootbox.alert("Keywords deleted successfully.", function() {
									location.reload();
								});
							}
							else {
								bootbox.alert("Keywords could not be deleted. Error is " + response);
							}
						});
					}
				}); 
			});
		}
		
		if($('.delete-album') !== undefined && $('.delete-album').length > 0) {
			$('.delete-album').live('click',function(event) {
				event.preventDefault();
				var albumId = $(this)[0].getAttribute("data-id");
				bootbox.confirm("Are you sure you want to delete Album " +  albumId + "?", function(result) {
					if(result) {
						$.get('/cms/album/delete?id='+albumId, function(response) {
							if(response === "") {
								bootbox.alert("Album deleted successfully.", function() {
									location.reload();
								});
							}
							else {
								bootbox.alert("Album could not be deleted. Error is " + response);
							}
						});
					}
				}); 
			});
		}
		if($('.delete-note') !== undefined && $('.delete-note').length > 0) {
			$('.delete-note').live('click',function(event) {
				event.preventDefault();
				var notificationId = $(this)[0].getAttribute("data-id");
				bootbox.confirm("Are you sure you want to delete notification " +  notificationId + "?", function(result) {
					if(result) {
						$.get('/cms/notifications/delete?id='+notificationId, function(response) {
							if(response === "") {
								bootbox.alert("Notification deleted successfully.", function() {
									location.reload();
								});
							}
							else {
								bootbox.alert("Notification could not be deleted. Error is " + response);
							}
						});
					}
				}); 
			});
		}
		if($('.approve-note') !== undefined && $('.approve-note').length > 0) {
			$('.approve-note').live('click',function(event) {
				event.preventDefault();
				var notificationId = $(this)[0].getAttribute("data-id");
				bootbox.confirm("Are you sure you want to approve notification " +  notificationId + "?", function(result) {
					if(result) {
						$.get('/cms/notifications/approve?id='+notificationId, function(response) {
							if(response === "") {
								bootbox.alert("Notification approved successfully.", function() {
									location.reload();
								});
							}
							else {
								bootbox.alert("Notification could not be approved. Error is " + response);
							}
						});
					}
				}); 
			});
		}
		if($('.test-note') !== undefined && $('.test-note').length > 0) {
			$('.test-note').live('click',function(event) {
				event.preventDefault();
				var notificationId = $(this)[0].getAttribute("data-id");
				bootbox.prompt("Test phone number: " , function(result) {
					if(result) {
						$.get('/cms/notifications/test?id='+notificationId+"&msisdn="+result, function(response) {
							if(response === "") {
								bootbox.alert("Notification sent successfully.", function() {
									location.reload();
								});
							}
							else {
								bootbox.alert("Notification could not be sent. Error is " + response);
							}
						});
					}
				}); 
			});
		}
	}
});

