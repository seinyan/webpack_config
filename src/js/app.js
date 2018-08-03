import te from '../scss/app.scss';
global.$ = jQuery;

import '../vendor/scrollIt.js/scrollIt.min.js';
import '../vendor/jquery-spincrement/jquery.spincrement.min.js';
import 'filterizr/dist/jquery.filterizr.min.js';
import 'magnific-popup/dist/jquery.magnific-popup.min.js';
import 'magnific-popup/dist/magnific-popup.css';

// import 'slick-carousel';
import 'slick-carousel/slick/slick.min.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';





/**
 * 1. Menu
 * 2. Stats
 * 3. Portfolio items
 * 4. Partners
*/

/** Menu **/
function fixedMenu(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    var element = document.getElementById("nav_block");

    if(currentScroll>100){
        element.classList.add("nav_block_fixed");
    }else {
        element.classList.remove("nav_block_fixed");
    }
}
fixedMenu();
window.onscroll = function() {
    fixedMenu();
};

const navBar = document.querySelector('.menu');
const navBtn = document.querySelector('.menu-btn');
navBtn.addEventListener('click', function() {
    this.classList.toggle('open');
    navBar.classList.toggle('menu--open');
});

$(function(){
    $.scrollIt({
        upKey: 38,
        downKey: 40,
        easing: 'linear',
        scrollTime: 600,
        activeClass: 'menu__link_active',
        onPageChange: null,
        topOffset: 0
    });
});
/** END Menu **/

/** Stats */
$(function() {
    var blockTop = $('#stats').offset().top;
    var CountUpFlag = 0;
    var $window = $(window);
    $window.on('load scroll', function() {
        var top = $window.scrollTop();
        var height = $window.height();
        if (top + height >= blockTop && CountUpFlag == 0) {
            stats_item_counter();
            CountUpFlag = 1;
        }
    });
    function stats_item_counter(){
        $('.stats_item__counter').spincrement({
            from: 0,
            duration: 1500,
            thousandSeparator: '',
        });
    }
});
/** END Stats */

/** Portfolio items */
var options = {
    animationDuration: 0.5,
    filter: 'all',
    callbacks: {
        onFilteringStart: function() {
            console.log('onFilteringStart');
        },
        onFilteringEnd: function() {
            console.log('onFilteringEnd');
        },
        onShufflingStart: function() {
            console.log('onShufflingStart');
        },
        onShufflingEnd: function() {
            console.log('onShufflingEnd');
        },
        onSortingStart: function() {
            console.log('onSortingStart');
        },
        onSortingEnd: function() {
            console.log('onSortingEnd');
        }
    },
    controlsSelector: '',
    delay: 300,
    delayMode: 'alternate',
    easing: 'ease-out',
    filterOutCss: {
        opacity: 0,
        transform: 'scale(0.75)'
    },
    filterInCss: {
        opacity: 0,
        transform: 'scale(1)'
    },
    multifilterLogicalOperator: 'and',
    selector: '.portfolio_items',
    setupControls: true,
    layout: 'packed'
};

$(document).ready(function () {

    var filterizd = $('.portfolio_items').filterizr(options);
    filterizd.filterizr('setOptions', options);

    $('.portfolio_filter li').click(function() {
        $('.portfolio_filter li').removeClass('portfolio_filter__item_active');
        $(this).addClass('portfolio_filter__item_active');
    });
});

$('.portfolio_item').magnificPopup({
    delegate: 'div a',
    type: 'image',
    gallery: {
        enabled: true
    }
});
/** END Portfolio items */

/** Partners **/
$(document).ready(function () {
    $('.partners_items').slick({
        slidesToShow: 1,
        slidesToScroll: 3,
        dots: false,
        infinite: true,
        cssEase: 'linear',
        speed: 300,
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 2000,
    });
});
/** END Partners **/

