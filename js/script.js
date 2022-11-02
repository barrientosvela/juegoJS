
var personaje = document.getElementById("personaje");

$(document).ready(function () {
    juego();
});

function juego() {
    let id = null;
    id = setInterval(frame, 50);
    function frame() {
        //insertar img pergamino con logo
        if (personaje.offsetLeft >= 200) {
            $(".pergamino-logo").fadeIn()
        }
    }
}
//insertar img pergamino con logo
$(".pergamino-logo").css("display", "none");
$("#btn").click(function () {
    $(".pergamino-logo").fadeIn()
})

//animacion con javascript de movimiento a la derecha
function movDch() {
    let id = null;
    let pos = personaje.offsetLeft;
    let posM = personaje.offsetLeft + 35;
    document.getElementById("personajeIni").style.display = 'block';
    document.getElementById("personajeIzq").style.display = 'none';
    id = setInterval(frame, 10);
    function frame() {
        if (pos <= posM && pos <= window.innerWidth - 200) {
            pos = pos + 5;
            personaje.style.left = pos + "px";
        } else {
            clearInterval(id);
        }
    }
}
//animacion con javascript de movimiento a la izquierda
function movIzq() {
    let id = null;
    let pos = personaje.offsetLeft;
    let posM = personaje.offsetLeft - 35;
    document.getElementById("personajeIni").style.display = 'none';
    document.getElementById("personajeIzq").style.display = 'block';
    id = setInterval(frame, 10);
    function frame() {
        if (pos >= posM && pos >= 10) {
            pos = pos - 5;
            personaje.style.left = pos + "px";
        } else {
            clearInterval(id);
        }
    }
}
//animacion en css de salto del personaje
function saltar() {
    //cuando se detecta el espacio le añade una class al personaje
    personaje.classList.add("salto");
    //cuando se detecta el fin de la animacion borra una class al personaje
    personaje.addEventListener('animationend', () => {
        personaje.classList.remove("salto");
    })
}
//animacion con javascript de agacharse
/*
function agachar() {
    document.getElementById("personajeIni").style.display = 'none';
    document.getElementById("personajeAgachado").style.display = 'block';
    document.addEventListener("keyup", function () {
        if (event.key == "s") {
            document.getElementById("personajeIni").style.display = 'block';
            document.getElementById("personajeAgachado").style.display = 'none';
        }
    });
}
*/
function fin() {

}
function puzle() {

}

//cuando se detecta el evento de pulsar una tecla llama a una función
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "w":
        case "W":
        case " ":
            saltar();
            break;
        case "d":
        case "D":
            movDch();
            break;
        case "a":
        case "A":
            movIzq();
            break;
        case "s":
        case "S":
            agachar();
            break;
        case "e":
        case "E":
            if (personaje.offsetLeft >= window.innerWidth - 100) {
                puzle();
            }
    }
});

