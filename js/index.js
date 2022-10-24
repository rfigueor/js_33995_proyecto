const fnCargaCarousel = async () => {
  // const respuesta = await fetch("https://my-json-server.typicode.com/rfigueor/js_33995_db/tree/main/servicios");
  const respuesta = await fetch("../json/servicios.json");
  const data = await respuesta.json();

  msg = "";

  for (const item of data) {
    msg =
      msg +
      `<div class="carousel-item ${item.estado}">
            <div class="container">
                <div class="carousel-caption">
                    <span class="title">La Buena Madera</span>
                    <h2>${item.servicio}</h2>
                    <p>${item.descripcion}</p>
                    <p><a class="btn btn-lg btn-primary btn-theme" href="pages/cotizacion.html?codser=${item.codServicio}"><span class="btn-title">Soluciones</span></a></p>
                </div>
            </div>
        </div>`;
  }
  document.getElementById("divCarousel").innerHTML = msg;
};


function fnOnload(page) {
    fnCargaCarousel();
}
