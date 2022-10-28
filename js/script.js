
var personaje = document.getElementById("personaje");

//cuando se detecta el click le aniade una class al personaje
document.addEventListener("keypress", function () {
    if (event.key === " "){
        personaje.classList.add("salto");
    }         
});
//cuando se detecta el fin de la animacion borra una class al personaje
personaje.addEventListener('animationend', () => {
    personaje.classList.remove("salto");
})
//cuando se detecta el evento le aniade una class al personaje
document.addEventListener("keypress", function () {
    switch (event.key) {
        case "w":
            alert("Tecla w")
            break;
        case "W":
            console.log()
            break;

        case "d":
        case "D":
            personaje.style.left = (personaje.offsetLeft + 10) + "px";
            break;
        case "a":
        case "A":
            personaje.style.left = (personaje.offsetLeft - 10) + "px";
            break;

    }
});

