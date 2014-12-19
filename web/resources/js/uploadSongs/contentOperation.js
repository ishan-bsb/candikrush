$(document).ready(function(){
	
	$('#date_todate').datepicker({
		format : 'dd M yyyy',
		autoclose: true,
        onRender: function(date) {
            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            return date.valueOf() > now.valueOf() ? 'disabled' : '';
        }
	});
	
	$('.takeDownContent').live('click' ,function(event) {
		
		var data = new FormData();
		data.append("takeDownCSVFile", takeDown_content.files[0]);
		bootbox.confirm("Are You Sure To TAKE DOWN Contents in Attached File ?", function(result) {
			if(result) {
				$('#takeDownResult').html("Uploading File, Please Wait ...");
				$.ajax({
					url:"/cms/tracks/takedown",
					type : "POST",
					data : data,
					processData : false,
					contentType : false,
					success : function(response) {
//						$("#txt_Success_TakeDownContents").show();
//						$("#txt_Failed_TakeDownContents").show();
						$('#takeDownResult').html(response);
					},
					error : function(jqXHR, textStatus, errorMessage) {
						console.log("Upload failed"+errorMessage);
					}
				});
			}
		});
	});
	
	$('.liveListDownload').on('click' ,function(event) {
		event.preventDefault();
		var toDate = $("#todate").val();
		var partner = $("#cpName_liveList").val();
		var today = new Date();
		var date = new Date(toDate);
		var newDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		date = date.setHours(0,0,0,0);
		today = today.setHours(0,0,0,0);
		if(partner =="" || toDate == ""){
			bootbox.alert(" Either partner or to-Date is blank");
		}else if(date >= today){
			bootbox.alert("To-Date Should Less then Today.");
		}else{
			$.ajax({
				type :"POST",
				url :"/cms/report/wynk-live-list?partnerName=" + partner + "&toDate="+newDate,
				success : function(response) {
					window.open(response);
				}
			});
		}
	});
	
});