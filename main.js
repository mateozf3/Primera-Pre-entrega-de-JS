const generos = ["Acción", "Comedia", "Drama", "Terror"]
const peliculasAccion = ["Gladiador", "Matrix", "Bastardos sin gloria"]
const peliculasComedia = ["¿Qué pasó ayer?", "Supercool", "Scary movie"]
const peliculasDrama = ["Forrest Gump", "El pianista", "La vida es bella"]
const peliculasTerror = ["La monja", "Hannibal", "El conjuro"]
const metodosPago = ["Mercado Pago", "Debito", "Efectivo"]
const horarios = ["10:45", "13:00", "16:30", "19:00"]

let bandera = true;
let carrito = []
let totalCompra = 0
let generoPeliculas = ""
let tituloPeliculas = ""
let horarioPeliculas = ""
let cantidadBoletos = 0
let precioPorBoleto = 0

function sumarATotal(precio, cantidad) {
    totalCompra += precio * cantidad;
}

function seleccionarGenero() {
    let seleccion = prompt("¿Que genero quieres ver?:\n1. Acción\n2. Comedia\n3. Drama\n4. Terror").toLowerCase()

    switch (seleccion) {
        case "1":
            generoPeliculas = "acción"
            precioPorBoleto = 1200;
            break;
        case "2":
            generoPeliculas = "comedia"
            precioPorBoleto = 900;
            break;
        case "3":
            generoPeliculas = "drama"
            precioPorBoleto = 1000
            break;
        case "4":
            generoPeliculas = "terror"
            precioPorBoleto = 800;
            break;
        default:
            alert("Género no disponible. Elige otra opción.")
            return seleccionarGenero()
    }
    return generoPeliculas;
}

function seleccionarTitulo() {
    let opciones = 1
    switch (generoPeliculas) {
        case "acción":
            opciones = peliculasAccion
            break
        case "comedia":
            opciones = peliculasComedia
            break
        case "drama":
            opciones = peliculasDrama
            break
        case "terror":
            opciones = peliculasTerror
            break
    }

    let listaTitulos = opciones.map((titulo, index) => `${index + 1}. ${titulo}`).join("\n");
    let seleccion = prompt(`¿Que pelicula de ${generoPeliculas} quieres ver?:\n${listaTitulos}`).toLowerCase()
    let indiceSeleccion = parseInt(seleccion) - 1

    if (indiceSeleccion >= 0 && indiceSeleccion < opciones.length) {
        tituloPeliculas = opciones[indiceSeleccion]
    } else {
        alert("Título no disponible. Elige otra opción.")
        return seleccionarTitulo()
    }
    return tituloPeliculas
}

function seleccionarHorario() {
    let listaHorarios = horarios.map((horario, index) => `${index + 1}. ${horario}`).join("\n");
    let seleccion = prompt(`Elige un horario para ${tituloPeliculas}:\n${listaHorarios}`).toLowerCase()
    let indiceSeleccion = parseInt(seleccion) - 1

    if (indiceSeleccion >= 0 && indiceSeleccion < horarios.length) {
        horarioPeliculas = horarios[indiceSeleccion]
    } else {
        alert("Horario no disponible. Elige otra opción.")
        return seleccionarHorario()
    }
    return horarioPeliculas
}

function ingresarCantidadBoletos() {
    let cantidad = parseInt(prompt("¿Cuántos boletos deseas comprar?"))
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingresa una cantidad válida.")
        return ingresarCantidadBoletos()
    } else {
        cantidadBoletos = cantidad
        return cantidad
    }
}

function calcularTotal() {
    return precioPorBoleto * cantidadBoletos
}

function mostrarResumen() {
    alert("Resumen de tu compra:\n" +
        "Género: " + generoPeliculas + "\n" +
        "Título: " + tituloPeliculas + "\n" +
        "Horario: " + horarioPeliculas + "\n" +
        "Cantidad de boletos: " + cantidadBoletos + "\n" +
        "Total a pagar: $" + calcularTotal().toFixed(2))
}

function logicaDePago(metodo) {
    while (!["mercado pago", "debito", "efectivo"].includes(metodo)) {
        alert("Ese método de pago no está disponible.")
        metodo = prompt("¿Cómo quieres pagar? \n\n- " + metodosPago.join("\n- ")).toLowerCase()
    }

    if (metodo === "mercado pago") {
        totalCompra *= 1.10;
    }
    alert("El total a pagar es de $" + totalCompra.toFixed(2))
    bandera = !confirm("¿Confirmamos la compra?")
}

while (bandera) {
    seleccionarGenero()
    seleccionarTitulo()
    seleccionarHorario()
    ingresarCantidadBoletos()
    mostrarResumen()

    let confirmacion = confirm("¿Deseas confirmar la compra?")
    if (confirmacion) {
        carrito.push({
            "Género": generoPeliculas,
            "Título": tituloPeliculas,
            "Horario": horarioPeliculas,
            "Cantidad": cantidadBoletos,
            "Total": calcularTotal().toFixed(2)
        });

        sumarATotal(precioPorBoleto, cantidadBoletos)

        bandera = confirm("¿Quieres comprar otro boleto?")
    } else {
        alert("Compra cancelada.")
        bandera = false
    }
}

let metodoDePago = prompt("¿Cómo quieres pagar? \n\n- " + metodosPago.join("\n- ")).toLowerCase()
logicaDePago(metodoDePago);

let resumenCompra = carrito.map(item => 
    `Género: ${item["Género"]}\nTítulo: ${item["Título"]}\nHorario: ${item["Horario"]}\nCantidad: ${item["Cantidad"]}\nTotal: $${item["Total"]}`
).join("\n\n");

alert("Los productos que compraste son los siguientes:\n" + resumenCompra +
    `\n\n\nTotal acumulado: $${totalCompra.toFixed(2)}`)

alert("Disfruta de la película.")
