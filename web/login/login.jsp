<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<link rel="shortcut icon" href="<c:url value="../resources/img/favicon.ico" />">

<title>Sign in CMS</title>

<link type="text/css" href="<c:url value="../resources/css/bootstrap.css" />"rel="stylesheet">
<link type="text/css" href="<c:url value="../resources/css/signin.css" />"rel="stylesheet">
</head>

<body>
<div class="wrapper_outer">
<!-- header starts -->
<div class="navbar navbar-inverse navbar-fixed-top" style="position: static;">
  <div class="navbar-inner">
    <a href="#" class="logo"><img src="http://bsb.in/cms/wp-content/themes/bsb/images/main_logo.png" alt="BSB" title="BSB logo" width="60" /></a>
  </div>
</div>
<!-- end header -->
<div class="container login_box page_content">
<h2>Please Sign In</h2>
<form class="form-signin" action="/j_spring_security_check"
method="post">
<p>
<label for="j_username">Username<br/>
<input type="text" id="j_username" name="j_username" class="form-control" placeholder="userName" autofocus>
<div style="clear:both"></div>
</label>
</p>
<p>
<label for="j_password">Password<br/>
<input type="password" id="j_password" name="j_password" class="form-control" placeholder="Password">
<div style="clear:both"></div>
</label>
</p>
<p>
<input class="btn btn-lg btn-primary btn-block" type="submit" value="Sign In" style="margin-left:  85px;"/>
<div style="clear:both"></div>
</p>
</form>

</div>
<div style="clear:both;" class="footer ${footerClass }" id="footerBar">
<div class="foot">
<span class="copyright" style="margin: 0 auto">candikrush</span>
</div>
</div>
<script>
$(document).ready(function(){
var width = $(document).width();
$("#footerBar").attr('style','width:'+width+"px");
});
</script>
<style>

.navbar-inner {
    min-height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #7BC0DF;
    /* background-image: -moz-linear-gradient(top, #008dab, #0973CD);
    background-image: -ms-linear-gradient(top, #008dab, #0973CD);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#008dab), to(#0973CD));
    background-image: -webkit-linear-gradient(top, #008dab, #0973CD);
    background-image: -o-linear-gradient(top, #008dab, #0973CD);
    background-image: linear-gradient(top, #008dab, #0973CD); */
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#008dab', endColorstr='#0973CD', GradientType=0);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.25), inset 0 -1px 0 rgba(0,0,0,.1);
    -moz-box-shadow: 0 1px 3px rgba(0,0,0,.25), inset 0 -1px 0 rgba(0,0,0,.1);
    box-shadow: 0 1px 3px rgba(0,0,0,.25), inset 0 -1px 0 rgba(0,0,0,.1);
}




html,
body{padding: 0; margin: 0; height: 100%;}
.wrapper_outer{float:left; width: 100%; position: relative; min-height: 100%; height: auto !important; height: 100%;}
.wrapper{/* margin: 0 auto */; width: 1170px;}
.page_content{ margin-top: -10px !important; padding-bottom: 100px !important;}

.logo{float: left; padding: 5px;}
.logout{float: right; padding: 10px 20px; color: #FFD700;}
.logout:hover{color: #FFD700;}
.header .brand{float: left; line-height: 36px; margin-left: 0; margin-right: 15px; font-size: 19px; color: #5F5A5A;}
.header .brand:hover{color: #fff;}

.wrapper_outer .footer{/*position: absolute; left: 0; bottom: 0; */width: 100%;}

.login_box{margin: 0 auto; width: 320px;}
.login_box .form-signin{ background: #fff;
-webkit-border-radius: 5px;
-moz-border-radius: 5px;
border-radius: 5px;
-webkit-box-shadow: #ccc 0px 2px 3px;
-moz-box-shadow: #ccc 0px 2px 3px;
box-shadow: #ccc 0px 2px 3px;
border: 1px solid #ccc; width: 300px; max-width: 300px; padding: 10px;}
.login_box h2{margin:0; padding-bottom: 10px;}
.login_box label{font-size: 13px; color: #000; line-height: 24px;}
.login_box .form-control{border: 1px solid #ccc; background: #fff; padding: 5px; width: 280px; height: 30px; line-height: 30px; color: #777; font-size: 14px; margin-bottom: 10px;}
.login_box .form-signin .btn-block{width: 100px;}

.footer {
    /* margin-top: 45px; */
    padding: 5px 0;
    background: #252525;
    margin-top: 45px;
    position:absolute;
    bottom:0;
    /* padding: 35px 0 36px; */
    border-top: 1px solid #E5E5E5;
}
.footer .copyright{display:block; text-align: center; padding: 10px; color: #fff;}
.footer_bottom a {
    margin-right: 5px;
    color: #000000;
    text-decoration: none;
}


</style>
</div>
</body>
</html>