const servicios = [
    { id: 1, nombre: "Trabajo de Pintura" },
    { id: 2, nombre: "Construcción de Radier" },
]

const pintura = [
    { id: 1, nombre: "Casa", nota: "(Obs: 1 Solo piso)" },
    { id: 2, nombre: "Edificio", nota: "(Obs: Se agrega 5% extra al valor del mt2 por cada piso a contar desde 2do piso)" },
]

const mtXvalor = (mt, valor) => {
    return mt * valor;
}

const extraXpiso = (porc, numPiso, precio) => {
    return ((precio / 100) * (porc * numPiso)) + precio
}

function fnBuildMessage(item) {
    let msg = "";
    switch (item) {
        case "servicios":
            for (const item of servicios) {
                msg = msg + `\n${item.id}. ${item.nombre}`;
            }
            break;

        case "pintura":
            for (const item of pintura) {
                msg = msg + `\n${item.id}. ${item.nombre} ${item.nota}`;
            }
            break;

        default:
            msg = "sin informacion";
            break;
    }
    return msg;
}



function fnPintura() {
    let mt2 = 0;              // Inicializa variable
    let totalMonto = 0;       // Inicializa variable
    let precio = 2000;      // Valor de mano de obra por metro cuadrado

    let msg = fnBuildMessage("pintura");

    let tipoPinturaTrabajo = 0; // Inicializa variable

    //Se ejecuta el ciclo hasta que selecciona una opcion valida
    do {
        tipoPinturaTrabajo = parseInt(prompt("¿Que desea pintar?" + msg));
        if (tipoTrabajo !== 1 && tipoTrabajo !== 2) {
            alert("Seleccione opcion valida");
        }
    } while (tipoTrabajo !== 1 && tipoTrabajo !== 2)


    if (tipoPinturaTrabajo === 1) {
        mt2 = parseInt(prompt("¿Cantidad de metros cuadrados?"));
        alert("El valor total del trabajo de pintura de la casa es de : $" + mtXvalor(mt2, precio).toString());
    } else {
        let porcAdic = 5;
        let pisos = parseInt(prompt("¿Cantidad de pisos del edificio?"));
        while (pisos === 1) {
            pisos = parseInt(prompt("La cantidad de pisos debe ser igual o mayor a 2:"));
        }
        mt2 = parseInt(prompt("¿Cantidad de metros cuadrados?"));

        //Se realiza calculo del piso 1
        totalMonto = mtXvalor(mt2, precio);

        //Para efectos del calculo (multiplicacion), se inicia en 1 pero se llega a la cantidad "anterior" del total de piso [x < pisos]
        for (let x = 1; x < pisos; x++) {
            totalMonto = totalMonto + mtXvalor(mt2, extraXpiso(porcAdic, x, precio));
        }

        alert("El valor total del trabajo de pintura del edificio es de $" + totalMonto.toString());
    }
}


function fnRadier() {
    let mtCubicosXsaco = 0.025;       // Se entienede que un 1 saco rinde para 1 mt cuadrado con una altura de 25 cm 
    let precio = 2500;              // Valor de mano de obra por metro cuadrado

    let mt2 = parseInt(prompt("¿Cantidad de metros cuadrados?:"));
    let cmAltura = 0;

    do {
        cmAltura = parseInt(prompt("¿Altura en cm del radier?:"));
        if (cmAltura < 15) {
            alert("La altura minima necesaria es de 15 cm");
        }
    } while (cmAltura < 15)

    let cantSacos = Math.round((mt2 * (cmAltura / 1000)) / mtCubicosXsaco);

    alert("- Se requieren un total de " + cantSacos.toString() + " sacos de concreto.\n- El valor del trabajo es de $" + mtXvalor(mt2, precio).toString());

}

let msg = fnBuildMessage("servicios");
let tipoTrabajo = 0;
do {
    tipoTrabajo = parseInt(prompt("¿Seleccione el tipo de trabajo a realizar?" + msg));
    if (tipoTrabajo !== 1 && tipoTrabajo !== 2) {
        alert("Seleccione opcion valida");
    }
} while (tipoTrabajo !== 1 && tipoTrabajo !== 2)

if (tipoTrabajo === 1) {
    fnPintura();
}
else {
    fnRadier();
}