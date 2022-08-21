<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  
  require './phpmailer/src/Exception.php';
  require './phpmailer/src/PHPMailer.php';
  
  $name = trim($_POST['name']);
  $email = trim($_POST['email']);
  $text = trim($_POST['text']);
  
  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');

  //Recipients
  $mail->setFrom('morozetz-post@morozets.ru', 'Morozets');
  $mail->addAddress('morozetsnt@bk.ru');
  // Content
  $mail->isHTML(true);                                  // Set email format to HTML
  $mail->Subject = 'Заказ Деда Мороза';
  $mail->Body = 'Имя: ' . $name . '<br/>E-mail: ' . $email . '<br/> Текст сообщения: ' . $text;


  if (!$mail->send()) {
    $message = 'Ошибка';
  } else {
      $message = 'Данные отправлены';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>