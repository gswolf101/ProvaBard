// Load saved background gradient
const savedGradient = localStorage.getItem('bgGradient');
if (savedGradient) {
    document.body.style.background = savedGradient;
}

// Change and save background gradient with at least 6 color combinations
const colorCombinations = [
    { start: '#87CEEB', end: '#98FB98' },    // Light Blue to Light Green
    { start: '#FFDAB9', end: '#98FF98' },    // Peach to Mint Green
    { start: '#B0E0E6', end: '#DDA0DD' },    // Light Steel Blue to Plum
    { start: '#F0E68C', end: '#20B2AA' },    // Khaki to Light Sea Green
    { start: '#E6E6FA', end: '#FFA07A' },    // Lavender to Light Salmon
    { start: '#ADD8E6', end: '#90EE90' }     // Light Blue to Light Green Variant
];

function changeColor(index) {
    const { start, end } = colorCombinations[index % colorCombinations.length];
    document.body.style.background = `linear-gradient(to right, ${start}, ${end})`;
    localStorage.setItem('bgGradient', `linear-gradient(to right, ${start}, ${end})`);
}

// Add color change buttons dynamically
function addColorButtons() {
    const colorOptions = document.querySelector('.color-options');
    if (colorOptions) {
        colorCombinations.forEach((combo, index) => {
            const button = document.createElement('button');
            button.textContent = `Combinação ${index + 1}`;
            button.onclick = () => changeColor(index);
            colorOptions.appendChild(button);
        });
    }
}

document.addEventListener('DOMContentLoaded', addColorButtons);

// Mood Diary functionality
const questions = [
    "Como está sendo seu dia?",
    "Quer me contar sobre os acontecimentos recentes?",
    "Me diga, o que está pensando?"
];

function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

function displayRandomQuestion() {
    const questionElement = document.getElementById('mood-question');
    if (questionElement) {
        questionElement.textContent = getRandomQuestion();
    }
}

displayRandomQuestion(); // Display initial question

function saveMoodNote() {
    const note = document.getElementById('mood-note').value;
    if (note && document.getElementById('mood-note')) {
        let notes = JSON.parse(localStorage.getItem('moodNotes') || '[]');
        notes.push(note);
        localStorage.setItem('moodNotes', JSON.stringify(notes));
        alert('Anotação salva!');
        document.getElementById('mood-note').value = '';
    }
}
