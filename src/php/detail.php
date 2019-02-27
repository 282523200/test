<?php  
	
	include "conn.php";
	
	$id=$_GET['sid'];
	
	$result=mysql_query("select * from goods where gid=$id ");
	
	$wronglist=mysql_fetch_array($result,MYSQL_ASSOC);
	
	echo json_encode($wronglist);

?>