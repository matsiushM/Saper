startGame(10, 10, 15);


function startGame(height, width, bombs) {

    const table = document.querySelector('.gameTable');
    const cells = height * width;
    const bombsCount = Array.from({length: bombs}, () => Math.floor(Math.random() * cells));

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
        event.target.innerHTML = isOpen(elem, gameTable);
        event.target.disabled = true;
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
                const cells = gameTable.find(item => item.x === newX && item.y === newY)
                if (cells.bomb === true) {
                    count++;
                }
            }

        }
    }
    return count;
}

function isOpen(elem, gameTable) {

    const elemX = elem.x;
    const elemY = elem.y

    if (elem.bomb === true) {
        return 'X';
    }

    const count = getCount(elemX, elemY, gameTable);
    console.log(gameTable);
    //if (count !== 0) {
        return `${count}`;
    //}
    // for (let x = -1; x <= 1; x++) {
    //     for (let y = -1; y <= 1; y++) {
    //         const newX = elemX + x;
    //         const newY = elemY + y;
    //         if (isValid(newX, newY)) {
    //             const newIndex = `${newY}` + newX;
    //             isOpen(Number(newIndex), gameTable);
    //         }
    //     }
    // }

}





