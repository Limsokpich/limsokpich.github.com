(function() {
    'use strict';
    console.log('reading js');

    var playBtn = document.querySelector('button');
    var painting = document.querySelector('#painting');
    var intro = document.querySelector('#intro');

    var story1 = document.getElementById('story1');
    var story2 = document.getElementById('story2');
    var story3 = document.getElementById('story3');
    var story4 = document.getElementById('story4');
    var footer = document.getElementById('footer');

    //when you clicks play button
    playBtn.addEventListener('click', function(event) {

        event.preventDefault();
        intro.className = 'hidden';
        painting.className = 'showing';
        story1.className = 'zoomIn';
        footer.className = 'showing';
    });

    const sections = document.querySelectorAll('section'); 
    let postTops = []; //create an array to store the location number of each images on the page
    let pageTop; //keep track of how far we are from the top of the page
    let counter = 1; //index position of the array 

    //when the page is reloaded or when the user clicks the go back button the scroll function still works instead of it alreadying loading on the screen 
    resetPagePosition();

    var lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        
        // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
        var pageTop = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (pageTop > lastScrollTop){
            // downscroll code for zoomin/zoomout
            if (pageTop <= 79) { 
                story1.className = 'zoomIn';
            }
            else if (pageTop <= 824) { 
                story2.className = 'zoomIn';
            }
            else if (pageTop <= 1580) {
                story3.className = 'zoomIn';
            }
            else if (pageTop > 1580) {
                story4.className = 'zoomIn';
            }
        } 
        else {
            // upscroll code
            if (pageTop <= 79) { 
                story1.className = 'zoomIn';
            }
            else if (pageTop <= 824) { 
                story2.className = 'zoomOut';
             }
            else if (pageTop <= 1580) {
                story3.className = 'zoomOut';
            }
            else if (pageTop > 1580) {
                story4.className = 'zoomOut';
            }
        }
        lastScrollTop = pageTop <= 0 ? 0 : pageTop; // For Mobile or negative scrolling
    }, false);

    //when you clicks back button
    var backBtn = document.getElementById('back');

    backBtn.addEventListener('click', function(event) {

        event.preventDefault();
        intro.className = 'showing';
        painting.className = 'hidden';
        footer.className = 'hidden';
    });

    function resetPagePosition() {
        postTops = [];
        sections.forEach(function (post) {
            postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
        });

        const pagePosition = window.pageYOffset;
        counter = 0;

        postTops.forEach(function (post) { if (pagePosition > post) { counter++; } });

    }

}());