// function([string1, string2],target id,[color1,color2])
consoleText(['STAY CHIC', 'STAY CHIC', 'STAY CHIC'], 'text', ['#ffd92e']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id);
  if (target != null) {
    target.setAttribute('style', 'color:' + colors[0]);
  }
  window.setInterval(function () {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      if (target != null) {
        target.innerHTML = words[0].substring(0, letterCount);
      }
      window.setTimeout(function () {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        if (target != null) {
          target.setAttribute('style', 'color:' + colors[0]);
        }
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function () {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (waiting === false) {
      if (target != null) {
        target.innerHTML = words[0].substring(0, letterCount);
      }
      letterCount += x;
    }
  }, 120);
}

/**********************************************/

$('.gallery_slider').slick({
  centerMode: true,
  centerPadding: '80px',
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  infinite: true,
  dots: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: true,
        centerPadding: '80px',
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        centerMode: true,
        centerPadding: '80px',
        slidesToShow: 1,
      },
    },
  ],
});

/****************************************/

$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 300) {
    $('Header').addClass('fixHeader');
  } else {
    $('Header').removeClass('fixHeader');
  }
});

/******************************************************************/

// Set the date we're counting down to
var countDownDate = new Date('March 30, 2022 15:37:25').getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  // document.getElementById('timer').innerHTML =
  //   '<ul><li>' +
  //   days +
  //   '<span>DAYS</span></li><li>' +
  //   hours +
  //   '<span>HRS</span></li><li>' +
  //   minutes +
  //   '<span>MINS</span></li><li>' +
  //   seconds +
  //   '<span>SECS</span></li>';

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById('timer').innerHTML = 'EXPIRED';
  }
}, 1000);

/**********************************************************************/
