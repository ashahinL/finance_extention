# HSBC Egypt USD/EGP Exchange Rate Monitor

A Chrome extension that monitors real-time USD to EGP exchange rates from HSBC Egypt via Ta3weem.com.

## Features

- 🔄 **Real-time Updates**: Automatically fetches HSBC Egypt's USD/EGP exchange rates every 5 minutes
- 📊 **Clean Interface**: Beautiful popup showing buy and sell rates
- 💾 **Local Storage**: Stores rates locally for offline viewing
- 🔔 **Badge Indicator**: Shows current sell rate in extension badge
- 🌐 **Direct Access**: Quick link to visit Ta3weem.com
- 📱 **Responsive Design**: Modern, mobile-friendly interface

## Installation

### Method 1: Load Unpacked Extension (Developer Mode)

1. **Download the Extension Files**
   - Download all files: `manifest.json`, `popup.html`, `popup.js`, `background.js`, `content.js`
   - Create a folder (e.g., "HSBC-Monitor") and place all files inside

2. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - Or click the menu (⋮) → More tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the folder containing your extension files
   - The extension will appear in your extensions list

5. **Pin the Extension**
   - Click the puzzle piece icon in the toolbar
   - Click the pin icon next to "HSBC Egypt USD/EGP Monitor"

## Usage

### Basic Usage

1. **Click the Extension Icon**: Click the HSBC monitor icon in your toolbar
2. **View Rates**: The popup will show current buy/sell rates for USD/EGP
3. **Refresh**: Click "Refresh" to get the latest rates
4. **Visit Source**: Click "Visit Ta3weem" to open the source website

### Automatic Features

- **Auto-refresh**: Rates update automatically every 5 minutes in the background
- **Badge Display**: The extension badge shows the current sell rate
- **Persistent Storage**: Rates are saved locally and displayed even offline

### Status Indicators

- 🟢 **Green Dot**: Connected and rates are current
- 🔴 **Red Dot**: Connection failed or rates are stale
- 🔵 **Blue Dot**: Currently fetching new rates

## How It Works

1. **Background Service**: The extension runs a service worker that periodically visits Ta3weem.com
2. **Web Scraping**: It parses the HTML table to extract HSBC's USD/EGP rates
3. **Data Storage**: Rates are stored locally using Chrome's storage API
4. **Real-time Display**: The popup interface shows current and historical rate data

## Technical Details

### Files Structure

```
HSBC-Monitor/
├── manifest.json      # Extension configuration
├── popup.html        # Popup interface
├── popup.js          # Popup functionality
├── background.js     # Background service worker
├── content.js        # Content script for ta3weem.com
└── README.md         # This file
```

### Permissions Used

- **activeTab**: To interact with the current browser tab
- **storage**: To save exchange rates locally
- **scripting**: To inject scripts for data extraction
- **host_permissions**: Access to ta3weem.com for scraping

### Data Source

The extension scrapes data from [Ta3weem.com](https://ta3weem.com/old/), specifically looking for HSBC Egypt's USD/EGP exchange rates in the bank comparison table.

## Troubleshooting

### Extension Not Working

1. **Check Permissions**: Ensure the extension has necessary permissions
2. **Reload Extension**: Go to `chrome://extensions/` and click the reload icon
3. **Clear Storage**: Right-click extension → Options → Clear stored data
4. **Check Network**: Ensure you can access ta3weem.com directly

### No Rates Displayed

1. **Visit Ta3weem**: Navigate to ta3weem.com/old/ in a browser tab
2. **Check HSBC Data**: Verify HSBC rates are visible on the page
3. **Manual Refresh**: Click the "Refresh" button in the popup
4. **Wait for Auto-update**: The extension updates automatically every 5 minutes

### Badge Shows "!" 

This indicates an error occurred:
- Check internet connection
- Verify ta3weem.com is accessible
- Reload the extension

## Privacy & Security

- **No Data Collection**: The extension doesn't collect or transmit personal data
- **Local Storage Only**: All data is stored locally in your browser
- **No External Servers**: No data is sent to external servers except ta3weem.com for scraping
- **Open Source**: All code is visible and can be audited

## Development

### Manifest V3 Compliance

This extension is built using Chrome's latest Manifest V3 standard, ensuring:
- Better security with service workers
- Improved performance
- Future compatibility

### Customization

You can modify the extension by editing the JavaScript files:
- `popup.js`: Change the user interface behavior
- `background.js`: Modify scraping frequency or data processing
- `content.js`: Adjust the scraping logic

## Support

### Common Issues

**Q: Extension shows old rates**
A: Click "Refresh" or wait for the automatic 5-minute update cycle.

**Q: Badge shows "..." constantly** 
A: The extension is still loading. Wait a few moments or check your internet connection.

**Q: Popup shows "Unable to fetch rates"**
A: This usually means ta3weem.com is temporarily unavailable or the page structure has changed.

### Reporting Issues

If you encounter problems:
1. Check the browser console for error messages
2. Try disabling and re-enabling the extension
3. Ensure ta3weem.com loads properly in your browser

## Version History

### v1.0.0 (Initial Release)
- Real-time HSBC USD/EGP rate monitoring
- Clean popup interface with buy/sell rates
- Automatic background updates every 5 minutes
- Local storage for offline viewing
- Badge indicator showing current sell rate
- Direct link to ta3weem.com source

## License

This extension is provided as-is for educational and personal use. The exchange rate data is sourced from Ta3weem.com and belongs to their respective owners.

## Disclaimer

This extension is not affiliated with HSBC Egypt or Ta3weem.com. Exchange rates shown are for informational purposes only and may not reflect real-time market conditions. Always verify rates with official sources before making financial decisions.