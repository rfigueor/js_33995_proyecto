function fnOnload(page) {
  const codServicio = new URLSearchParams(window.location.search).get("codser");
}

const testBtn = (codser) => {
  console.log("testBtn");
  console.log(codser);
};

const fnCargaServicios = async () => {
  // const respuesta = await fetch("https://my-json-server.typicode.com/rfigueor/js_33995_db/tree/main/servicios");
  const serviciosCab = await fetch("../json/serviciosCab.json");
  const lstCabe = await serviciosCab.json();

  const serviciosDet = await fetch("../json/serviciosDet.json");
  const lstDeta = await serviciosDet.json();

  let divAccorMain = document.getElementById("accordionServicios");

  let flag = 0;
  lstCabe.forEach((cabe) => {
    flag++;

    let lstFiltrados = lstDeta.filter(
      (item) => item.codServicio == cabe.codServicio
    );

    let divAccorHead = document.createElement("div");
    divAccorHead.setAttribute("id", `accordion-item`);
    // divAccorHead.setAttribute('class', `accordion-collapse collapse ${htmlCabe==""? ' show':''}`);
    // divAccorHead.setAttribute('aria-labelledby', `headingOne`);
    // divAccorHead.setAttribute('data-bs-parent', `#accordionServicios`);
    divAccorHead.innerHTML = `<h2 class="accordion-header" id="headingOne">
    <button class="accordion-button${flag != 1 ? " collapsed" : ""}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${cabe.codServicio}" aria-expanded="${flag == 1 ? true : false}" 
    aria-controls="collapse${cabe.codServicio}">${cabe.servicio}</button></h2>`;

    lstFiltrados.forEach((deta) => {
      let btn = document.createElement("button");
      btn.innerHTML = "Seleccionar";
      btn.innerHTML = "Seleccionar";
      // btn.addEventListener("click", `testBtn(${deta.codServicio})`);
      btn.addEventListener("click", testBtn(deta.codServicio));

      let divAccorItem = document.createElement("div");
      divAccorItem.setAttribute("id", `collapse${cabe.codServicio}`);
      divAccorItem.setAttribute("class",`accordion-collapse collapse ${flag == 1 ? " show" : ""}`);
      divAccorItem.setAttribute("aria-labelledby", `headingOne`);
      divAccorItem.setAttribute("data-bs-parent", `#accordionServicios`);
      divAccorItem.innerHTML = `<div class="accordion-body"><strong>${deta.servicio}</strong> ${deta.descripcion}</div>`;

      divAccorHead.appendChild(divAccorItem);
    });

    divAccorMain.appendChild(divAccorHead);
  });
};

function fnOnload(page) {
  fnCargaServicios();
}
