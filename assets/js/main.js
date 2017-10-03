$(function() {

	$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
  });
	
});


var swiper = new Swiper('#park', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
});

var swiper = new Swiper('#review', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView: 2,
    spaceBetween: 30,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    breakpoints: {
      1024: {
        slidesPerView: 1,
        spaceBetween: 30
      }}
});

  //Мобильная менюшка
var slideout = new Slideout({
  'panel': document.getElementById('panel'),
  'menu': document.getElementById('menu'),
  'padding': 256,
  'tolerance': 70,
});
document.querySelector('.menu-open').addEventListener('click', function() {
  slideout.toggle();
});

slideout.on('open', function() { 
  $('#btn').addClass('on');
});

slideout.on('close', function() { 
  $('#btn').removeClass('on');
});
