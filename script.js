// Load saved background gradient
const savedGradient = localStorage.getItem('bgGradient');
if (savedGradient) {
    document.body.style.background = savedGradient;
}

// Change and save background gradient with peaceful color combinations
const colorCombinations = [
    { start: '#B2DFDB', end: '#80CBC4' },    // Light Teal to Teal
    { start: '#C8E6C9', end: '#A5D6A7' },    // Light Green to Green
    { start: '#E0F2F7', end: '#BBDEFB' },    // Light Blue to Soft Blue
    { start: '#F5F5F5', end: '#E0E0E0' },    // Off-White to Light Gray
    { start: '#D7CCC8', end: '#BCAAA4' },    // Warm Beige to Soft Brown
    { start: '#E1BEE7', end: '#CE93D8' },    // Lavender to Light Purple
    { start: '#B3E5FC', end: '#81D4FA' },    // Pale Blue to Sky Blue
    { start: '#C5E1A5', end: '#9CCC65' },    // Pale Green to Olive Green
    { start: '#F8BBD0', end: '#F48FB1' },    // Light Pink to Soft Pink
    { start: '#DCE775', end: '#AFB42B' }     // Light Yellow-Green to Olive
];

function changeColor(index) {
    const { start, end } = colorCombinations[index % colorCombinations.length];
    document.body.style.background = `linear-gradient(to right, ${start}, ${end})`;
    localStorage.setItem('bgGradient', `linear-gradient(to right, ${start}, ${end})`);
}

// Add color change buttons dynamically only on the customization page
function addColorButtons() {
    const colorOptionsCustomize = document.querySelector('#color-options');
    if (colorOptionsCustomize) {
        colorCombinations.forEach((combo, index) => {
            const button = document.createElement('button');
            button.textContent = `Combinação ${index + 1}: ${combo.start} a ${combo.end}`;
            button.onclick = () => changeColor(index);
            colorOptionsCustomize.appendChild(button);
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

function saveMoodNote() {
    const note = document.getElementById('mood-note').value;
    if (note && document.getElementById('mood-note')) {
        let notes = JSON.parse(localStorage.getItem('moodNotes') || '[]');
        const now = new Date();
        const dateString = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
                          ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        notes.push({ text: note, date: dateString });
        localStorage.setItem('moodNotes', JSON.stringify(notes));
        alert('Anotação salva!');
        document.getElementById('mood-note').value = '';
        displayNotes();
    }
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    if (notesList) {
        let notes = JSON.parse(localStorage.getItem('moodNotes') || '[]');
        notesList.innerHTML = ''; // Clear existing content
        if (notes.length > 0) {
            notes.forEach(note => {
                const p = document.createElement('p');
                p.textContent = `${note.date}: ${note.text}`;
                notesList.appendChild(p);
            });
        } else {
            notesList.innerHTML = '<p>Nenhuma anotação ainda.</p>'; // Placeholder if no notes
        }
    }
}

displayRandomQuestion(); // Display initial question
displayNotes(); // Display existing notes on load
