    window.addEventListener("load", () => {
    const gallery = document.querySelector(".gallery");
    const groups = Array.from(document.querySelectorAll(".group"));

    let max = 0;

    groups.forEach(g => {
      const w = g.getBoundingClientRect().width;
      if (w > max) max = w;
    });

    document.documentElement.style.setProperty(
      "--col-width",
      `${Math.ceil(max)}px`
    );
  });
  