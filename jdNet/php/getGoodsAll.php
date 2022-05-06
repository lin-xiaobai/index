<?php
//要操作数据库，引入操作数据库的封装
require_once "db_helper.php";
header("Access-Control-Allow-Origin:*");
header("Content-Type: text/html;charset=utf-8;");
//直接获取所有产品的信息，返回给前端
// 准备好对应的sql语句
$sql = "SELECT * FROM goods";
//执行查询
$arr = query($sql);
//将数据转换为json格式的字符串
echo json_encode($arr,true);
// echo json_encode($arr);
?>