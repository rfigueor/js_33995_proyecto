async function fnOnload(page) {
  await fnGetDataFromApi();
  fnBuildAccordion();
  fnValidaCarro();
  fnPrintCarro();

  document.getElementById("btnVerCarrito").setAttribute("onClick", `fnVerCarro()`);
  document.getElementById("btnLimpiarCarrito").setAttribute("onClick", `fnLimpiarCarro()`);
  document.getElementById("btnPrintCotizacion").setAttribute("onClick", `fnPrintCotizacion()`);
  
  document.getElementById("btnSendMail").setAttribute("onClick", "fnSendMail()");
}


// document.getElementById('btnSendMail').addEventListener('onClick', async function () {








const fnGetDataFromApi = async () => {
  // const respuesta = await fetch("https://my-json-server.typicode.com/rfigueor/js_33995_db/tree/main/servicios");
  const serviciosData = await fetch("../json/servicios.json");
  lstServicios = await serviciosData.json();
  localStorage.setItem("serviciosData", JSON.stringify(lstServicios));

  const productosData = await fetch("../json/productos.json");
  lstProductos = await productosData.json();
  localStorage.setItem("productosData", JSON.stringify(lstProductos));

  const tipoProductosData = await fetch("../json/tipoProductos.json");
  // lstTipoProductos = await tipoProductosData.json();
  localStorage.setItem(
    "tipoProductosData",
    JSON.stringify(await tipoProductosData.json())
  );

  const tipoMaderasData = await fetch("../json/tipoMaderas.json");
  // lstTipoProductos = await tipoProductosData.json();
  localStorage.setItem(
    "tipoMaderasData",
    JSON.stringify(await tipoMaderasData.json())
  );
};

