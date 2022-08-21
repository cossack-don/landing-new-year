'use strict';

const darkSectionSnowBg = document.querySelectorAll('.dark-section-snow-bg');

window.addEventListener('scroll', function() {
  let scrollFromTop = window.pageYOffset;
  darkSectionSnowBg.forEach(function(item) {
    item.style.backgroundPositionY = (scrollFromTop / 5) + 'px';
  })
});

console.log(1);