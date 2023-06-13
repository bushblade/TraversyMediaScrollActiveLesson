/** @type {HTMLDivElement} */
const videoWrapper = document.querySelector('.kjb-video-responsive')

function highlightAndScrollIntoViewActive() {
  const sideMenu = document.querySelector('.main-sidebar')

  /** @type HTMLLinkElement */
  const activeLink = sideMenu.querySelector('.product-outline-post.active')
  activeLink.style.outline = '3px solid #0060df'
  activeLink.style.padding = '6px'

  activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function maximiseVideo() {
  const searchForm = document.querySelectorAll('form[role=search]')[1]
  videoWrapper.style.maxWidth = '100%'
  videoWrapper.style.paddingBottom = '0'
  videoWrapper.style.aspectRatio = '5/4'
  videoWrapper.style.height = 'auto'
  videoWrapper.style.maxHeight = `calc(100vh - ${
    searchForm.getBoundingClientRect().height
  }px)`
  videoWrapper.style.width = '100%'
  searchForm.scrollIntoView(true)
}

maximiseVideo()

// NOTE: Ensure scroll animation runs after video resized
window.requestAnimationFrame(highlightAndScrollIntoViewActive)

// set speed ------------------------------------------------------------

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

/** @param {Array<MutationRecord>} mutationList*/
function mutationCallback(mutationList) {
  // only set the speed once
  let canSetSpeed = true

  mutationList.forEach(() => {
    /** @type {NodeListOf<HTMLInputElement>} */
    const speedSettingCheckBoxes =
      document.querySelectorAll('input[name=Speed]')

    // check that the speed settings are there and we can set speed
    if (
      speedSettingCheckBoxes &&
      canSetSpeed &&
      speedSettingCheckBoxes.length === 7
    ) {
      canSetSpeed = false
      addSpeedSettingsEventListeners(speedSettingCheckBoxes)
      restoreSpeed(speedSettingCheckBoxes)
    }
  })
}

const observerOptions = {
  childList: true,
  subtree: true,
}

const mutationObserver = new MutationObserver(mutationCallback)

mutationObserver.observe(videoWrapper, observerOptions)
