function initProduct() {
  console.log("Product Component Initialized");

  const productImages = [
    { src: "assets/perfume.png", alt: "Purple Bottle Front" },
    { src: "assets/Daises.jpg", alt: "Perfume Lifestyle" },
    { src: "assets/bella.jpg", alt: "Perfume Smoke" },
    { src: "assets/arose.jpg", alt: "Perfume Flowers" },
    // --- row 2  ---
    { src: "assets/rose.png", alt: "Purple Bottle Front" },
    { src: "assets/Daises.jpg", alt: "Perfume Lifestyle" },
    { src: "assets/bella.jpg", alt: "Perfume Smoke" },
    { src: "assets/arose.jpg", alt: "Perfume Flowers" },
  ];

  let currentImageIndex = 0;

  const mainImage = document.getElementById("mainImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dotsContainer");
  const thumbnailContainer = document.getElementById("thumbnailContainer");

  function renderGalleryControls() {
    // clear existing
    dotsContainer.innerHTML = "";
    thumbnailContainer.innerHTML = "";

    productImages.forEach((img, index) => {
      // create dot
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => updateGallery(index));
      dotsContainer.appendChild(dot);

      // create thumbnail
      const thumb = document.createElement("img");
      thumb.src = img.src;
      thumb.classList.add("thumb-img");
      if (index === 0) thumb.classList.add("active");
      thumb.addEventListener("click", () => updateGallery(index));
      thumbnailContainer.appendChild(thumb);
    });
  }

  function updateGallery(index) {
    currentImageIndex = index;

    // update main image
    mainImage.src = productImages[index].src;
    mainImage.alt = productImages[index].alt;

    // update dots
    const allDots = document.querySelectorAll(".dot");
    allDots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });

    // update thumbnails
    const allThumbs = document.querySelectorAll(".thumb-img");
    allThumbs.forEach((t, i) => {
      t.classList.toggle("active", i === index);
    });
  }

  // arrow listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      let newIndex = currentImageIndex - 1;
      if (newIndex < 0) newIndex = productImages.length - 1;
      updateGallery(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      let newIndex = currentImageIndex + 1;
      if (newIndex >= productImages.length) newIndex = 0;
      updateGallery(newIndex);
    });
  }

  // initialize gallery
  if (productImages.length > 0) {
    renderGalleryControls();
    updateGallery(0); // set initial
  }

  /* 2. subscription toggle & cart link logi */

  const subRadios = document.querySelectorAll(
    'input[name="subscription_type"]'
  );
  const contentSingle = document.getElementById("contentSingle");
  const contentDouble = document.getElementById("contentDouble");
  const addToCartBtn = document.getElementById("addToCartBtn");

  // helper to get selected radio value
  const getVal = (name) => {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : "";
  };

  function updateUIAndLink() {
    const subType = getVal("subscription_type");
    let price = 0;
    let cartUrl = "https://gtgperfumes.com/cart/add?"; // dummy base url

    // 1. toggle accordion visibility
    if (subType === "single") {
      contentSingle.classList.remove("hidden");
      contentDouble.classList.add("hidden");
      price = 99.99;
    } else {
      contentSingle.classList.add("hidden");
      contentDouble.classList.remove("hidden");
      price = 169.99;
    }

    // 2. construct link parameters based on selection
    let params = [];
    params.push(`subscription=${subType}`);

    if (subType === "single") {
      const frag = getVal("fragrance_single");
      const freq = getVal("frequency_single");
      params.push(`fragrance=${frag}`);
      params.push(`frequency=${freq}`);
    } else {
      const frag1 = getVal("fragrance_double_1");
      const frag2 = getVal("fragrance_double_2");
      const freq = getVal("frequency_double");
      params.push(`fragrance1=${frag1}`);
      params.push(`fragrance2=${frag2}`);
      params.push(`frequency=${freq}`);
    }

    // 3. update button text and href
    const finalUrl = cartUrl + params.join("&");

    addToCartBtn.textContent = `Add to Cart - $${price}`;
    addToCartBtn.href = finalUrl;

    console.log("Generated Link:", finalUrl); // for debugging
  }

  // add event listeners to all radio buttons in the form
  const allRadios = document.querySelectorAll(
    '#addToCartForm input[type="radio"]'
  );
  allRadios.forEach((radio) => {
    radio.addEventListener("change", updateUIAndLink);
  });

  // initial run
  updateUIAndLink();
}
