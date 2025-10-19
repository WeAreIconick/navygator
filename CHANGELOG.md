# Changelog

All notable changes to NavyGator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-10-19

### Added
- Initial release of NavyGator Table of Contents block
- Automatic heading extraction from post content
- Desktop floating view with fixed positioning
- Mobile toggle button with slide-up drawer
- Scroll spy functionality with active section highlighting
- Smooth scrolling to anchor links
- Customizable heading levels (H1-H6)
- Color customization (background and text)
- Numbered or bulleted list options
- Custom title support
- Nested heading support
- Accessibility features (ARIA labels, keyboard navigation)
- Responsive design for all screen sizes
- Print-friendly (hides TOC when printing)
- WordPress 6.0+ compatibility
- PHP 7.4+ compatibility
- Block editor (Gutenberg) integration
- Dynamic server-side rendering
- Automatic heading ID generation
- InspectorControls for block settings
- RTL (Right-to-Left) language support
- Custom scrollbar styling
- Backdrop overlay for mobile drawer
- Focus management for accessibility
- Empty state messages
- WordPress.org readme
- GitHub documentation
- GPL v2 license

### Technical Details
- Uses WordPress Block API version 3
- Built with @wordpress/scripts
- Intersection Observer API for scroll spy
- No jQuery dependency
- Minimal performance impact
- Conditional asset loading

## [Unreleased]

### Planned Features
- Collapsible nested sections
- Progress indicator showing reading progress
- Multiple TOC instances per page
- Exclude specific headings option
- Custom anchor link format
- Export/import settings
- Animation options
- Widget area placement option
- Shortcode support for legacy themes
- Custom positioning options
- More color schemes
- Font size customization

---

[1.0.0]: https://github.com/yourusername/navygator/releases/tag/v1.0.0
