<?php

	header('content-type:text/html;charset=utf-8');
	define('HOST','localhost');//定义常量
	define('USERNAME','root');//定义常量
	define('PASSWORD','');//定义常量
	$conn=@mysql_connect(HOST,USERNAME,PASSWORD);//@:容错。
	if(!$conn){
		die("数据库连接失败".mysql_error());  
	}
	if(!mysql_select_db('shop')){
		die("数据库名称不存在");
	}else{
		mysql_select_db('shop');
	}
	mysql_query('SET NAMES UTF8');
	
	
	
?>