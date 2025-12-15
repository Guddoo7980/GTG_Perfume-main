function initCollection() {
  console.log("Initializing Collection...");
  const items = document.querySelectorAll(".cl-item");
  const images = document.querySelectorAll(".cl-img");

  // 1. set initial height for the active item
  const activeStart = document.querySelector(".cl-item.cl-active");
  if (activeStart) {
    const body = activeStart.querySelector(".cl-body");
    body.style.maxHeight = body.scrollHeight + "px";
  }

  // 2. ensure the first image is visible immediately
  if (images.length > 0) {
    images[0].classList.add("cl-show");
  }

  // 3. add click listeners
  items.forEach((item) => {
    const header = item.querySelector(".cl-header");

    // use onclick to prevent duplicate listeners
    header.onclick = () => {
      const index = parseInt(item.getAttribute("data-index"));
      const isOpen = item.classList.contains("cl-active");

      if (isOpen) return; // ignore if already open

      // close all items and hide all images
      items.forEach((i) => {
        i.classList.remove("cl-active");
        i.querySelector(".cl-body").style.maxHeight = null;
      });
      images.forEach((img) => img.classList.remove("cl-show"));

      // open clicked item
      item.classList.add("cl-active");
      const body = item.querySelector(".cl-body");
      body.style.maxHeight = body.scrollHeight + "px";

      // show corresponding image
      if (images[index]) {
        images[index].classList.add("cl-show");
      }
    };
  });
}
