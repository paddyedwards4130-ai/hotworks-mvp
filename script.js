const canvases = document.querySelectorAll(".sig");

canvases.forEach(canvas => {
  const ctx = canvas.getContext("2d");

  // Fix iOS canvas scaling
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.scale(ratio, ratio);

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";

  let drawing = false;

  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const t = e.touches[0];
    return {
      x: t.clientX - r.left,
      y: t.clientY - r.top
    };
  }

  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    drawing = true;
    const p = getPos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  });

  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    if (!drawing) return;
    const p = getPos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });

  canvas.addEventListener("touchend", () => {
    drawing = false;
  });
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const form = document.getElementById("permitForm");
  if (!form.checkValidity()) {
    alert("Complete all required fields before saving.");
    return;
  }
  window.print();
});