window.addEventListener("load", () => {
  const gallery = document.querySelector(".gallery");
  const groups = Array.from(gallery.querySelectorAll(".group"));
  if (groups.length < 2) return;

  const style = getComputedStyle(gallery);
  const gap = parseFloat(style.columnGap || style.gap) || 0;

  // wait one paint so widths are final (images + intrinsic sizing)
  requestAnimationFrame(() => {
    let maxRowWidth = 0;

    for (let i = 0; i < groups.length; i += 2) {
      const r1 = groups[i].getBoundingClientRect();
      const r2 = groups[i + 1]?.getBoundingClientRect();

      const rowWidth = r2
        ? (r1.width + gap + r2.width)
        : r1.width;

      if (rowWidth > maxRowWidth) maxRowWidth = rowWidth;
    }

    // add gallery padding + border so nothing clips
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    const borderLeft = parseFloat(style.borderLeftWidth) || 0;
    const borderRight = parseFloat(style.borderRightWidth) || 0;

    const total = maxRowWidth + paddingLeft + paddingRight + borderLeft + borderRight;

    gallery.style.width = `${Math.ceil(total)}px`;
  });
});
