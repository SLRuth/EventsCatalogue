<?php

// This is a comment

get_header();

if(get_field('isolate_webpage')){
    header('Cross-Origin-Opener-Policy: same-origin');
    header('Cross-Origin-Embedder-Policy: require-corp');
}

if (have_posts()) {
	while (have_posts()) {
		the_post();
		the_content(); 
	}
} else {
	echo "No content was found";
}

get_footer();
