# Browser extension add on for students of Brad Traversy

This add on once enabled scrolls the current active lesson link into view on the
side menu of the course platform for [Traversy Media](https://www.traversymedia.com/).
It highlights it and places it in the center of the screen so you can easily
keep track of what lesson you are on, which is next and which is previous.

## Additional features

The extension now maximises the video to fit the available space in
the viewport i.e. no black borders around the video on large monitors.

The video speed setting will now persist between switching lessons and/or
refreshing the browser.

---

The extension may work for other courses using the [Kajabi](https://kajabi.com/)
platform but I have not tested.

## Example view before extension:

![Before Extension](./extension-before.webp)

## Example view after extension:

![Before Extension](./extension-after.webp)

[Get the extension for FireFox](https://addons.mozilla.org/en-US/firefox/addon/traversy-scroll-active-lesson/)

[Get the extension for Chrome/Chromium](https://chrome.google.com/webstore/detail/traversy-media-scroll-act/nmddkphngjlkifpobgpcbfbmfmfpimam)

### Building the Extensions

Build the extensions for both Firefox and Chrome using the [build script](build.sh):

**Make the build script executable**: Run `chmod +x build.sh` to make the script executable.

**Run the script**: Execute `./build.sh` to create the zip files for both Firefox and Chrome extensions.

The script performs the following steps:

- Copies `manifest.firefox.json` to `manifest.json` and zips the project to `firefox-extension.zip`.
- Copies `manifest.chrome.json` to `manifest.json` and zips the project to `chrome-extension.zip`.
- Deletes the temporary `manifest.json` file.

### Contribute

Feel free to fork the project and make contributions. Follow the development workflow outlined above, and submit a pull request when you have something new to add!
