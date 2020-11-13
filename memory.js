const RAINBOW = "&#127752;";
const SAKURA = "&#127800;";
const MUSHROOM = "&#127812;";
const FOURLEAFCLOVER = "&#127808;";
const CAKE = "&#127856;";
const COOKIE = "&#127850;";
const CACTUS = "&#127797;";
const GRAPES = "&#127815;";

const startingDeck = [RAINBOW, RAINBOW, SAKURA, SAKURA, MUSHROOM, MUSHROOM, FOURLEAFCLOVER, FOURLEAFCLOVER, CAKE, CAKE, COOKIE, COOKIE, CACTUS, CACTUS, GRAPES, GRAPES];
let game;

class Card {
    constructor(card, id) {
        this.content = card;
        this.id = id;
        this.isVisible = false;
        this.isFound = false;
    }

    toggle() {
        if (this.isVisible) {
            document.getElementById(this.id).setAttribute("class", "hidden");
        } else {
            document.getElementById(this.id).setAttribute("class", "visible");
        }
        this.isVisible = !this.isVisible;
    }

    found() {
        this.isFound = true;
    }
}

class Game {
    constructor(deck) {
        this.deck = this.shuffleCards(deck);
        this.score = 0;
        this.cardToggled = 0;
    }

    shuffleCards(startingDeck) {
        let deck = [...startingDeck];
        let shuffledPile = [];
        let cardsNumber = deck.length;
        for (let i = 0; i < cardsNumber; i++) {
            let randomIndex = Math.floor(Math.random() * deck.length);
            let randomCard = new Card(deck[randomIndex], i);
            shuffledPile.push(randomCard);
            deck.splice(randomIndex, 1);
        }
        return shuffledPile;
    }

    compare(index1, index2) {
        if ( this.deck[index1].content === this.deck[index2].content ) {
            this.deck[index1].found();
            this.deck[index2].found();
            this.score++;
            document.getElementById("score").innerText = "Score : " + this.score;
            if (this.score === 8) {
                document.getElementById("won").innerText = "You won !"
            }
        } else {
            this.deck[index1].toggle();
            this.deck[index2].toggle();
        }
    }
}

function gameInit() {
    game = new Game(startingDeck);
    gameDisplay(game);
}

function gameDisplay(game) {
    let table = document.createElement("table");

    for (let i = 0; i < 4; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 4; j++) {
            let cell = document.createElement("td");
            let image = document.createElement("div");
            image.setAttribute("class", "hidden");
            image.setAttribute("id", (i * 4 + j));
            image.innerHTML = game.deck[i * 4 + j].content;
            cell.addEventListener("click", clickCallback);
            cell.appendChild(image);
            row.appendChild(cell);
        }    
        table.appendChild(row);
    }

    document.getElementById("target").innerHTML = "";
    document.getElementById("target").appendChild(table);

    document.getElementById("score").innerText = "Score : " + game.score;
    document.getElementById("won").innerText = "";
}

function clickCallback(event) {
    if (game.cardToggled < 2 ) {
        let id = event.currentTarget.firstChild.id;
        if (!game.deck[id].isVisible) {
            game.deck[id].toggle();
            game.cardToggled++;
        }
        if ( game.cardToggled === 2 ) {
            setTimeout(() => {
                let cardsToCompare = game.deck.filter((card) => card.isVisible && !card.isFound);
                game.compare(cardsToCompare[0].id, cardsToCompare[1].id);

                game.cardToggled = 0;
            }, 1000);
        }
    }
}


(() => {
    gameInit();    
})();