# Chrome Extension: USD/EGP + Gold Monitor
# This script was used to generate the extension files

# Updated configuration for API-based monitoring
manifest_config = {
    "manifest_version": 3,
    "name": "USD/EGP + Gold Monitor",
    "version": "1.0.0",
    "description": "Monitor USD/EGP exchange rates and gold prices using public APIs",
    "permissions": [
        "storage",
        "alarms"
    ],
    "host_permissions": [
        "https://open.er-api.com/*",
        "https://api.gold-api.com/*",
        "https://stooq.com/*"
    ],
    "background": {
        "service_worker": "background.js"
    },
    "action": {
        "default_popup": "popup.html",
        "default_title": "USD/EGP + Gold Monitor",
        "default_icon": {
            "16": "icon16.png",
            "48": "icon48.png",
            "128": "icon128.png"
        }
    },
    "icons": {
        "16": "icon16.png",
        "48": "icon48.png",
        "128": "icon128.png"
    }
}

# API endpoints
api_endpoints = {
    "primary_exchange_rate": "https://open.er-api.com/v6/latest/USD",
    "gold_price": "https://api.gold-api.com/v1/spot/usd",
    "fallback_exchange_rate": "https://stooq.com/api/v2/data",
    "data_format": "JSON"
}

print("Configuration updated to use API-based data sources")