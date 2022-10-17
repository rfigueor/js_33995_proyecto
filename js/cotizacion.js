function fnOnload(page) {
  if (page == "cotizacion") {
    const codServicio = new URLSearchParams(window.location.search).get("codser");
    console.log(codServicio);
    
  }
}
