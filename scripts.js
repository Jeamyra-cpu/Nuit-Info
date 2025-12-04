window.addEventListener("load", function () 
{
    console.log("hello");
    const welcomeMessage = document.getElementById("welcome-message");
    if(typeof welcomeMessage != 'undefined' &&  welcomeMessage != null) {
    let date = new Date();
    if(date.getHours() < 12)
    { welcomeMessage.textContent = "Bonjour et bienvenue au village qui résiste encore et toujours aux Big Tech !";
        console.log("Bonjour et bienvenue au village qui résiste encore et toujours aux Big Tech !")
    }else{
        welcomeMessage.textContent = "Bonsoir et bienvenue au village qui résiste encore et toujours aux Big Tech !";
        console.log("Bonsoir et bienvenue au village qui résiste encore et toujours aux Big Tech !")
    }
}
});

const track = document.querySelector(".slider-track");
const slides = track.querySelectorAll("img");
const total = slides.length;

let index = 0;
let isPaused = false;

function slide() {
    index++;
    track.style.transition = "transform 1s ease";
    track.style.transform = `translateX(-${index * 100}%)`;

    // Si on atteint la dernière slide (copie), on reset discrètement
    if (index === total - 1) {
        setTimeout(() => {
            track.style.transition = "none";             // on coupe l’animation
            track.style.transform = "translateX(0)";     // retour instantané
            index = 0;                                   // reset pour la boucle
        }, 1000); // la durée doit correspondre à la transition (1s ici)
    }
}

// Auto défilement 10s
setInterval(() => {
    if (!isPaused) slide();
}, 10000);

// Pause sur survol
track.addEventListener("mouseenter", () => isPaused = true);
track.addEventListener("mouseleave", () => isPaused = false);