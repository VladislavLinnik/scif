// header scroll
$(window).on('load scroll', function(){
    stickyHeader();
});

function stickyHeader() {
    if ($(this).scrollTop() > 200){
        $('.header').addClass("header--sticky");
    }
    else{
        $('.header').removeClass("header--sticky");
    }
}



// toggle header menu
$( '.js-toggleMenu' ).click( function() {
        
    if ( $( '#menu' ).is( ':hidden' ) ) {
        $( '#menu' ).show('slideToggle').addClass('isVisible').css('display', 'flex');
        $(this).addClass('on');
    } else {
        $( '#menu' ).hide('slideToggle');
        $(this).removeClass('on');
    }
});



// tabs partner
$(function(){

    $('.js-tabTitle li').not('.active').click(function(){
        var index = $(this).index();
        var content = $('.js-tabContent li').eq(index);
        $(this).addClass('active').siblings().removeClass('active');
        $('.js-tabContent li').css('display', 'none').eq(index).css('display', 'flex');
    })
    
        $('.js-tabTitle li:first').addClass('active');
        $('.js-tabContent li:first').css('display', 'flex');
    
});


// auditory switcher
$('.js-auditoryCircle').on('click', function(){
    let indexItem = $(this)[0].dataset.item;

    $('.js-auditoryCircle').removeClass('active');
    $(this).addClass('active');
    
    $(`[data-info]`).removeClass('active');
    $(`[data-info=${indexItem}]`).addClass('active');
});


// custom select for languages
$('.js-customSelect').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();

        $(this).addClass('filled');
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        window.location = $(this).attr('rel');
        $list.hide();
        //console.log($this.val());
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });
});