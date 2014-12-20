<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../common/header.jsp"%>
<c:choose>
<c:when test="${info ne ""}">
	<c:out escapeXml="false" value="${info}"></c:out>
</c:when>
<c:otherwise>
Thanks for your Time !!!
</c:otherwise>
</c:choose>
<%@ include file="../common/footer.jsp"%>