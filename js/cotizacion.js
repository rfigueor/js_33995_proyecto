function fnOnload(page) {
  const codServicio = new URLSearchParams(window.location.search).get("codser");
}

const testBtn = (codser) => {
  console.log("testBtn");
  console.log(codser);


  var instructionsModal = new bootstrap.Modal(
    document.getElementById("instructions")
  );
  instructionsModal.show();

  
  // const myModalAlternative = new bootstrap.Modal('#modalLab')

  // $("#modalLab").modal('show');

  // $('#modalLab').modal("show");

  // jQuery.noConflict(); 
  // jQuery('#modalLab').modal('show'); 

  // var modalToggle = document.getElementById('modalLab') // relatedTarget
  // modalToggle.show()

  // var myModal = new bootstrap.Modal(document.getElementById('modalLab'));
  // myModal.show();

  //  $('.modal-body').load('one.html',function(){
  //       $('#myModal').modal({show:true});
  //   });


};

const fnCargaServicios = async () => {
  // const respuesta = await fetch("https://my-json-server.typicode.com/rfigueor/js_33995_db/tree/main/servicios");
  const serviciosCab = await fetch("../json/servicios.json");
  const lstServicios = await serviciosCab.json();

  const serviciosDet = await fetch("../json/productos.json");
  const lstProductosFull = await serviciosDet.json();

  let divAccorMain = document.getElementById("accordionServicios");

  let flag = 0;
  let flagDeta = 0;
  lstServicios.forEach((servicio) => {
    flag++;

    let divAccorHead = document.createElement("div");
    divAccorHead.setAttribute("class", "accordion-item");
    divAccorHead.innerHTML = `<h2 class="accordion-header" id="heading_${servicio.codServicio}">
    <button class="accordion-button${flag != 1 ? " collapsed" : ""}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${servicio.codServicio}" aria-expanded="${flag == 1 ? true : false}" 
    aria-controls="collapse_${servicio.codServicio}">${servicio.servicio}</button></h2>`;

    let divAccorItem = document.createElement("div");
    divAccorItem.setAttribute("id",`collapse_${servicio.codServicio}`);
    divAccorItem.setAttribute("class",`accordion-collapse${flag != 1 ? " collapse" : ""}`);
    divAccorItem.setAttribute("aria-labelledby",`heading_${servicio.codServicio}`);
    divAccorItem.setAttribute("data-bs-parent","#accordionServicios");
    divAccorItem.removeAttribute("style");
    
   
    let divAccorBody = document.createElement("div");
    divAccorBody.setAttribute("class","accordion-body");
    
    let divRow = document.createElement("div");
    divRow.setAttribute("class","row");

    let lstProductos = lstProductosFull.filter((item) => item.codServicio == servicio.codServicio);
    lstProductos.forEach((producto) => {
      
      let divColum = document.createElement("div");
      divColum.setAttribute("class","col");
      
      let divCard = document.createElement("div");
      divCard.setAttribute("class","card");

      let imgCard = document.createElement("img");
      imgCard.setAttribute("src",`${producto.linkImage}`);
      imgCard.setAttribute("class","card-img-top");
      imgCard.setAttribute("alt","...");

      divCard.append(imgCard);

      let divCardBody = document.createElement("div");
      divCardBody.setAttribute("class","card-body");
      divCardBody.innerHTML = `<h5 class="card-title">${producto.producto}</h5><p class="card-text">${producto.descripcion}</p>`;

      let btnCardBody = document.createElement("a");
      btnCardBody.setAttribute("class","btn btn-primary");
      btnCardBody.setAttribute("onClick", `testBtn(${producto.codProducto})`);
      btnCardBody.innerHTML = "Cotizar";

      divCardBody.append(btnCardBody);
      divCard.append(divCardBody);
      divColum.append(divCard);
      divRow.append(divColum);
    });

    divAccorBody.append(divRow);
    divAccorItem.append(divAccorBody);
    divAccorHead.append(divAccorItem);
    divAccorMain.appendChild(divAccorHead);
  });
};

function fnOnload(page) {
  fnCargaServicios();
}
