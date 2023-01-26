startGame(8, 8, 15);


function startGame(height, width, bombs) {

    const table = document.querySelector('.gameTable');
    const cells = height * width;

    const gameTable = Array.from({length: cells}, (e,index) => {
        index++;
        document.createElement('button');
        return {
            x: index % 10,
            y: Math.floor(index / 10),
            bomb: false,
            element: document.createElement('button')
        };
    });

    gameTable.forEach((e) => {
       table.insertAdjacentElement("afterbegin", e.element);
    });

    gameTable.forEach((e) => {

    });

}



