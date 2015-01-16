// MAIN NAVIGATION SETUP
function mainNav(){
the1Globals.$sections = $('section.page-wrapper');
$nav = $('#nav');
$navItems = $nav.children('ul').children('li');
$navHighlight = $nav.find('.nav-highlight');
$nav.find('li.menu-item').append('<div class="curr-ind"></div>');
/* highlight : on hover */
$navItems.on( 'mouseenter', function(){
var $this = $(this);
var posTop = $this.offset().top - $nav.offset().top;
var posLeft = $this.offset().left - $nav.offset().left;
$this.addClass('active');
navHighlight( $nav, posLeft, posTop );
}).on( 'mouseleave', function(){
var $this = $(this);
var posTop = $nav.find('.current-menu-item').offset().top - $nav.offset().top;
var posLeft = $nav.find('.current-menu-item').offset().left - $nav.offset().left;
$this.removeClass('active');
navHighlight( $nav, posLeft, posTop );
});
/* highlight : on scroll */
the1Globals.scrollTimeout = setTimeout(function(){},1);
if ( $('#nav').hasClass('animated') ){
$(window).scroll(function(){
var $this	= $(this);
var pos	 = $this.scrollTop();
var $divs = the1Globals.$sections;
var activeSection	= 0;
for ( i = 0; i < $divs.length; i++ ){
var $next = $divs.eq(i+1);
var $this = $divs.eq(i);
if( $next.length ){
var posTop = $next.offset().top - 200;
} else {
var posTop = 100000000;
}
if ( pos < 1 ){
activeSection = 'intro';
break;
} else if ( pos < posTop ){
activeSection = $this.attr('id');
break;
}
if( i === $divs.length-2 ){ activeSection = 'contact' }
//console.log( i+', '+$divs.length);
}
clearTimeout(the1Globals.scrollTimeout);
the1Globals.scrollTimeout = null;
the1Globals.scrollTimeout = setTimeout(function(){
//window.location.hash = '!'+$this.attr('id');
var $nav = $('#nav');
var $navActive = $nav.find('li.active')
if( $navActive.length ){
var $currentItem = $navActive;
} else {
var $currentItem = $nav.find('a.item-'+activeSection).parent();
}
var posTop = $currentItem.offset().top - $nav.offset().top;
var posLeft = $currentItem.offset().left - $nav.offset().left;
$nav.find('.current-menu-item').removeClass('current-menu-item');
$nav.find('a.item-'+activeSection).parent().addClass('current-menu-item');
navHighlight( $nav, posLeft, posTop );
}, the1Globals.scrollTimeoutDuration);
});
}
/* animate navigation highlight */
function navHighlight( $nav, posLeft, posTop ){
$navHighlight = $nav.find('.nav-highlight');
if ( Modernizr.csstransitions ) {
$navHighlight.css('left', posLeft+'px').css('top', posTop+'px');
} else {
$navHighlight.stop().animate({ left: posLeft, top: posTop }, 200 );
}
}
$('#nav').find('a').on( 'mousedown', function(){ $('.nav-highlight').css('background','#ccc');} )
.on( 'mouseup', function(){ $('.nav-highlight').css('background','#fff');} );
/* Animate scrolling on anchors */
//if ( !isAppleDevice() ){
$('body').find('a').on( 'click', function(){
var $this = $(this);
var href = $this.attr('href');
if ( href.charAt( 0 ) == '#' ) {
var $nav = $('#nav');
$nav.children('ul').children('li').removeClass('current-menu-item');
$nav.find( '.item-'+href.substr(1) ).parent().addClass('current-menu-item');
var posTop = $nav.find('.current-menu-item').offset().top - $nav.offset().top;
var posLeft = $nav.find('.current-menu-item').offset().left - $nav.offset().left;
navHighlight( $nav, posLeft, posTop );
the1Globals.scrollTimeoutDuration = 400;
if ( href === "#" ){
$('html, body').animate( { scrollTop: 0 }, 800, function(){ the1Globals.scrollTimeoutDuration = 10; } );
return false;
} else {
var divpos = $( "section" + href ).position().top;
$('html, body').stop().animate({ scrollTop: Math.floor(divpos) - $('#navheight').height() - $('#headerheight').height() }, 800, function(){ the1Globals.scrollTimeoutDuration = 10; } );
return false;
}
}
});
//}

}

Victoria Bian