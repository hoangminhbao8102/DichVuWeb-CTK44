<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/db.php');
include_once('../../model/question.php');

$db = new db();
$connect = $db->connect();

$question = new Question($connect);
$read = $question->read();

$num = $read->rowCount();

if($num > 0){
    $question_array = [];
    $question_array['question'] = [];

    while ($row = $num->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        
        $question_item = array(
            'id_cauhoi' => $id_cauhoi,
            'cauhoi' => $cauhoi,
            'cau_a' => $cau_a,
            'cau_b' => $cau_b,
            'cau_c' => $cau_c,
            'cau_d' => $cau_d,
            'cau_dung' => $cau_dung
        );
        array_push($question_array['question'],$question_item);
    }
    echo json_encode($question_array);
}

?>