# Let me create a comprehensive Chrome extension for monitoring HSBC Egypt USD/EGP exchange rates

# First, let's create the manifest.json file
manifest_json = {
    "manifest_version": 3,
    "name": "HSBC Egypt USD/EGP Monitor",
    "version": "1.0.0",
    "description": "Monitor USD to EGP exchange rates from HSBC Egypt via Ta3weem.com",
    "permissions": [
        "activeTab",
        "storage",
        "scripting"
    ],
    "host_permissions": [
        "https://ta3weem.com/*"
    ],
    "background": {
        "service_worker": "background.js"
    },
    "content_scripts": [
        {
            "matches": ["https://ta3weem.com/*"],
            "js": ["content.js"]
        }
    ],
    "action": {
        "default_popup": "popup.html",
        "default_title": "HSBC USD/EGP Rates",
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

print("Manifest JSON created:")
print(manifest_json)