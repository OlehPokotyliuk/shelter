window.onload = () => {
    let wrapper = document.querySelector('.center-gallery-wrapper');
    let gallery = document.querySelector('.center-gallery-block-main');
    let btnLeft = document.querySelector('.part-two-wrapper-center-arrow-left-btn');
    let btnRight = document.querySelector('.part-two-wrapper-center-arrow-right-btn');
    let boxItem = document.querySelector('.box-item');
    let leftrewind = document.querySelector('.leftrewind');
    let leftclick = document.querySelector('.leftclick');
    let rightrewind = document.querySelector('.rightrewind');
    let rightclick = document.querySelector('.rightclick');



    let currentPosition = 0;
    let cards = [];
    async function fetchPets() {
        let responce = await fetch('./pets.json');
        let data = await responce.json();
        return data;
    }

    let arr;
    let pageItem;

    function createPagination() {
        fetchPets().then(data => {
            pageItem = data;
            if (window.innerWidth >= 1200) {
                for (let i = 0; i < pageItem.length; i++) {
                    let boxWrapper = document.createElement('div');
                    boxWrapper.classList.add('box-wrapper-item');

                    let cardImg = document.createElement('img');
                    cardImg.classList.add('box-img-item');
                    cardImg.src = pageItem[i].img;

                    let cardTitle = document.createElement('h2');
                    cardTitle.classList.add('box-item-title');
                    cardTitle.innerHTML = pageItem[i].name;

                    let cardButton = document.createElement('button');
                    cardButton.classList.add('box-item-button');
                    cardButton.innerHTML = 'Learn More';

                    boxWrapper.append(cardImg);
                    boxWrapper.append(cardTitle)
                    boxWrapper.append(cardButton);
                    boxItem.append(boxWrapper);
                }
            }
            if (window.innerWidth <= 768 && window.innerWidth >= 320) {

                let cnt = 6;
                let prev = 0;
                for (let i = prev; i < cnt; i++) {
                    console.log(pageItem[i]);
                }

                rightclick.addEventListener('click', e => {
                    for (let i = prev; i < cnt; i++) {
                        if (cnt > pageItem.length) {
                            cnt = pageItem.length;
                        }
                        let boxWrapper = document.createElement('div');
                        boxWrapper.classList.add('box-wrapper-item');

                        let cardImg = document.createElement('img');
                        cardImg.classList.add('box-img-item');
                        cardImg.src = pageItem[i].img;

                        let cardTitle = document.createElement('h2');
                        cardTitle.classList.add('box-item-title');
                        cardTitle.innerHTML = pageItem[i].name;

                        let cardButton = document.createElement('button');
                        cardButton.classList.add('box-item-button');
                        cardButton.innerHTML = 'Learn More';

                        boxWrapper.append(cardImg);
                        boxWrapper.append(cardTitle)
                        boxWrapper.append(cardButton);
                        boxItem.append(boxWrapper);

                    }
                    return cnt += 6, prev += 6;

                })

            }
        });
    }
    createPagination();

    function createCards(startindex, count) {
        fetchPets().then(data => {
            arr = data;
            for (let i = startindex; i < startindex + count; i++) {
                let block = document.createElement('div');
                block.classList.add('center-gallery-block')

                let card = document.createElement('img');
                card.classList.add('center-gallery-image');

                let name = document.createElement('h2');
                name.classList.add('gallery-title');

                let btn = document.createElement('button');
                btn.classList.add('gallery-button')

                let link = document.createElement('a');
                link.classList.add('gallery-button-link')



                card.src = arr[i].img;
                name.innerHTML = arr[i].name;
                link.textContent = "Learn More";

                block.append(card);
                block.append(name);
                btn.append(link);
                block.append(btn);

                cards.push(block);
                gallery.append(block);
                btn.addEventListener('click', e => {

                    let modal = document.querySelector('.modal');
                    modal.classList.add('active');
                    modal.style.flexDirection = 'row';
                    modal.style.justifyContent = 'center';
                    modal.style.alignItems = 'center';

                    let close = document.createElement('a');
                    close.classList.add('modal-close-button')
                    close.textContent = 'x';

                    let modalWrapper = document.createElement('div');
                    modalWrapper.classList.add('modal-wrapper');

                    let modalLeft = document.createElement('div');
                    modalLeft.classList.add('modal-left');

                    let modalRight = document.createElement('div');
                    modalRight.classList.add('modal-right');

                    let modalImage = document.createElement('img');
                    modalImage.classList.add('modal-image');
                    modalImage.src = arr[i].img;

                    let modalTitle = document.createElement('h2');
                    modalTitle.classList.add('modaltitle');
                    modalTitle.innerHTML = name.textContent;

                    let modalTitleTwo = document.createElement('h3');
                    modalTitleTwo.classList.add('modal-title-two');
                    modalTitleTwo.innerHTML = `${arr[i].type} - ${arr[i].breed}`;

                    let modalParagraph = document.createElement('p');
                    modalParagraph.classList.add('modal-paragraph')
                    modalParagraph.innerHTML = arr[i].description;

                    let modalListUl = document.createElement('ul');
                    modalListUl.classList.add('modal-list');

                    let modalListAge = document.createElement('li');
                    modalListAge.classList.add('modal-list-li');

                    let modalListInoculations = document.createElement('li');
                    modalListInoculations.classList.add('modal-list-li');

                    let modalListDiseases = document.createElement('li');
                    modalListDiseases.classList.add('modal-list-li');

                    let modalListParasites = document.createElement('li');
                    modalListParasites.classList.add('modal-list-li');

                    modalListAge.innerHTML = `<b>Age:</b> ${arr[i].age}`;
                    modalListInoculations.innerHTML = `<b>inoculations:</b> ${arr[i].inoculations}`;
                    modalListDiseases.innerHTML = `<b>Diseases:</b> ${arr[i].diseases}`;
                    modalListParasites.innerHTML = `<b>Parasites:</b> ${arr[i].parasites}`;

                    modalListUl.append(modalListAge);
                    modalListUl.append(modalListInoculations);
                    modalListUl.append(modalListDiseases);
                    modalListUl.append(modalListParasites);


                    modalLeft.append(modalImage);
                    modalRight.append(close);
                    modalRight.append(modalTitle);

                    modalRight.append(modalTitleTwo);
                    modalRight.append(modalParagraph);
                    modalRight.append(modalListUl);

                    modalWrapper.append(modalLeft);
                    modalWrapper.append(modalRight);
                    modal.append(modalWrapper);


                    close.addEventListener('click', e => {
                        modal.classList.add('none');
                        modal.classList.remove('active');
                        modal.classList.remove('none');
                        modal.innerHTML = '';
                    })

                })
            }


        })
    }

    function moveRight() {
        currentPosition++;
        if (currentPosition >= arr.length) {
            currentPosition = 0;
        }

        let firstCard = cards.shift();
        firstCard.remove();

        let lastCard = document.createElement('div');
        lastCard.classList.add('center-gallery-block');

        let card = document.createElement('img');
        card.classList.add('center-gallery-image');

        let name = document.createElement('h2');
        name.classList.add('gallery-title');

        let btn = document.createElement('button');
        btn.classList.add('gallery-button');

        let link = document.createElement('a');
        link.classList.add('gallery-button-link')

        card.src = arr[currentPosition].img;
        name.innerHTML = arr[currentPosition].name;
        btn.textContent = "Learn More";

        lastCard.append(card);
        lastCard.append(name);
        btn.append(link);
        lastCard.append(btn);
        gallery.append(lastCard);
        cards.push(lastCard);

        btn.addEventListener('click', e => {

            let modal = document.querySelector('.modal');
            modal.classList.add('active');
            modal.style.flexDirection = 'row';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';

            let close = document.createElement('a');
            close.classList.add('modal-close-button')
            close.textContent = 'x';

            let modalWrapper = document.createElement('div');
            modalWrapper.classList.add('modal-wrapper');

            let modalLeft = document.createElement('div');
            modalLeft.classList.add('modal-left');

            let modalRight = document.createElement('div');
            modalRight.classList.add('modal-right');

            let modalImage = document.createElement('img');
            modalImage.classList.add('modal-image');
            modalImage.src = arr[currentPosition].img;

            let modalTitle = document.createElement('h2');
            modalTitle.classList.add('modaltitle');
            modalTitle.innerHTML = name.textContent;

            let modalTitleTwo = document.createElement('h3');
            modalTitleTwo.classList.add('modal-title-two');
            modalTitleTwo.innerHTML = `${arr[currentPosition].type} - ${arr[currentPosition].breed}`;

            let modalParagraph = document.createElement('p');
            modalParagraph.classList.add('modal-paragraph')
            modalParagraph.innerHTML = arr[currentPosition].description;

            let modalListUl = document.createElement('ul');
            modalListUl.classList.add('modal-list');

            let modalListAge = document.createElement('li');
            modalListAge.classList.add('modal-list-li');

            let modalListInoculations = document.createElement('li');
            modalListInoculations.classList.add('modal-list-li');

            let modalListDiseases = document.createElement('li');
            modalListDiseases.classList.add('modal-list-li');

            let modalListParasites = document.createElement('li');
            modalListParasites.classList.add('modal-list-li');

            modalListAge.innerHTML = `<b>Age:</b> ${arr[currentPosition].age}`;
            modalListInoculations.innerHTML = `<b>inoculations:</b> ${arr[currentPosition].inoculations}`;
            modalListDiseases.innerHTML = `<b>Diseases:</b> ${arr[currentPosition].diseases}`;
            modalListParasites.innerHTML = `<b>Parasites:</b> ${arr[currentPosition].parasites}`;

            modalListUl.append(modalListAge);
            modalListUl.append(modalListInoculations);
            modalListUl.append(modalListDiseases);
            modalListUl.append(modalListParasites);


            modalLeft.append(modalImage);
            modalRight.append(close);
            modalRight.append(modalTitle);

            modalRight.append(modalTitleTwo);
            modalRight.append(modalParagraph);
            modalRight.append(modalListUl);

            modalWrapper.append(modalLeft);
            modalWrapper.append(modalRight);
            modal.append(modalWrapper);


            close.addEventListener('click', e => {
                modal.classList.add('none');
                modal.classList.remove('active');
                modal.classList.remove('none');
                modal.innerHTML = '';
            })

        })

    }

    function moveLeft() {
        currentPosition--;
        if (currentPosition < 0) {
            currentPosition = arr.length - 1;
        }
        let lastCard = cards.pop();
        lastCard.remove();

        let firstCard = document.createElement('div');
        firstCard.classList.add('center-gallery-block');
        let card = document.createElement('img');
        card.classList.add('center-gallery-image');

        let name = document.createElement('h2');
        name.classList.add('gallery-title');

        let btn = document.createElement('button');
        btn.classList.add('gallery-button')

        let link = document.createElement('a');
        link.classList.add('gallery-button-link')

        card.src = arr[currentPosition].img;
        name.innerHTML = arr[currentPosition].name;
        btn.textContent = "Learn More";

        firstCard.append(card);
        firstCard.append(name);
        btn.append(link);
        firstCard.append(btn);

        gallery.prepend(firstCard);
        cards.unshift(firstCard);

        btn.addEventListener('click', e => {

            let modal = document.querySelector('.modal');
            modal.classList.add('active');
            modal.style.flexDirection = 'row';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';

            let close = document.createElement('a');
            close.classList.add('modal-close-button')
            close.textContent = 'x';

            let modalWrapper = document.createElement('div');
            modalWrapper.classList.add('modal-wrapper');

            let modalLeft = document.createElement('div');
            modalLeft.classList.add('modal-left');

            let modalRight = document.createElement('div');
            modalRight.classList.add('modal-right');

            let modalImage = document.createElement('img');
            modalImage.classList.add('modal-image');
            modalImage.src = arr[currentPosition].img;

            let modalTitle = document.createElement('h2');
            modalTitle.classList.add('modaltitle');
            modalTitle.innerHTML = name.textContent;

            let modalTitleTwo = document.createElement('h3');
            modalTitleTwo.classList.add('modal-title-two');
            modalTitleTwo.innerHTML = `${arr[currentPosition].type} - ${arr[currentPosition].breed}`;

            let modalParagraph = document.createElement('p');
            modalParagraph.classList.add('modal-paragraph')
            modalParagraph.innerHTML = arr[currentPosition].description;

            let modalListUl = document.createElement('ul');
            modalListUl.classList.add('modal-list');

            let modalListAge = document.createElement('li');
            modalListAge.classList.add('modal-list-li');

            let modalListInoculations = document.createElement('li');
            modalListInoculations.classList.add('modal-list-li');

            let modalListDiseases = document.createElement('li');
            modalListDiseases.classList.add('modal-list-li');

            let modalListParasites = document.createElement('li');
            modalListParasites.classList.add('modal-list-li');

            modalListAge.innerHTML = `<b>Age:</b> ${arr[currentPosition].age}`;
            modalListInoculations.innerHTML = `<b>inoculations:</b> ${arr[currentPosition].inoculations}`;
            modalListDiseases.innerHTML = `<b>Diseases:</b> ${arr[currentPosition].diseases}`;
            modalListParasites.innerHTML = `<b>Parasites:</b> ${arr[currentPosition].parasites}`;

            modalListUl.append(modalListAge);
            modalListUl.append(modalListInoculations);
            modalListUl.append(modalListDiseases);
            modalListUl.append(modalListParasites);


            modalLeft.append(modalImage);
            modalRight.append(close);
            modalRight.append(modalTitle);

            modalRight.append(modalTitleTwo);
            modalRight.append(modalParagraph);
            modalRight.append(modalListUl);

            modalWrapper.append(modalLeft);
            modalWrapper.append(modalRight);
            modal.append(modalWrapper);


            close.addEventListener('click', e => {
                modal.classList.add('none');
                modal.classList.remove('active');
                modal.classList.remove('none');
                modal.innerHTML = '';
            })

        })

    }
    btnRight.addEventListener('click', e => {
        e.preventDefault();
        moveRight(e);
    });
    btnLeft.addEventListener('click', e => {
        e.preventDefault();
        moveLeft(e);
    });

    createCards(currentPosition, 3);


}