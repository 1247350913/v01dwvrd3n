const lightbox = document.getElementById("lightbox");
const lightboxRow = document.getElementById("lightbox-row");

const isMobile = () =>
  window.matchMedia("(max-width: 768px)").matches;

function lockScroll() {
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
}

function unlockScroll() {
  document.body.style.position = "";
  document.body.style.width = "";
}

/* -------- EVENT DELEGATION -------- */
document.addEventListener("click", (e) => {

  /* -------- SINGLE IMAGE -------- */
  const img = e.target.closest(".group-grid img");
  if (img) {
    e.stopPropagation();

    lightboxRow.innerHTML = "";

    const single = document.createElement("img");
    single.src = img.src;
    single.style.objectFit = "contain";

    if (isMobile()) {
      /* MOBILE: centered in screen, 5% padding each side */
      single.style.width = "90vw";     // 100 - 5 - 5
      single.style.height = "auto";
      single.style.maxHeight = "90vh";
    } else {
      /* DESKTOP: unchanged */
      single.style.height = "90vh";
      single.style.width = "auto";
    }

    lightboxRow.appendChild(single);
    lockScroll();
    lightbox.classList.remove("hidden");
    return;
  }

  /* -------- GROUP -------- */
  const group = e.target.closest(".group");
  if (group) {
    lightboxRow.innerHTML = "";

    const imgs = Array.from(group.querySelectorAll("img"));

    Promise.all(
      imgs.map(img => new Promise(res => {
        const i = new Image();
        i.src = img.src;
        i.onload = () => res(i);
      }))
    ).then(images => {

      if (isMobile()) {
        /* MOBILE GROUP MODE
           - starts at left padding (5%)
           - images flush
           - width = 2/3 viewport
           - horizontal scroll */
        images.forEach(img => {
          const el = document.createElement("img");
          el.src = img.src;
          el.style.width = "auto";   
          el.style.height = "70vh";
          el.style.maxHeight = "85vh";
          el.style.objectFit = "contain";
          lightboxRow.appendChild(el);
        });

        lockScroll();
        lightbox.classList.remove("hidden");
        return;
      }

      /* DESKTOP GROUP MODE (unchanged) */
      const maxHeight = window.innerHeight * 0.85;
      const maxWidth = window.innerWidth * 0.7;

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

      lockScroll();
      lightbox.classList.remove("hidden");
    });
  }
});

/* -------- CLOSE -------- */
lightbox.addEventListener("click", () => {
  unlockScroll();
  lightbox.classList.add("hidden");
  lightboxRow.innerHTML = "";
});