// 1. Définition des questions, options et scores
const quizData = [
    {
        id: "q1",
        title: "1. Combien d'heures par jour votre enfant passe-t-il devant les écrans ?",
        options: [
            { text: "0–1h", value: 1 },
            { text: "1–2h", value: 2 },
            { text: "2–4h", value: 3 },
            { text: "Plus de 4h", value: 4 }
        ]
    },
    {
        id: "q2",
        title: "2. A-t-il un accès internet en autonomie totale ?",
        options: [
            { text: "Accès limité et surveillé", value: 1 },
            { text: "Accès libre mais raisonnable", value: 2 },
            { text: "Accès libre sans limite", value: 3 }
        ]
    },
    {
        id: "q3",
        title: "3. Comment réagit-il lorsqu’on lui demande d'arrêter les écrans ?",
        options: [
            { text: "Il arrête facilement", value: 1 },
            { text: "Il râle un peu mais obéit", value: 2 },
            { text: "Il refuse ou s'énerve", value: 3 }
        ]
    },
    {
        id: "q4",
        title: "4. L'enfant utilise-t-il un écran (téléphone, tablette, console) dans l'heure qui précède le coucher ?",
        options: [
            { text: "Jamais / Très rarement", value: 1 },
            { text: "De temps en temps", value: 2 },
            { text: "Souvent ou tous les jours", value: 3 }
        ]
    },
    {
        id: "q5",
        title: "5. Êtes-vous certain que votre enfant ne consulte pas de contenus inappropriés (violents, sensibles, etc.) ?",
        options: [
            { text: "Oui, nous surveillons ou les filtres sont actifs", value: 1 },
            { text: "Nous n'avons pas vérifié, mais nous pensons que non", value: 2 },
            { text: "Non, c'est une inquiétude", value: 3 }
        ]
    },
    {
        id: "q6",
        title: "6. Combien d'activités sans écran (sport, lecture, jeux de société) pratique-t-il chaque jour ?",
        options: [
            { text: "2 heures ou plus", value: 1 },
            { text: "1 à 2 heures", value: 2 },
            { text: "Moins d'une heure", value: 3 }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let userAnswers = {};

const questionContainer = document.getElementById('questionContainer');
const nextButton = document.getElementById('nextButton');
const resultatSection = document.getElementById('resultat');

/**
 * 1. Affiche la question actuelle et gère l'effet de défilement (fondu).
 */
function displayQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        // Fin du quiz
        analyzeResults();
        return;
    }

    const currentQuestion = quizData[currentQuestionIndex];
    
    // 1. Masque la question actuelle/précédente
    questionContainer.classList.add('question-hidden');

    // Délai pour l'effet de disparition (500ms)
    setTimeout(() => {
        
        // 2. Génère le HTML de la nouvelle question
        let questionHTML = `<h3>${currentQuestion.title}</h3>`;
        currentQuestion.options.forEach(option => {
            questionHTML += `
                <label>
                    <input type="radio" name="${currentQuestion.id}" value="${option.value}"> 
                    ${option.text}
                </label>
            `;
        });
        
        // 3. Injecte le nouveau contenu
        questionContainer.innerHTML = questionHTML;
        
        // 4. Affiche la nouvelle question (effet de fondu d'apparition)
        questionContainer.classList.remove('question-hidden');

        // Réinitialisation du bouton
        nextButton.disabled = true;
        nextButton.textContent = "Suivant";
        if (currentQuestionIndex === quizData.length - 1) {
            nextButton.textContent = "📌 Analyser mes réponses";
        }

        // Ajoute un écouteur sur le conteneur pour détecter la sélection
        questionContainer.addEventListener('change', checkSelection);

    }, 500); 
}

/**
 * 2. Active le bouton "Suivant" dès qu'une option est sélectionnée.
 */
function checkSelection() {
    const radioGroupName = quizData[currentQuestionIndex].id;
    const selected = document.querySelector(`input[name="${radioGroupName}"]:checked`);
    
    nextButton.disabled = !selected;
}


/**
 * 3. Gère le passage à la question suivante.
 */
function nextQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const radioGroupName = currentQuestion.id;
    const selectedInput = document.querySelector(`input[name="${radioGroupName}"]:checked`);
    
    // Vérifie qu'une réponse est bien sélectionnée
    if (selectedInput) {
        // Stocke la réponse et met à jour le score
        const value = Number(selectedInput.value);
        userAnswers[currentQuestion.id] = value;
        totalScore += value;
        
        // Passe à la question suivante
        currentQuestionIndex++;
        
        // Affiche la nouvelle question (ou les résultats)
        displayQuestion();
        
    } else {
        alert("Veuillez sélectionner une option pour continuer.");
    }
}

/**
 * 4. Calcule et affiche le diagnostic final.
 */
function analyzeResults() {
    // Cache le formulaire
    document.getElementById("quizForm").classList.add("hidden");
    
    let message = "";
    let details = "";
    let resultatMessage = document.getElementById("message");
    let resultatDetails = document.getElementById("details");

    // Seuils ajustés pour un score total max de 19 et min de 6.
    
    if(totalScore <= 8){
        // Score de 6 à 8 (Faible risque)
        message = "🟢 **Excellent équilibre numérique !** Le contrôle et l'équilibre général sont très sains. Continuez ainsi 👍";
        resultatMessage.className = "success";
        details = "Vos réponses montrent une grande conscience des enjeux du numérique. Votre enfant a des limites claires et un bon équilibre avec les activités sans écran.";
    }
    else if(totalScore <= 13){
        // Score de 9 à 13 (Risque modéré)
        message = "🟠 **Utilisation modérée.** Quelques aspects nécessitent une attention particulière.";
        resultatMessage.className = "warning";
        details = "Nous recommandons de revoir les points suivants : <br>1. **Temps d'écran** : Fixer des plages horaires plus strictes. <br>2. **Sommeil** : Éviter tout écran (y compris la télévision) au moins une heure avant le coucher.";
    }
    else{
        // Score de 14 à 19 (Risque élevé)
        message = "🔴 **Usage numérique élevé.** Des mesures correctives sont urgentes.";
        resultatMessage.className = "danger";
        details = "L'usage excessif d'écrans est susceptible d'affecter le sommeil, la concentration et le comportement de votre enfant. Nous vous encourageons à : <br>1. Réduire le temps d'écran total. <br>2. Rétablir des limites strictes concernant l'accès internet et les réactions à l'arrêt.";
    }

    resultatMessage.innerHTML = message;
    resultatDetails.innerHTML = details;
    resultatSection.classList.remove("hidden");
}

// 5. Initialisation du quiz au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // 1. Afficher la première question
    displayQuestion(); 
    
    // 2. Attacher l'événement au bouton "Suivant"
    nextButton.addEventListener('click', nextQuestion);
});