startGame(10, 10, 15);

function startGame(height, width, bombs) {

    const table = document.querySelector('.gameTable');
    const cells = height * width;
    let flagCount = [];
    const bombsSet = Array.from({length: bombs}, () => Math.floor(Math.random() * cells));
    const bombsCount = [...new Set(bombsSet)];
    console.log(bombsCount);

    const gameTable = Array.from({length: cells}, (e, index) => {
        return {
            id: index,
            x: index % 10,
            y: Math.floor(index / 10),
            bomb: false,
            element: document.createElement('button')
        };
    });

    gameTable.forEach((e, index) => {
        table.insertAdjacentElement("beforeend", e.element);
        e.element.className = `${index}`;
        bombsCount.includes(Number(index)) ? e.bomb = true : e.bomb = false;
    });

    table.addEventListener('click', (event) => {
        const index = event.target.className;
        const elem = searchObj(index, gameTable);
        isOpen(elem, gameTable);
    });


    table.addEventListener('contextmenu', (event) => {
        if (event.target.disabled === false) {
            if (flagCount.length < bombsCount.length) {
                event.target.innerHTML = '🚩';
                event.target.disabled = true;
                event.preventDefault();
                flagCount.push(event.target.className);

                if (flagCount.sort().join() === bombsCount.sort().join()) {
                    alert('ВЫ ВЫИГРАЛИ!!!');
                }
            }

        } else if(event.target.innerHTML === '🚩'){
            event.target.innerHTML = '';
            event.target.disabled = false;
            flagCount = flagCount.filter(item => item !== event.target.className);
        }

    });

}

function searchObj(index, gameTable) {
    return gameTable.find(item => item.id === Number(index));
}

function isValid(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
}

function getCount(elemX, elemY, gameTable) {
    let count = 0;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            const newX = elemX + x;
            const newY = elemY + y;
            if (isValid(newX, newY)) {
                const cells = gameTable.find(item => item.x === newX && item.y === newY);
                if (cells.bomb === true) {
                    count++;
                }
            }

        }
    }
    return count;
}

function isOpenAll(gameTable) {
    gameTable.forEach((e) => {
        if (e.bomb === true) {
            e.element.innerHTML = '💣';
            e.element.disabled = true;
        }else {
            e.element.innerHTML = ''
            e.element.disabled = true;
        }
    })
}

function isOpen(elem, gameTable) {
    const elemX = elem.x;
    const elemY = elem.y;
    let cellsCount = gameTable.length;
    console.log(gameTable);

    if (elem.element.disabled === true) return;
    elem.element.disabled = true;

    if (elem.bomb === true) {
        isOpenAll(gameTable);
        alert("Вы проиграли!!!");
        return;
    }

    const count = getCount(elemX, elemY, gameTable);

    if (count !== 0) {
        elem.element.innerHTML = `${count}`;
        if (count === 1) {
            elem.element.style.color = 'turquoise';
        }
        if (count === 2) {
            elem.element.style.color = 'green';
        }
        if (count === 3) {
            elem.element.style.color = 'red';
        }
        if (count === 4) {
            elem.element.style.color = 'blue';
        }
        return;
    }

    cellsCount--;
    if (cellsCount <= 15) {
        isOpenAll(gameTable);
        alert("Вы выиграли!!!");
        return;
    }

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            const newX = elemX + x;
            const newY = elemY + y;
            if (isValid(newX, newY)) {
                const cells = gameTable.find(item => item.x === newX && item.y === newY)
                isOpen(cells, gameTable);
            }
        }
    }
}





