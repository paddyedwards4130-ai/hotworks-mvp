document.getElementById("permitForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const timestamp = new Date().toISOString();

  const record = {
    submittedAt: timestamp,
    userAgent: navigator.userAgent
  };

  localStorage.setItem("hotworks_last_permit", JSON.stringify(record));

  alert("Permit saved successfully.\n\nPermit is valid only for the approved time window.");

  this.reset();
});