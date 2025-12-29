const gallery = document.querySelector(".gallery");

// CONFIG
const GROUP_COUNT = 6; 
const FILE_BASES = ["before", "after1", "after2", "after3"];
const EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

async function imageExists(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function loadGallery() {
  for (let g = 1; g <= GROUP_COUNT; g++) {
    const group = document.createElement("section");
    group.className = "group";

    const grid = document.createElement("div");
    grid.className = "group-grid";

    let foundAny = false;

    for (const base of FILE_BASES) {
      let found = false;

      for (const ext of EXTENSIONS) {
        const src = `images/group ${g}/${base}.${ext}`;
        if (await imageExists(src)) {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          grid.appendChild(img);
          found = true;
          foundAny = true;
          break;
        }
      }

      if (!found) break; // stop once sequence breaks
    }

    if (foundAny) {
      group.appendChild(grid);
      gallery.appendChild(group);
    }
  }
}

loadGallery();
