<?php

if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'General Options',
		'menu_title'	=> 'General Options',
		'menu_slug' 	=> 'theme-general-Options',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
	
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Header Options',
		'menu_title'	=> 'Header',
		'parent_slug'	=> 'theme-general-Options',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Links Options',
		'menu_title'	=> 'Links',
		'parent_slug'	=> 'theme-general-Options',
	));
	
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Footer Options',
		'menu_title'	=> 'Footer',
		'parent_slug'	=> 'theme-general-Options',
	));
	
}