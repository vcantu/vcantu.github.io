$(document).ready(function () {
  skrollr.init({
    smoothScrolling: true,
  });
});

$("#slideshow > div:gt(0)").hide();

setInterval(function() { 
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
},  4000);


$("#ryzeupshow > div:gt(0)").hide();

setInterval(function() { 
  $('#ryzeupshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#ryzeupshow');
},  5000);