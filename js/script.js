
var personaje = document.getElementById("personaje");
var audioSalto = document.getElementById("sonidoSalto");
var audioFondo = document.getElementById("musicaFondo");
var btnJugar = document.getElementById("btnJugar");
var btnAudio = document.getElementById("mute");
let cont = 0;

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
    document.getElementById("sonidoSalto").setAttribute("src", "others/salto.mp3");
    document.getElementById("sonidoSalto").play();
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
$(document).ready(function () {
    menuInicio();
});

function juego() {
    let id = null;
    id = setInterval(frame, 50);
    function frame() {
        if (cont == 0) {
            nivel1();
        } else {
            if (cont == 1) {
                nivel2();
            }
        }
        capturaEventos();
    }
}
function menuInicio() {
    $(".pergamino-logo").css("display", "none");
    $("#imgFondo").css("display", "none");
    $("#imgFondo2").css("display", "none");
    $("#personaje").css("display", "none");
    $(".objetos").css("display", "none");
    $(".tutorial").css("display", "none");
    btnJugar.addEventListener("click", () => {
        juego();
        $("#personaje").css("display", "block");
        $(".objetos").css("display", "block");
        $(".tutorial").css("display", "block");
    });
    btnAudio.addEventListener("click", function () {
        if (btnAudio.getAttribute("src") === "images/silenciar-volumen.png") {
            btnAudio.setAttribute("src", "images/sube-el-volumen.png");
            audioFondo.play();
        } else {
            btnAudio.setAttribute("src", "images/silenciar-volumen.png");
            audioFondo.pause();
        }
    });
}


function tutorial() { // Inserta imagenes del tutorial

    if (personaje.offsetLeft >= 300) {
        $("#p1").css("display", "none");
        $("#p3").css("display", "none");
        $("#p2").css("display", "block");
    }
    if (personaje.offsetLeft >= 500) {
        $("#p2").css("display", "none");
        $("#p3").css("display", "block");
        $(".tutorial").css("bottom", "300px");
        $(".tutorial").css("left", "650px");
        $(".tutorial").css("width", "150px");
        $(".tutorial").css("height", "150px");
    }
    if (personaje.offsetLeft >= 1000) {
        $("#p3").css("display", "none");
    }

}
function capturaEventos() {
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
                if (personaje.offsetLeft >= window.innerWidth - 250) {
                    cambioNivel();
                    nivel2();
                }
        }
    });
}

function fin() {

}
function nivel1() {
    $("#imgFondoInicio").css("display", "none");
    $("#btnJugar").css("display", "none");
    $("#imgFondo").css("display", "block");
    tutorial();
    //insertar img pergamino con logo cuando llegue a un punto
    if (personaje.offsetLeft >= 300) {
        $(".pergamino-logo").fadeIn()
    }
}
function cambioNivel() {
    document.getElementById("personajeIni").style.display = 'block';
    document.getElementById("personajeIzq").style.display = 'none';
    personaje.style.left = "20px";
    cont++;
}
function nivel2() {
    $(".pergamino-logo").css("display", "none");
    $("#imgFondo").css("display", "none");
    $("#imgFondo2").css("display", "block");
}

