/** @param {number} indx */
function speedSettingClickEvent(indx) {
  return function () {
    localStorage.setItem('playback-speed', `${indx}`)
  }
}

function getSpeedSettingCheckBoxes() {
  /** @type {NodeListOf<HTMLInputElement>} */
  const speedSettingCheckBoxes = document.querySelectorAll('input[name=Speed]')
  return speedSettingCheckBoxes
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

function getSettingsButton() {
  /** @type {HTMLButtonElement} */
  const settingsButton = document.querySelector(
    'button[aria-label="Show settings menu"]'
  )
  return settingsButton
}

function isSettingsOpen() {
  return getSettingsButton().getAttribute('aria-expanded') === 'true'
}

// NOTE: video settings are dynamically inserted into DOM after wista loads the
// video.

// only set the speed once
let canSetSpeed = true
let settingsOpenedFirstTime = false
// need to set again if first play to fix issue with Kajabi
let firstPlay = true

/** @param {Array<MutationRecord>} mutationList*/
function mutationCallback(mutationList) {
  mutationList.forEach(() => {
    // need to open and close the settings to apply
    const settingsButton = getSettingsButton()

    if (settingsButton && !settingsOpenedFirstTime) {
      // open settings
      settingsButton.click()
      settingsOpenedFirstTime = true
    }

    const speedSettingCheckBoxes = getSpeedSettingCheckBoxes()

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
      if (isSettingsOpen()) settingsButton.click()
    }

    const video = document.querySelector('video')
    if (video && settingsButton) {
      watchForFirstPlay(video)
    }
  })
}

const observerOptions = {
  childList: true,
  subtree: true,
}

const mutationObserver = new MutationObserver(mutationCallback)

mutationObserver.observe(videoWrapper, observerOptions)

// FIX: Kajabi resets playback speed to 1 on first play of video
/**
 * @param {HTMLVideoElement} video
 */
function watchForFirstPlay(video) {
  const handlePlayback = () => {
    if (firstPlay) {
      restoreSpeed(getSpeedSettingCheckBoxes())
      firstPlay = false
      // close settings if open
      if (isSettingsOpen()) {
        getSettingsButton().click()
      }
    }
  }

  video.addEventListener('playing', handlePlayback)
}
