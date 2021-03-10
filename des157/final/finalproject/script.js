(function() {
    'use strict'
    console.log('reading js');

    // variables for buttons
    const playBtn = document.getElementById('play');
    const throw1Btn = document.getElementById('throw1');
    const throw2Btn = document.getElementById('throw2');
    const pass1Btn = document.getElementById('pass1');
    const pass2Btn = document.getElementById('pass2');
    const quitBtn = document.getElementById('quit');

    // variables for others 
    const startUp = document.getElementById('start_up')
    const intro = document.getElementById('intro');
    var inputNames = document.querySelector('#input_names');
    const settings = document.getElementById('settings');
    const footer = document.getElementById('footer');

    // variables for sounds
    const playSound = new Audio('media/play.mp3');
    const thankSound = new Audio('media/thanksforplaying.mp3');
    const bgMusic = new Audio('media/PimPoy.wav');

    // when you hover over the play button, body bg color changes 
    const body = document.body;
    playBtn.onmouseover = function() {
        body.className = 'hovered';
    };
    playBtn.onmouseout = function() {
        body.className = '';
    };

    // when play button is clicked
    playBtn.addEventListener('click', function() {
        playSound.play();
        startUp.className = 'hidden';
        intro.className = 'showing';
    });

    // when next button is clicked
    inputNames.addEventListener('submit', function(event) {
        event.preventDefault();

        // bg music gets played  on loop
        bgMusic.loop = true;
        bgMusic.play();

        intro.className = 'hidden';
        settings.className = 'showing';
        gamePlay.className = 'showing';

        // variables for user names input
        var input1 = document.querySelector('#input1').value;
        var input2 = document.querySelector('#input2').value;

        // check if the user input their names then update the player html
        if (input1 && input2) {
            player1Name.innerHTML = input1;
            player2Name.innerHTML = input2;
        };

        quitBtn.addEventListener('click', function() {
            thankSound.play();
            location.reload();
        });

        console.log(gameData1.index);
        console.log(gameData2.index);

        setupGame();
    });

    // gameplay variables
    const gamePlay = document.getElementById('game_play');
    const player1Name = document.getElementById('player1');
    const player2Name = document.getElementById('player2');
    const player1Turn = document.getElementById('player1_turn');
    const player2Turn = document.getElementById('player2_turn');
    const message1 = document.getElementById('message1');
    const message2 = document.getElementById('message2');
    const throwImg1 = document.getElementById('throw_img1');
    const throwImg2 = document.getElementById('throw_img2');
    let score1 = document.getElementById('score1'); // my note: let enable you to updates the variable
    let score2 = document.getElementById('score2');

    const leftFade = document.getElementById('fade_box_left');
    const rightFade = document.getElementById('fade_box_right');

    var turn = 0; // turn for each player: 0 for player 1, 1 for player 
    var gameOver = false;

    // keeping track of game data for player 1
    var gameData1 = {
        dice: ['images/minus1.PNG', 'images/minus2.PNG', 'images/plus2.PNG', 'images/plus3.PNG', 'images/plus5.PNG'],
        score: 0,
        roll: 0, // throw 1 pokeball
        index: 0,
    };

    // keeping track of game data for player 2
    var gameData2 = {
        dice: ['images/minus1.PNG', 'images/minus2.PNG', 'images/plus2.PNG', 'images/plus3.PNG', 'images/plus5.PNG'],
        score: 0,
        roll: 0,
        index: 1,
    };

    // set up or reset the game for all the variables
    function setupGame() {
        quitBtn.className = '';
        message1.innerHTML = '';
        message2.innerHTML = '';
        gameData1.score = 0;
        gameData2.score = 0;
        gameData1.roll = 0;
        gameData2.roll = 0;
        score1.innerHTML = '0';
        score2.innerHTML = '0';
        turn = 0;
        gameOver = false;
        leftFade.className = 'hidden';
        rightFade.className = 'showing';
    };


    // setting up the turns:
    // when player 1 clicks throw
    throw1Btn.addEventListener('click', function(event) {
        // check if it is player 1's turn, else stop rolling
        event.preventDefault();

        if (turn == 0 && !gameOver) {
            throwDice1(gameData1); // throw and update gamedata for player 1
        } 
        else {
            return; //stop exceuting the function 
        }
    });

    // when player 2 clicks throw
    throw2Btn.addEventListener('click', function(event) {
        // check if it is player 2's turn, else stop rolling
        event.preventDefault();

        if (turn == 1 && !gameOver) {
            throwDice2(gameData2); // for player 2
        } 
        else {
            return;
        }
    });

    // when player 1 clicks pass
    pass1Btn.addEventListener('click', function() {
        if (turn == 0 && !gameOver) {
            turn = !turn; // set turn to 1
            player2Turn.innerHTML = 'It\'s your turn';
            player1Turn.innerHTML = '';
            leftFade.className = 'showing';
            rightFade.className = 'hidden';
        } 
        else {
            return;
        }
    });

    // when player 2 clicks pass
    pass2Btn.addEventListener('click', function() {
        if (turn == 1 && !gameOver) {
            turn = !turn; // set turn to 0
            player1Turn.innerHTML = 'It\'s your turn';
            player2Turn.innerHTML = '';
            rightFade.className = 'showing';
            leftFade.className = 'hidden';
        } 
        else {
            return;
        }
    });

    // Throwing the pokeball for player 1 
    function throwDice1() {
        player1Turn.innerHTML = '';
        gameData1.roll = Math.floor(Math.random() * 5); // roll hold the variable to random value of the images
        throwImg1.innerHTML = `<img src="${gameData1.dice[gameData1.roll]}">`; //randomize the images, given that we call the index that is set between 0-5 of the array 

        // set up points conditions for when certain pokball is thrown for player 1
        if (gameData1.roll == 0) {
            console.log("minus 1");
            message1.innerHTML = '<p>A wild Jigglypuff appears, it\'s singing\nmakes you fall asleep so you lost 1 point</p>';
            gameData1.roll = -1; //set the throw points to 1 
        } 
        else if (gameData1.roll == 1) {
            console.log("minus 2");
            message1.innerHTML = '<p>A wild pickachu appears, it electrocuted\nyou so you lost 2 points</p>';
            gameData1.roll = -2; //set the throw points to -2
        }
        else if (gameData1.roll == 2) {
            console.log("plus 2");
            message1.innerHTML = '<p>A wild snorlax appears and gave\nyou a hug so you gain 2 points</p>';
            gameData1.roll = 2; //set the throw points to 2
        } 
        else if (gameData1.roll == 3) {
            console.log("plus 3");
            message1.innerHTML = '<p>A wild charmander appears, the flames\ngive you warmth so you gain 3 points</p>';
            gameData1.roll = 3; //set the throw points to 3
        } 
        else {
            console.log("plus 5");
            message1.innerHTML = '<p>A wild mew appears granting you\nmany wishes so you gain 5 points</p>';
            gameData1.roll = 5; //set the throw points to 5
        }

        gameData1.score = gameData1.score + gameData1.roll; // add the roll points to the current score
        score1.innerHTML = gameData1.score; //show the current score
        console.log(gameData1);

        checkWinningCondition();
    };

    // throw pokeball for player 2
    function throwDice2() {
        player2Turn.innerHTML = '';
        gameData2.roll = Math.floor(Math.random() * 5);
        throwImg2.innerHTML = `<img src="${gameData1.dice[gameData2.roll]}">`;

        // for player 2
        if (gameData2.roll == 0) {
            console.log("minus 1");
            message2.innerHTML = '<p>A wild Jigglypuff appears, it singing makes you fall asleep so you lost 1 point</p>';
            gameData2.roll = -1; //set the roll points to 1 
        } 
        else if (gameData2.roll == 1) {
            console.log("minus 2");
            message2.innerHTML = '<p>A wild pickachu appears, it electrocuted you so you lost 2 points</p>';
            gameData2.roll = -2; //set the roll points to -2
        }
        else if (gameData2.roll == 2) {
            console.log("plus 2");
            message2.innerHTML = '<p>A wild snorlax appears and gave you a hug so you gain 2 points</p>';
            gameData2.roll = 2; //set the roll points to 2
        } 
        else if (gameData2.roll == 3) {
            console.log("plus 3");
            message2.innerHTML = '<p>A wild charmander appears, the flames give you warmth so you gain 3 points</p>';
            gameData2.roll = 3; //set the roll points to 3
        } 
        else {
            console.log("plus 5");
            message2.innerHTML = '<p>A wild mew appears granting you many wishes so you gain 5 points</p>';
            gameData2.roll = 5; //set the roll points to 5
        }

        gameData2.score = gameData2.score + gameData2.roll; // add the roll points to the current score
        score2.innerHTML = gameData2.score; //show the current score
        console.log(gameData2);

        checkWinningCondition();
    };


    // all the variables for winner page
    const winnerPage = document.getElementById('winner_page');
    const winnerName = document.getElementById('winner_name');
    const playAgainBtn = document.getElementById('play_again');

    //checking winning condition
    function checkWinningCondition() {

        // had to define the var here again because the first one was in a local scope
        var input1 = document.querySelector('#input1').value;
        var input2 = document.querySelector('#input2').value;

        if (gameData1.score >= 15) {

            settings.className = 'hidden';
            gamePlay.className = 'hidden';
            footer.className = 'showing';
            winnerPage.className = 'showing winner1_bgcolor';
            winnerName.innerHTML = `${input1} is the`;

            playAgainBtn.addEventListener('click', function(event) {

                event.preventDefault();

                location.reload();
            });

            thankSound.play();

            gameOver = true;

            bgMusic.pause();

            rightFade.className = 'hidden';
            leftFade.className = 'hidden';
        } 
        else if (gameData2.score >= 15) {
            settings.className = 'hidden';
            gamePlay.className = 'hidden';
            footer.className = 'showing';
            winnerPage.className = 'showing';
            winnerName.innerHTML = `${input2} is the`;

            playAgainBtn.addEventListener('click', function(event) {

                event.preventDefault();

                location.reload();
            });

            thankSound.play();

            gameOver = true;

            bgMusic.pause();

            rightFade.className = 'hidden';
            leftFade.className = 'hidden';
        } 
        else {
            return; // continue the game
        }
    };
})();