const fnBuildAccordion = () => {
  let lstServicios = JSON.parse(localStorage.getItem("serviciosData"));
  let lstProductosFull = JSON.parse(localStorage.getItem("productosData"));

  let divAccorMain = document.getElementById("accordionServicios");
  let flag = 0;

  lstServicios.forEach((servicio) => {
    flag++;

    let divAccorHead = document.createElement("div");
    divAccorHead.setAttribute("class", "accordion-item");
    divAccorHead.innerHTML = `<h2 class="accordion-header" id="heading_${
      servicio.codServicio
    }">
    <button class="accordion-button${
      flag != 1 ? " collapsed" : ""
    }" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${
      servicio.codServicio
    }" aria-expanded="${flag == 1 ? true : false}" aria-controls="collapse_${
      servicio.codServicio
    }">${servicio.servicio}</button></h2>`;

    let divAccorItem = document.createElement("div");
    divAccorItem.setAttribute("id", `collapse_${servicio.codServicio}`);
    divAccorItem.setAttribute(
      "class",
      `accordion-collapse${flag != 1 ? " collapse" : ""}`
    );
    divAccorItem.setAttribute(
      "aria-labelledby",
      `heading_${servicio.codServicio}`
    );
    divAccorItem.setAttribute("data-bs-parent", "#accordionServicios");
    divAccorItem.removeAttribute("style");

    let divAccorBody = document.createElement("div");
    divAccorBody.setAttribute("class", "accordion-body");

    let divRow = document.createElement("div");
    divRow.setAttribute("class", "row");

    let lstProductos = lstProductosFull.filter(
      (item) => item.codServicio == servicio.codServicio
    );
    lstProductos.forEach((producto) => {
      let divColum = document.createElement("div");
      divColum.setAttribute("class", "col");

      let divCard = document.createElement("div");
      divCard.setAttribute("class", "card");

      let imgCard = document.createElement("img");
      imgCard.setAttribute("src", `${producto.linkImage}`);
      imgCard.setAttribute("class", "card-img-top");
      imgCard.setAttribute("display", "block ");
      // imgCard.setAttribute("height","128");
      imgCard.setAttribute("alt", "...");

      divCard.append(imgCard);

      let divCardBody = document.createElement("div");
      divCardBody.setAttribute("class", "card-body");
      divCardBody.innerHTML = `<h5 class="card-title">${producto.producto}</h5><p class="card-text">${producto.descripcion}</p>`;

      let btnCardBody = document.createElement("a");
      btnCardBody.setAttribute("class", "btn btn-primary");
      btnCardBody.setAttribute(
        "onClick",
        `fnBuildCotizacion(${producto.codProducto})`
      );
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

//Segun el tipo de producto, llama a la funcion que carga el modal con la información requerida en base al producto seleccionado.
const fnBuildCotizacion = (codProducto) => {
  let producto = JSON.parse(localStorage.getItem("productosData")).find(
    (item) => item.codProducto == codProducto
  );
  localStorage.setItem("productoSelectData", JSON.stringify(producto));

  // if (producto.formModal == "formModalInt") {
  //   fnClearFormInteriores();
  //   fnBuildFormInteriores(producto);
  // }

  
    fnClearFormInteriores();
    fnBuildFormInteriores(producto);
  
};

const fnClearFormInteriores = () => {
  document.getElementById("alertValor").style.visibility = "hidden";

  let lstSelect = ["inputTipoProducto", "inputTipoMadera"];
  let lstInput = ["inputAlto", "inputAncho"];

  lstSelect.forEach((domName) => {
    let select = document.getElementById(domName);
    select.innerHTML = "";
    var opt = document.createElement("option");
    opt.innerHTML = "Seleccione...";
    opt.selected = true;
    select.append(opt);
  });

  lstInput.forEach((domName) => {
    let input = document.getElementById(domName);
    input.innerHTML = "";
    input.value = "";
  });
};

const fnBuildFormInteriores = (producto) => {
  document.getElementById("lblTituloProducto").innerHTML = producto.producto;

  //region Carga el Tipo de Producto
  let lstTipoProductosFull = JSON.parse(
    localStorage.getItem("tipoProductosData")
  );
  let lstTipoProductos = lstTipoProductosFull.filter(
    (item) => item.codProducto == producto.codProducto
  );

  let inputTipoProducto = document.getElementById("inputTipoProducto");
  lstTipoProductos.forEach((tipoProducto) => {
    var opt = document.createElement("option");
    opt.value = tipoProducto.codTipoProducto;
    opt.innerHTML = tipoProducto.tipoProducto;
    inputTipoProducto.append(opt);
  });
  //endregion

  //region Carga el Tipo de Madera
  let lstTipoMaderasFull = JSON.parse(localStorage.getItem("tipoMaderasData"));

  let inputTipoMadera = document.getElementById("inputTipoMadera");
  lstTipoMaderasFull.forEach((tipoMadera) => {
    var opt = document.createElement("option");
    opt.value = tipoMadera.codTipoMadera;
    opt.innerHTML = tipoMadera.tipoMadera;
    inputTipoMadera.appendChild(opt);
  });
  //endregion

  document
    .getElementById("btnCalcularCotizacion")
    .setAttribute("onClick", `fnCalcCotizacion()`);
  document
    .getElementById("btnAddCotizacion")
    .setAttribute("onClick", `fnAddCotizacion()`);

  var modal = new bootstrap.Modal(document.getElementById("formInteriores"));
  modal.show();
};

const fnCalcCotizacion = () => {
  let codTipoProducto = Number(
    document.getElementById("inputTipoProducto").value
  );
  let lstTipoProductosFull = JSON.parse(
    localStorage.getItem("tipoProductosData")
  );
  let tipoProducto = lstTipoProductosFull.find(
    (item) => item.codTipoProducto == codTipoProducto
  );
  let valorTrabajoBase = tipoProducto.valorBase;
  let valorTrabajoMt = tipoProducto.valorMt;

  let codTipoMadera = Number(document.getElementById("inputTipoMadera").value);
  let lstTipoMaderasFull = JSON.parse(localStorage.getItem("tipoMaderasData"));
  let tipoMadera = lstTipoMaderasFull.find(
    (item) => item.codTipoMadera == codTipoMadera
  );
  let valorMaderaMt = tipoMadera.valorMt2;

  let ancho = Number(document.getElementById("inputAncho").value);
  let alto = Number(document.getElementById("inputAlto").value);

  let valorTotal = costoTrabajo(
    alto,
    ancho,
    valorTrabajoBase,
    valorTrabajoMt,
    valorMaderaMt
  );

  document.getElementById("alertValor").style.visibility = "visible";
  document.getElementById("lblValor").innerHTML =
    OSREC.CurrencyFormatter.format(valorTotal, { currency: "CLP" });


    let lstProductosFull = JSON.parse(localStorage.getItem("productosData"));
  
  let producto = JSON.parse(localStorage.getItem("productoSelectData"));

  let preCotizacion = {
    nroItem: localStorage.getItem("lstCotizaciones") != null? JSON.parse(localStorage.getItem("lstCotizaciones")).length: 1,
    producto : producto.producto,
    codTipoProducto: codTipoProducto,
    tipoProducto: tipoProducto.tipoProducto,
    codTipoMadera: codTipoMadera,
    tipoMadera: tipoMadera.tipoMadera,
    valorMaderaMt: valorMaderaMt,
    valorTrabajoBase: valorTrabajoBase,
    valorTrabajoMt: valorTrabajoMt,
    valorTotal: valorTotal,
    medidas: `Alto: ${alto} cm // Ancho: ${ancho} cm`,
    comentarios: "",
  };
  localStorage.setItem("preCotizacion", JSON.stringify(preCotizacion));
};

const fnAddCotizacion = () => {
  let lstCotizaciones = [];
  if (localStorage.getItem("lstCotizaciones") != null) {
    lstCotizaciones = JSON.parse(localStorage.getItem("lstCotizaciones"));
  }
  let preCotizacion = JSON.parse(localStorage.getItem("preCotizacion"));
  lstCotizaciones.push(preCotizacion);
  localStorage.setItem("lstCotizaciones", JSON.stringify(lstCotizaciones));

  document.getElementById("lblCantCotizaciones").innerHTML =
    lstCotizaciones.length;

  fnPrintCarro(lstCotizaciones);

  Swal.fire({
    icon: "success",
    text: "Cotización agregada correctamente al carrito.",
  });
};

const fnPrintCarro = () => {
  if (localStorage.getItem("lstCotizaciones") != null) {
    lstCotizaciones = JSON.parse(localStorage.getItem("lstCotizaciones"));

    let rows = "";
    let montoTotal = 0;
    lstCotizaciones.forEach((cotizacion) => {
      rows =rows +
      `<tr>
        <th scope="row">${cotizacion.nroItem}</th>
        <td>${cotizacion.producto}</td>
        <td>${cotizacion.tipoProducto}</td>
        <td>${cotizacion.tipoMadera}</td>
        <td>${cotizacion.medidas}</td>
        <td>${OSREC.CurrencyFormatter.format(cotizacion.valorMaderaMt, {currency: "CLP",})}</td>
        <td>${OSREC.CurrencyFormatter.format(cotizacion.valorTrabajoMt, {currency: "CLP",})}</td>
        <td>${OSREC.CurrencyFormatter.format(cotizacion.valorTotal, {currency: "CLP",})}</td>
      </tr>`;
      montoTotal += cotizacion.valorTotal != null ? Number(cotizacion.valorTotal) : 0;
    });
    console.log(montoTotal);
    document.getElementById("tblListCotizaciones").innerHTML = rows;
    document.getElementById("lblValorTotal").innerHTML = OSREC.CurrencyFormatter.format(montoTotal, { currency: "CLP" });
  }
};

const fnVerCarro = () => {
  if (localStorage.getItem("lstCotizaciones") != null) {
    var modal = new bootstrap.Modal(document.getElementById("formCarro"));
    modal.show();
  } else {
    Swal.fire({
      icon: "info",
      text: "No tiene cotizaciones agregadas al carrito",
    });
  }
};

const fnLimpiarCarro = () => {
  localStorage.removeItem("lstCotizaciones");
  document.getElementById("lblCantCotizaciones").innerHTML = 0;

  Swal.fire({
    icon: 'success',
    title: 'Carrito a sido vaciado',
    showConfirmButton: false,
    timer: 1500
  });

};

const fnValidaCarro = () => {
  if (localStorage.getItem("lstCotizaciones") != null) {
    let lstCotizaciones = JSON.parse(localStorage.getItem("lstCotizaciones"));
    document.getElementById("lblCantCotizaciones").innerHTML =
      lstCotizaciones.length;
  }
};

const fnPrintCotizacion = () => {
  var w = window.open();

  var html = fnGetHtmlCotizacion();

  w.document.write(html);
  w.window.print();
  w.document.close();
};


async function fnSendMail(page){

  const { value: correoFrom } = await Swal.fire({
    title: 'Correo electronico',
    input: 'email',
  });

  let html = fnGetHtmlCotizacion();

  Email.send({
    SecureToken: "84bb5e33-15c5-423a-a573-87f8bfbae000",
    To: correoFrom,
    // To : 'renato.figueroa@banmedica.cl',
    From: "mkpopper@gmail.com",
    Subject: "Cotización de Productos y Servicios - La Buena Madera",
    Body: html,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        icon: "success",
        text: "Se a enviado la cotización a su correo",
      });
    } else {
      Swal.fire({
        icon: "warning",
        text: "Se genero un erro al enviar el correo",
      });
    }
  });
};



const fnGetHtmlCotizacion = () => {
  return `<!DOCTYPE HTML>
  <html lang="en-us">
  <head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous" /></head>
  <body>${document.getElementById("tblCotizaciones").innerHTML}</body>`;
}



const mt2 = (altoCm, anchoCm) => {
  return (altoCm * anchoCm) / 10000;
};

const costoTrabajo = (
  altoCm,
  anchoCm,
  valorTrabajoBase,
  valorTrabajoMt,
  valorMaderaMt
) => {
  return (
    mt2(altoCm, anchoCm) * valorTrabajoMt +
    mt2(altoCm, anchoCm) * valorMaderaMt +
    valorTrabajoBase
  );
};
