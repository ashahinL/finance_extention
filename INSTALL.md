# HSBC Egypt USD/EGP Chrome Extension Installation Guide

## Quick Start Guide

### Step 1: Create Extension Folder
Create a new folder named `HSBC-Monitor` on your desktop or anywhere convenient.

### Step 2: Save Extension Files
Save the following files in your `HSBC-Monitor` folder:

1. **manifest.json** - Extension configuration
2. **popup.html** - User interface
3. **popup.js** - Interface functionality  
4. **background.js** - Background service worker
5. **content.js** - Content script for ta3weem.com
6. **README.md** - Documentation

### Step 3: Install in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked" button
4. Select your `HSBC-Monitor` folder
5. The extension will appear in your extensions list

### Step 4: Pin Extension

1. Click the puzzle piece icon in Chrome toolbar
2. Click the pin icon next to "HSBC Egypt USD/EGP Monitor"
3. The extension icon will now appear in your toolbar

## File Structure

Your folder should look like this:

```
HSBC-Monitor/
├── manifest.json
├── popup.html
├── popup.js
├── background.js
├── content.js
├── README.md
└── INSTALL.md (this file)
```

## Testing the Extension

1. Click the extension icon in your toolbar
2. You should see a popup with "Loading exchange rates..."
3. Wait a few seconds for rates to load
4. The popup should display HSBC's USD/EGP buy and sell rates

## Creating Icon Files (Optional)

For a more professional look, you can add icon files:

1. Create simple 16x16, 48x48, and 128x128 pixel PNG images
2. Name them `icon16.png`, `icon48.png`, and `icon128.png`
3. Place them in your extension folder
4. The manifest.json already references these files

## Extension Features

Once installed, the extension will:

- ✅ Automatically fetch HSBC rates every 5 minutes
- ✅ Show rates in a clean popup interface
- ✅ Display current sell rate in the extension badge
- ✅ Store rates locally for offline viewing
- ✅ Provide quick access to ta3weem.com

## Troubleshooting

### Extension doesn't load:
- Make sure all 5 files are in the same folder
- Check that Developer mode is enabled
- Try reloading the extension

### No rates showing:
- Check internet connection
- Visit ta3weem.com/old/ to verify the site is working
- Click "Refresh" in the extension popup

### Badge shows "!":
- This indicates a connection error
- Wait a few minutes and try again
- Check if ta3weem.com is accessible

## Security Notes

This extension:
- Only accesses ta3weem.com for data scraping
- Stores data locally in your browser only
- Does not send any data to external servers
- Does not collect personal information

## Updates

To update the extension:
1. Replace the files in your extension folder
2. Go to chrome://extensions/
3. Click the reload icon next to your extension

---

**Ready to start monitoring HSBC Egypt USD/EGP rates in real-time!** 🚀