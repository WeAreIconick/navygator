/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { 
	PanelBody, 
	ToggleControl, 
	TextControl,
	CheckboxControl,
	BaseControl
} from '@wordpress/components';

/**
 * Edit component for NavyGator block
 */
export default function Edit( { attributes, setAttributes } ) {
	const { headingLevels, showNumbers, title, backgroundColor, textColor } = attributes;

	const blockProps = useBlockProps( {
		className: 'navygator-toc-editor-preview',
	} );

	// Helper function to check if a heading level is selected
	const isHeadingLevelSelected = ( level ) => {
		return headingLevels.includes( level );
	};

	// Toggle heading level selection
	const toggleHeadingLevel = ( level ) => {
		const newLevels = isHeadingLevelSelected( level )
			? headingLevels.filter( ( l ) => l !== level )
			: [ ...headingLevels, level ].sort();
		
		setAttributes( { headingLevels: newLevels } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Table of Contents Settings', 'navygator' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Title', 'navygator' ) }
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						help={ __( 'The title displayed at the top of the table of contents', 'navygator' ) }
					/>

					<ToggleControl
						label={ __( 'Show Numbers', 'navygator' ) }
						checked={ showNumbers }
						onChange={ ( value ) => setAttributes( { showNumbers: value } ) }
						help={ __( 'Display numbered list instead of bullets', 'navygator' ) }
					/>

					<BaseControl
						label={ __( 'Heading Levels', 'navygator' ) }
						help={ __( 'Select which heading levels to include in the table of contents', 'navygator' ) }
					>
						<div style={ { marginTop: '8px' } }>
							{ [ 1, 2, 3, 4, 5, 6 ].map( ( level ) => (
								<CheckboxControl
									key={ level }
									label={ __( `Heading ${ level } (H${ level })`, 'navygator' ) }
									checked={ isHeadingLevelSelected( level ) }
									onChange={ () => toggleHeadingLevel( level ) }
								/>
							) ) }
						</div>
					</BaseControl>
				</PanelBody>

				<PanelBody title={ __( 'Color Settings', 'navygator' ) } initialOpen={ false }>
					<BaseControl label={ __( 'Background Color', 'navygator' ) }>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
						/>
					</BaseControl>

					<BaseControl label={ __( 'Text Color', 'navygator' ) }>
						<ColorPalette
							value={ textColor }
							onChange={ ( value ) => setAttributes( { textColor: value } ) }
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div 
					className="navygator-toc-preview"
					style={ {
						backgroundColor: backgroundColor || 'rgba(255, 255, 255, 0.95)',
						color: textColor || '#333',
					} }
				>
					{ title && (
						<div className="navygator-toc-title">{ title }</div>
					) }
					
					<div className="navygator-toc-preview-content">
						{ headingLevels.length === 0 ? (
							<p className="navygator-toc-empty">
								{ __( 'Please select at least one heading level in the block settings.', 'navygator' ) }
							</p>
						) : (
							<>
								<p className="navygator-toc-info">
									{ __( 'Table of contents will be generated from your page headings:', 'navygator' ) }
								</p>
								{ showNumbers ? (
									<ol className="navygator-toc-list-preview">
										<li>{ __( 'Sample Heading 1', 'navygator' ) }</li>
										<li>{ __( 'Sample Heading 2', 'navygator' ) }</li>
										<li>
											{ __( 'Sample Heading 3', 'navygator' ) }
											<ol>
												<li>{ __( 'Nested Heading', 'navygator' ) }</li>
											</ol>
										</li>
									</ol>
								) : (
									<ul className="navygator-toc-list-preview">
										<li>{ __( 'Sample Heading 1', 'navygator' ) }</li>
										<li>{ __( 'Sample Heading 2', 'navygator' ) }</li>
										<li>
											{ __( 'Sample Heading 3', 'navygator' ) }
											<ul>
												<li>{ __( 'Nested Heading', 'navygator' ) }</li>
											</ul>
										</li>
									</ul>
								) }
								<p className="navygator-toc-note">
									{ __( '💡 Desktop: Floats on the right side', 'navygator' ) }
									<br />
									{ __( '📱 Mobile: Toggle button with slide-up drawer', 'navygator' ) }
								</p>
							</>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
