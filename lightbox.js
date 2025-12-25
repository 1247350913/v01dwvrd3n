const lightbox = document.getElementById("lightbox");
const lightboxRow = document.getElementById("lightbox-row");

/* -------- SINGLE IMAGE MODE -------- */
document.querySelectorAll(".group-grid img").forEach(img => {
  img.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent group click

    lightboxRow.innerHTML = "";

    const single = document.createElement("img");
    single.src = img.src;
    single.style.height = "90vh";
    single.style.width = "auto";
    single.style.objectFit = "contain";

    lightboxRow.appendChild(single);
    lightbox.classList.remove("hidden");
  });
});

/* -------- GROUP MODE -------- */
document.querySelectorAll(".group").forEach(group => {
  group.addEventListener("click", () => {
    lightboxRow.innerHTML = "";

    const imgs = Array.from(group.querySelectorAll("img"));

    // preload images to get natural sizes
    const loaded = imgs.map(img => {
      return new Promise(resolve => {
        const i = new Image();
        i.src = img.src;
        i.onload = () => resolve(i);
      });
    });

    Promise.all(loaded).then(images => {
      const maxHeight = window.innerHeight * 0.85;
      const maxWidth = window.innerWidth * 0.7;

      // calculate scale so all fit in one row
      const totalAspect = images.reduce(
        (sum, img) => sum + img.naturalWidth / img.naturalHeight,
        0
      );

      const height = Math.min(maxHeight, maxWidth / totalAspect);

      images.forEach(img => {
        const el = document.createElement("img");
        el.src = img.src;
        el.style.height = `${height}px`;
        el.style.width = "auto";
        el.style.objectFit = "contain";
        lightboxRow.appendChild(el);
      });

      lightbox.classList.remove("hidden");
    });
  });
});

/* -------- CLOSE -------- */
lightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
  lightboxRow.innerHTML = "";
});
