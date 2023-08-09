
#!/bin/bash

# Copy Firefox manifest and create Firefox extension zip
cp manifest.firefox.json manifest.json
zip -r firefox-extension.zip . -x "*.git*" "firefox-extension.zip" "chrome-extension.zip" "*.DS_Store*"
echo "Firefox extension zipped as firefox-extension.zip"

# Copy Chrome manifest and create Chrome extension zip
cp manifest.chrome.json manifest.json
zip -r chrome-extension.zip . -x "*.git*" "firefox-extension.zip" "chrome-extension.zip" "*.DS_Store*"
echo "Chrome extension zipped as chrome-extension.zip"

# Remove temporary manifest.json file
rm manifest.json
echo "Temporary manifest.json file deleted"

echo "Build process completed!"
