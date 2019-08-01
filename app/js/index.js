$(document).ready(function($) {

// header scroll
$(window).on('load scroll', function () {
    stickyHeader();
});

function stickyHeader() {
    if ($(this).scrollTop() > 0) {
        $('.header').addClass("header--sticky");
    } else {
        $('.header').removeClass("header--sticky");
    }
}



// registration form
// $('.js-firstStep').hide();
$('.js-secondStep').hide();
$('.js-thirdStep').hide();
$('.js-fourStep').hide();
$('.js-finalStep').hide();

$('.js-registerCircle').eq(0).addClass('active');

// hide first screen
$('.js-nextBtn1').on('click', function(){
    $('.js-firstStep').hide();
    $('.js-secondStep').show();

    $('.js-registerCircle').removeClass('active');
    $('.js-registerCircle').eq(1).addClass('active');
});

$('.js-nextBtn2').on('click', function(){
    $('.js-secondStep').hide();
    $('.js-thirdStep').show();
    
    $('.js-registerCircle').removeClass('active');
    $('.js-registerCircle').eq(2).addClass('active');
});

$('.js-nextBtn3').on('click', function(){
    $('.js-thirdStep').hide();
    $('.js-fourStep').show();

    $('.js-registerCircle').removeClass('active');
    $('.js-registerCircle').eq(3).addClass('active');
});

$('.js-nextBtn4').on('click', function(){
    $('.js-fourStep').hide();
    $('.js-finalStep').show();
    $('.register__progress').hide();
});

// custom input file
var inputs = document.querySelectorAll('.js-inputFile');
Array.prototype.forEach.call( inputs, function(input) {
    var label = input.nextElementSibling,
        labelVal = label.innerHTML;

        input.addEventListener('change', function(e){
            var fileName = "";
            if (this.files && this.files.length > 1) {
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            }
            else {
                fileName = e.target.value.split('\\').pop();
            }

            if (fileName) {
                label.querySelector('span').innerHTML = fileName;
            }
            else {
                label.innerHTML = labelVal;
            }
        })
} )




// show field when selected 'other'
$('.js-otherOption').hide();

function showOtherField(selectName, showInput) {

    $(`select[name="${selectName}"]`).on('change', function() {
        let selectIndex = $(this)[0].selectedIndex;
        let selectOption = $(this)[0].options[selectIndex];
        console.log(selectIndex, selectOption);
        if (selectOption.value == 'other') {
            $(`${showInput}`).show();
        }
        else {
            $(`${showInput}`).hide();
        }
    });

}

showOtherField('activity', '#otherOption1');
showOtherField('subject', '#otherOption2');


// show select when checkbox is checked
$('#subjectSelect').hide();
$('#checkboxInput4').on('change', function() {
    if( $(this)[0].checked ) {
        $('#subjectSelect').show();
    }
    else {
        $('#subjectSelect').hide();
        $('#otherOption2').hide();
    }
});


// toggle header menu
$('.js-toggleMenu').click(function () {

    if ($('#menu').is(':hidden')) {
        $('#menu').show('slideToggle').addClass('isVisible').css('display', 'flex');
        $(this).addClass('on');
    } else {
        $('#menu').hide('slideToggle');
        $(this).removeClass('on');
    }
});



// tabs partner
$(function () {

    $('.js-tabTitle li').not('.active').click(function () {
        var index = $(this).index();
        var content = $('.js-tabContent li').eq(index);
        $(this).addClass('active').siblings().removeClass('active');
        $('.js-tabContent li').css('display', 'none').eq(index).css('display', 'flex');
    })

    $('.js-tabTitle li:first').addClass('active');
    $('.js-tabContent li:first').css('display', 'flex');

});


// auditory switcher
$('.js-auditoryCircle').on('click', function () {
    let indexItem = $(this)[0].dataset.item;

    $('.js-auditoryCircle').removeClass('active');
    $(this).addClass('active');

    $(`[data-info]`).removeClass('active');
    $(`[data-info=${indexItem}]`).addClass('active');
});



// show tooltip
$('.js-checkboxLabel, .js-checkboxInput').on('mouseenter', function(){
    $(this).siblings('.tooltip').show();
});
$('.js-checkboxLabel, .js-checkboxInput').on('mouseleave', function(){
    $(this).siblings('.tooltip').hide();
});



// custom select for languages
$('.js-customSelect').each(function () {
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

    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function () {
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();

        $(this).addClass('filled');
    });

    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        window.location = $(this).attr('rel');
        $list.hide();
        //console.log($this.val());
    });

    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });
});



// custom select for contact form
$('.js-contactFormSelect').each(function(){
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
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

});
