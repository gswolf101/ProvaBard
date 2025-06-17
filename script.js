// Load saved background gradient
const savedGradient = localStorage.getItem('bgGradient');
if (savedGradient) {
    document.body.style.background = savedGradient;
}

// Change and save background gradient with at least 6 color combinations (updated with darker tones)
const colorCombinations = [
    { start: '#1E1E2F', end: '#2C2C54' },    // Dark Navy to Midnight Blue
    { start: '#1A252F', end: '#3A3F44' },    // Dark Slate to Charcoal
    { start: '#2F2F4F', end: '#4A4E69' },    // Dark Purple to Deep Purple
    { start: '#1B263B', end: '#415A77' },    // Dark Blue-Gray to Steel Blue
    { start: '#0F1419', end: '#2E4057' },    // Almost Black to Dark Slate Blue
    { start: '#212121', end: '#37474F' }     // Dark Gray to Dark Gray-Blue
];

function changeColor(index) {
    const { start, end } = colorCombinations[index % colorCombinations.length];
    document.body.style.background = `linear-gradient(to right, ${start}, ${end})`;
    localStorage.setItem('bgGradient', `linear-gradient(to right, ${start}, ${end})`);
}

// Add color change buttons dynamically
function addColorButtons() {
    const colorOptionsHome = document.querySelector('.color-options');
    const colorOptionsCustomize = document.querySelector('#color-options');
    if (colorOptionsHome) {
        colorCombinations.forEach((combo, index) => {
            const button = document.createElement('button');
            button.textContent = `Combinação ${index + 1}: ${combo.start} a ${combo.end}`;
            button.onclick = () => changeColor(index);
            colorOptionsHome.appendChild(button);
        });
    }
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
        notesList.innerHTML = '';
        notes.forEach(note => {
            const p = document.createElement('p');
            p.textContent = `${note.date}: ${note.text}`;
            notesList.appendChild(p);
        });
    }
}

displayRandomQuestion(); // Display initial question
displayNotes(); // Display existing notes on load
