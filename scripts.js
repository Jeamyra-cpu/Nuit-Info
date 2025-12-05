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

const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
let index = 0;
let interval;
const delay = 10000; // 10 secondes

function showSlide(i) {
    track.style.transform = `translateX(-${i * 100}%)`;
}

function nextSlide() {
    index = (index + 1) % slides.length ; // boucle sans espace blanc
    showSlide(index);
}

function startSlider() {
    interval = setInterval(nextSlide, delay);
}

function stopSlider() {
    clearInterval(interval);
}

// démarrage automatique
startSlider();

// pause au survol
track.parentElement.addEventListener('mouseenter', stopSlider);
track.parentElement.addEventListener('mouseleave', startSlider);

// pause au clic maintenu
track.parentElement.addEventListener('mousedown', stopSlider);
track.parentElement.addEventListener('mouseup', startSlider);


document.getElementById("inscription").addEventListener("click", function () {
    window.location.href = "inscription.html";
});

document.getElementById("connexion").addEventListener("click", function () {
    window.location.href = "choix.html";
});


document.addEventListener("DOMContentLoaded", function() {
    const div = document.querySelector(".video-container");
    div.innerHTML = `
        <video controls width="600">
            <source src="https://www.youtube.com/watch?v=2hqJxlhnlCw" type="video/mp4">
        </video>
    `;
});

