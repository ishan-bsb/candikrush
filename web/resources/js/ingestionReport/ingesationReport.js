
$(document).ready(function(){
  
	$('#date_fromdate').datepicker({
		format : 'dd M yyyy',
		autoclose: true,
        onRender: function(date) {
            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            return date.valueOf() > now.valueOf() ? 'disabled' : '';
        }
	});
	$('#date_todate').datepicker({
		format : 'dd M yyyy',
		autoclose: true,
        onRender: function(date) {
            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            return date.valueOf() > now.valueOf() ? 'disabled' : '';
        }
	});
	
		    $(".dwnLink").on('click', function (event) {
		        event.preventDefault();
		    	var toDate = $("#todate").val();
		    	var fromDate = $("#fromdate").val();
	    		var partner = $("#cpName").val();
	    		var domain = "http://"+window.location.host
	    		window.open(domain+'/cms/downloadingestionreport.csv?partnerselected='+partner+'&from='+fromDate+'&to='+toDate);
//				  $.ajax({
//						type:"GET",
//						url:"/cms/downloadingestionreport?partnerselected="+partner+"&from="+fromDate+"&to="+toDate,
//						contentType: "application/csv",
//						success:function (data) {
//					        $(".dwnLink").attr({
//								'download' : 'IngesationReport.csv',
//								'href' : 'data:application/csv;charset=utf-8,'+ encodeURIComponent(data),
//								'target' : '_blank'
//							});
//					    }
//					});
		    });
		    
		    $(".failedDownloadLink").on('click', function (event) {
		    	event.preventDefault();
		    	var toDate = $("#todate").val();
		    	var fromDate = $("#fromdate").val();
	    		var partner = $("#cpName").val();
	    		var domain = "http://"+window.location.host
	    		window.open(domain+'/cms/downfailedloadingestionreport.csv?partnerselected='+partner+'&from='+fromDate+'&to='+toDate);
//				  $.ajax({
//						type:"GET",
//						url:"/cms/downfailedloadingestionreport?partnerselected="+partner+"&from="+fromDate+"&to="+toDate,
//						contentType: "application/csv",
//						success:function (data) {
//					        $(".failedDownloadLink").attr({
//								'download' : 'FailedIngesationReport.csv',
//								'href' : 'data:application/csv;charset=utf-8,'+ encodeURIComponent(data),
//								'target' : '_blank'
//							});
//					    }
//					});
		    });
		    
	$('.ingestionSearch').on('click' ,function(event) {
		event.preventDefault();
		populateIngestionReport();
	});
	
	$('.ingestionShow').on('click' ,function(event) {
		event.preventDefault();
		populateIngestionReport();
	});
	
	function populateIngestionReport() {
		var toDate = $("#todate").val();
		var fromDate = $("#fromdate").val();
		var partner = $("#cpName").val();
		var contentId = $("#search_content-id").val();
		var ingestionStatus = $("#ingestionStatus").val();
		var urlParam ="";
			
		if(partner != undefined && partner != "")
			urlParam = urlParam + "pic_cpid="+partner;
		if(ingestionStatus != "")
			urlParam = urlParam+"&ingestionStatus="+ingestionStatus;
		if(contentId != "")
			urlParam = urlParam+"&contentId="+contentId;
		if(toDate !="" && fromDate != "")
			urlParam = urlParam+"&fromdate="+fromDate+"&todate="+toDate;
		var options = {
				url:      '/cms/viewingestion',       // override for form's 'action' attribute 
				type:      'GET',
				target: '#ingestionReport'	// post-submit callback 
		};
		location.href = location.protocol + "//" + location.host + location.pathname + "?" +  urlParam;
	}
	
});


$('#ingestionR').addClass('page-active');
