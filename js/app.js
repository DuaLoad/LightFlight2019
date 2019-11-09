const randomNum = (min, max) => Math.floor(Math.random()*(max-min+1)+min);
const r = (value) => value[Math.floor(Math.random() * value.length)];

$(document).on('click','.servers_list .server', function() {
    let i = $(this),
        c = 'checked';

    i.toggleClass(c).find('.server_info').slideToggle('200');

    $('.servers_list .server').each(function(){
        let e =$(this);
        (e.index() !== i.index()) ? e.removeClass(c).find('.server_info').slideUp('200') : null;
    });
});
$(document).on('click','.quarter .servers .btn_common', function(e) {
    e.preventDefault();
    let i = $(this),
        c = i.parent().index(),
        branches = i.find('.branches');
    //branches.stop().clearQueue(0);
    $('.quarter .servers li').each(function(){
       if($(this).index() !== c) {
           $(this).find('.branches').hide(0);
       }
    });
    branches.fadeToggle(0);
});

$(document).on('click ','.mobile_menu_toggle', function(){
    $('.mobile_menu').toggleClass('check');
});
$(document).on('click ','.rules h3', function(e){
    e.preventDefault();
    let i = $(this),
        c = 'checked',
        b = i.parent().hasClass(c);

    $('.rules .chapter').each(function(){
        $(this).removeClass(c)
    });
    (!b) ? i.parent().addClass(c) : null;
});
$(document).on('click','.donate .switcher .case', function(e) {
    e.preventDefault();
    let switcher = $('.donate .switcher'),
        i = $(this),
        c = 'checked',
        b = i.hasClass(c),
        id = i.attr('href').slice(1),
        groupment = $('.groupment');
    switcher.find('.case').each(function(){
        $(this).removeClass(c)
    });
    groupment.find('> li').each(function(){
        $(this).hide(0);
    });
    (!b) ? i.addClass(c) : null;
    groupment.find(`#${id}`).fadeIn(200);
    $('html').animate({ scrollTop: groupment.offset().top }, 500);
    $('#accountUpgrade').removeClass('d-none');
});
$(document).on('click','.minigames .primary a', function(e) {
    e.preventDefault();
    $('html').animate({ scrollTop: $(`${$(this).attr('href')}`).offset().top }, 500);
});

$(document).on('mouseenter','.donate .kitTrigger', function() {
    let i = $(this),
        c = 'checked',
        id = i.attr('id');
    $('.donate .kitTrigger').each(function(){
        $(this).removeClass(c);
    });
    i.addClass(c);
    $('.donate .kitWrap').each(function(){
        i = $(this);
        (i.hasClass(id)) ? i.fadeIn(150) : i.hide();
    });
});
$(document).on('mouseleave','.donate .chapter', function() {
    $('.donate .kitTrigger').each(function(){
        $(this).removeClass('checked');
    });
    $('.donate .kitWrap').each(function(){
        $(this).hide();
    });
});

$(document).on('click ',
    '.forumBan a[class*="col"]:not(.checked), .forumBan a[class*="col"]:not(.checked) *',
    function(e){
    e.preventDefault();
    let i = $(this),
        modal = $('.forumBan'), index;

    modal.find('a[class*="col"]').each(function(){
        $(this).toggleClass('checked');
        $(this).find('.btn_common').toggleClass('primary');
        //(this !== i) ? $(this).parent('[class*="col"]').addClass('off') : null;
    });
    index = ($(this).hasClass('.checked')) ? i.index() : i.parents('a[class*="col"]').index();
    modal.find('.footer .btn_common').text(`${(index === 0) ? 'Только чтение для' : 'Заблокировать'} eDampro`)
    //parent.find('.btn_common').hide();
    //parent.append('<a href="#" class="btn_common cancel">Отменить</a>');
    //modal.find('.footer').fadeIn(200);
});
$(document).on('click ','.server .mods a', function(){
    let attr = $(this).attr('data-value');
    $(this).attr('href', `https://www.google.com/search?q=${(attr !== undefined) ? attr + ' ' : ''}${$(this).text()}+вики`);
});

