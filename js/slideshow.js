var listImg = ['../img/lookbook_07.jpg', '../img/lookbook_08.jpg', '../img/lookbook_06.jpg', '../img/lookbook_16.jpg', '../img/lookbook_11.jpg',
              '../img/lookbook_12.jpg', '../img/lookbook_05.jpg'];

var $container = $('#container');

var createCard = function (position, index) {
    var $card = $('<div class="card ' + position + '" id="' + index + '"></div>');
    $card.css('background-image', 'url("' + listImg[index] + '")');
    return $card;
};

var initCards = function (index) {
    $container.empty();
    index = parseInt(index);
    var prev, next;
    if (index == 0) {
        prev = listImg.length - 1;
        next = 1;
    } else if (index == listImg.length - 1) {
        next = 0;
        prev = index - 1;
    } else {
        next = index + 1;
        prev = index - 1;
    }
    var $currentCard = createCard('current', index);
    var $nextCard = createCard('next', next);
    var $preCard = createCard('prev', prev);
    $container.append($currentCard).append($nextCard).append($preCard);
};

var checkHover = false;

$('#mouse').mouseover(function () {
    checkHover = true;
});

$('#mouse').mouseleave(function () {
    checkHover = false;
});

var loop = function () {
    if (checkHover)
        $('#mouse').animate({
            paddingTop: '15px'
        }, 500, function () {
            $('#mouse').animate({
                paddingTop: '0px'
            }, 100);
        });
}

setInterval(loop, 1000);

$(function () {
    initCards(2);

    $('#mouse').hover(function () {
        isRun = true;
        setInterval(mouseDown, 100);
    });

    $('#mouse').mouseleave(function () {
        isRun = false;
    })

    $('#container').on('click', '.card', function () {
        var selectedIndex = parseInt($(this).attr('id'));
        var prev = 0;
        var next = 0;
        if (!$(this).hasClass('current')) {
            if (selectedIndex == 0) {
                prev = listImg.length - 1;
                next = 1;
            } else if (selectedIndex == listImg.length - 1) {
                next = 0;
                prev = selectedIndex - 1;
            } else {
                next = selectedIndex + 1;
                prev = selectedIndex - 1;
            }
            console.log(selectedIndex, prev, next);
            if ($(this).hasClass('next')) {
                $('.prev').css({
                    'transform': 'translate(-70%, -50%) rotateY(40deg);'
                }).hide('fast', function () {
                    $(this).remove();
                });
                // the current card becomes the prev card

                $('.current').removeClass('current').addClass('prev');
                $(this).removeClass('next').addClass('current');
                // create the next card
                var $nextCard = createCard('next', next);
                $container.append($nextCard);
            } else if ($(this).hasClass('prev')) {
                $('.next').css({
                    transform: 'translate(-70%, -50%) rotateY(-40deg)'
                }).hide('fast', function () {
                    $(this).remove();
                })
                $('.current').removeClass('current').addClass('next');
                $(this).removeClass('prev').addClass('current');
                var $prevCard = createCard('prev', prev);
                $container.append($prevCard);
            }
        }
    });

    $('#mouse').click(function () {
        $('html body').animate({
            scrollTop: $('#mouse-to').offset().top
        }, 1000);
    });

    $(window).scroll(function () {
        var view = $(window).scrollTop();
        if (view >= $('#mouse-to').offset().top) {
            $('header').css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'z-index': 100,
                'opacity': '0.8'
            });
        } else {
            $('header').css({
                'position': 'relative',
                'opacity': '1'
            });
        }
    });
});
