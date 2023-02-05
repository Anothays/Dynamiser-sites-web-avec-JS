document.addEventListener('DOMContentLoaded', () => {
    const cube = document.getElementById('cube')
    const newGameBtn = document.getElementById('newGameBtn')
    const stopGameBtn = document.getElementById('stopGameBtn')
    const modal = document.getElementById('modal')
    const background = document.getElementById('container')
    const form = document.getElementById('form')
    const cancel = document.getElementById('cancel')
    const player1NameInput = document.getElementById('player1Name')
    const player2NameInput = document.getElementById('player2Name')
    const player1  = document.getElementById('player1-container')
    const player2  = document.getElementById('player2-container')
    const targetScore = 100
    let game = false
    let tour = 0
    let idCurrentPlayer = null
    let holdButton1 = document.getElementById('btnHold1')
    let holdButton2 = document.getElementById('btnHold2')

    // POUR LES TEST
    // document.addEventListener('click', e => {
    //     console.log(window.innerWidth);
    //     console.log(document.documentElement.clientWidth);
    //     console.log(document.body.clientWidth);
    // })

    cube.addEventListener('click', e => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        cube.style.animation = 'none';
        cube.style.pointerEvents = 'none'
        switch (randomNumber) {
            case 1: 
                cube.style.animation = 'bounce-1 2s linear';
                break;
            case 2:
                cube.style.animation = 'bounce-2 2s linear';
                break;
            case 3:
                cube.style.animation = 'bounce-3 2s linear';
                break;
            case 4:
                cube.style.animation = 'bounce-4 2s linear';
                break;
            case 5:
                cube.style.animation = 'bounce-5 2s linear';
                break;
            case 6:
                cube.style.animation = 'bounce-6 2s linear';
                break;
        }
        setTimeout(() => {
            if (game) {
                const current = document.getElementById(`score-round${idCurrentPlayer}`)
                const scoreToUpdate = document.getElementById(`player${idCurrentPlayer}-score`)
                const pseudo = document.getElementById(`pseudo${idCurrentPlayer}`)
                if (randomNumber === 1) {
                    current.innerText = "0";
                    tour += 1
                    refreshCurrentPlayer()
                    // Faire une animation
                } else if (randomNumber === 6) {
                    oldScore = Number(scoreToUpdate.innerText)
                    scoreToUpdate.innerText = oldScore + Number(randomNumber)
                    current.innerText = "0"
                    tour += 1
                    refreshCurrentPlayer()
                } else {
                    current.innerText = randomNumber
                }
                if (Number(scoreToUpdate.innerText) >= targetScore || Number(current.innerText) + Number(scoreToUpdate.innerText) >= targetScore) {
                    const win = document.createElement('div')
                    win.innerText = `Féliciation ${pseudo.innerText}, vous avez gagné !`
                    win.id = 'winnerMessage'
                    win.style.fontFamily = 'Lato-Bold'
                    win.style.opacity = '0.3'
                    win.style.fontSize = '4rem'
                    win.style.position = 'absolute'
                    win.style.top = '20px'
                    win.style.width = '100%'
                    win.style.textAlign = 'center'
                    document.getElementById('container').appendChild(win)
                    stopGame()
                }
            }
            cube.style.animation = 'spin 15s linear infinite';
            cube.style.pointerEvents = 'auto'
          }, 2000);


    })

    holdButton1.addEventListener('click', e => {
        if (idCurrentPlayer === 1) {
            const scoreToUpdate = document.getElementById(`player1-score`)
            const current = document.getElementById(`score-round1`)
            oldScore = Number(scoreToUpdate.innerText)
            scoreToUpdate.innerText = oldScore + Number(current.innerText)
            current.innerText = "0"
            tour += 1
            refreshCurrentPlayer()
        } else {
            alert(`Player ${idCurrentPlayer} turn !`)
        }
    })

    holdButton2.addEventListener('click', e => {
        if (idCurrentPlayer === 2) {
            const scoreToUpdate = document.getElementById(`player2-score`)
            const current = document.getElementById(`score-round2`)
            oldScore = Number(scoreToUpdate.innerText)
            scoreToUpdate.innerText = oldScore + Number(current.innerText)
            current.innerText = "0"
            tour += 1
            refreshCurrentPlayer()
        } else {
            alert(`Player ${idCurrentPlayer} turn !`)
        }
    })

    newGameBtn.addEventListener('click', e => {
        modal.style.display = 'block';
        background.style.opacity = '0.5'
    })

    stopGameBtn.addEventListener('click', e => {
        stopGame()
    })

    cancel.addEventListener('click', e => {
        e.preventDefault();
        modal.style.display = 'none'
        background.style.opacity = '1'
    })

    form.addEventListener('submit', e => {
        e.preventDefault();
        initNewGame()
        const player1Name = document.getElementById('pseudo1')
        const player2Name = document.getElementById('pseudo2')
        player1Name.innerText = player1NameInput.value
        player2Name.innerText = player2NameInput.value
        console.log(player1NameInput.value, player2NameInput.value);
        player1NameInput.value = '';
        player2NameInput.value = '';
        modal.style.display = 'none'
        background.style.opacity = '1'
    })

    function initNewGame() {
        game = true
        tour = 0
        
        const current1 = document.getElementById('score-round1')
        const current2 = document.getElementById('score-round2')
        const score1 = document.getElementById('player1-score')
        const score2 = document.getElementById('player2-score')
        player1.style.display = 'flex'
        player2.style.display = 'flex'
        score1.innerText = score2.innerText = current1.innerText = current2.innerText = '0'
        if (document.getElementById('winnerMessage')) {
            document.getElementById('winnerMessage').remove()
        }
        refreshCurrentPlayer()
    }
    
    function stopGame() {
        idCurrentPlayer = null
        tour = 0
        game = false
        
        const score1 = document.getElementById('score-round1')
        const score2 = document.getElementById('score-round2')
        
        const pseudo1 = document.getElementById('pseudo1')
        const pseudo2 = document.getElementById('pseudo2')
    
        score1.innerText = '0';
        score2.innerText = '0';
    
        pseudo1.innerText = 'Player 1';
        pseudo2.innerText = 'Player 2';
    
        player1.style.display = player2.style.display = 'none'
        refreshCurrentPlayer()
        
    }
    
    function refreshCurrentPlayer() {
        idCurrentPlayer = tour % 2 === 0 ? 1 : 2
        const cubeContainer = document.getElementById('cube-container')
        if (game) {
            // CONTROL DU Z-INDEX POUR ECRAN < 1024
            if (window.innerWidth < 1024) {
                cubeContainer.style.left = '50%'
                if (idCurrentPlayer === 1) {
                    player1.style.zIndex = '2'
                    player2.style.zIndex = '1'
                } else if (idCurrentPlayer === 2) {
                    player1.style.zIndex = '1'
                    player2.style.zIndex = '2'
                }
            }
            if (window.innerWidth >= 1024) {
                if (idCurrentPlayer === 1) {
                    cubeContainer.style.left = '25%'
                } else if (idCurrentPlayer === 2) {
                    cubeContainer.style.left = '75%'
                }
            }
        } else {
            cubeContainer.style.left = '50%'
        }
        
    }

    window.addEventListener('resize', e => {
        refreshCurrentPlayer();
    })



})