$(document).ready(function() {
    if($('.donate *').is('.groupment')){
        let i = $(window.location.hash),
            id = i.parents('.groupment > li').attr('id');
        console.log(i);
        $(`.donate .switcher a[href="#${id}"]`).click();
        $('html').stop().animate({ scrollTop: i.offset().top }, 500);
    }
});

const greeting = (username) => {
    let words,
        dateMap = new Date(),
        dt = [
            dateMap.getDay(), // 0 — день недели
            dateMap.getHours(), // 1 — час
            dateMap.getDate(), // 2 — число
            dateMap.getMonth() + 1 // 3 — месяц
        ],
        morning = [
            `Доброе утро, ${username}!`,
            `С добрым утром, ${username}!`,
            `Доброго утречка, ${username}!`,
            `Хорошего дня, ${username}!`
        ],
        noon = [
            `Добрый день, ${username}!`,
            `Доброго Вам дня, ${username}!`,
            `Добро пожаловать, ${username}!`,
            `Приветствуем Вас, ${username}!`
        ],
        evening = [
            `Добрый вечер, ${username}!`,
            `Доброго Вам вечера, ${username}!`,
            `Добро пожаловать, ${username}!`,
            `Приветствуем Вас, ${username}!`
        ],
        night = [
            `Сидите допоздна, ${username}?`,
            `Доброй ночи, ${username}!`,
            `Спокойной ночи, ${username}!`,
            `Добрых снов, ${username}!`,
            `Сладких снов, ${username}!`
        ];

    const r = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const detectDay = (date, month) => date === dt[2] && dt[3] === month;
    const detectHour = (min, max) => min <= dt[1] && dt[1] < max;

    words =
        (detectDay(12, 6)) ? `С Днём России, ${username}!` :
            (detectDay(9, 5)) ? `С Днём Победы, ${username}!` :
                (detectDay(1, 1)) ? `С Новым Годом, ${username}!` :
                    (detectDay(31, 12)) ? `С наступающим, ${username}!` :
                        ((dt[0] === 5 && 17 <= dt[1] && dt[1] <= 23) || (dt[0] === 6 && 6 <= dt[1] && dt[1] < 11)) ?  `Хороших выходных, ${username}!` :
                            (detectHour(0, 6)) ? r(night) :
                                (detectHour(6, 11)) ? r(morning) :
                                    (detectHour(11, 17)) ? r(noon) :
                                        (detectHour(17, 23)) ? r(evening) : `Добро пожаловать, ${username}!`;

    $('.cabinet h2').text(words);
};
greeting('Nebelherz');
/*
#######################                #######################
### @ @ @ @ @ @ @ @ ### ЛИЧНЫЙ КАБИНЕТ ### @ @ @ @ @ @ @ @ ###
#######################                #######################
*/

$(document).on('click ','.cabinet_tabs a', function(e){
    e.preventDefault();
    let i = $(this),
        c = 'checked',
        a = i.attr('href'),
        content = $('.cabinet_content');

    if(i.parent().hasClass(c)) return false;
    content.animate(0, function(){
        let el = $(this);
        el.empty();
        el.load(`cabinet.${a}.html .cabinet_content>*`);
        el.fadeIn(250, 'linear');
    });
    //content.empty();
    //content.load(`cabinet.${a}.html .cabinet_content>*`);

    /*
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    */
    /*
    let path = window.location.pathname,
        regex = /\b[.]\w+[.]\b/g,
        newPath = path.replace(regex,`.${a}.`);
    window.location.pathname = newPath;
    */
    window.history.pushState({}, '', `cabinet.${a}.html`);

    $('.cabinet_tabs li').each(function(){
        $(this).removeClass(c)
    });
    i.parent().addClass(c)
});


/********************** ВЫБОР ДОНАТ ГРУППЫ */

$(document).on('click','.privilege_list .privilege', function(e) {
    e.preventDefault();
    let i = $(this),
        c = 'checked',
        b = i.hasClass(c);

    $('.privilege_list .privilege').each(function(){
        $(this).removeClass(c)
    });
    (!b) ? i.addClass(c) : null;
    ($('.privilege').hasClass(c)) ? $('.privilege_list').addClass('darken')
        : $('.privilege_list').removeClass('darken')
});

/********************** ПОПОЛНЕНИЕ БАЛАНСА: Выбор или ввод размера платежа */

