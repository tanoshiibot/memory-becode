window.onload = () => {

    const RAINBOW = "&#127752;";
    const SAKURA = "&#127800;";
    const MUSHROOM = "&#127812;";
    const FOURLEAFCLOVER = "&#127808;";
    const CAKE = "&#127856;";
    const COOKIE = "&#127850;";
    const CACTUS = "&#127797;";
    const GRAPES = "&#127815;";

    let deck = [RAINBOW, RAINBOW, SAKURA, SAKURA, MUSHROOM, MUSHROOM, FOURLEAFCLOVER, FOURLEAFCLOVER, CAKE, CAKE, COOKIE, COOKIE, CACTUS, CACTUS, GRAPES, GRAPES];

    function shuffleCards(cards) {
        let shuffledPile = [];
        let howManyCards = deck.length;
        for (let i = 0; i < howManyCards; i++) {
            let r = Math.floor(Math.random() * deck.length);
            let randomCard = deck[r];
            shuffledPile.push(randomCard);
            deck.splice(r, 1);
        }
        return shuffledPile;
    }

    let shuffledPile = shuffleCards(deck);

    let score = 0;

    //pas obligé de le montrer
    
    function clickCallback(cell) {
        cell.setAttribute("class", "revealed");
        document.getElementById("target").setAttribute("class", "noclickhack");
        setTimeout(() => {
            let ree = [...document.getElementsByClassName("revealed")];
            if ((ree.length > 1) && (ree[0].innerHTML == ree[1].innerHTML)) {
                    ree[0].setAttribute("class", "catched");
                    ree[1].setAttribute("class", "catched");
                    score++;
            } else if (ree.length > 1) {
                    ree[0].setAttribute("class", "hidden");
                    ree[1].setAttribute("class", "hidden");
            }
            document.getElementById("target").setAttribute("class", "ok")
        }, 1000);
    }

    let TABLE = document.createElement("TABLE");

    for (let i = 0; i < 4; i++) {
        let row = document.createElement("TR")
        for (let j = 0; j < 4; j++) {
            let column = document.createElement("TD");
            let cell = document.createElement("DIV");
            cell.setAttribute("class", "hidden");
            cell.innerHTML = shuffledPile[i * 4 + j];
            column.addEventListener("click", clickCallback(cell))
            column.appendChild(cell);
            row.appendChild(column);
        }    
        TABLE.appendChild(row);
    }

    document.getElementById("target").appendChild(TABLE);

}

//il faut empêcher le clic après un deuxième clic pour attendre le timeout
