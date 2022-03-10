<?php

include("includes/functions.php");

function load_entity_types($field)
{
    $acf_fields = array_filter(
            acf_get_field_groups(), function($field) { return preg_match("/Specs/", $field['title']); }
        );

    $fields = [];
    foreach ($acf_fields as $acf_field) {
        $fields[$acf_field['key']] = str_replace(" Specs", "", $acf_field['title']);
    }

    $field['required'] = true;
    $field['choices'] = $fields;
    $field['class'] = "entity_field";

    return $field;
}

function load_local_field_types($field) {
    $field["class"] = "local_field";
    $acf_fields = array_filter(
            acf_get_field_groups(), function($field) { return preg_match("/Specs/", $field['title']); }
        );
    $reversed_acf_fields = array_reverse($acf_fields);
    $fields = acf_get_fields(array_pop($reversed_acf_fields))[0]["sub_fields"];
    $choices = [];
    foreach ($fields as $acf_field) {
        $choices[$acf_field["name"]] = $acf_field["label"];
    }
    $field["choices"] = $choices;
    return $field;
}

function load_entity_fields_scripts() {
    $template = get_template();
    wp_enqueue_script('field_select', '/wp-content/themes/EventsCatalogue/js/field_script.js', [], false, false);
    wp_localize_script('field_select', 'backend', ['url' => admin_url('admin-ajax.php')]);
}

function field_of_group() {
    $groupId = $_POST["group"];

    header('Content-Type: application/json');

    $fields = array_map(
        function($field) { return ['name' => $field['name'], 'label' => $field['label']]; },
        acf_get_fields($groupId)[0]['sub_fields']
    );

    wp_reset_postdata();

    die(json_encode($fields));
}

add_action('admin_enqueue_scripts', 'load_entity_fields_scripts');
add_filter('acf/load_field/name=entity_type', 'load_entity_types');
add_filter('acf/load_field/name=local_field', 'load_local_field_types');
add_action('wp_ajax_nopriv_field_of_group', 'field_of_group');
add_action('wp_ajax_field_of_group', 'field_of_group');
