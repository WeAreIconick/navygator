# NavyGator - Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Install the Plugin

**Option A: Copy to WordPress**
```bash
cp -r ~/documents/github/navygator /path/to/wordpress/wp-content/plugins/
```

**Option B: Create Symlink (for development)**
```bash
ln -s ~/documents/github/navygator /path/to/wordpress/wp-content/plugins/navygator
```

### Step 2: Activate

1. Log in to WordPress admin
2. Go to **Plugins**
3. Find "NavyGator" and click **Activate**

### Step 3: Use the Block

1. Create or edit a post/page
2. Add some headings to your content:
   ```
   ## Introduction
   Welcome to my post...
   
   ## Main Content
   Here's the main section...
   
   ### Subsection
   A nested heading...
   
   ## Conclusion
   Final thoughts...
   ```

3. Click the **(+)** button to add a block
4. Search for "NavyGator" or "Table of Contents"
5. Add the block anywhere in your content
6. **Publish!**

## 🎨 Customize (Optional)

Click the block, then in the right sidebar:

- **Title**: Change "Table of Contents" to anything
- **Show Numbers**: Toggle between numbered/bulleted lists
- **Heading Levels**: Check/uncheck H1-H6
- **Colors**: Pick background and text colors

## 📱 Test It

### Desktop
- Look for the floating TOC on the right side
- Click a link → smooth scroll to section
- Scroll the page → active section highlights

### Mobile
- Look for the circular button (bottom-right)
- Tap it → drawer slides up
- Tap a link → scrolls and closes drawer
- Tap backdrop or X → closes drawer

## ✅ That's It!

Your table of contents is now working. The plugin will:
- ✨ Auto-generate TOC from headings
- 🖥️ Float on desktop
- 📱 Toggle on mobile
- 🎯 Highlight active sections
- ⚡ Smooth scroll to sections

## 🛠️ Development Mode

If you want to modify the code:

```bash
cd ~/documents/github/navygator

# Install dependencies (first time only)
npm install

# Start development mode with watch
npm run start

# Make changes to files in src/
# They'll auto-compile to build/

# When done, build for production
npm run build
```

## 🐛 Troubleshooting

**Block doesn't appear?**
- Make sure plugin is activated
- Refresh the editor page

**TOC is empty?**
- Add headings to your content
- Check heading levels are selected in settings

**Styles look wrong?**
- Clear browser cache
- Clear WordPress cache (if using cache plugin)
- Run `npm run build` to regenerate assets

## 📚 More Info

- Full docs: `README.md`
- Installation guide: `INSTALL.md`
- Build summary: `BUILD-SUMMARY.md`
- Changelog: `CHANGELOG.md`

## 🎉 Enjoy!

You now have a beautiful, floating table of contents for your WordPress site!
