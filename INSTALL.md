# USD/EGP + Gold Monitor - Installation Guide

## Quick Start Guide

### Step 1: Create Extension Folder
Create a new folder named `usd-monitor` (or any name you prefer) on your desktop or anywhere convenient.

### Step 2: Save Extension Files
Save the following files in your extension folder:

1. **manifest.json** - Extension configuration
2. **popup.html** - User interface
3. **popup.js** - Interface functionality  
4. **background.js** - Background service worker for data fetching
5. **README.md** - Documentation
6. (Optional) **icon16.png, icon48.png, icon128.png** - Extension icons

### Step 3: Install in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked" button
4. Select your extension folder
5. The extension will appear in your extensions list

### Step 4: Pin Extension

1. Click the puzzle piece icon in Chrome toolbar
2. Click the pin icon next to "USD/EGP + Gold Monitor"
3. The extension icon will now appear in your toolbar for quick access

## File Structure

Your folder should look like this:

```
usd-monitor/
├── manifest.json
├── popup.html
├── popup.js
├── background.js
├── icon16.png (optional)
├── icon48.png (optional)
├── icon128.png (optional)
├── README.md
└── INSTALL.md (this file)
```

## Testing the Extension

1. Click the extension icon in your toolbar
2. You should see a popup with "Loading cached data..."
3. The extension will fetch live rates from APIs
4. You should see:
   - **USD/EGP Rate** with exchange rate value
   - **Gold Price** in USD per ounce
   - **Data sources** for each value
   - **Last updated** timestamp

## Creating Icon Files (Optional)

For a more professional look, you can add icon files:

1. Create simple 16x16, 48x48, and 128x128 pixel PNG images
2. Name them `icon16.png`, `icon48.png`, and `icon128.png`
3. Place them in your extension folder
4. The manifest.json already references these files

## Extension Features

Once installed, the extension will:

- ✅ Automatically fetch USD/EGP rates every 10 minutes
- ✅ Track gold prices (USD per ounce)
- ✅ Show rates in a clean popup interface
- ✅ Display data sources (showing which API was used)
- ✅ Show last update timestamp
- ✅ Store rates locally for offline viewing
- ✅ Automatic fallback to secondary data source if primary fails
- ✅ Manual refresh button for immediate updates
- ✅ Visual status indicator (online/offline/connecting)

## Troubleshooting

### Extension doesn't load:
- Make sure all required files are in the same folder
- Check that Developer mode is enabled
- Try reloading the extension via `chrome://extensions/`

### No rates showing:
- Check your internet connection
- Click the "Refresh" button in the extension popup
- Check if APIs are accessible in your region
- Reload the extension

### Shows "Update failed" error:
- This means the primary API was unreachable
- Fallback to secondary source may still work
- Check your network connection
- Try manual refresh

### Badge shows error indicator:
- This indicates a connection error
- Wait a few moments and try again
- Check that APIs are accessible in your region

## Network Requirements

The extension requires access to:
- `https://open.er-api.com/` - Primary exchange rate source
- `https://api.gold-api.com/` - Gold price source
- `https://stooq.com/` - Fallback exchange rate source

If these are blocked in your region/network, the extension won't work.

## Security & Privacy

This extension:
- **Only fetches** data from public APIs (no scraping)
- **Stores data locally** in your browser only
- **Does not send** any data to external servers (except API data sources)
- **Does not collect** personal information or browsing data
- **Is transparent** - all code is auditable

## Updates

To update the extension:
1. Replace the files in your extension folder
2. Go to `chrome://extensions/`
3. Click the reload icon next to the extension

To modify settings (like refresh interval):
1. Edit `background.js`
2. Change `REFRESH_INTERVAL_MINUTES` value
3. Reload the extension

---

**Ready to start monitoring USD/EGP rates and gold prices in real-time!** 🚀