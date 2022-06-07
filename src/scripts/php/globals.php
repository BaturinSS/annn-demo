<?php

// Электронная почта для отправки письма
$EMAIL_TO = '4108775@mail.ru';

// Идентификатор поля, который должен быть указан в теме письма
$SUBJECT_FIELD_ID = 'contactsName';


// Required fields
$REQUIRED_IDS = array(
    "serviceSale",
    "servicePurchase",
    "serviceSupport",
    "serviceCheck",
    "serviceRedemption",
    "contactsName",
    "contactsTel",
    "date",
    "agentName"
);

$ERRORS = array(
    'FIELD_IS_REQUIRED' => "Поле должно быть заполнено"
)
?>