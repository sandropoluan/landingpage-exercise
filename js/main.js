$(function () {
    setOffsetHeight();
    setGridHeightEqual();

    $(window).resize(function () {
        setOffsetHeight();
        setGridHeightEqual();
    });

    $(".btn-accept-cookie").on("click", function () {
        const inMobile = $(window).width() < 720;
        $(".notification-panel").animate({top: "-200px"}, inMobile ? 500 : 900);
        $(".notification-panel-offset").slideUp();
    });

    $(".close-newsletter").on("click", function () {
        $(".newsletter-panel").slideToggle();
    });


    var lastScrollTop = 0;
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            var docHeight = $(document).height();
            var oneThird = docHeight / 3;
            //var scrollBottom = docHeight - $(window).height() - $(window).scrollTop();
            var isReachBottom = $(window).scrollTop() + $(window).height() > $(document).height() - 10;
            if (isReachBottom) {
                console.log('Reach Bottom');
            }
            if ((st > oneThird || isReachBottom) && isAllowShowNewsletterPanel()) {
                showNewsletterPanel();
            }
        }
        lastScrollTop = st;
    });

    $(window).load(function () {
        //if page is not scrollable, show newsletter
        if ($(document).height() < $(window).height() && isAllowShowNewsletterPanel()) {
            showNewsletterPanel();
        }
    });
});

function isAllowShowNewsletterPanel() {
    if (!localStorage.currentSecond) {
        return true;
    }

    var before = Number(localStorage.currentSecond);
    if (!(before > 0)) {
        return true;
    }

    var current = Math.round(new Date().getTime() / 1000);

    var second = current - before;

    var max = 60 * 10;

    if (second >= max) {
        return true;
    }

    var remain = max - second;
    console.log('Time remain for next NL Panel to show up ', Math.floor(remain / 60) + ':' + remain % 60);
    return false;
}

function showNewsletterPanel() {
    var current = Math.round(new Date().getTime() / 1000);
    localStorage.currentSecond = current + '';
    $(".newsletter-panel").slideDown();
}

function setOffsetHeight() {
    var notificationPanelHeight = $(".notification-panel").height();
    $(".notification-panel-offset").css({height: notificationPanelHeight});
}

var timer;

function setGridHeightEqual() {
    //I dont's use Flex Box due to browser compatibilities
    var maxHeight = 0;

    clearTimeout(timer);
    $(".grid-inner").css({height: 'auto'});
    timer = setTimeout(function () {
        $(".grid-option").each(function () {
            var height = $(this).height();
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        if (maxHeight > 0) {
            $(".grid-inner").css({height: maxHeight});
        }
    }, 100);
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}