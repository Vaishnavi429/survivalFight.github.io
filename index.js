let minimumShoot = 0
let maximumShoot = 5
let MaximunHealth = 100
let player1Score = MaximunHealth
let player2Score = MaximunHealth
let playerChance = 'player1'
let numberOfRound = 1
let RoundScore = {
    player1RoundScore: 0,
    player2RoundScore: 0
}
let gunShot = new Audio('audio/gunShot1.mp3');
let startGame = new Audio('audio/startgame.mp3')
let player1HealthID = document.getElementsByClassName('player1Health')
let player2HealthID = document.getElementsByClassName('player2Health')

const randonNumberGenerate = () => {
    let decimalrandomNumber = Math.random() * (maximumShoot - minimumShoot + 1)
    let randomShoot = Math.floor(decimalrandomNumber);
    return randomShoot;
}

const calculatePlayler1Score = () => {
    player1Score = player1Score - randonNumberGenerate()
    if (player1Score < 0) {
        player1Score = 0
    }
    player1HealthID[0].innerText = `Health Player 1: ${player1Score}`
    playerChance = 'player1'
    CheckWinner()
}
const calculatePlay2er2Score = () => {
    player2Score = player2Score - randonNumberGenerate()
    if (player2Score < 0) {
        player2Score = 0
    }
    player2HealthID[0].innerText = `Health Player 2: ${player2Score}`
    playerChance = 'player2'
    CheckWinner()
}

const CheckWinner = () => {
    if (player1Score === 0 || player1Score < 0) {
        player2HealthID[0].innerText = "WINNER"
        let score = RoundScore.player2RoundScore + 1
        RoundScore = { ...RoundScore, player2RoundScore: score }
        countRound()

    }
    else if (player2Score === 0 || player2Score < 0) {
        player1HealthID[0].innerText = "WINNER"
        let score = RoundScore.player1RoundScore + 1
        RoundScore = { ...RoundScore, player1RoundScore: score }
        countRound()
    }
}
const countRound = () => {
    startGame.play()
    if (numberOfRound < 5) {
        numberOfRound++;
        document.getElementById('RoundWinner').style.display = "block";
        let winnerCardText = document.getElementsByClassName('card-text')
        winnerCardText[0].innerText = `Player 1- Won: ${RoundScore.player1RoundScore}`
        winnerCardText[1].innerText = `Player 2- Won: ${RoundScore.player2RoundScore}`
    }
    else {
        let gameOverCardText = document.getElementsByClassName("overCardText")
        if (RoundScore.player1RoundScore >= 3)
            gameOverCardText[0].innerText = `Player 1 Won the match`
        else {
            gameOverCardText[0].innerText = `Player 2 Won the match`
        }
        gameOverCardText[1].innerText = `Player 1- Won: ${RoundScore.player1RoundScore}`
        gameOverCardText[2].innerText = `Player 2- Won: ${RoundScore.player2RoundScore}`
        document.getElementById('RoundWinner').style.display = "none";
        document.getElementById('cardFinalScore').style.display = "block";
    }
}

const HandleReset = () => {
    player1Score = MaximunHealth
    player2Score = MaximunHealth
    player1HealthID[0].innerText = `Health Player 1: ${player1Score}`
    player2HealthID[0].innerText = `Health Player 2: ${player2Score}`
    document.getElementById('setRound').innerText = `Round-${numberOfRound}`
    setTimeout(() => {
        document.getElementById('RoundWinner').style.display = "none";
    }, 500)
}


const HandleShoot = (shootBtn) => {
    let shootBtnID = shootBtn.id
    if (shootBtnID === 'player1Score' && playerChance === 'player1') {
        gunShot.play();
        calculatePlay2er2Score()
        document.getElementById('player1Score').classList.remove('isActive')
        document.getElementById('player2Score').classList.add('isActive')
    }
    else if (shootBtnID === 'player2Score' && playerChance === 'player2') {
        gunShot.play();
        calculatePlayler1Score()
        document.getElementById('player2Score').classList.remove('isActive')
        document.getElementById('player1Score').classList.add('isActive')
    }
}

