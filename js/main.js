function Item(name, price, size, amount, srcImg) {
    this.name = name;
    this.price = price;
    this.size = size;
    this.amount = amount;
    this.srcImg = srcImg;
};

var listItem = [];

var saveToLocalStorage = function () {
    var listItemString = JSON.stringify(listItem);
    localStorage.setItem('list-item', listItemString);
};

var clearLocalStorage = function () {
    localStorage.clear();
}

var loadFromLocalStorage = function () {
    if (localStorage.getItem('list-item')) {
        var listItemString = localStorage.getItem('list-item');
        listItem = JSON.parse(listItemString);
    }
};

var isExistInList = function (srcImg, size) {
    for (var i = 0; i < listItem.length; i++)
        if (listItem[i].srcImg == srcImg && listItem[i].size == size) {
            return i;
        }
    return -1;
};


$(function () {
    var arrImage = ['/img/shoe01.jpg', '/img/shoe02.jpg', '/img/shoe03.jpg'
                   , '/img/shoe04.jpg', '/img/shoe05.jpg'];


    $('.shoes-box').hover(function () {
        $(this).children('.sale').css('opacity', '0');
        $(this).children('.show-detail-button').css('opacity', '1');
        $(this).children('.shoes-box-title').css('opacity', '1');
        $(this).children('.shoes-box-price').css('opacity', '1');
    }, function () {
        $(this).children('.sale').css('opacity', '1');
        $(this).children('.shoes-box-title').css('opacity', '0');
        $(this).children('.shoes-box-price').css('opacity', '0');
        $(this).children('.show-detail-button').css('opacity', '0');
    });

    $('.show-detail-button').on('click', function () {
        var itemName = $(this).siblings('.shoes-box-title').text();
        var itemPrice = $(this).siblings('.shoes-box-price').children('.price').text();
        var index = parseInt($(this).attr('index'));
        var $overlay = $('<div class="overlay"></div>');
        $('body').append($overlay);
        var bodyHeight = $('body').outerHeight();
        $overlay.css('height', bodyHeight + 'px');
        var $currentSlide = $('<div class="current-slide-show"></div>');
        var $closeButton = $('<div class="close-button">X</div>');
        var $buyButton = $('<a class="buy-button">Buy</a>');
        var $labelSize = $('<a class="label-size">Size</a>');
        var $labelAmount = $('<a class="label-amount">Amount</a>');
        var $choiceSize = $('<input type="number" class="size" min="20" max="50" value="30" >');
        var $choiceAmount = $('<input type="number" class="amount" min="1" max="50" value="1">');
        $currentSlide.append($buyButton);
        $currentSlide.append($closeButton);
        $currentSlide.append($choiceSize);
        $currentSlide.append($choiceAmount);
        $currentSlide.append($labelAmount);
        $currentSlide.append($labelSize);
        $('body').append($currentSlide);
        $('body').css({
            height: '100%',
            overflow: 'hidden'
        });
        var sourceImg = $(this).parent().css('background-image');
        $imgCurrent = $('<img></img>');
        $imgCurrent.attr('src', arrImage[index]);
        $imgCurrent.css({
            width: '100%',
            height: '100%'
        })
        $currentSlide.append($imgCurrent);
        $('.close-button').click(function () {
            $('body').children('.overlay').remove();
            $('.current-slide-show').remove();
            $('body').css({
                height: '100%',
                overflow: ''
            });
        });

        $('.overlay').click(function () {
            $('body').children('.overlay').remove();
            $('.current-slide-show').remove();
            $('body').css({
                height: '100%',
                overflow: ''
            });
        });

        $('.buy-button').click(function () {
            var item = new Item(itemName, itemPrice, $(this).siblings('.size').val(), $(this).siblings('.amount').val(), $(this).siblings('img').attr('src'));
            if (isExistInList(item.srcImg, item.size) == -1) listItem.push(item);
            else {
                var option = confirm('Your item is existed in cart. Do you want to add new amount to cart?');
                if (option) {
                    listItem[isExistInList(item.srcImg, item.size)].amount = parseInt(listItem[isExistInList(item.srcImg, item.size)].amount) + parseInt(item.amount);
                }
            }
            saveToLocalStorage();
        });
    });
    $('.cart').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        loadFromLocalStorage();
        var $overlay = $('<div class="overlay"></div>');
        $('body').append($overlay);
        var bodyHeight = $('body').outerHeight();
        $overlay.css('height', bodyHeight + 'px');
        var $bill = $('<div class="bill"></div>');
        $('body').append($bill);
        $('body').css({
            height: '100%',
            overflow: 'hidden'
        });
        var sum = 0;
        var $item = $('<div class="item-view"><span class="item-view-detail">' + "Shoes Name" + '</span><span class="item-view-detail">' + "Size" + '</span><span class="item-view-detail">' + 'Amount' + '</span><span class="item-view-detail">' + 'Price Per Unit' + '</span><span class="item-view-detail">' + 'Total' + '</span></p>');
        $bill.append($item);
        for (var i = 0; i < listItem.length; i++) {
            var $item = $('<div class="item-view"><span class="item-view-detail item-name">' + listItem[i].name + '<img src="' + listItem[i].srcImg + '"/>' + '</span><span class="item-view-detail">' + '<input class="input-change size-change" type="number" min = "1" max = "1000" value="' + listItem[i].size + '" index = "' + i + '">' + '</span><span class="item-view-detail">' + '<input class="input-change change-size" type="number" min = "1" max = "1000" value="' + listItem[i].amount + '" index = "' + i + '">' + '</span><span class="item-view-detail this-price">' + listItem[i].price + '</span><span class="item-view-detail total-label">$' + parseFloat(listItem[i].price.slice(1)) * parseInt(listItem[i].amount) + '</span><div class="delete-item"' + 'index = "' + i + '"' + '>X</div>"</p>');
            $bill.append($item);
            sum += parseFloat(listItem[i].price.slice(1)) * parseInt(listItem[i].amount);
        }
        var $total = $('<div class="total" id="total-price">Total :  $' + sum + '<div>');
        var $cashOut = $('<a id="button-cash">CASH OUT<a>');
        $bill.append($total);
        $bill.append($cashOut);
        $('.overlay').click(function () {
            $('body').children('.overlay').remove();
            $('.bill').remove();
            $('body').css({
                height: '100%',
                overflow: ''
            });
        });

        $('.delete-item').click(function () {
            console.log('run');
            var $temp = $(this).parent();
            var arrItem = $($temp).siblings('.item-view');
            var indexDelete = $(this).attr('index');

            listItem.splice(indexDelete, 1);
            var nodeParent = $(this).parent();
            $(this).parent().fadeOut(1000, function () {
                nodeParent.remove();
            });
            for (var i = 0; i < arrItem.length; i++)
                if (i != 0) {
                    arrItem[i].getElementsByClassName('delete-item')[0].setAttribute('index', i - 1);
                }
            if (arrItem.length == 0) {
                listItem = [];
            }
            var sum = 0;
            for (var i = 0; i < listItem.length; i++)
                sum += parseFloat(listItem[i].price.slice(1)) * parseInt(listItem[i].amount);
            $('#total-price').html('Total : $' + sum);
            saveToLocalStorage();
        });



        $('.change-size').change(function () {
            $(this).parent().siblings('.total-label').html('$' + parseFloat($(this).parent().siblings('.this-price').text().slice(1)) * parseInt($(this).val()));
            console.log($(this).parent().siblings('.item-name').text());
            listItem[$(this).attr('index')].amount = parseFloat($(this).val());
            $(this).attr('value', $(this).val());
            var sum = 0;
            console.log(listItem);
            for (var i = 0; i < listItem.length; i++)
                sum += parseFloat(listItem[i].price.slice(1)) * parseInt(listItem[i].amount);
            $('#total-price').html('Total : $' + sum);
            saveToLocalStorage();
        });

        $('.size-change').change(function () {
            listItem[$(this).attr('index')].size = parseFloat($(this).val());
            $(this).attr('value', $(this).val());
            saveToLocalStorage();
        });

        $('#button-cash').click(function () {
            var $alertMsg = $('.alert-msg')[0];
            $alertMsg.style.transform = 'translate(-50%, -50%)';
            $('#close-alert').click(function () {
                $('body').children('.overlay').remove();
                $('body').children('.bill').remove();
                $(this).parent().css({
                    transform: 'translateY(-1000px)'
                });
                $('body').css({
                    height: '100%',
                    overflow: ''
                });
                clearLocalStorage();
                listItem = [];
            });

        });
    });



    $('.up-button').click(function () {
        $("html, body").animate({
            scrollTop: window.pageXOffset
        }, 1000);
    });

});
