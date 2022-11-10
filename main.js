//Consigue todos los elementos necesarios
const video = document.getElementById("videoBackground");
const sound = document.getElementById("sound");
const links = document.querySelectorAll("ul a");
const audioClick = document.getElementById("audioClick");
const audioHover = document.getElementById("audioHover");

//Agregue un detector de eventos de clic al ícono de sonido
sound.addEventListener("click", () => {
  //alternar icono al hacer clic
  sound.classList.toggle("fa-volume-up");

  //Silenciar/Activar sonido de video
  if (video.muted === false) {
    video.muted = true;
  } else {
    video.muted = false;
  }

  //Añadir el efecto de sonido
  clickSound();
});

//Agregue un hover de eventos flotantes en el icono de sonido
sound.addEventListener("mouseenter", hoverSound);

//seleccionar todos los enlaces
for (let i = 0; i < links.length; i++) {
  //agregue un detector de eventos de clic en los enlaces
  links[i].addEventListener("click", clickSound);
  //Add hover event listener on the links
  links[i].addEventListener("mouseenter", hoverSound);
}

//Haga clic en efecto de sonido
function clickSound() {
  audioClick.play();
}

//efecto de sonido flotante
function hoverSound() {
  audioHover.play();
}