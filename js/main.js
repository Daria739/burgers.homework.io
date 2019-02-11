        //МОБИЛЬНОЕ МЕНЮ, МЕНЮ ГАМБУРГЕР, ГЛАВНОЕ МЕНЮ


        function openMenu(){
            const openBtn = document.querySelector('.burgers-menu-button');
            const closeBtn = document.querySelector('.burgers-menu-closed');
            const menu = document.querySelector('.hide-menu');
            


                openBtn.addEventListener('click', function () {
                    menu.classList.remove('hide-menu');
                    menu.classList.add('visible');
                    menu.style.opacity= 0;
                    let op = 0.1;
                    setTimeout (function foo(){
                        if (op < 1) {
                            op += 0.1;
                            menu.style.opacity= op;
                            setTimeout (foo, 50);
                        }
                    }, 50);
                });
                closeBtn.addEventListener('click', function () {
                    menu.style.opacity= 1;
                    let op = 1;
                    setTimeout (function doo(){
                        if (op > 0) {
                            op -= 0.1;
                            menu.style.opacity= op;
                            setTimeout (doo, 50);
                        }
                    },50)
                    setTimeout (function (){
                        menu.classList.add('hide-menu');
                    }, 1000);
                })
        }
        openMenu();


        //АККОРДЕОН МЕНЮ КОММАНДЫ

        const menuItems = document.querySelectorAll('.team-block__content-accordeon__list-item');


        for (const item of  menuItems) {
            item.addEventListener('click', e=> {
                const curItem = e.currentTarget;
                const isClosedItem = curItem.classList.contains("team-block__content-accordeon__list-item--active");
                if (isClosedItem) {
                    removeActiveClass(menuItems);
                }
                else {
                    removeActiveClass(menuItems);
                    openSlider(item);
                }
            
                
            })
        }


        function openSlider(item) {
            const photo = item.querySelector('.team-block__content-accordeon__list-item__photo');
            const photoBlock = photo.firstElementChild;
            const reqPhotoHeight = photoBlock.getBoundingClientRect().height;
            photo.style.height = reqPhotoHeight+'px';
            const content = item.querySelector('.team-block__content-accordeon__list-item__description');
            const textBlock = content.lastElementChild;
            const reqHeight = textBlock.getBoundingClientRect().height;
            content.style.height = reqHeight+'px';
            item.classList.add('team-block__content-accordeon__list-item--active');
        }
    
        function removeActiveClass(menuItems) {
            Array.from(menuItems).forEach(elem => {
                elem.classList.remove("team-block__content-accordeon__list-item--active");
                elem.querySelector('.team-block__content-accordeon__list-item__photo').style.height=0;
                elem.querySelector('.team-block__content-accordeon__list-item__description').style.height=0;
            });
        }


        // АККОРДЕОН МЕНЮ


        const menuOffers = document.querySelectorAll('.menu-accordeon__list-item');
        
        for ( const offer of menuOffers) {
            offer.addEventListener('click', e=>{
                const curOffer = e.currentTarget;
                const active = curOffer.classList.contains('menu-accordeon__list-item--active');
                if  (active) {
                    offerRemoveActiveClass(menuOffers);
                }
                else {
                    offerRemoveActiveClass(menuOffers);
                    openOfferMenu(offer);
                }
            })
        }

        function openOfferMenu(offer) {
            const contentBlock = offer.querySelector('.menu-accordeon__list-item__content');
            const textBlock = contentBlock.firstElementChild;
            const reqWidth = textBlock.getBoundingClientRect().width;
            contentBlock.style.width = reqWidth+'px';
            offer.classList.add('menu-accordeon__list-item--active');
        }

        function offerRemoveActiveClass(menuOffers) {
            Array.from(menuOffers).forEach(elem=>{
                elem.classList.remove("menu-accordeon__list-item--active");
                elem.querySelector('.menu-accordeon__list-item__content').style.width=0;
            })
        }



        //СЛАЙДЕР МЕНЮ БУРГЕРОВ


        const btnLeft = document.querySelector('.slider__scroll-btn-left');
        const btnRight = document.querySelector('.slider__scroll-btn-right');
        const itemSlide = document.querySelector('.slider__list');
        let curSwitch = 0;
        const minSwitch = 0;
       
        

        btnRight.addEventListener('click', e=> {
            const stepSwitch = itemSlide.firstElementChild.getBoundingClientRect().width;
            const maxSwitch = (itemSlide.children.length -1) * stepSwitch;
            if (curSwitch < maxSwitch) {
                curSwitch += stepSwitch;
                itemSlide.style.right = curSwitch+'px';
            }
            else {
                curSwitch = minSwitch;
                itemSlide.style.right= 0;
            }
            console.log(curSwitch);
            console.log(maxSwitch);
            console.log(stepSwitch);
            console.log();
        })
        btnLeft.addEventListener('click', e=>{
            const stepSwitch = itemSlide.firstElementChild.getBoundingClientRect().width;
            const maxSwitch = (itemSlide.children.length -1) * stepSwitch;
            if (curSwitch > minSwitch) {
                curSwitch -= stepSwitch;
                itemSlide.style.right = curSwitch+'px';
            }
            else {
                curSwitch = maxSwitch;
                itemSlide.style.right = maxSwitch+'px';
            }
            console.log(curSwitch);
            console.log(maxSwitch);
            console.log(stepSwitch);
        })








        //МОДАЛЬНЫЕ ОКНА


        const modalButtons = document.querySelectorAll('.feedback-container-button');//кнопки модальных окон
        const template = document.querySelector('#modal-template').innerHTML;//тэмплейт заготовка 
        const modal = templateCreator();//обЪект и методы возвращенные из функции
        //заведение обработчика события
        for (const curBtn of modalButtons){
            curBtn.addEventListener('click', e=>{
                const paragraph = e.target.previousElementSibling.innerHTML;//извлечение текста отзыва
                modal.setContent(paragraph);
                modal.open();
            })
        }
        //создание модального окна
        function templateCreator() {
            const container = document.createElement('div');//блок обертка
            container.className = 'popup';//класс обертки
            container.innerHTML = template;//вкладка тэмплейта в блок обертки
            const contentBlock = container.querySelector('.popup__content');//блок отзыва
            const closeBtn = container.querySelector('.popup__close');//кнопка закртия
                closeBtn.addEventListener('click', e=>{//обработчик закрытия
                    document.querySelector('.wrapper').removeChild(container);
                })
            const overlay = container.querySelector('.overlay');//закрытие по клику фона
                overlay.addEventListener('click', e=>{//обработчик закрытия по фону 
                    if (e.target === overlay) {//условие закрытия
                        closeBtn.click();//метод закрытия
                      }
                })
            //возвращение методов
            return {
                open() {
                    document.querySelector('.wrapper').appendChild = container;//метод обЪекта для открытия
                },
                setContent(content) {
                    contentBlock.innerHTML = content;//метод присвыивания текста отзыва
                }
            };
        }

