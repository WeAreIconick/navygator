# Installation Guide

## For WordPress Users

### Method 1: Upload via WordPress Admin

1. Download the plugin ZIP file
2. Log in to your WordPress admin panel
3. Navigate to **Plugins > Add New > Upload Plugin**
4. Choose the ZIP file and click **Install Now**
5. Click **Activate Plugin**

### Method 2: Manual Installation

1. Download and extract the plugin ZIP file
2. Upload the `navygator` folder to `/wp-content/plugins/`
3. Log in to WordPress admin panel
4. Navigate to **Plugins**
5. Find "NavyGator" and click **Activate**

## For Developers

### Prerequisites

- Node.js 14+ and npm
- WordPress 6.0+
- PHP 7.4+

### Development Setup

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

### Installing in Local WordPress

1. Copy or symlink the plugin folder to your WordPress installation:
   ```bash
   ln -s /path/to/navygator /path/to/wordpress/wp-content/plugins/navygator
   ```

2. Log in to WordPress admin and activate the plugin

### Using the Block

1. Create or edit a post/page
2. Click the **(+)** button to add a block
3. Search for "NavyGator" or "Table of Contents"
4. Add the block to your content
5. Customize settings in the right sidebar:
   - Select heading levels (H1-H6)
   - Toggle numbered vs bulleted list
   - Set custom title
   - Choose colors
6. Publish your post/page

The table of contents will automatically generate from the headings in your content.

## Troubleshooting

### Block doesn't appear in editor

- Make sure the plugin is activated
- Clear your browser cache
- Try regenerating the build: `npm run build`

### TOC is empty

- Make sure your content has headings (H1-H6)
- Check that the heading levels you want are selected in block settings
- Verify headings are not inside other blocks that hide their content

### Styles not loading

- Clear WordPress cache (if using a caching plugin)
- Regenerate the build files: `npm run build`
- Check browser console for JavaScript errors

### Mobile toggle button not working

- Ensure JavaScript is enabled in your browser
- Check browser console for errors
- Verify the view.js file is being loaded

## Requirements

- WordPress 6.0 or higher
- PHP 7.4 or higher
- Modern browser with JavaScript enabled
- Block editor (Gutenberg) enabled

## Support

For issues and questions:
- GitHub Issues: https://github.com/yourusername/navygator/issues
- WordPress Support Forum: https://wordpress.org/support/plugin/navygator/
