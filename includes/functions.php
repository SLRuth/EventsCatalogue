<?php
//Adding Advance Custom Fields settings
include("acf_settings/functions.php");

function find_spec_fields() {
   return array_filter(
       acf_get_field_groups(),
       function ($field) {
           return preg_match("/Specs/", $field['title']);
       }
   );
}

function load_spec_fields() {
    $acf_fields = find_spec_fields();

    $fields = [];
    foreach ($acf_fields as $acf_field) {
        $fields[$acf_field['key']] = str_replace(" Specs", "", $acf_field['title']);
    }

    return $fields;
}
