( function () {
    'use strict'
    console.log('reading js');

    alert('Hello,\n\nWelcome to the user testing phase of my game. Here are some task I would like you to go through as you play my game. Please keep in mind the game is still under development so the scoring are not fixed. Feel free to ask any question that is not relating to the tasks.\n\nTask 1: Please, fill out your name.\nTask 2: Please, quit the game and start over.\nTask 3: Please, play on the right side of the game based on your turn during the first time you play the game.\n\nThank you for your time and please let know if you have any concerns.')

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
    const rollSound = new Audio('media/roll.mp3');
    const thankSound = new Audio('media/thanksforplaying.mp3');
   
    // when you hover over the play button, body bg color changes 
    const body = document.body;

    playBtn.onmouseover = function() {
        body.className = 'hovered';
    };

    playBtn.onmouseout = function() {
        body.className = '';
    }; 

    // when play button is clicked
    playBtn.addEventListener('click',  function() {
        // document.getElementById('circles').className = 'hidden';
        startUp.className = 'hidden';
        intro.className = 'showing';
    });

    // when next button is clicked
    inputNames.addEventListener('submit', function(event) {
        event.preventDefault();

        playSound.play();

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

        gameData1.index = Math.round(Math.random ()); // randomly set game index 
        gameData2.index = Math.round(Math.random ()); // randomly set game index 

        quitBtn.addEventListener('click', function () {
            // thanks sound play
            thankSound.play();
            location.reload();
        });

        /* document.getElementById('how').addEventListener('click', function () {
            intro.className = 'showing';
            startGameBtn.remove();
            document.getElementById('random_pick').remove();
        }); */

        console.log(gameData1.index);
        console.log(gameData2.index);
        //set up turn appears when you call it in this function 

        //put game function here
        setupGame();
    });

/*  
    // overlay functions 
    var howBtn = document.getElementById('how');
    var instruction = document.getElementById('instruction');

    howBtn.addEventListener('click', function(event) {
        event.preventDefault();
        instruction.className = 'overlay showing'; //the overlay content appears
    });

    //when user clicks the X button, the overlay content is hidden, input does not reset so that users can go back to change their input
    document.querySelector('.corner').addEventListener('click', function (event) { 
        event.preventDefault();
        instruction.className = 'overlay hidden';
    });

    //when user press the escape key, the overlays content is hidden again
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelector('.showing').className = 'instruction hidden';
        }
    });
*/

    // gameplay variables
    const gamePlay = document.getElementById('game_play');
    const player1Name = document.getElementById('player1');
    const player2Name = document.getElementById('player2');
    const player1Turn = document.getElementById('player1_turn');
    const player2Turn = document.getElementById('player2_turn');
    const message1 = document.getElementById('message1');   
    const message2 = document.getElementById('message2');
    const diceImg1 = document.getElementById('dice_img1');
    const diceImg2 = document.getElementById('dice_img2');
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');
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


    // setting up the turns:
    // when player 1 clicks throw
    throw1Btn.addEventListener('click', function(event) {
        // check if it is player 1's turn, else stop rolling
        event.preventDefault();

        if (turn == 0 && !gameOver) {
            throwDice1(gameData1); // throw and update gamedata for player 1
        } 
        else {
            return; //stop exectuing the function 
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
            turn = !turn;   // set turn to 1
            player2Turn.innerHTML = `${input1}'s turn`;
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
            turn = !turn;   // set turn to 0
            player1Turn.innerHTML = `${input2}'s turn`;
            player2Turn.innerHTML = '';
            rightFade.className = 'showing';
            leftFade.className = 'hidden';
        } 
        else {
            return;
        }
    });

    // set up or reset the game and all the variables
    function setupGame() {
        player1Turn.innerHTML = `Your turn`;
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
    };


    // Throwing the pokeball for player 1 
    function throwDice1 () {
        gameData1.roll = Math.floor(Math.random() * 5) + 1; // using ceiling could result in a zero 
        diceImg1.innerHTML = `<img src="${gameData1.dice[Math.floor(Math.random() * 5)]}">`; //randomize the images, 5 is the length of the array
        gameData1.score = gameData1.roll + gameData1.score; // add the roll points to the current score
        score1.innerHTML = gameData1.score; //show the current score
        console.log(gameData1); 


        // first make sure you get the value after the dice has been thrown
        // then store the value
        // then you can compare the value to the index 


        // set up points conditions for when certain pokball is thrown for player 1
        if (diceImg1 === gameData1.dice[0]) {
            console.log("minus 1");
            message1.innerHTML += '<p>A wild Jigglypuff appears, it sings and you fall asleep making you lose 1 points</p>';
            gameData1.roll = -1; //set the roll points to -1 

            // put show the current score here
            setTimeout(setUpTurn, 3000);
        }
        if (diceImg1 === gameData1.dice[1]) {
            console.log("minus 2");
            message1.innerHTML += '<p>A wild pickachu appears, it electrocuted you making you lose 1 point</p>';
            gameData1.roll = -2; //set the roll points to -2

            // put show the current score here
            setTimeout(setUpTurn, 3000);
        }
        if (diceImg1 === [gameData1.dice2]) {
            console.log("plus 2");
            message1.innerHTML += '<p>A wild snorlax appears and hugs you giving you 2 point</p>';
            gameData1.roll = 2; //set the roll points to 2

            // put show the current score here
            setTimeout(setUpTurn, 3000);
        }
        if (diceImg1 === gameData1.dice[3]) {
            console.log("plus 3");
            message1.innerHTML += '<p>A wild charmander appears, the flames are so warm it gave you 3 point</p>';
            gameData1.roll = 3; //set the roll points to 3

            // put show the current score here
            setTimeout(setUpTurn, 3000);
        }
        else if (diceImg1 === gameData1.dice[4]) {
            console.log("plus 5");
            message1.innerHTML += '<p>A wild mew appears granting you many wishes giving you 5 point</p>';
            gameData1.roll = 5; //set the roll points to 5

            // put show the current score here
            setTimeout(setUpTurn, 3000);
        }

        checkWinningCondition();
    };

    // throw pokeball for player 2
    function throwDice2() {
        gameData2.roll = Math.floor(Math.random() * 5) + 1;
        diceImg2.innerHTML = `<img src="${gameData1.dice[Math.floor(Math.random() * 5)]}">`; 
        gameData2.score = gameData2.roll + gameData2.score;
        score2.innerHTML = gameData2.score; 
        console.log(gameData2);

        // for player 2
        if (gameData2.dice === [0]) {
            console.log("minus 1");
            message2.innerHTML += '<p>A wild Jigglypuff appears, it sings and you fall asleep making you lose 1 points</p>';
            gameData2.roll = -1;

            // put show the current score here
            setTimeout(setUpTurn, 3000);
        }
        if (gameData2.dice === [1]) {
            console.log("minus 2");
            message2.innerHTML += '<p>A wild pickachu appears, it electrocuted you making you lose 1 point</p>';
            gameData2.roll = -2;

            // put show the current score here
            setTimeout(setUpTurn, 3000);
        }
        if (gameData2.dice === [2]) {
            console.log("plus 2");
            message2.innerHTML += '<p>A wild snorlax appears and hugs you giving you 2 point</p>';
            gameData2.roll = 2;

            // put show the current score here
            setTimeout(setUpTurn, 3000);
        }
        if (gameData2.dice === [3]) {
            console.log("plus 3");
            message2.innerHTML += '<p>A wild charmander appears, the flames are so warm it gave you 3 point</p>';
            gameData2.roll = 3;

            // put show the current score here
            setTimeout(setUpTurn, 3000);
        }
        else if (gameData2.dice === [4]) {
            console.log("plus 5");
            message2.innerHTML += '<p>A wild mew appears granting you many wishes giving you 5 point</p>';
            gameData2.roll = 5;

            // put show the current score here
            setTimeout(setUpTurn, 3000);
        }

        checkWinningCondition();
    };
    

    // all the variables for winner page
    const winnerPage = document.getElementById('winner_page');
    const winnerName = document.getElementById('winner_name');
    const playAgainBtn = document.getElementById('play_again');

    //checking winning condition
    function checkWinningCondition () {
        if (gameData1.score >= 15) {

            settings.className = 'hidden';
            gamePlay.className = 'hidden';
            footer.className = 'showing';
            winnerPage.className = 'showing';
            winnerName.innerHTML = `${input1}`;

            playAgainBtn.addEventListener('click', function(event) {
                
                event.preventDefault();

                location.reload();
                // put game function here
            });

            // thank sound play
            thankSound.play();

            gameOver = true;

            rightFade.className = 'hidden';
            leftFade.className = 'hidden';
        }
        else if (gameData2.score >= 15) {
            settings.className = 'hidden';
            gamePlay.className = 'hidden';
            footer.className = 'showing';
            winnerPage.className = 'showing';
            winnerName.innerHTML = `${input2}`;
            
            playAgainBtn.addEventListener('click', function(event) {
                
                event.preventDefault();

                location.reload();
                // put game function here
            });

            // thank sound play
            thankSound.play();

            gameOver = true;

            rightFade.className = 'hidden';
            leftFade.className = 'hidden';
        }
        else {
            // continue the game
            return;
        }
    };
})();