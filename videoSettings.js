const script = document.createElement('script');

// Securely fetch the file from the extension's local directory
// @ts-ignore
script.src = chrome.runtime.getURL('wistia-injector.js');

// Clean up the script tag from the DOM after it successfully loads and executes
script.onload = function () {
  script.remove();
};

if (document.head || document.documentElement) {
  (document.head || document.documentElement).appendChild(script);
}
