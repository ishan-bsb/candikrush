<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../common/header.jsp"%>

	<h2 style="font-size:30px">HR Console</h2>
		<table  class="table table-bordered">
			<tbody>
			<tr>
				<td><a href="/candikrush/getFreshCandidateDashboard"><button class="btn btn-primary" style="padding: 10px 20px 10px 20px;">Click here to see fresh candidates</button></a></td>
			</tr><tr>	<td><a href="/candikrush/getScreenedCandidateDashboard"><button class="btn btn-primary" style="padding: 10px 20px 10px 20px;m">Click here to see screened candidates</button></a></td>
			</tr></tbody>
		</table>
<%@ include file="../common/footer.jsp"%>