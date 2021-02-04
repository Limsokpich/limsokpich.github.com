( function(){
    'use strict';
    console.log("reading js");

    var myForm = document.querySelector('#myForm');
    var overlay = document.querySelector('#overlay');
    
    myForm.addEventListener('submit', function(event) { //when the user clicks on the submit button

        event.preventDefault();

        document.getElementById('overlay').className = 'showing'; //the overlay content appears

        var userName = document.querySelector('#userName').value;
        var transportation = document.querySelector('#transportation').value;
        var animal = document.querySelector('#animal').value;
        var friend1 = document.querySelector('#friend1').value;
        var friend2 = document.querySelector('#friend2').value;
        var character1 = document.querySelector('#character1').value;
        var character2 = document.querySelector('#character2').value;
        var character3 = document.querySelector('#character3').value;
        var house = document.querySelector('#house').value;

         //making sure users give inputs 
        if (userName && transportation && animal && friend1 && friend2 && character1 && character2 && character3 && house) { //the && makes so that if any of these field are empty, which also takes into account of '' empty strings, it returns false then an error message will appear            

            var myBeg = `Dear ${userName},`;

            var myMid = 
            `You have been invited to attend the Wizarding School of Hogwarts. As one of the many chosen ones, you will experience a new life 
            of many magical adventures. Please be ready to meet, ${character1}, who will be your mentor through out your experience as 
            a wizard in training. Your ${animal} will be your companion to the academy. ${friend1} and ${friend2} have receive this 
            invitation as well and will be in the same dorming group as you. I hope you will be excited to meet your house family, ${house}, 
            who will be waiting for you when you arrive. You will learn spells and train to defeat your greatest threat, ${character2}. A 
            ${transportation}, is ready to pick you up tommorrow morning. We look forward to meeting you, ${userName}.`;
            
            var myEnd = `Sincerely, ${character3}`;

            for (var i=0; i<myBeg.length; i++) {
                myBeg[1].style.color = "red";
            };
        } 
        else { 
            const myText = "Do you not wish to attend Hogwart?";
        }

        //updating the inputs into the article tag
        beg.innerHTML = myBeg; 
        mid.innerHTML = myMid;
        end.innerHTML = myEnd;
    });

    //when user clicks the X button, the overlay content is hidden, input does not reset so that users can go back to change their input
    document.querySelector('.corner').addEventListener('click', function (event) { 
        event.preventDefault();
        document.getElementById('overlay').className = 'hidden';

    });

    //when user clicks the submit button, overlay is hidden, input resets
    document.querySelector('.replay').addEventListener('click', function (event) { 
        event.preventDefault();
        document.querySelector('#userName').value = '';
        document.querySelector('#transportation').value = '';
        document.querySelector('#animal').value = '';
        document.querySelector('#friend1').value = '';
        document.querySelector('#friend2').value = '';
        document.querySelector('#character1').value = '';
        document.querySelector('#character2').value = '';
        document.querySelector('#character3').value = '';
        document.querySelector('#house').value = '';

        document.getElementById('overlay').className = 'hidden';

    });

    //when user press the escape key, the overlays content is hidden again
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelector('.showing').className = 'overlay hidden';
        }
    });
    
}());