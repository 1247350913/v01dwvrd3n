const lightbox = document.getElementById("lightbox");
const lightboxRow = document.getElementById("lightbox-row");

/* -------- EVENT DELEGATION -------- */
document.addEventListener("click", (e) => {

  /* SINGLE IMAGE */
  const img = e.target.closest(".group-grid img");
  if (img) {
    e.stopPropagation();

    lightboxRow.innerHTML = "";
    const single = document.createElement("img");
    single.src = img.src;
    single.style.height = "90vh";
    single.style.width = "auto";
    single.style.objectFit = "contain";

    lightboxRow.appendChild(single);
    lightbox.classList.remove("hidden");
    return;
  }

  /* GROUP */
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

      lightbox.classList.remove("hidden");
    });
  }
});

/* -------- CLOSE -------- */
lightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
  lightboxRow.innerHTML = "";
});
