/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Block styles
 */
import './editor.scss';
import './style.scss';

/**
 * Register the NavyGator Table of Contents block
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