const countTotalAmount = (a) => {
    /* !!! Предварительные контр-меры !!! */
    a = +a;
    $('.bonus').html('После пополнения Вы получите <span id="mainStreams">100</span> стримов<span id="bonusStreams"></span>.');
    /* !!! Предварительные контр-меры !!! */

    let total = $('#mainStreams'),
        bonus = $('#bonusStreams'),
        b = (a >= 5000) ? .3 :
                (a >= 3000) ? .25 :
                    (a >= 1000) ? .15 :
                        (a >= 500 ) ? .1 : 0; // bonus - бонусный процент

    $('#addBalanceAmount').val(a);
    total.text(Math.round(a + a * b));
    (b === 0) ? bonus.empty() : bonus.text(` (${Math.round(a * b)} бонусных)`)
};

$(document).on('mouseenter','.addBalance .poll a', function(e) {
    e.preventDefault();
    let i = $(this),
        c = 'hover'; // checked (ну или hover, наведение)

    $('.addBalance .poll a').each(function(){
        $(this).removeClass(c);
    });
    i.addClass(c);

    countTotalAmount(i.attr('data-amount'));
});

$(document).on('input','#addBalanceAmount', function() {
    let i = $(this),
        c = 'hover',
        amount = i.val();

    if(!(i.attr('type') === 'number')) {
        i.attr('type', 'number');
        i.val(100);
    }

    $('.addBalance .poll a').each(function(){
        $(this).removeClass(c);
    });

    if (+amount > 9999) {
        $('.bonus').text('А у Вас честно-честно есть ТАКИЕ деньжищи?:)');
        return false;
    }
    if (+amount < 0) amount = 0;

    countTotalAmount(amount);
});

$(document).on('click','.control_view a.btn_common', function(e) {
    e.preventDefault();
    let i = $(this),
        viewer = $('.viewer');

    if(i.attr('data-action') === 'view') null;
    else if(viewer.hasClass('disabled_3d')) return false;


    i.toggleClass('primary');

    switch(i.attr('data-action')){
        case 'view':
            i.text((i.text() === '3D') ? '2D' : '3D');
            $('.control_view .btn_common').each(function(){
                if(!($(this).attr('data-action') === 'view')) {
                    //console.log($(this).hasClass('.primary'), $(this).attr('data-action'));
                    if($(this).hasClass('primary')) $(this).click();
                    $(this).toggleClass('disabled');
                }
            });
            viewer.toggleClass('disabled_3d');
            viewer.find('.viewer_dim').toggle();
            break;

        case 'pause':
            i.find('i').toggleClass('fa-pause fa-play');
            skinViewer.animationPaused = !skinViewer.animationPaused;
            break;

        case 'rotate':
            //skinViewer.animationRotate = !skinViewer.animationRotate;
            rotate.paused = !rotate.paused;
            break;
    }
});

$('#selectServer').change(function(){
    let check = $(this).val(),
        id = (check == 0) ? 'minigames' :
        ((check == 20) || (check == 21) || (check == 22)) ? 'survivalmg' : 'mods';
    $('.general .fieldset').each(function(){
       let i = $(this),
           key = i.attr('data-key') === id;
        if(key) if(i.is(':visible')) return false;
        i.hide(0);
        if(key) i.fadeIn();
    });
});

/*
#######################                #######################
### @ @ @ @ @ @ @ @ ### МОДАЛЬНОЕ ОКНО ### @ @ @ @ @ @ @ @ ###
#######################                #######################
*/

const callModal = (path) => {
    if($('#modal').html() === undefined) {
        // TODO впилить сюда запрос на сервер
        $('body>.tooltip:last-child').remove();
        $('body').append('<div id="modal"></div>');
        $('#modal').load(`modal.html #${path}>*`);
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    }
    $('body').addClass('modalOpenly');
    $('#modal').css({visibility: 'visible'}).animate({
        opacity: 1
    }, 200);
};

$(document).on('click','a[rel="modal"]', function(e){
    e.preventDefault();
    callModal($(this).attr('href'));
});
$(document).on('click','#modal, #modal *', function(e){
    if($(this).parents('.window').hasClass('window') || $(this).hasClass('window')) return false;
    e.preventDefault();
    $('#modal').fadeOut(200, function(){
        $(this).remove();
        $('body').removeClass('modalOpenly');
    })
});

