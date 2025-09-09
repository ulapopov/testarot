class TarotReader {
    constructor() {
        this.drawnCards = [];
        this.init();
    }

    init() {
        document.getElementById('drawCards').addEventListener('click', () => this.drawCards());
        this.updatePsychicSpeech("Welcome, seeker. Ask the cards your question...");
    }

    updatePsychicSpeech(message) {
        const speechElement = document.getElementById('psychicSpeech');
        speechElement.style.opacity = '0';
        setTimeout(() => {
            speechElement.textContent = message;
            speechElement.style.opacity = '1';
        }, 300);
    }

    shuffleDeck() {
        const shuffled = [...tarotDeck];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    drawCards() {
        const question = document.getElementById('questionInput').value.trim();
        const cardCount = parseInt(document.getElementById('cardCount').value);
        
        if (!question) {
            this.updatePsychicSpeech("Please share your question with me first, dear seeker...");
            return;
        }

        this.updatePsychicSpeech(psychicResponses[Math.floor(Math.random() * psychicResponses.length)]);
        
        const shuffledDeck = this.shuffleDeck();
        this.drawnCards = shuffledDeck.slice(0, cardCount);
        
        this.displayCards();
        
        setTimeout(() => {
            this.flipCards();
        }, 1000);
        
        setTimeout(() => {
            this.showInterpretation(question);
        }, 2000 + (cardCount * 500));
    }

    displayCards() {
        const container = document.getElementById('cardsContainer');
        container.innerHTML = '';
        
        this.drawnCards.forEach((card, index) => {
            const cardElement = this.createCardElement(card, index);
            container.appendChild(cardElement);
        });
    }

    createCardElement(card, index) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'tarot-card';
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-back-pattern">🌟</div>
                    <div>Mystic Tarot</div>
                </div>
                <div class="card-back">
                    <div class="card-image">${card.image}</div>
                    <div class="card-name">${card.name}</div>
                </div>
            </div>
        `;
        return cardDiv;
    }

    flipCards() {
        const cards = document.querySelectorAll('.tarot-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('flipped');
            }, index * 500);
        });
    }

    showInterpretation(question) {
        const interpretationDiv = document.getElementById('interpretation');
        interpretationDiv.innerHTML = this.generateInterpretation(question);
        interpretationDiv.classList.add('show');
        
        this.updatePsychicSpeech("The cards have revealed their wisdom. Study their message carefully...");
    }

    generateInterpretation(question) {
        let html = `<h3>Your Reading for: "${question}"</h3>`;
        
        this.drawnCards.forEach((card, index) => {
            const position = this.getCardPosition(index, this.drawnCards.length);
            html += `
                <div class="card-meaning">
                    <h4>${card.image} ${card.name} - ${position}</h4>
                    <p>${card.meaning}</p>
                </div>
            `;
        });
        
        html += `<div class="overall-reading">${this.generateOverallReading()}</div>`;
        
        return html;
    }

    getCardPosition(index, totalCards) {
        if (totalCards === 1) {
            return "Your Answer";
        } else if (totalCards === 2) {
            return index === 0 ? "The Challenge" : "The Solution";
        } else {
            const positions = ["Past/Foundation", "Present/Challenge", "Future/Outcome"];
            return positions[index];
        }
    }

    generateOverallReading() {
        const readings = [
            "The cards suggest a time of transformation and growth. Trust in your inner wisdom as you navigate the path ahead.",
            "Your reading reveals both challenges and opportunities. Embrace change with an open heart and mind.",
            "The universe is aligning to support your journey. Pay attention to the signs and synchronicities around you.",
            "This reading indicates a period of spiritual awakening. Listen to your intuition and follow your authentic path.",
            "The cards speak of balance and harmony. Seek equilibrium in all aspects of your life for true fulfillment.",
            "Your reading suggests that answers lie within. Take time for reflection and meditation to find clarity.",
            "The cosmic energies are shifting in your favor. Remain patient and trust in divine timing.",
            "This spread reveals the importance of relationships and connections. Nurture those who support your growth."
        ];
        
        return readings[Math.floor(Math.random() * readings.length)];
    }
}

// Initialize the tarot reader when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TarotReader();
});