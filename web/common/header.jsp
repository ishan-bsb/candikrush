<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>CandiKrush</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="<c:url value="../resources/img/favicon.ico" />">
	<link href="<c:url value="../resources/css/bootstrap.css" />"rel="stylesheet">
	<link href="<c:url value="../resources/css/bootstrap-responsive.css" />" rel="stylesheet">
	<link href="<c:url value="../resources/css/bootstrap-tagmanager.css" />"rel="stylesheet">
	<link href="<c:url value="../resources/css/slider.css" />"rel="stylesheet">
	<link href="<c:url value="../resources/css/style.css" />"rel="stylesheet">
	<link href="<c:url value="../resources/css/datepicker.css" />"rel="stylesheet">
	<link href="<c:url value="../resources/css/bootstrap-datetimepicker.css" />"rel="stylesheet">
	<link href="<c:url value="../resources/css/signin.css" />"rel="stylesheet">
	<link href="<c:url value="../resources/css/position.css" />"rel="stylesheet">
	<link href="<c:url value="../resources/css/bootstrap-spinedit.css" />"rel="stylesheet">
	<style>
		body {
			padding-top: 60px;
		}
	</style>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.1.1/js/bootstrap.min.js"></script>
    <script src="//raw.github.com/botmonster/jquery-bootpag/master/lib/jquery.bootpag.js"></script>
    <!-- <script>
    	window.onload = function(){
    		$('#contentL').addClass('page-active');
    	}
    </script>
	 -->
	 </head>
	 

<body>
<div class="navbar navbar-inverse navbar-fixed-top header">
  <div class="navbar-inner">
	 <a class="user-name" style="float: right;margin-top: 10px;text-decoration: none;">Hi ${pageContext.request.getUserPrincipal().getName()}</a>
	 <a href="<c:url value="j_spring_security_logout" />" class="logout">Logout</a>
	 </div></div>
<div class="wrapper_outer">
