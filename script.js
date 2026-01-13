const canvases = document.querySelectorAll(".sig");

canvases.forEach(canvas => {
  const ctx = canvas.getContext("2d");
  let drawing = false;

  canvas.addEventListener("touchstart", e => {
    drawing = true;
    const t = e.touches[0];
    ctx.moveTo(t.clientX - canvas.offsetLeft, t.clientY - canvas.offsetTop);
  });

  canvas.addEventListener("touchmove", e => {
    if (!drawing) return;
    const t = e.touches[0];
    ctx.lineTo(t.clientX - canvas.offsetLeft, t.clientY - canvas.offsetTop);
    ctx.stroke();
  });

  canvas.addEventListener("touchend", () => drawing = false);
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const form = document.getElementById("permitForm");
  if (!form.checkValidity()) {
    alert("Complete all required fields before saving.");
    return;
  }

  document.getElementById("timestamp").value =
    "Created: " + new Date().toLocaleString();

  window.print();
});