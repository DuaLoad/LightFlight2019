const randomNum = (min, max) => Math.floor(Math.random()*(max-min+1)+min);
const r = (value) => value[Math.floor(Math.random() * value.length)];

$(document).on('click','.menuToggle', (e) => {
    e.preventDefault();

    const
        i = 'navOpened',
        body = $('body'),
        check = body.hasClass(i),
        navOpen = () => $('#nav').fadeToggle(0),
        sideBarOpen = () => body.toggleClass(i);

    setTimeout(navOpen, (check) ? 150 : 0);
    setTimeout(sideBarOpen, (check) ? 0 : 1);
});

$(document).on('click','a[href*="#"]', (e) => {
    let link = $(this).attr('href');
    if(link.length > 1 && $('*').is(`${link}`)){
        e.preventDefault(e);
        let id = $(`${link}`);

        if($('body').hasClass('navOpened')) $('#nav .menuToggle').click();
        $('html').animate({ scrollTop: id.offset().top }, 500);
    }
});

