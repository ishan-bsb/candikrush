var ContentListModule = (function($){

	var totalCount = 0;
	var pageIndex = 0;
	var pageSize = 10;
	var pages = [];

	return {
		init : initialize,
		findMappedCategory : findMappedCategory,
		findMappedPartner : findMappedPartner,
		getReadableDate : getReadableDate
		
	};
	
	function initialize() {
		$("#gallery-tags").tagsManager();
		alertBinding();
		checkboxChangeBinding();
		bindTitleFilter();
		bindGalleryIdFilter();
		loadCategoriesAndGalleries();
	}
	
	function alertBinding(){
		$(' #success-alert button' ).off();
		$(' #error-alert button' ).off();
		$(' #success-alert button' ).click(function(){
			$('#success-alert').hide();
		});
		$(' #error-alert button' ).click(function(){
			$('#error-alert').hide();
		});
	}
	function checkboxChangeBinding() {
		$('.radio input').off();
		$('.radio input').change(function() {
			selectedCategory = '';
    	    selectedLanguage = $(this).val();
        	resetPageParams();
			toggleControls();
			loadCategoriesAndGalleries();        
    	});
	}
	function bindTitleFilter() {
		$('#title-filter-button').off();
		$('#title-filter-button').click(function(e){
			e.preventDefault();
			selectedTitle = $('#title-filter-text').val();
			resetPageParams();
			toggleControls();
			loadGalleries();
		});
	}
	function bindGalleryIdFilter() {
		$('#galleryid-filter-button').off();
		$('#galleryid-filter-button').click(function(e){
			e.preventDefault();
			selectedGalleryId = $('#galleryid-filter-text').val();
			resetPageParams();
			toggleControls();
			loadGalleries();
		});
	}
	//private methods : Not exposed to outer scope
	function loadCategoriesAndGalleries() {
	    console.log('Load categories called.');
		$.getJSON(URLS.CATEGORY(selectedLanguage)).done(function(data){
			categories = data;
			applyCategoryTemplate();
			bindCategoriesFilter();
			loadPartners();
		}).fail(function(){
				console.log('Fetch failed for categories');
		});
	}
	
	function getReadableDate(millisec) {
			var convertedDate = new Date(millisec);
			return convertedDate.customFormat( "#DD#/#MMM#/#YYYY# #hh#:#mm# #AMPM#" );
	}
	function findMappedPartner(id) {
			var matchedPartner = $.grep(partners, function(e){ return e.id == id; });
			if(matchedPartner.length > 0) {
				return matchedPartner[0].name;
			} else {
				return id;
			}
	}
	
	function findMappedCategory(categoryId) {
			var matchedCategory = $.grep(categories, function(e){ return e.categoryId == categoryId; });
			if(matchedCategory.length > 0) {
				return matchedCategory[0].category;
			} else {
				return categoryId;
			}
	}
	
	function bindCategoriesFilter() {
		$('#categories-filter').off();
		$('#categories-filter').change(function(){
			selectedCategory = $(this).val();
			resetPageParams();
			toggleControls();
			loadGalleries();
		});
	}
	
	function bindPartnersFilter() {
		$('#partners-filter').off();
		$('#partners-filter').change(function(){
			selectedPartner = $(this).val();
			resetPageParams();
			toggleControls();
			loadGalleries();
		});
	}
	function editGalleryClickBinding() {
		$('.editGallery').off();
		$('.editGallery').click(function(e){
			e.preventDefault();
			resetEditGalleryForm();
			var data = $(this).tmplItem().data;
			fillForm(data);
			$('#myModal').modal();
		});
	}
	function resetEditGalleryForm() {
		$("#editGalleryForm")[0].reset();
		if($('span.tm-tag').length > 0) {
			$("#gallery-tags").tagsManager('empty');
		}
	}
	
	
	function saveGalleryClickBinding() {
		$('#saveGallery').off();
		$('#saveGallery').click(function(e){
			e.preventDefault();
			var galleryid = $('#galleryid').val();
			var matchedGallery = $.grep(galleries, function(e){ return e.galleryid == galleryid; });
			if(matchedGallery.length > 0) {
				var objToSend = { galleryid : matchedGallery[0].galleryid };
				if(matchedGallery[0].title.trim() !== $('#title').val().trim()) {
					matchedGallery[0].title = $('#title').val().trim();
					objToSend['title'] = matchedGallery[0].title;
				}
				var tagValues = $('input[name="hidden-gallery-tags"]').val();
				tagValues = tagValues=='' ? [] : tagValues.split(';');
				if(!_.isEqual(matchedGallery[0].tags, tagValues)) {
					objToSend['tags'] = tagValues;
					matchedGallery[0].tags = tagValues;
				}
				if(matchedGallery[0].category !== $("#categories-filter-edit").val()) {
					objToSend['category'] = $("#categories-filter-edit").val();
					matchedGallery[0].category = $("#categories-filter-edit").val();
				}
				toggleControls();
				$.post(URLS.GALLERY(), JSON.stringify(objToSend))
					.done(function(data) {
						applyGalleryTemplate();
						applyPageTemplate();
						bindPagingActions();
						editGalleryClickBinding();
						saveGalleryClickBinding();
						toggleControls();
						$('#success-alert').show();
				})
					.fail(function(){
						console.log("Gallery info update failed");
						$('#error-alert').show();
				});
					
			}
			$('#myModal').modal('hide');
		});
	}

	function fillForm(data) {
		$("#title").val(data.title);
		applyCategoryEditTemplate();
		$("#categories-filter-edit").val(data.category);
		$("#galleryid").val(data.galleryid);
		$("#gallerysize").val(data.gallerysize);
		$("#partnerid").val(findMappedPartner(data.partnerid));
		$("#lastupdated").val(getReadableDate(data.lastupdated));
		if(typeof data.tags !== 'undefined' && data.tags != null) {
			for(var i=0;i<data.tags.length;i++) {
				$("#gallery-tags").tagsManager('pushTag',data.tags[i]);
			}
		}
	}
	
	
	
	function bindPagingActions() {
		$('#paging-Prev').off();
		$('#paging-Next').off();
		$('#paging-First').off();
		$('#paging-Last').off();
		$('.paging-change').off();
		$('#paging-Prev').click(function(e){
			e.preventDefault();
			if($(this).parent().hasClass('disabled')) {
				return;
			}
			previousPage();
			toggleControls();
			loadGalleries();
		});
		
		$('#paging-Next').click(function(e){
			e.preventDefault();
			if($(this).parent().hasClass('disabled')) {
				return;
			}
			nextPage();
			toggleControls();
			loadGalleries();
		});
		$('#paging-First').click(function(e){
			e.preventDefault();
			if($(this).parent().hasClass('disabled')) {
				return;
			}
			firstPage();
			toggleControls();
			loadGalleries();
		});
		$('#paging-Last').click(function(e){
			e.preventDefault();
			if($(this).parent().hasClass('disabled')) {
				return;
			}
			lastPage();
			toggleControls();
			loadGalleries();
		});
		
		$('.paging-change').click(function(e){
			e.preventDefault();
			if($(this).parent().hasClass('active')) {
				return;
			}
			moveToPage($(this).text());
			toggleControls();
			loadGalleries();
		});
	}
	
	
	function applyGalleryTemplate() {
		var renderedHtml = $("#galleryTemplate").tmpl(galleries);
		$("#galleryBody").html(renderedHtml);
	}
	
	function applyCategoryTemplate() {
		console.log('applyCategoryTemplate  called.');
		var renderedHtml = $("#categoryTemplate").tmpl(categories);
		$("#categories-filter").html('<option value="">Choose...</option>').append(renderedHtml);
		
	}
	function applyCategoryEditTemplate() {
		var renderedHtml = $("#categoryTemplate").tmpl(categories);
		$("#categories-filter-edit").html(renderedHtml);
		
	}
	function applyPartnerTemplate() {
		console.log('applyPartnerTemplate  called.');
		var renderedHtml = $("#partnerTemplate").tmpl(partners);
		$("#partners-filter").html('<option value="">Choose...</option>').append(renderedHtml);
	}
	
	function applyPageTemplate() {
	    var renderedHtml = $("#pageTemplate").tmpl(pages);
		$("#paging-control").html(renderedHtml);
		
	}
	
	function loadPartners() {
		$.getJSON(URLS.PARTNER).done(function(data){
			partners = data;
			applyPartnerTemplate();
			bindPartnersFilter();
			loadGalleries();
		}).fail(function(){
				console.log('Fetch failed for categories');
		});
	}
	function loadGalleries() {
		
	    console.log('Load gallery called. Category length is : '+ categories.length);
		$.getJSON(URLS.GALLERY(pageIndex, pageSize, selectedCategory, selectedGalleryId ,selectedPartner, selectedTitle,selectedLanguage)).done(function(data) {
			galleries = data.result;
			totalCount = data.total;
			updateMaxPageIndex();
			updatePages();
			applyGalleryTemplate();
			applyPageTemplate();
			bindPagingActions();
			editGalleryClickBinding();
			saveGalleryClickBinding();
			toggleControls();
		}).fail(function() {
			console.log('Fetch failed for galleries');
		});
		
	}
	function toggleControls() {
		$('.spinner').toggle();
		$('#gallery-complete').toggle();
	}
	function updateMaxPageIndex() {
		maxPageIndex = Math.ceil(totalCount/pageSize);
	}
	
	function updatePages() {
		pages = [];
		var prevDisabled = pageIndex==0 ? true : false;
		var nextDisabled = pageIndex==maxPageIndex-1 ? true : false;
		if(totalCount==0) {
			prevDisabled=nextDisabled=true;
		}
		var isActive = false;
		pages.push({text : 'First', disabled : prevDisabled});
		pages.push({text : 'Prev', disabled : prevDisabled});
        
        for (i = pageIndex; i <= pageIndex+4 && i < maxPageIndex ; i++) {
        	if(i == pageIndex) {
        		isActive = true;
        	}
	        pages.push({ pageNumber: (i + 1) , text: (i+1), active : isActive });
	        isActive = false;
	    }
	    
	    pages.push({text : 'Next', disabled : nextDisabled});
	    pages.push({text : 'Last', disabled : nextDisabled});
	}
	function previousPage() { 
			if (pageIndex > 0) { 
				pageIndex = pageIndex - 1; 
			}
			
	}
	function nextPage() {
	        if (pageIndex < maxPageIndex-1) {
	            pageIndex = pageIndex + 1;
	        }
	        
	}
	function firstPage() {
        if (pageIndex > 0) {
            pageIndex = 0;
        }
	}
	function lastPage() {
        if (pageIndex < maxPageIndex-1) {
            pageIndex = maxPageIndex-1;
        }
	}
	function resetPageParams() {
	    pageIndex = totalCount = 0;
	    pageSize = 10;
	}
	function  moveToPage(index) {
	        pageIndex = parseInt(index) - 1;
	}ery));