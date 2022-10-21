var instructionsModal = new bootstrap.Modal(
    document.getElementById("instructions")
  );
  instructionsModal.show();
  
  var choicesModal = new bootstrap.Modal(document.getElementById("choices"));
  
  window.addEventListener("contextmenu", (event) => {
    //event.preventDefault();
    instructionsModal.hide();
    choicesModal.show();
  });