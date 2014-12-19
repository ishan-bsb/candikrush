$(document).ready(function() {
	var reorderTriggerCount = "0";
	contentSelectionBinding();
	var srcContentId = "";
	var sourceTrHtml = "";
	function updateTdPositions() {
		var allPositionTds = $(".tdposition");
		$.each(allPositionTds, function (i, item) {
			var trId = $(item).closest('tr').attr('id');
			var index = $(item).closest('tr').attr('id').split('_')[1];
			$(item).html(index);
		});
	}
	
	function updateAddCheckBoxes() {
		var idsOrder = $("#idsOrderStr").val();
		if(idsOrder != "") {
			var idsArr = idsOrder.split(",");
			for(var i=1;i<idsArr.length-1;i++) {
				var idStr = idsArr[i];
				if(idStr.length > 0) {
					var id = idStr.substring(idStr.indexOf('_')+1);
					if(idStr.indexOf("add") !== -1) {
						$('input[type="checkbox"][id="pkgOrderList"][value="'+id+'"]').attr("checked","checked");
					} else {
						$('input[type="checkbox"][id="pkgOrderList"][value="'+id+'"]').removeAttr('checked');
					}
				}
			}
		}
	}
	
	//selecting tracks to be saved
	$('.addedPkgs').live('change',function() {
		var pkgOrderList = $("#idsOrderStr").val().trim();
		var contentId = $(this).val();
		var contentIdSrch = ',add_' + contentId + ',';
		if(contentId != "") {
			if($(this).attr("checked")) {
				var contentIdSrchRem = ',rem_' + contentId + ',';
	            if(pkgOrderList.indexOf(contentIdSrch) === -1 && pkgOrderList.indexOf(contentIdSrchRem) === -1) {
	            	pkgOrderList += ('add_'+contentId + ',');
	            } else if(pkgOrderList.indexOf(contentIdSrchRem) !== -1) {
	            	pkgOrderList =  pkgOrderList.replace(contentIdSrchRem, ",add_" + contentId + ",");
	            }
	            $("#idsOrderStr").val(pkgOrderList);
	        } 
			else {
	        	if(pkgOrderList.indexOf(contentIdSrch) !== -1) {
	        		pkgOrderList = pkgOrderList.replace(contentIdSrch,",rem_" + contentId + "," );
//	        		var startIdx = pkgOrderList.indexOf(contentIdSrch);
//	        		pkgOrderList = pkgOrderList.substring(0,startIdx) + pkgOrderList.substring(startIdx+contentIdSrch.length-1,pkgOrderList.length);
	        		$("#idsOrderStr").val(pkgOrderList);
	        	}
	        }
		}
	});
	
	//adding the track to package
	$('.searchedRPkg').live('click',function(event) {
		event.preventDefault();
		var pkgOrderList = $("#idsOrderStr").val().trim();
		var size = 0;
		if(pkgOrderList !== "") {
			size = pkgOrderList.split(',').length+1-2;
		}	
		var contentId = $(this)[0].getAttribute("data-id");
		var contentIdSrch = ',add_' + contentId + ',';
		if(contentId != "") {
			if(pkgOrderList.indexOf(contentIdSrch) === -1) {
				pkgOrderList += ("add_" + contentId + ',');
				$("#idsOrderStr").val(pkgOrderList);
				var title = $(this)[0].getAttribute('data-title');
				var imgSrc = $(this)[0].getAttribute('data-src');
				var version = $(this)[0].getAttribute('data-version');
				$('#table-body').append('<tr id="addedPkgs_'+ size + '">'+
						'<td style="word-break: break-word;" class="tdposition">' + size + '</td>'+
						'<td style="word-break: break-word;"><input type="checkbox" class="addedPkgs" id="pkgOrderList" name="pkgOrderList" value="'+ contentId +'" checked data-version="'+ version + ' data-src=' +imgSrc + '"/></td>'+
						'<td style="word-break: break-word;"><a href=/cms/package/show?id="' + contentId + '&v=' + version +  '"><img src="'+ imgSrc +'" /></a></td>' +
						'<td style="word-break: break-word;">'+ contentId + '</td>'+
						'<td style="word-break: break-word;">'+ version + '</td>'+
						'<td style="word-break: break-word;">'+ title + '</td>'+
						'<td><input type="checkbox" class="reorderContentSet" id="reorderSet" name="reorderSet" value="'+ contentId +'" unchecked/></td>'+
						'<td><input type="radio" class="reorderContent" id="reorder" name="reorder" value="'+ contentId +'" unchecked/></td>'+
						'</tr>');
				$('#contentCount').val(parseInt($('#contentCount').val())+1);
				updateTdPositions();
				contentSelectionBinding();
			}
		}
	});
	
	//reverse the track list
	$('#reverseorder').live('click', function() {
		event.preventDefault();
		var pkgOrderList = $("#idsOrderStr").val().trim();
		var size = 0;
		if(pkgOrderList !== "") {
			size = pkgOrderList.split(',').length;
		}
		var htmlArr = new Array();
		htmlArr[0]="";
		htmlArr[size-1]="";
		for(var i=1;i<size-1;i++) {
			htmlArr[i]=$('#addedPkgs_'+i).html();
		}
		var j=0;
		for (var i=size-2;i>=1;i--) {
			$('#addedPkgs_'+i).html(htmlArr[j]);
			j++;
		}
		var idsArr = pkgOrderList.split(',');
		idsArr.reverse();
		var pkgOrderListNew = idsArr.join();
		$("#idsOrderStr").val(pkgOrderListNew);
		contentSelectionBinding();
		updateTdPositions();
		updateAddCheckBoxes();
	});
	
	$('.reorderContent').live('click', function(event) {
		event.preventDefault();
		var contentLstArr = [];
		var contentLstIndexArr = [];
		$(".reorderContentSet:checked").each(function() {
			var tmpIndex = $(this).closest('tr').attr('id').split('_')[1]
			contentLstArr.push("add_"+$(this).val()+"_"+tmpIndex);
			contentLstIndexArr.push(tmpIndex);
	    });
		var trId = $(this).closest('tr').attr('id');
		var destTrIdIndx = trId.split("_")[1];
		var id = $(this).val();
		var srchTxt = '_' + id + ',';
		var pkgOrderList = $("#idsOrderStr").val().trim();
		
		if((pkgOrderList.indexOf(srchTxt) !== -1) && (contentLstIndexArr.indexOf(destTrIdIndx) == -1)) {
			var idsArr = pkgOrderList.split(',');
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
			var pkgOrderListNew = idsArr.join();
			$("#idsOrderStr").val(pkgOrderListNew);
			
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
			tableTdHtml = '<tr>'
					+ '<th><span class="label-modified">Position</span></th>'
					+ '<th><span class="label-modified">+/-</span></th>'
					+ '<th><span class="label-modified">Thumbnail</span></th>'
					+ '<th><span class="label-modified">Id</span></th>'
					+ '<th><span class="label-modified">Ver</span></th>'
					+ '<th><span class="label-modified">Title</span></th>'
					+ '<th colspan="2"><span class="label-modified">Move</span></th>'
					+ '</tr>'
			for(var i =0; i <trIdsArr.length; i++){
				if(trIdsArr[i] != ""){
					$('#' + trIdsArr[i]).find('#serialNo').html((i+1));
					var tdHtml = $('#' + trIdsArr[i]).html();
					tableTdHtml = tableTdHtml+"<tr id=addedPkgs_"+(i+1)+">"+tdHtml+"</tr>";
				}
			}
			
			$('#pkgOrderTable tbody').empty();
			
			$('#table-body').html(tableTdHtml);
			updateTdPositions();
			updateAddCheckBoxes();
		}else{
			$(".reorderContent").each(function() {
				$( "#reorder" ).prop( "unchecked", true );
		    });
			bootbox.alert("Please choose different Re-Position Location");
		}
		contentSelectionBinding();
	});
	
	function contentSelectionBinding() {
		$("input[name=pkgOrderList]").off();
		$("input[name=pkgOrderList]").bind('change', function(){
			var trackId = $(this).val();
			if(!$(this).is(':checked')){
				$('#contentCount').val(parseInt($('#contentCount').val())-1);
			}
			else if($(this).is(':checked')){
				$('#contentCount').val(parseInt($('#contentCount').val())+1);
			}
			
		});
	}
	
	
	//package edit submit ajax
	$('#pkgOrderForm').submit(function() {
		event.preventDefault();
		var url = '/cms/package/order/save';
			var options = {
				url:      url,        // override for form's 'action' attribute 
				type:      'POST',
				success:       showResponse,  // post-submit callback
				beforeSubmit: loading()  // post-submit callback 
			};
	        $(this).ajaxSubmit(options);
    });
	
	//processing modal
	function loading(){
		$('#modalBox').show();
	}
	
	// post-submit callback 
	function showResponse(responseText, statusText, xhr, $form)  {
		$('#modalBox').hide();
		if(responseText == true) {
			$('#editPkgResult').css("color","#0f0");
			$('#editPkgResult').html('Order saved successfully.');
			bootbox.alert("Content Saved Successfully!", function() {
				window.location.href = "/cms/package";
			});
		} else {
			$('#editPkgResult').css("color","#f00");
			$('#editPkgResult').html('Order save operation failed.');
			bootbox.alert("Order upload Failed");
		}
	}
});
