<?php header('Access-Control-Allow-Origin: *'); //разрешаем кроссдоменные запросы CORS 
?> 
    <?php
    require_once 'connection.php'; // подключаем скрипт

    $link = mysqli_connect($host, $user, $password, $database)
        or die("Ошибка " . mysqli_error($link));

    $query = "SELECT * FROM povkl";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    $json = array();
    $json['pov_new'] = [];
    if (mysqli_num_rows($result)) {
        while ($row = mysqli_fetch_row($result)) {
            $json['pov_new'][] = $row;
        }
    }
    mysqli_close($db_name);
    echo json_encode($json);
    // очищаем результат
    mysqli_free_result($result);
    mysqli_close($link);
    ?>
   
