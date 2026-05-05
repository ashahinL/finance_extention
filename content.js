// content.js - Content script that runs on ta3weem.com pages

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeRates') {
    const rates = scrapeHSBCRates();
    sendResponse(rates);
  }
});

// Function to scrape HSBC rates from the current page
function scrapeHSBCRates() {
  try {
    // Look for HSBC in table rows
    const rows = document.querySelectorAll('tr');
    
    for (let row of rows) {
      const cells = row.querySelectorAll('td, th');
      
      if (cells.length >= 4) {
        const bankCell = cells[0];
        
        // Check if this row contains HSBC
        if (bankCell && (
          bankCell.textContent.includes('HSBC') ||
          bankCell.textContent.includes('بنك HSBC') ||
          bankCell.innerHTML.includes('HSBC')
        )) {
          
          // Extract buy and sell rates
          const rateValues = [];
          
          for (let i = 1; i < cells.length - 1; i++) {
            const cellText = cells[i].textContent.trim();
            
            // Look for currency rate patterns (like 48.13)
            const rateMatch = cellText.match(/(\d{2}\.\d{2,3})/);
            if (rateMatch) {
              rateValues.push(rateMatch[1]);
            }
          }
          
          if (rateValues.length >= 2) {
            // Get timestamp from last cell if available
            const lastCell = cells[cells.length - 1];
            const timestamp = lastCell ? lastCell.textContent.trim() : new Date().toLocaleString();
            
            return {
              buyRate: rateValues[0],
              sellRate: rateValues[1],
              lastUpdate: timestamp,
              source: 'content-script',
              pageUrl: window.location.href,
              scrapedAt: new Date().toISOString()
            };
          }
        }
      }
    }
    
    // Alternative approach: search entire page text
    const pageText = document.body.textContent || document.body.innerText;
    const hsbcMatch = pageText.match(/HSBC.*?(\d{2}\.\d{2,3}).*?(\d{2}\.\d{2,3})/i);
    
    if (hsbcMatch) {
      return {
        buyRate: hsbcMatch[1],
        sellRate: hsbcMatch[2],
        lastUpdate: new Date().toLocaleString(),
        source: 'content-script-regex',
        pageUrl: window.location.href,
        scrapedAt: new Date().toISOString()
      };
    }
    
    return null;
    
  } catch (error) {
    console.error('Error in scrapeHSBCRates:', error);
    return null;
  }
}

// Auto-scrape on page load and notify extension
function autoScrapeAndNotify() {
  const rates = scrapeHSBCRates();
  
  if (rates) {
    // Send rates to background script
    chrome.runtime.sendMessage({
      action: 'ratesFound',
      data: rates
    }).catch(error => {
      console.log('Could not send message to background:', error);
    });
    
    console.log('HSBC rates found:', rates);
  }
}

// Run auto-scrape when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoScrapeAndNotify);
} else {
  autoScrapeAndNotify();
}

// Also monitor for dynamic content changes
const observer = new MutationObserver((mutations) => {
  let hasRelevantChanges = false;
  
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      for (let node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const text = node.textContent || node.innerText || '';
          if (text.includes('HSBC') || text.includes('48.')) {
            hasRelevantChanges = true;
            break;
          }
        }
      }
    }
  });
  
  if (hasRelevantChanges) {
    setTimeout(autoScrapeAndNotify, 1000); // Debounce the scraping
  }
});

// Start observing page changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Visual indicator that extension is active (optional, can be removed)
function addVisualIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'hsbc-extension-indicator';
  indicator.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10000;
    background: #4CAF50;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    font-family: Arial, sans-serif;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  `;
  indicator.textContent = 'HSBC Monitor Active';
  
  document.body.appendChild(indicator);
  
  // Remove indicator after 3 seconds
  setTimeout(() => {
    if (document.getElementById('hsbc-extension-indicator')) {
      document.body.removeChild(indicator);
    }
  }, 3000);
}

// Only show indicator on ta3weem.com
if (window.location.hostname.includes('ta3weem.com')) {
  addVisualIndicator();
}