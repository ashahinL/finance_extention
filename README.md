# USD/EGP + Gold Monitor

A lightweight Chrome extension that monitors real-time USD to EGP exchange rates and gold prices using public APIs.

## Features

- 💱 **Live Exchange Rates**: Track USD/EGP rates with automatic updates every 10 minutes
- 🪙 **Gold Prices**: Monitor gold prices in USD per ounce
- 📱 **Clean UI**: Beautiful, responsive popup interface
- 🔄 **Auto-Refresh**: Background service automatically fetches latest data
- 💾 **Offline Support**: Cached data available when offline
- 🔀 **Fallback APIs**: Automatic fallback from primary to secondary data sources
- ⏱️ **Timestamp Tracking**: See exactly when rates were last updated
- 🟢 **Status Indicators**: Visual feedback for connection status

## Installation

### Load Unpacked Extension (Developer Mode)

1. **Prepare Files**
   - Ensure you have: `manifest.json`, `popup.html`, `popup.js`, `background.js`, and this folder

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Or menu (⋮) → More tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" in the top right corner

4. **Load Extension**
   - Click "Load unpacked"
   - Select this folder
   - Extension will appear in your extensions list

5. **Pin for Easy Access**
   - Click the puzzle piece icon in your toolbar
   - Pin "USD/EGP + Gold Monitor" for quick access

## Usage

### Viewing Rates

1. Click the extension icon in your toolbar
2. View current USD/EGP exchange rate and gold price
3. See data source and last update timestamp
4. Click **Refresh** to fetch latest rates immediately

### Automatic Updates

- **Background Refresh**: Data updates automatically every 10 minutes
- **Cache Display**: Previously cached rates display instantly on popup open
- **Status Indicator**: Shows connection status and last update time

## How It Works

1. **Background Service**: Chrome service worker fetches market data on a schedule
2. **Multiple Data Sources**: 
   - Primary: [open.er-api.com](https://open.er-api.com) for exchange rates
   - Gold: [api.gold-api.com](https://api.gold-api.com) for gold prices
   - Fallback: [stooq.com](https://stooq.com) if primary API fails
3. **Local Caching**: Data stored via Chrome Storage API
4. **Real-time Display**: Popup shows latest cached or freshly fetched data

## Technical Details

### Project Structure

```
usd-monitor/
├── manifest.json       # Extension configuration (v3)
├── background.js       # Service worker for data fetching
├── popup.html         # Popup UI
├── popup.js           # Popup logic
├── content.js         # Content script (if needed)
├── app.js             # Demo application
├── style.css          # Styling
├── index.html         # Demo/testing page
├── script.py          # Python helper script
└── README.md          # This file
```

### Permissions

- **storage**: Cache market data locally
- **alarms**: Schedule periodic data refresh
- **host_permissions**: Access to:
  - `https://open.er-api.com/*` (primary exchange rates)
  - `https://api.gold-api.com/*` (gold prices)
  - `https://stooq.com/*` (fallback rates)

### Data Flow

1. **Background.js** fetches from APIs every 10 minutes
2. Data stored in Chrome's `local` storage
3. **Popup.js** retrieves cached data on open
4. User can manually refresh for immediate update
5. Fallback to secondary source if primary API fails

### API Specifications

- **Exchange Rate**: USD to EGP conversion
- **Gold**: USD per troy ounce
- **Update Interval**: 10 minutes (configurable)
- **Fallback Strategy**: Automatic retry with alternate source

## Troubleshooting

### No Data Displays

1. Check network connection
2. Reload extension: `chrome://extensions/` → reload icon
3. Clear cache: Open DevTools → Application → Storage → Clear All
4. Check if APIs are accessible in your region

### Rates Not Updating Automatically

- Check if `background.js` service worker is running (check Chrome DevTools)
2. Verify refresh interval in manifest (currently 10 minutes)
3. Try manual refresh to test API connectivity

### Connection Status Meanings

- 🟢 **Online**: Data successfully fetched from primary API
- 🟡 **Connecting**: Data fetch in progress
- 🔴 **Offline**: Unable to fetch data (cached data displayed)

### API Not Responding

1. Check your internet connection
2. Try manual refresh first
3. Check if APIs are accessible in your region/network
4. Clear browser cache and reload extension
5. Fallback source (stooq.com) will be used if primary fails

## Configuration

### Modify Refresh Interval

Edit `background.js`, line with `REFRESH_INTERVAL_MINUTES`:

```javascript
const REFRESH_INTERVAL_MINUTES = 10; // Change to desired minutes
```

Reload the extension after changes.

## Privacy & Security

- **No Personal Data**: Extension doesn't collect user information
- **Local Storage Only**: All data cached locally in your browser
- **Open APIs**: Uses public, free APIs only
- **No Tracking**: No analytics or external requests beyond data APIs
- **Transparent**: All code is visible and auditable

## Development

### Built with Manifest V3

Modern Chrome extension standard ensuring:
- Enhanced security with service workers
- Better performance and resource management  
- Future Chrome compatibility

### Customization

Modify the extension by editing:
- **background.js**: Change fetch frequency, API endpoints, or data processing
- **popup.js**: Customize UI behavior and data display
- **popup.html**: Adjust layout and elements
- **style.css**: Modify visual appearance

## API Data Sources

| Source | Data | Primary/Fallback | Endpoint |
|--------|------|------------------|----------|
| open.er-api.com | USD/EGP Rate | Primary | `v6/latest/USD` |
| api.gold-api.com | Gold Price | Primary | Gold API endpoint |
| stooq.com | USD/EGP Rate | Fallback | Market data |

## Support

### Troubleshooting Checklist

1. ✅ Check network connection
2. ✅ Reload extension (`chrome://extensions/` → reload)
3. ✅ Try manual refresh in popup
4. ✅ Clear browser cache
5. ✅ Check if APIs are accessible in your region
6. ✅ Re-add extension if issues persist

### Common Questions

**Q: Why do rates sometimes differ between sources?**
A: APIs update at different frequencies and may have slight variations. Use the "Source" label to identify which API provided the data.

**Q: Can I change the update frequency?**
A: Yes, edit `REFRESH_INTERVAL_MINUTES` in `background.js` and reload the extension.

**Q: Why shows "Fallback" in the source?**
A: Primary API wasn't reachable, so fallback source was used. Check your connection and manually refresh.

**Q: Does it work offline?**
A: Partially - previously cached data displays, but you can't fetch fresh rates without internet.

## Version History

### v1.0.0 (Current)
- USD/EGP exchange rate monitoring via APIs
- Gold price tracking (USD/oz)
- 10-minute automatic refresh cycle
- Multiple data sources with fallback logic
- Local caching for offline viewing
- Real-time status indicators
- Manual refresh capability
- Source tracking and timestamps

## License

This extension is provided as-is for educational and personal use. Exchange rate and gold price data comes from public APIs and their respective owners.

## Disclaimer

This extension is not affiliated with any of the data providers (open.er-api.com, api.gold-api.com, or stooq.com). Market data is for informational purposes only and may not reflect real-time conditions. Always verify rates with official financial sources before making financial decisions.