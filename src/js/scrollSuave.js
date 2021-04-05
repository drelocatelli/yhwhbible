$(document).ready(function(){
    $('a[href^="#bottom"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate({
            'scrollBottom': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
    
     $('a[href^="#top"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 2300, 'swing', function () {
            window.location.hash = target;
        });
    });
    
});
