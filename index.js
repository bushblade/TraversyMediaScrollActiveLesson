function highlightAndScrollIntoViewActive() {
  const sideMenu = document.querySelector('.main-sidebar')

  const activeLink = sideMenu.querySelector('.product-outline-post.active')
  activeLink.style.outline = '3px solid #0060df'
  activeLink.style.padding = '6px'

  activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function maximiseVideo() {
  const searchForm = document.querySelectorAll('form[role=search]')[1]
  const videoWrapper = document.querySelector('.kjb-video-responsive')
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

document.querySelector('.responsive-toggle').addEventListener('click', () => {
  document.body.classList.toggle('open')
})
