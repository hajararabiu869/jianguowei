$(document).ready(function() {
    // Default module
    $('#profile').addClass('active');
    
    // On hover over nav item, change content
    $('.nav-item').hover(function() {
        var target = $(this).data('target');
$('.module').removeClass('active');
 $('#' + target).addClass('active');
 });
 
// ...existing code...

// 手势滑动切换导航栏内容
let touchStartX = 0;
let touchEndX = 0;
const navItems = $('.nav-item');
let currentIndex = 0;

// 获取当前激活的模块索引
function getActiveIndex() {
    return navItems.index($('.nav-item.active'));
}

// 激活指定索引的导航项和内容
function activateNav(index) {
    if (index < 0) index = 0;
    if (index >= navItems.length) index = navItems.length - 1;
    navItems.removeClass('active');
    $('.module').removeClass('active');
    $(navItems[index]).addClass('active');
    $('#' + $(navItems[index]).data('target')).addClass('active');
    currentIndex = index;
}

// 初始化第一个为激活
activateNav(0);

// 点击导航栏也激活
navItems.on('click', function() {
    activateNav(navItems.index(this));
});

// 监听触摸事件
$('.main-content')[0].addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

$('.main-content')[0].addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    if (touchEndX < touchStartX - 30) {
        // 向左滑，切到下一个
        activateNav(currentIndex + 1);
    }
    if (touchEndX > touchStartX + 30) {
        // 向右滑，切到上一个
        activateNav(currentIndex - 1);
    }
}

});
