
var personaje = document.getElementById("personaje");
var audioSalto = document.getElementById("sonidoSalto");
var audioFondo = document.getElementById("musicaFondo");
var btnJugar = document.getElementById("btnJugar");
var btnAudio = document.getElementById("mute");
var nombreJugador = document.getElementById("nombre").value;
let contNivel = 0;


$(document).ready(function () {
    menuInicio();
});

function juego() {
    var player = new Player();
    var n1 = new Nivel1();
    var cambio = new CambioNivel();
    let id = null;
    n1.acciones();
    id = setInterval(frame, 50);
    function frame() {
        if (contNivel == 0) {
            n1.tutorial();
            n1.animaciones();
        } else {
            if (contNivel == 1) {
                cambio.reiniciaPersonaje();
                cambio.reiniciaEscenerio();
            }else{
                clearInterval(id);
            }
        }
        capturaEventos(player, cambio);
    }
}
function local() {   // falla-- 
    if (`${nombreJugador}` == "") {
        var local = localStorage.setItem('jugador', `invitado`);
    } else {
        $(".campoNombre").css("display", "none");
        var local = localStorage.setItem('jugador', `${nombreJugador}`);
        return local;
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
        local();
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


function tutorial() {
}

function fin() {

}
class CambioNivel {
    acciones() {
        $(".pergamino-logo").css("display", "none");
        $("#t1").fadeOut();
        $("#t2").css("display", "none");
        $("#descrip").fadeIn();
        $(".puerta").css("display", "none");
        $("#imgFondo").css("display", "none");
        $("#imgFondo2").css("display", "block");
    }
    reiniciaPersonaje() {
        document.getElementById("personajeIni").style.display = 'block';
        document.getElementById("personajeIzq").style.display = 'none';
        personaje.style.left = "20px";
        contNivel++;
    }
}

function capturaEventos(p, c) {

    //cuando se detecta el evento de pulsar una tecla llama a una función
    document.addEventListener("keydown", function (e) {
        switch (e.key) {
            case "w":
            case "W":
            case " ":
                p.saltar();
                break;
            case "d":
            case "D":
                p.movDch();
                break;
            case "a":
            case "A":
                p.movIzq();
                break;
            case "s":
            case "S":
                p.agachar();
                break;
            case "e":
            case "E":
                if (personaje.offsetLeft >= window.innerWidth - 250) {
                    c.acciones();
                    c.reiniciaPersonaje();
                }
        }
    });
}
class Nivel1 {

    acciones() {
        $("#imgFondoInicio").css("display", "none");
        $("#btnJugar").css("display", "none");
        $(".nombreJugador").css("display", "none");
        $("#Pabierta").css("display", "none");
        $("#imgFondo").css("display", "block");
        $("<p> Mi nombre es José Barrientos Vela y soy desarrollador web. </p>").appendTo(".objetos").attr({ "class": "texto", "id": "t1" });
        $("<p> Me gusta la tecnología y todo lo relacionado con ella. </p>").appendTo(".objetos").attr({ "class": "texto", "id": "t2" });
        $(".texto").css("display", "none")
    }
    tutorial() {
        // Inserta imagenes del tutorial

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
    animaciones() {
        //insertar img pergamino con logo cuando llegue a un punto
        if (personaje.offsetLeft >= 300) {
            $(".pergamino-logo").fadeIn();
            $(".pergamino-logo").css("display", "block");
        };
        if (personaje.offsetLeft >= 1000) {
            $("#t1").fadeIn();
        };
        if (personaje.offsetLeft >= 1500) {
            $("#t1").css("display", "none");
            $("#t2").fadeIn();
        }
    }
}
class Player {
    //animacion con javascript de movimiento a la derecha
    movDch() {
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
    movIzq() {
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
    saltar() {
        //cuando se detecta el espacio le añade una class al personaje
        personaje.classList.add("salto");
        document.getElementById("sonidoSalto").setAttribute("src", "others/salto.mp3");
        document.getElementById("sonidoSalto").play();
        //cuando se detecta el fin de la animacion borra una class al personaje
        personaje.addEventListener('animationend', () => {
            personaje.classList.remove("salto");
        })
    }
    /*
    //animacion con javascript de agacharse
    agachar() {
        document.getElementById("personajeIni").style.display = 'none';
        document.getElementById("personajeAgachado").style.display = 'block';
        document.addEventListener("keyup", function (e) {
            if (e.key == "s") {
                document.getElementById("personajeIni").style.display = 'block';
                document.getElementById("personajeAgachado").style.display = 'none';
            }
        });
    }
    */
}
