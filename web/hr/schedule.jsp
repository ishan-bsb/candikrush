<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../common/header.jsp"%>

<link href="<c:url value="../resources/css/datepicker.css" />"rel="stylesheet">
<link href="<c:url value="../resources/css/bootstrap-datetimepicker.css" />"rel="stylesheet">

<div class="input-group date" id="date_startdate"
					data-date="" data-date-format="" style="margin-bottom: 5px;">
					<input id="startdate" name="startdate" class="span3 form-control" size="16" type="text" value="" placeholder="Start Date"/> 
					<span class="input-group-addon">
						<i class="glyphicon glyphicon-th"></i>
					</span>
				</div>
				
<%@ include file="../common/footer.jsp"%>				