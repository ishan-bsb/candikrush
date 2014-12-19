$(document).ready(function(){
	
	$("#dwnFailedFile").click(function(){
		
		var PageURL = window.location.search.substring(1);
		var pageParameter = PageURL.split('=');
		if (pageParameter[0] == "mid"){
			$.ajax({
				type:"GET",
				url:"/cms/downloaderror?mid="+pageParameter[1],
				contentType: "application/csv",
				success:function (data) {
					alert("data :"+data);
			        $(".dwnLink").attr({
						'download' : 'IngesationErrorReport.csv',
						'href' : 'data:application/csv;charset=utf-8,'+ encodeURIComponent(data),
						'target' : '_blank'
					});
			    }
			});
		}
	});
	
	
	
    $("#dwnFailedReport").on('click', function (event) {
    	var PageURL = window.location.search.substring(1);
		var pageParameter = PageURL.split('=');
		if (pageParameter[0] == "mid"){

		  $.ajax({
				type:"GET",
				url:"/cms/downloaderror?mid="+pageParameter[1],
				contentType: "application/csv",
				success:function (data) {
					alert("data :"+data);
			        $(".dwnLink").attr({
						'download' : 'IngesationErrorReport.csv',
						'href' : 'data:application/csv;charset=utf-8,'+ encodeURIComponent(data),
						'target' : '_blank'
					});
			    }
			});
		}
    });
    
    $(".dwnLink").on('click', function (event) {
        
    	var PageURL = window.location.search.substring(1);
		var pageParameter = PageURL.split('=');
		alert("Url : "+pageParameter[1]);
		if (pageParameter[0] == "mid"){
			
			$.ajax({
				type:"GET",
				url:"/cms/download?mid="+pageParameter[1],
				contentType: "application/csv",
				success:function (data) {
					alert("data :"+data);
			        $(".dwnLink").attr({
						'download' : 'IngesationErrorReport.csv',
						'href' : 'data:application/csv;charset=utf-8,'+ encodeURIComponent(data),
						'target' : '_blank'
					});
			    }
			});
		}
		
		else{
	    	var toDate = $("#todate").val();
			  var fromDate = $("#fromdate").val();
			  var finalData;
			  $.ajax({
					type:"GET",
					url:"/cms/download?from="+fromDate+"&to="+toDate,
					contentType: "application/csv",
					success:function (data) {
				        $(".dwnLink").attr({
							'download' : 'IngesationReport.csv',
							'href' : 'data:application/csv;charset=utf-8,'+ encodeURIComponent(data),
							'target' : '_blank'
						});
				    }
				});
		}
    });
    
    
	
});

