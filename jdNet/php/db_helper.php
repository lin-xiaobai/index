<?php
require_once "config.php";
//连接数据库的封装
function connect(){
    //连接数据库服务
    $connect = mysqli_connect(DB_HOST,DB_USER,DB_PWD,DB_NAME);
    // 检查连接 
    if (!$connect) 
    { 
        die("连接错误: " . mysqli_connect_error()); 
    } 
    mysqli_set_charset($connect,"utf8");
    //将连接返回
    return $connect;
}
//根据sql语句查询的封装
function query($sql){
    //调用封装的函数得到数据库服务连接
    $connect=connect();
    //调用查询的方法查询得到结果集
    $res = mysqli_query($connect,$sql);
    //将结果集转换成数组
    $arr = array();
    while ($row = mysqli_fetch_assoc($res)){
        $arr[] = $row;
    }
    //返回的二维数组
    return $arr;
}

?>