(function() {
    'use strict';
    console.log('reading js');

    var playBtn = document.querySelector('.contain');
    var overlay = document.querySelector('#overlay');
    var overImg = document.querySelector('div img')
    
    //when user clicks play button
    playBtn.addEventListener('click', function (event) {

        event.preventDefault();

        document.getElementById('overlay').className = 'showing'; 
    });

    //when user clicks the x button, overlay disappear
    document.querySelector('.corner').addEventListener('click', function (event) { 
        
        event.preventDefault();

        document.getElementById('overlay').className = 'hidden';
    });

     //when user press the escape key, the overlays content is hidden again
     document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelector('.showing').className = 'overlay hidden';
        }
    });

}());
 
/* -just change the .src of the image source when you scroll on js
-use the kitten file but instead of linking it to change the color
use it to change to when your change image on scroll  */

window.addEventListener('load', function() {
    'use strict';

    const allImg = document.querySelectorAll('img');
    const sections = document.querySelectorAll('section'); //grab all the sections from html
    let postTops = []; //create an array to store the location number of each images on the page
    let pageTop; //keep track of how far we are from the top of the page
    let counter = 0; //index position of the array 
    let prevCounter = 0;
    //let doneResizing;

    //how we get the console to print the location of each image exactly where it is on relation to the page not the window
    console.log(sections[0].getBoundingClientRect().top) + window.pageYOffset; 

    //this will get the location number for each image and add it to postTops
    sections.forEach(function(post) { //post is a variable parameter
        postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset); //make sure that the number we get is rounded down
    });
    console.log(postTops); 

    //function for scrolling
    document.addEventListener('scroll', function() {
        pageTop = window.pageYOffset;
        console.log(pageTop);

        //viewpoint option during scrolling when it gets to a certain section print out how many section(images) it has been scrolled down/up
        if (pageTop > postTops[counter]) {
            counter++;
            console.log(`scrolling down ${counter}`);
        }
        else if (counter > 1 && pageTop < postTops[counter-1]) {
            counter--;
            console.log(`scrolling up ${counter}`);
        }
        /* //when the section changes...
		if (counter != prevCounter) {
			// changes the class name on the image, which activates animation...
			document.querySelector('figure img').className = 'sect' + counter;
			prevCounter = counter;
		} */
        
        //zoomIn/zoomOut when scroll you scroll halfway through each picture
        if (pageTop == postTops[1]/2) {
            document.getElementsByClassName('tree').className = 'zoomOut';
            document.getElementsByClassName('car').className = 'zoomIn';
        }
        if (pageTop == postTops[2] + 386) {
            document.getElementsByClassName('car').className = 'zoomOut';
            document.getElementsByClassName('lake').className = 'zoomIn';
        }
        if (pageTop == postTops[3] + 386) {
            document.getElementsByClassName('lake').className = 'zoomOut';
            document.getElementsByClassName('mperson').className = 'zoomIn';
        }
    });

}); 

   
