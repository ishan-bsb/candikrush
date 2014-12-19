<%@ page session="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>Home Dashboard</title>
</head>

<script type="text/javascript">
 		
</script>
<body>

	<div id="mainDiv">
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
	    				<input type="textarea" id="remarks" name="remarks" value="Remarks"/>
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
	    	<%-- <form method="POST" id="rejectCandidateForm" action="/candikrush/changeState">
	    		<input hidden="true" name="candidateId2" id="candidateId2" value="${candidateId}"/>
	    		<input type="submit" id="rejectButton" value="Reject" />
	    	</form> --%>
    		<br/><br/>
    	</div>
    	
    	<div id="resumeDiv">
    	<b>Resume:</b>	<a href="${resumeLink}"><c:out value="${resumeLink}"></c:out></a>
    	</div>
    	
    </div>
     
</body>
</html>