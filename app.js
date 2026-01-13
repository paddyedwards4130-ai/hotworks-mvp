const form = document.getElementById("permitForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    site: document.getElementById("site").value,
    location: document.getElementById("location").value,
    workType: document.getElementById("workType").value,
    operator: document.getElementById("operator").value,
    company: document.getElementById("company").value,
    firewatch: document.getElementById("firewatch").value,
    authoriser: document.getElementById("authoriser").value,
    date: new Date().toLocaleString()
  };

  generatePDF(data);
});

function generatePDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("HOT WORK PERMIT – AS 1674", 20, 20);

  doc.setFontSize(10);
  doc.text(`Date & Time: ${data.date}`, 20, 30);

  doc.setFontSize(12);
  doc.text("Job Details", 20, 45);
  doc.text(`Site: ${data.site}`, 20, 55);
  doc.text(`Location: ${data.location}`, 20, 65);
  doc.text(`Work Type: ${data.workType}`, 20, 75);

  doc.text("Operator", 20, 95);
  doc.text(`Name: ${data.operator}`, 20, 105);
  doc.text(`Company: ${data.company || "N/A"}`, 20, 115);

  doc.text("Fire Watch", 20, 135);
  doc.text(`Fire Watch Person: ${data.firewatch}`, 20, 145);

  doc.text("Authorisation", 20, 165);
  doc.text(`Authorised By: ${data.authoriser}`, 20, 175);

  doc.setFontSize(10);
  doc.text(
    "All hot work carried out in accordance with AS 1674. "
    + "Fire prevention measures implemented and area deemed safe at completion.",
    20,
    195,
    { maxWidth: 170 }
  );

  doc.save("Hot_Work_Permit.pdf");
}