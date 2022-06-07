<?php

function sendEmail($fields)
{
    global $EMAIL_TO;
    global $SUBJECT_FIELD_ID;

    $message = compose($fields);

    $to = "<" . $EMAIL_TO . ">,";

    $subject = "Форма от ";

    $subjectField = findFieldById($fields, $SUBJECT_FIELD_ID);

    if ($subjectField != null) {
        $subject = $subject . $subjectField->value;
    }

    $headers = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: Форма обратной связи <an-nnov@webhost.com>\r\n";

    mail($to, $subject, $message, $headers);
}

function compose($fields)
{
    $fieldsCount = sizeof($fields);
    $message = "";
    for ($i = 0; $i < $fieldsCount; $i++) {
        $field = $fields[$i];
        if (trim($field->value) != false) {
            $message = $message . '<i>' . $field->name . '</i><t/>:<b>' . $field->value . '</b> <br/>';
        }
    }

    return $message;
}

?>