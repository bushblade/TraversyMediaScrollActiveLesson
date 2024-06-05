/** @param {number} indx */
function handleSpeedSettingClick(indx) {
  return () => {
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
    checkBox.addEventListener('click', handleSpeedSettingClick(indx))
  })
}

/** @param {NodeListOf<HTMLInputElement>} speedSettingCheckBoxes*/
function restoreSpeed(speedSettingCheckBoxes) {
  const storedSpeed = localStorage.getItem('playback-speed')
  if (storedSpeed) {
    speedSettingCheckBoxes[storedSpeed].click()
  }
  // close settings if open, use setTimeOut to ensure checking for open button
  // runs after other processes
  setTimeout(() => {
    const settingsOpenButton = getSettingsCloseButton()

    if (settingsOpenButton) {
      settingsOpenButton.click()
      settingsOpenButton.blur()
    }
  }, 300)
}

function getSettingsOpenButton() {
  /** @type {HTMLButtonElement} */
  const settingsButton = document.querySelector(
    'button[aria-label="Show settings menu"]',
  )
  return settingsButton
}

function getSettingsCloseButton() {
  /** @type {HTMLButtonElement} */
  const settingsButton = document.querySelector(
    'button[aria-label="Hide settings menu"]',
  )
  return settingsButton
  // return getSettingsButton().getAttribute('aria-label') === 'Hide settings menu'
}

function handlePlayback() {
  restoreSpeed(getSpeedSettingCheckBoxes())
}

// NOTE: video settings are dynamically inserted into DOM after wista loads the
// video.

// only add speed setting event listeners once
let needToAddSpeedSettingListeners = true
let settingsOpenedFirstTime = false
// only add one playback event listener
let playbackListenerAdded = false

/** @param {Array<MutationRecord>} mutationList*/
function mutationCallback(mutationList) {
  // biome-ignore lint/complexity/noForEach: <explanation>
  mutationList.forEach(() => {
    // need to open and close the settings to apply
    const settingsButton = getSettingsOpenButton()

    if (settingsButton && !settingsOpenedFirstTime) {
      // open settings
      settingsButton.click()
      settingsOpenedFirstTime = true
    }

    const speedSettingCheckBoxes = getSpeedSettingCheckBoxes()

    // check that the speed settings are there and we can set speed
    if (
      speedSettingCheckBoxes &&
      needToAddSpeedSettingListeners &&
      speedSettingCheckBoxes.length === 7
    ) {
      addSpeedSettingsEventListeners(speedSettingCheckBoxes)
      restoreSpeed(speedSettingCheckBoxes)
      needToAddSpeedSettingListeners = false
    }

    // FIX: Kajabi resets playback speed to 1 on first play of video
    const video = document.querySelector('video')
    if (video && settingsButton && !playbackListenerAdded) {
      video.addEventListener('playing', handlePlayback)
      playbackListenerAdded = true
    }
  })
}

const observerOptions = {
  childList: true,
  subtree: true,
}

const mutationObserver = new MutationObserver(mutationCallback)

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
mutationObserver.observe(videoWrapper, observerOptions)
