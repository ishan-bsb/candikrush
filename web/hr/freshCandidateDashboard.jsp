<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../common/header.jsp"%>
<html>
<head>
<title>Fresh Candidate Dashboard</title>
</head>

<link href="<c:url value="../resources/css/datepicker.css" />"rel="stylesheet">
<link href="<c:url value="../resources/css/bootstrap-datetimepicker.css" />"rel="stylesheet">
<script type="text/javascript">
 		
</script>
<body>

	<div id="mainDiv" style="padding-left: 200px;">
    	<b>Name:</b> <c:out value="${candidateName}"></c:out><br/><br/>
    	<b>Location:</b> <c:out value="${location}"></c:out><br/><br/>
    	
    	<div id="summaryDiv">
    	<b>Summary:</b><br/>
    		<c:out escapeXml="false" value="${summary}"></c:out>
    		<br/><br/>
    	</div>
    	
    	<div id="buttonDiv">
    		<form method="POST" id="assignCandidateForm" action="/candikrush/changeState">
    			<input hidden="true" id="candidateId1" name="candidateId" value="${candidateId}"/>
    			<input hidden="true" id="pageId" name="pageId" value="${pageId}"/>
	    		<table>
	    			<tr>
	    				<td>
	    					<select id="assigneeId" name="assigneeId">
	    						<option>Select an assignee</option>
	    						<option value="jasdeep@bsb.in">Jasdeep Singh</option>
	    						<option value="ishan@bsb.in">Ishan Bansal</option>
	    						<option value="ravikant@bsb.in">Ravikant Bhargava</option>
	    					</select>
	    				</td>
	    				<td>
	    				<input type="textarea" id="remarks" name="remarks" value=""/>
	    				</td>
	    				<td>
	    					<input type="submit" id="assignButton" value="Assign"/>
	    				</td>
	    			</tr>
	    			<tr>
	    				<td><input type="radio" id="result1" name="result" value="fail">Reject</td>
	    				<td><input type="radio" id="result2" name="result" value="pass">Proceed Further</td>
	    			</tr>
	    		</table>
	    	</form>	
    		<br/><br/>
    	</div>
    	
    	<div id="resumeDiv">
    	<b>Resume:</b>	<a href="${resumeLink}"><c:out value="${resumeLink}"></c:out></a>
    	</div>
    	
    </div>
     
</body>
</html>
<%@ include file="../common/footer.jsp"%>