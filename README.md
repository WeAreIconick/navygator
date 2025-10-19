# NavyGator - Table of Contents Block for WordPress

A beautiful, floating table of contents block that automatically generates navigation from your page headings. Features a sticky sidebar on desktop and a mobile-friendly toggle drawer.

![WordPress Plugin Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![WordPress Compatibility](https://img.shields.io/badge/wordpress-6.0%2B-blue.svg)
![PHP Compatibility](https://img.shields.io/badge/php-7.4%2B-blue.svg)
![License](https://img.shields.io/badge/license-GPL--2.0%2B-green.svg)

## Features

- **Automatic Generation**: Automatically extracts headings from your content
- **Desktop Floating View**: Beautiful floating sidebar that stays visible while scrolling
- **Mobile-Friendly**: Toggle button with slide-up drawer for mobile devices
- **Scroll Spy**: Automatically highlights the current section as you scroll
- **Smooth Scrolling**: Smooth scroll animation when clicking TOC links
- **Customizable**: Choose heading levels, colors, and list style
- **Accessible**: Built with accessibility in mind (ARIA labels, keyboard navigation)
- **Lightweight**: Minimal performance impact, no jQuery dependency

## Installation

### From WordPress.org

1. Log in to your WordPress admin panel
2. Navigate to **Plugins > Add New**
3. Search for "NavyGator"
4. Click **Install Now** and then **Activate**

### Manual Installation

1. Download the latest release from [GitHub Releases](https://github.com/yourusername/navygator/releases)
2. Upload the ZIP file via **Plugins > Add New > Upload Plugin**
3. Activate the plugin

### For Development

```bash
# Clone the repository
git clone https://github.com/yourusername/navygator.git
cd navygator

# Install dependencies
npm install

# Build for production
npm run build

# Or start development mode with watch
npm run start
```

## Usage

1. Create or edit a post/page in the WordPress block editor
2. Click the **(+)** button to add a new block
3. Search for **"NavyGator"** or **"Table of Contents"**
4. Add the block to your content
5. Customize settings in the block sidebar:
   - Select which heading levels to include (H1-H6)
   - Toggle numbered vs bulleted list
   - Set custom title
   - Choose background and text colors
6. Publish your post/page

The table of contents will automatically generate from the headings in your content.

## Customization

### Block Settings

Access the block settings in the right sidebar when the block is selected:

- **Title**: Customize the TOC title (default: "Table of Contents")
- **Show Numbers**: Toggle between numbered (ol) and bulleted (ul) lists
- **Heading Levels**: Select which heading levels to include (H1-H6)
- **Background Color**: Set a custom background color
- **Text Color**: Set a custom text color

### Custom CSS

You can add custom CSS to further customize the appearance:

```css
/* Change the desktop position */
.navygator-toc {
    top: 10vh;
    right: 10px;
}

/* Customize the mobile toggle button */
.navygator-toc-toggle {
    background: #your-color;
}

/* Style the active link */
.navygator-toc-link.is-active {
    color: #your-color;
}
```

## Technical Details

### Built With

- **WordPress Block API** (API version 3)
- **React** (via @wordpress/element)
- **@wordpress/scripts** (webpack, babel, eslint)
- **Sass** for styling
- **Intersection Observer API** for scroll spy
- **PHP** for server-side rendering

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- Scripts and styles only load on pages with the block
- Uses Intersection Observer (native browser API)
- No jQuery dependency
- Minimal DOM manipulation
- Optimized CSS with hardware acceleration

## Development

### Prerequisites

- Node.js 14+ and npm
- WordPress 6.0+
- PHP 7.4+

### Development Workflow

```bash
# Install dependencies
npm install

# Start development mode (watch for changes)
npm run start

# Build for production
npm run build

# Lint JavaScript
npm run lint:js

# Lint CSS
npm run lint:css

# Format code
npm run format

# Create plugin ZIP
npm run plugin-zip
```

### Project Structure

```
navygator/
├── src/
│   ├── index.js          # Block registration
│   ├── edit.js           # Editor component
│   ├── save.js           # Save function (returns null)
│   ├── style.scss        # Frontend styles
│   ├── editor.scss       # Editor styles
│   ├── view.js           # Frontend JavaScript
│   └── block.json        # Block metadata
├── build/                # Compiled assets (generated)
├── navygator.php         # Main plugin file
├── package.json          # NPM dependencies
├── readme.txt            # WordPress.org readme
└── README.md             # This file
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- Use ESLint and Prettier (configured via @wordpress/scripts)
- Write clear commit messages
- Add comments for complex logic

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/navygator/issues)
- **WordPress Support**: [Plugin Support Forum](https://wordpress.org/support/plugin/navygator/)
- **Documentation**: [Wiki](https://github.com/yourusername/navygator/wiki)

## Roadmap

Future features under consideration:

- [ ] Collapsible nested sections
- [ ] Progress indicator
- [ ] Multiple TOC instances per page
- [ ] Exclude specific headings
- [ ] Custom anchor link format
- [ ] Export/import settings
- [ ] RTL language support
- [ ] Animation options
- [ ] Widget area placement option

## License

This project is licensed under the GPL v2 or later - see the [LICENSE](LICENSE) file for details.

## Credits

Created by [Your Name](https://yourwebsite.com)

Special thanks to:
- WordPress Core Team for the Block Editor
- The WordPress Community

## Changelog

### 1.0.0 - 2024-01-01

- Initial release
- Automatic heading extraction
- Desktop floating view
- Mobile toggle drawer
- Scroll spy functionality
- Smooth scrolling
- Customizable heading levels
- Color customization
- Accessibility features

---

Made with ❤️ for the WordPress community
