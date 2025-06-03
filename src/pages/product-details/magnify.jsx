// lib/magnifier.js
export function magnify(imgID, zoom) {
  let img = document.getElementById(imgID);
  if (!img) return;

  const glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  img.parentElement.insertBefore(glass, img);

  glass.style.backgroundImage = `url('${img.src}')`;
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;

  const bw = 3;
  const w = glass.offsetWidth / 2;
  const h = glass.offsetHeight / 2;

  function moveMagnifier(e) {
    e.preventDefault();
    const pos = getCursorPos(e);
    let x = pos.x;
    let y = pos.y;

    if (x > img.width - w / zoom) x = img.width - w / zoom;
    if (x < w / zoom) x = w / zoom;
    if (y > img.height - h / zoom) y = img.height - h / zoom;
    if (y < h / zoom) y = h / zoom;

    glass.style.left = `${x - w}px`;
    glass.style.top = `${y - h}px`;
    glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${y * zoom - h + bw}px`;
  }

  function getCursorPos(e) {
    const a = img.getBoundingClientRect();
    const x = e.pageX - a.left - window.pageXOffset;
    const y = e.pageY - a.top - window.pageYOffset;
    return { x, y };
  }

  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
}
