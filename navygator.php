<?php
/**
 * Plugin Name:       NavyGator
 * Plugin URI:        https://github.com/yourusername/navygator
 * Description:       A beautiful, floating table of contents block that automatically generates navigation from your page headings. Features a sticky sidebar on desktop and a mobile-friendly toggle drawer.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Your Name
 * Author URI:        https://yourwebsite.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       navygator
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'NAVYGATOR_VERSION', '1.0.0' );
define( 'NAVYGATOR_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'NAVYGATOR_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

function navygator_register_block() {
	register_block_type(
		NAVYGATOR_PLUGIN_DIR . 'build/block.json',
		array(
			'render_callback' => 'navygator_render_block',
		)
	);
}
add_action( 'init', 'navygator_register_block' );

function navygator_render_block( $attributes, $content ) {
	global $post;
	
	if ( ! $post ) {
		return '<div class="navygator-toc-empty">' . esc_html__( 'No content available.', 'navygator' ) . '</div>';
	}
	
	$heading_levels = isset( $attributes['headingLevels'] ) ? $attributes['headingLevels'] : array( 2, 3, 4 );
	$show_numbers = isset( $attributes['showNumbers'] ) ? $attributes['showNumbers'] : true;
	$title = isset( $attributes['title'] ) ? $attributes['title'] : __( 'Table of Contents', 'navygator' );
	$background_color = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : '';
	$text_color = isset( $attributes['textColor'] ) ? $attributes['textColor'] : '';
	
	$headings = navygator_extract_headings( $post->post_content, $heading_levels );
	
	if ( empty( $headings ) ) {
		return '<div class="navygator-toc-empty">' . esc_html__( 'No headings found in this content.', 'navygator' ) . '</div>';
	}
	
	$inline_styles = array();
	if ( $background_color ) {
		$inline_styles[] = 'background-color: ' . esc_attr( $background_color );
	}
	if ( $text_color ) {
		$inline_styles[] = 'color: ' . esc_attr( $text_color );
	}
	$style_attr = ! empty( $inline_styles ) ? ' style="' . implode( '; ', $inline_styles ) . '"' : '';
	
	$list_type = $show_numbers ? 'ol' : 'ul';
	$toc_html = '<div class="navygator-toc-wrapper">';
	
	$toc_html .= '<button class="navygator-toc-toggle" aria-label="' . esc_attr__( 'Toggle Table of Contents', 'navygator' ) . '">';
	$toc_html .= '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
	$toc_html .= '<path d="M3 4h18M3 12h18M3 20h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
	$toc_html .= '</svg>';
	$toc_html .= '</button>';
	
	$toc_html .= '<nav class="navygator-toc"' . $style_attr . ' aria-label="' . esc_attr__( 'Table of Contents', 'navygator' ) . '">';
	
	$toc_html .= '<button class="navygator-toc-close" aria-label="' . esc_attr__( 'Close Table of Contents', 'navygator' ) . '">';
	$toc_html .= '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
	$toc_html .= '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
	$toc_html .= '</svg>';
	$toc_html .= '</button>';
	
	if ( $title ) {
		$toc_html .= '<div class="navygator-toc-title">' . esc_html( $title ) . '</div>';
	}
	
	$toc_html .= navygator_build_toc_list( $headings, $list_type );
	$toc_html .= '</nav>';
	$toc_html .= '<div class="navygator-toc-backdrop"></div>';
	$toc_html .= '</div>';
	
	return $toc_html;
}

function navygator_extract_headings( $content, $heading_levels ) {
	$headings = array();
	$dom = new DOMDocument();
	libxml_use_internal_errors( true );
	$dom->loadHTML( '<?xml encoding="utf-8" ?>' . $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
	libxml_clear_errors();
	
	$heading_tags = array();
	foreach ( $heading_levels as $level ) {
		$heading_tags[] = 'h' . $level;
	}
	
	foreach ( $heading_tags as $tag ) {
		$elements = $dom->getElementsByTagName( $tag );
		
		foreach ( $elements as $element ) {
			$text = trim( $element->textContent );
			
			if ( empty( $text ) ) {
				continue;
			}
			
			$id = $element->getAttribute( 'id' );
			if ( empty( $id ) ) {
				$id = navygator_generate_heading_id( $text );
			}
			
			$level = (int) substr( $tag, 1 );
			
			$headings[] = array(
				'level' => $level,
				'text'  => $text,
				'id'    => $id,
			);
		}
	}
	
	return $headings;
}

function navygator_generate_heading_id( $text ) {
	$id = strtolower( $text );
	$id = preg_replace( '/[^a-z0-9\s-]/', '', $id );
	$id = preg_replace( '/\s+/', '-', $id );
	$id = preg_replace( '/-+/', '-', $id );
	$id = trim( $id, '-' );
	
	if ( empty( $id ) ) {
		$id = 'heading-' . wp_rand( 1000, 9999 );
	}
	
	return $id;
}

function navygator_build_toc_list( $headings, $list_type = 'ol' ) {
	if ( empty( $headings ) ) {
		return '';
	}
	
	$html = '<' . $list_type . ' class="navygator-toc-list">';
	
	$min_level = min( array_column( $headings, 'level' ) );
	$current_level = $min_level;
	
	foreach ( $headings as $heading ) {
		$level = $heading['level'];
		$text = $heading['text'];
		$id = $heading['id'];
		
		if ( $level > $current_level ) {
			for ( $i = $current_level; $i < $level; $i++ ) {
				$html .= '<' . $list_type . ' class="navygator-toc-list-nested">';
			}
		} elseif ( $level < $current_level ) {
			for ( $i = $level; $i < $current_level; $i++ ) {
				$html .= '</' . $list_type . '></li>';
			}
		} else {
			if ( $current_level !== $min_level || $heading !== $headings[0] ) {
				$html .= '</li>';
			}
		}
		
		$current_level = $level;
		
		$html .= '<li class="navygator-toc-item navygator-toc-item-level-' . esc_attr( $level ) . '">';
		$html .= '<a href="#' . esc_attr( $id ) . '" class="navygator-toc-link">';
		$html .= esc_html( $text );
		$html .= '</a>';
	}
	
	for ( $i = $min_level; $i <= $current_level; $i++ ) {
		$html .= '</li>';
		if ( $i > $min_level ) {
			$html .= '</' . $list_type . '>';
		}
	}
	
	$html .= '</' . $list_type . '>';
	
	return $html;
}

function navygator_add_heading_ids( $content ) {
	if ( ! is_singular() ) {
		return $content;
	}
	
	if ( ! has_block( 'navygator/table-of-contents' ) ) {
		return $content;
	}
	
	$dom = new DOMDocument();
	libxml_use_internal_errors( true );
	$dom->loadHTML( '<?xml encoding="utf-8" ?>' . $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
	libxml_clear_errors();
	
	$heading_tags = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' );
	$modified = false;
	
	foreach ( $heading_tags as $tag ) {
		$elements = $dom->getElementsByTagName( $tag );
		
		foreach ( $elements as $element ) {
			if ( $element->hasAttribute( 'id' ) ) {
				continue;
			}
			
			$text = trim( $element->textContent );
			if ( empty( $text ) ) {
				continue;
			}
			
			$id = navygator_generate_heading_id( $text );
			$element->setAttribute( 'id', $id );
			$modified = true;
		}
	}
	
	if ( $modified ) {
		$content = $dom->saveHTML();
	}
	
	return $content;
}
add_filter( 'the_content', 'navygator_add_heading_ids', 10 );

function navygator_enqueue_frontend_assets() {
	if ( ! is_singular() || ! has_block( 'navygator/table-of-contents' ) ) {
		return;
	}
	
	$view_asset_file = NAVYGATOR_PLUGIN_DIR . 'build/view.asset.php';
	if ( file_exists( $view_asset_file ) ) {
		$view_asset = require $view_asset_file;
		
		wp_enqueue_script(
			'navygator-view',
			NAVYGATOR_PLUGIN_URL . 'build/view.js',
			$view_asset['dependencies'],
			$view_asset['version'],
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'navygator_enqueue_frontend_assets' );
