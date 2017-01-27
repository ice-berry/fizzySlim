$('.add_basket').click(function () {
        $('.popup-order').show();
        $('.modal-dialog').animate({'right': '0'}, 300);

});
$('.about').click(function () {
    hidePopup();
});

function hidePopup() {
    $('.modal-dialog').animate({'right': '-470'}, 300);
    setTimeout(function () {
        $('.popup-order').hide();
    }, 300);
}

$('.popup-order').on('click', function (e) {
   if ($(e.target).closest('.modal-dialog').length == 0) {
       hidePopup();
   }
});
