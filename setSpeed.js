/** @param {number} indx */
function speedSettingClickEvent(indx) {
  return function () {
    localStorage.setItem('playback-speed', `${indx}`)
  }
}

/** @param {NodeListOf<HTMLInputElement>} speedSettingCheckBoxes*/
function addSpeedSettingsEventListeners(speedSettingCheckBoxes) {
  // add event listeners
  speedSettingCheckBoxes.forEach((checkBox, indx) => {
    checkBox.addEventListener('click', speedSettingClickEvent(indx))
  })
}

/** @param {NodeListOf<HTMLInputElement>} speedSettingCheckBoxes*/
function restoreSpeed(speedSettingCheckBoxes) {
  const storedSpeed = localStorage.getItem('playback-speed')
  if (storedSpeed) {
    speedSettingCheckBoxes[storedSpeed].click()
  }
}

// NOTE: video settings are dynamically inserted into DOM after wista loads the
// video.

// only set the speed once
let canSetSpeed = true
let settingsOpened = false

/** @param {Array<MutationRecord>} mutationList*/
function mutationCallback(mutationList) {
  mutationList.forEach(() => {
    // need to open and close the settings to apply
    /** @type {HTMLButtonElement} */
    const settingsButton = document.querySelector(
      'button[aria-label="Show settings menu"]'
    )

    if (settingsButton && !settingsOpened) {
      // open settings
      settingsButton.click()
      settingsOpened = true
    }

    /** @type {NodeListOf<HTMLInputElement>} */
    const speedSettingCheckBoxes =
      document.querySelectorAll('input[name=Speed]')

    // check that the speed settings are there and we can set speed
    if (
      speedSettingCheckBoxes &&
      canSetSpeed &&
      speedSettingCheckBoxes.length === 7
    ) {
      addSpeedSettingsEventListeners(speedSettingCheckBoxes)
      restoreSpeed(speedSettingCheckBoxes)
      canSetSpeed = false
      // close settings
      if (settingsOpened) settingsButton.click()
    }
  })
}

const observerOptions = {
  childList: true,
  subtree: true,
}

const mutationObserver = new MutationObserver(mutationCallback)

mutationObserver.observe(videoWrapper, observerOptions)
