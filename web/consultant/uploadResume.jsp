<%@ page session="false" %>
<html>
<head>
<title>Upload File Request Page</title>
</head>
<script type="text/javascript">
 		function checkOnSubmit(){
 			if(val==null || val==''){
 				alert('hello');
 			}
 		}	
</script>
<body>
 
 	
 	
    <form method="POST" action="/candikrush/uploadFile" enctype="multipart/form-data">
        File to upload: <input type="file" name="file"><br /> 
        Current CTC: <input type="text" name="cctc"><br />
        Expected CTC: <input type="text" name="ectc"><br />
        Email: <input type="text" name="email"><br />
        Notice Period: <input type="text" name="noticePeriod"><br />
         <br /> 
        <input type="submit" value="Upload"> Press here to upload the file!
    </form>
     
</body>
</html>