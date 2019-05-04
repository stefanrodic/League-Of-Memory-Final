let duration = 30000
const timerDisplay = document.querySelector("#timer")
let secs = 0




const ready = () => {
    let count = 0;
    let matched = [];
    let openedCards = [];
    let score = 0;


    let cards = Array.from(document.getElementsByClassName('card'));



    const handleClick = (card) => {

  

        if (matched.indexOf(card) >= 0 || openedCards.length == 2 || openedCards.indexOf(card) >= 0) {
            return
        }
     
        else {
            card.classList.add('visible');
            count++
            document.querySelector("#counter").innerHTML = count
            timer(30000);




            openedCards.push(card);


            if (openedCards.length == 2) {
           
                if (openedCards[0].lastElementChild.src == openedCards[1].lastElementChild.src) {
                    matched.push(openedCards[0])
                    matched.push(openedCards[1])
                    updateScore()
                    checkForV()
                    openedCards = []




               
                } else {
                    setTimeout(function () {
                        openedCards[0].classList.remove("visible")
                        openedCards[1].classList.remove("visible")
                        updateScore()
                        openedCards = []
                    }, 1200)
                    return

                }

            }
        }



    }
   
    const checkForV = () => {
        if (matched.length == cards.length) {
            let edit2 = document.querySelector(".grid-container")

            edit2.innerHTML = `<div class="imgend"><img id="img-vic" src="pics/victory.png"> <div> <a href="index.html">New game </a> </div ></div>`


            clearInterval(countdown);

        }
    }
    

    const gameLost = () => {
        let edit = document.querySelector(".grid-container")

        edit.innerHTML = `<div class="imgend"><img id="img-lost" src="pics/defeat.png">  
          <div> <a href="index.html">New game </a> </div > </div> `





    }

    const newGame = () => {
        cards.forEach(card => {

            card.classList.remove("visible")
            matched = [];
            openedCards = [];
            count = 0;
            document.querySelector("#counter").innerHTML = count

            ready()

        });

    }

    cards.forEach(card => {
        for (let i = cards.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cards[randIndex].style.order = i;
            cards[i].style.order = randIndex;
        }
        card.addEventListener('click', function mdd() { handleClick(card) })

    });



    const timer = (duration) => {
        if (count == 1) {

            displayT(30)
            const now = Date.now();
            const then = now + duration

            countdown = setInterval(() => {
                const secs = Math.round((then - Date.now()) / 1000)

                if (secs < 0) {
                    clearInterval(countdown);
                    gameLost()
                    return
                }
                displayT(secs)
            }, 1000)
        } else { return }

    }


    const displayT = (secs) => {
        const mins = Math.floor(secs / 60);
        const rsecs = secs % 60;
        const display = `${mins}:${rsecs < 10 ? "0" : ""}${rsecs}`;
        timerDisplay.textContent = display;

    }

    const updateScore = () => {
        score = secs + ((matched.length) * (matched.length)) - count

        let result = document.querySelector("#result")
        result.innerHTML = score;
        if (score > 1) {
            result.style.color = "green";
        }
        else {
            result.style.color = "rgb(202, 172, 1)";
        }


    }
    return { cards, count, openedCards, matched, newGame, gameLost }
}












if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}