const reformatNumber = (n, t = ' ') => {
    let a = n.toString().split('').reverse();
    a.forEach(function(item, index, array){
        if((index + 1) % 3 === 0) array[index] = t+item;
    });
    return a.reverse().join('');
};

/*
#######################                #######################
### @ @ @ @ @ @ @ @ ### ФОРУМНАЯ ЧАСТЬ ### @ @ @ @ @ @ @ @ ###
#######################                #######################
*/
const chatAutoScroll = () => {
    let chat = $('.chat_content');
    chat.scrollTop(chat.prop('scrollHeight'));
    //console.log(`${chat.scrollTop} || ${chat.scrollHeight}`)
};
$(document).on('mousedown','.chat_resize', function() {
    $(document).mousemove(function(e){
        let chat = $('.chat'),
            y = e.pageY,
            top = chat.offset().top,
            li = 0;
        $('.chat_content li').each(function(){
            li+= $(this).outerHeight(true);
        });
        chat.css({
            'height': y - top,
            'max-height': li + 58
        });
        chatAutoScroll();
    });
});
$(document).mouseup(function() {
    $(document).off('mousemove');
});

$(document).on('click','.chat_enter .btn_emoji', function(e) {
    e.preventDefault();
    $('.chat .lower').toggleClass('emoji_visible');
});
/*
#######################                       #######################
### @ @ @ @ @ @ @ @ ### КОНФИГУРАЦИЯ 3D СКИНА ### @ @ @ @ @ @ @ @ ###
#######################                       #######################
*/


/*let skinViewer = new skinview3d.SkinViewer({
    domElement: document.getElementById("skin_container"),
    width: 300,
    height: 320,
    skinUrl: "nouse/skin.png",
    capeUrl: "img/cape.png"
});

/!* Смена текстуры скина и плаща
skinViewer.skinUrl = "nouse/skin.png";
skinViewer.capeUrl = "img/cape2.png";
*!/
/!* Изменение размера окна canvas
skinViewer.width = 300;
skinViewer.height = 400;
*!/

// Управление объектов мышью
let control = skinview3d.createOrbitControls(skinViewer);
control.enableRotate = true;
control.enableZoom = false;
control.enablePan = false;

skinViewer.animation = new skinview3d.CompositeAnimation();

// Добавление анимации ходьбы
let walk = skinViewer.animation.add(skinview3d.WalkingAnimation);
// Добавление анимации вращения
let rotate = skinViewer.animation.add(skinview3d.RotatingAnimation);
// Удаление анимации ходьбы
//walk.remove();
// Добавление анимации бега
let run = skinViewer.animation.add(skinview3d.RunningAnimation);

// Управление скоростью анимации
rotate.speed = 3;
// Включение паузы только для одной анимации
run.paused = true;
// Пауза для всех анимаций
skinViewer.animationPaused = false;*/

/*
#######################                          #######################
### @ @ @ @ @ @ @ @ ### ФУНКЦИИ ЛИЧНОГО КАБИНЕТА ### @ @ @ @ @ @ @ @ ###
#######################                          #######################
*/

$('.chat_color select.btn_common').change(function(){
    if($(this).attr('id') === 'chooseServer') return false;
    let value = $(this).val(),
        arrColors = new Map([
        ['1', '#0000AA'],
        ['3', '#00AAAA'],
        ['5', '#AA00AA'],
        ['6', '#FFAA00'],
        ['7', '#aaa'],
        ['8', '#555'],
        ['9', '#5555FF'],
        ['a', '#55FF55'],
        ['b', '#55FFFF'],
        ['c', '#FF5555'],
        ['d', '#FF55FF'],
        ['e', '#ffff55'],
        ['f', '#fff']
    ]),
        style = ((value === 'e') || (value === 'b') || (value === 'a')) ? ['rgba(0, 0, 0, 0.6)', 'url("img/selectDropDark.svg")'] :
            (value === 'f') ? ['', ''] : ['#fff', 'url("img/selectDropLight.svg")'] ;
    //console.log(arrColors.get(value));
    $(this).attr('style',
        `background-color:${arrColors.get(value)}!important;`+
        `background-image:${style[1]}!important;`+
        `color:${style[0]}!important`
    );
    /*$(this).css({
        'background-color': arrColors.get(check) + '!important'
    });*/
    /*$('.general .fieldset').each(function(){
        let i = $(this),
            key = i.attr('data-key') === id;
        if(key) if(i.is(':visible')) return false;
        i.hide(0);
        if(key) i.fadeIn();
    });*/
});

