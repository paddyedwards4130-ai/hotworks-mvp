const canvases = {};

document.querySelectorAll(".sig").forEach(canvas => {
  const ctx = canvas.getContext("2d");
  const history = [];

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
  };

  resize();

  let drawing = false;

  const getPoint = e => {
    const r = canvas.getBoundingClientRect();
    const t = e.touches[0];
    return {
      x: t.clientX - r.left,
      y: t.clientY - r.top
    };
  };

  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    drawing = true;
    const p = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  });

  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    if (!drawing) return;
    const p = getPoint(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });

  canvas.addEventListener("touchend", () => {
    drawing = false;
  });

  canvases[canvas.id] = { ctx, history, canvas };
});

document.querySelectorAll(".undo").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    const sig = canvases[target];
    if (!sig.history.length) return;
    const img = sig.history.pop();
    sig.ctx.putImageData(img, 0, 0);
  });
});

document.getElementById("saveBtn").addEventListener("click", () => {
  if (!document.getElementById("permitForm").checkValidity()) {
    alert("Complete all required fields before saving.");
    return;
  }
  window.print();
});