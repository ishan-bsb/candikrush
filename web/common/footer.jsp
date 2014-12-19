	<c:if test="${footerClass == null }">
		<c:set var="footerClass" value="" />
	</c:if>
	<div style="clear:both;" class="footer ${footerClass }" id="footerBar">
		<div class="foot">
			<span class="copyright" style="margin: 0 auto">Copyright@BSB2014</span>
		</div>
	</div>
	</div>
	<script>
		$(document).ready(function(){
			var width = $(document).width();
			$("#footerBar").attr('style','width:'+width+"px");
		});
	</script>
	<script src="<c:url value="../resources/js/jquery.js" />"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script src="<c:url value="../resources/js/jquery.tmpl.js" />"></script>
	<script src="<c:url value="../resources/js/jquery.form.js" />"></script>
	<script src="<c:url value="../resources/js/jquery-sortable.js" />"></script>
    <script src="<c:url value="../resources/js/underscore-min.js" />"></script>
    <script type="text/javascript" src="<c:url value="../resources/js/bootstrap.js" />"></script>
    <script type="text/javascript" src="<c:url value="../resources/js/bootstrap-spinedit.js" />"></script>
    <script src="<c:url value="../resources/js/bootstrap-modal.js" />"></script>
    <script src="<c:url value="../resources/js/bootstrap-tagmanager.js" />"></script>
    <script src="<c:url value="../resources/js/dateformat.js" />"></script>
    <script src="<c:url value="../resources/js/bootbox.js" />"></script>
    <script type="text/javascript" src="<c:url value="../resources/js/bootstrap-datepicker.js" />"></script>
    <script type="text/javascript" src="<c:url value="../resources/js/bootstrap-datetimepicker.js" />"></script>
    <script type="text/javascript" src="../resources/js/Parsley/parsley.js"></script>
	<script src="<c:url value="../resources/js/common/cms-tool.js" />"></script>
