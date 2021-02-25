( function () {
    'use strict'

    var playBtn = document.getElementById('play');
    var startPage = document.getElementById('startup');
    var afterClick = document.getElementById('afterclick');
    var footer = document.getElementById('footer');
    var gameBlocks = document.getElementById('gameblocks');
    var nextBtn = document.getElementById('next');

    // sounds
    const playSound = new Audio('media/play.mp3');
    const rollSound = new Audio('media/roll.mp3');
    const thankSound = new Audio('media/thanksforplaying.mp3');

    // when play buttin is clicked
    playBtn.addEventListener('click', function() {

        playSound.play();

        startPage.className = 'hidden';
        afterClick.className = 'showing';
    });

    // when you hover over the play button, body bg color changes 
    var body = document.body;

    playBtn.onmouseover = function() {
        body.className = 'hovered';
    };

    playBtn.onmouseout = function() {
        body.className = '';
    };

    // when next button is clicked
    nextBtn.addEventListener('click', function() {
        startPage.className = 'hidden';
        afterClick.className = 'hidden';
        gameBlocks.className = 'showing';
        footer.className = 'showing';
    });


    var startGame = document.getElementById('startgame');
    var gameControl = document.getElementById('gamecontrol');
    var game = document.getElementById('game');
    var score = document.getElementById('score');
    var actionArea = document.getElementById('actions');

    // keeping track of game data 
    var gameData = {
        dice: ['images/1die.png', 'images/2die.png', 'images/3die.png', 'images/4die.png', 'images/5die.png', 'images/6die.png'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29 
    };

    // start the game
    startGame.addEventListener('click', function() {

        gameData.index = Math.round(Math.random ()); // randomly set game index 
        gameControl.innerHTML = '<h2 style="color:black;">The Game Has Started</h2>';
        gameControl.innerHTML += '<button id="how">How To Play?</button>'
        gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

        document.getElementById('quit').addEventListener('click', function () {
            // thanks sound play
            thankSound.play();
            location.reload();
        });

        document.getElementById('how').addEventListener('click', function () {
            afterClick.className = 'showing';
            nextBtn.remove();
        });

        console.log(gameData.index);
        setUpTurn();
    });

    // setting up the turns
    function setUpTurn() {
        game.innerHTML = `<h3>Roll the dice, ${gameData.players[gameData.index]}</h3>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        document.getElementById('roll').addEventListener('click', function () {
            throwDice();
            // roll sound play
            rollSound.play();
        });
    }

    // Throwing the dice 
    function throwDice () {
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1; // using ceiling could result in a zero 
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<h3>Roll the dice, <strong>${gameData.players[gameData.index]}</strong></h3>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"><img src="${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;  
        console.log(gameData);

        // what happens in the game depending on the dice rolls 
        // if two 1's are rolled...
        if (gameData.rollSum === 2) {
            console.log("Snake eyes!");
            game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            // show the current score
            showCurrentScore();
            setTimeout(setUpTurn, 3500);
        }
        // if either die is a 1...
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 3500);
        }
        //if either die is a 1...
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            document.getElementById('rollagain').addEventListener('click', function () {
                throwDice(); //gets you to throw the dice right away with the images showing so it doesn't disappear and you have to click it again to reappear 
            });

            document.getElementById('pass').addEventListener('click', function() {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondition();
        }
    }

    //checking winning condition
    function checkWinningCondition () {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
            
            // thank sound play
            thankSound.play();

            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
        }
        else {
            //show current score...
            showCurrentScore();
        }
    }

    function showCurrentScore() {
        score.innerHTML = `<h2 style="color:black;">Score</h2><h3><strong>${gameData.players[0]}: ${gameData.score[0]}</strong> | <strong>${gameData.players[1]}: ${gameData.score[1]}</strong></h3>`;
    }

})();