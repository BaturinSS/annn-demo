<?php

function extractFields()
{
    global $_POST;
    $values = array_values($_POST);

    $argsCount = sizeof($values) / 3;

    $fields = array();

    for ($i = 0; $i < $argsCount; $i++) {
        $currentField = field($values, $i);
        $fields[] = $currentField;
    }

    return $fields;
}

function field($values, $i)
{
    return (object)[
        'id' => $values[$i * 3],
        'name' => $values[($i * 3 + 1)],
        'value' => $values[($i * 3 + 2)]
    ];
}

function errors($fields)
{
    global $REQUIRED_IDS;

    $errors = array();

    foreach ($REQUIRED_IDS as &$currentId) {
        $currentField = findFieldById($fields, $currentId);
        $validationResult = validateField(
            $currentField,
            $currentId
        );
        if ($validationResult->isValid <> true) {
            $errors[] = $validationResult;
        }
    }

    return $errors;
}

function findFieldById($fields, $id)
{
    foreach ($fields as &$field) {
        if ($id === $field->id) {
            return $field;
        }
    }
    return null;
}

function validateField($field, $id)
{
    $errorCode = null;

    $isFieldRequiredButEmpty = validateFieldIsRequired($field);

    if ($isFieldRequiredButEmpty) {
        $errorCode = "FIELD_IS_REQUIRED";
    }

    $validationResult = (object)[
        'isValid' => (!$isFieldRequiredButEmpty && !$isFieldRequiredButEmpty),
        'id' => $id,
        'code' => $errorCode
    ];
    return $validationResult;
}

function validateFieldIsRequired($field)
{
    if ($field == null) {
        return true;
    }
    $isFieldRequired = containsField($field);
    $isFieldRequiredButEmpty = !$isFieldRequired || trim($field->value) == false;
    return $isFieldRequiredButEmpty;
}

function containsField($field)
{
    global $REQUIRED_IDS;
    return array_search($field->id, $REQUIRED_IDS) !== false;
}

?>