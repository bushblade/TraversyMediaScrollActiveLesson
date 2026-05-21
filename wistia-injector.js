// Use bracket notation to satisfy the linter for dynamic window properties
window['_wq'] = window['_wq'] || [];

window['_wq'].push({
  id: '_all', 
  onReady: function (/** @type {any} */ video) {
    
    const applySpeed = () => {
      const savedSpeed = localStorage.getItem('tm-speed');
      if (savedSpeed) {
        video.playbackRate(parseFloat(savedSpeed));
      }
    };

    // 1. Apply immediately when the player loads
    applySpeed();

    // 2. Save the speed if the user manually clicks the gear icon
    video.bind('playbackratechange', function (/** @type {number} */ speed) {
      localStorage.setItem('tm-speed', speed.toString());
    });

    // 3. Override Kajabi resetting the speed to 1x when the user hits play
    video.bind('play', function () {
      setTimeout(applySpeed, 100);
    });
  }
});