/*
##########################################################################
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
##########################################################################
#######
!!!!!!!    НИЖЕ ОГРЫЗОК КОДА ДЛЯ ТЕСТОВ ИЛИ РАБОТЫ НА ЛОКАЛКЕ
#######
!!!!!!!    НА РЕЛИЗЕ ВСЁ ЧТО НИЖЕ СТЕРЕТЬ К ЧЕРТЯМ, ОНО НЕНУЖНО
#######
##########################################################################
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
##########################################################################
*/

let user = [
  '_JeReMy_',
  'agalas',
  'Beshelmek',
  'BT_BaTON',
  'Chinza',
  'Dancindevil',
  'dantlY',
  'Essential',
  'folinsiya',
  'helarius',
  'Heyz',
  'IBath',
  'Int',
  'keffalump',
  'Kein_Dell',
  'kemi',
  'kristina2801',
  'KrUtOu__',
  'Liiza',
  'MixanicMira',
  'MrCryInWild',
  'Nebelherz',
  'NeoD',
  'NeverMindd',
  'Nevskiy3',
  'noremac09',
  'QueenOfPeace',
  'Rezzio7xD',
  'Richi_',
  'Rx450',
  'stalkerO1',
  'SummerIsNice',
  'SystemBox',
  'Thisa_YT',
  'Tierence',
  'Tsuchickage'
];
$(document).on('mouseover','a', function() {
    let u = $(this).text(),
        wrap = '<div class="miniprofile"></div>',
        coords, bool;
    user.forEach(function(value){
       if(value === u) bool = true;
    });
    bool = false;
    if(bool){
        coords = $(this).offset();
        $('body').append(wrap);

        let mp = $('.miniprofile'),
            height = $('.miniprofile').outerHeight(true),
            width = $('.miniprofile').outerWidth(true);

       //console.log(height)
        //console.log(width)
        mp.css({
            'display': 'block',
            'top': coords.top - height - 10,
            'left': coords.left - width / 2
        });
    }
});
$(document).on('mouseleave','a', function() {
    //$('.miniprofile').remove();
});
/*
let servers = [
    'MiniGames',
    'SandBox',
    'NanoTech',
    'Galactic',
    'TechnoMagic',
    'TechnoMagicSky',
    'Magic',
    'RPG',
    'Pixelmon',
    'JediCraft',
    'Prison'
];

let monitoringWrap = '.quarter .content.servers ul',
    monitoringItem = '.quarter .content.servers li',
    monitoringServer = $(monitoringWrap).html();
$(monitoringItem).remove();
for(let i = 0; i < servers.length; i++) {
    let count = randomNum(1, 6);
    $(monitoringWrap).append(monitoringServer);
    $(`${monitoringItem}:nth-child(${i+1})`).each(function(){
        let el = $(this),
            num = randomNum(100, 400);
        document.querySelector(`${monitoringItem}:last-child .h4`).childNodes[0].textContent = servers[i];
        el.find('small').html(`v1.7.10, ${count} сервер`);
        el.find('.online').html(`<b>${num}</b>из ${count}00`);
        el.find('.chart_online .bar').attr('style', `width:${num/4}%`);


        let subServ = $(this).find('.branches').html(),
            branches = $(this).find('.branches');
        branches.empty();

        for(let i2 = 0; i2 < count; i2++) {
            branches.append(subServ);
            let num = randomNum(0, 100),
                n = $('.server_info li').index(),
                item = branches.find('.row:last-child');
            item.find('.h5').text(servers[i] + ` #${item.index()+1}`);
            item.find('.lot').text(`${num}/100`);
            item.find('.process').attr('style', `width:${num}%`);
        }
    })
}
*/

