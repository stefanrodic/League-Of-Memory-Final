// Select all cards and convert node list to array
// add event listener

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}


let count = 0;

let matched = [];
let openedCards = [];


function ready() {
    let cards = Array.from(document.getElementsByClassName('card'));

    cards.forEach(card => {
        for (let i = cards.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cards[randIndex].style.order = i;
            cards[i].style.order = randIndex;
        }

        card.addEventListener('click', () => {
            handleClick(card)


        });
    });
}


function handleClick(card) {
    card.classList.add('visible');
    count++
    openedCards.push(card);

    console.log(openedCards)
    console.log(openedCards[0].type)
    let len = openedCards.length;
    console.log(len)

    if (len == 2) {
        if (openedCards[0].type === openedCards[1].type) {
            openedCards[0].removeEventListener("click", handleClick)
            openedCards[1].removeEventListener("click", handleClick)
            matched.push(openedCards[0])
            matched.push(openedCards[1])
            openedCards = []
            console.log(matched)
        }
        else { alert("no match") }
    }

}

