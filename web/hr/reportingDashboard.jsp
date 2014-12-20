<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../common/header.jsp"%>
<div class="container page_content">
		<div id="main-container" class="container">
			<h2 style="font-size:30px">Reports for Month : <c:out escapeXml="false" value="${date}"></c:out></h2>
 
		<table class="table table-bordered"><tbody>
		<tr>
				<th>User Id</th>
				<th> Total Cases</th>
				<th>Success Cases</th>
			</tr>
		<c:forEach var="rep1" items="${rep}">
			<c:if test="${rep1 !=null}>
			<tr>
				<td><c:out escapeXml="false" value="${rep1.userId}"></c:out></td>
				<td><c:out escapeXml="false" value="${rep1.total}"></c:out></td>
				<td><c:out escapeXml="false" value="${rep1.success	}"></c:out></td>
			</tr>
			</c:if>
		</c:forEach>
		</tbody>
		</table>
<%@ include file="../common/footer.jsp"%>
