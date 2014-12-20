<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="../common/header.jsp"%>

<div class="container page_content">
		<div id="main-container" class="container">
			<h2 style="font-size:30px">Resume Upload</h2>
    <form method="POST" action="/candikrush/uploadFile" enctype="multipart/form-data">
    <table class="table table-bordered">
    <tr><td>
        File to upload: </td><td><input type="file" name="file">
     </td></tr>
     <tr><td>    
      Current CTC: </td><td><input type="text" name="cctc">
     </td></tr>
      <tr><td>
      	Expected CTC: </td><td><input type="text" name="ectc">
      </td></tr>
      <tr><td>
      Email: </td><td><input type="text" name="email">
      </td></tr>
      <tr><td>
      	Notice Period: </td><td><input type="text" name="noticePeriod">
      </td></tr>
      <tr><td colspan="3" style="text-align:right">
			<button class="bulkUpload btn btn-primary" id="uploadZip" name="uploadZip" style="padding: 10px 20px 10px 20px;margin-left: 1150px;">Upload</button>
		</td>
		</tr>
    </form>

<%@ include file="../common/footer.jsp"%>