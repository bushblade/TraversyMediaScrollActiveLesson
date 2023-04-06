function highlightAndScrollIntoViewActive() {
  const sideMenu = document.querySelector(".main-sidebar");

  const activeLink = sideMenu.querySelector(".product-outline-post.active");
  activeLink.style.outline = " 3px solid #0060df";
  activeLink.style.padding = "6px";

  activeLink.scrollIntoView({ behavior: "smooth", block: "center" });
}

highlightAndScrollIntoViewActive();
