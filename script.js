startGame(8,8,15);

function startGame(height, width, bombs) {
    const gameTable = document.querySelector('.gameTable');
    const cellsCount = height * width;
    gameTable.innerHTML = '<button></button>'.repeat(cellsCount);
    const cells = [...gameTable.children];
    const bomb = [...Array(cellsCount).keys()].sort(() => Math.random() - 0.5).slice(0, bombs);

    gameTable.addEventListener('click',(event)=> {
       if(event.target.tagName !== 'BUTTON'){
           return;
       }
       const index = cells.indexOf(event.target);
       const column = index % width;
       const row = Math.floor(index/width);
       event.target.innerHTML = isBomb(row,column) ? 'X' : ' ';
       event.target.disabled = true;
    });
    function isBomb(row, colum){
        const index = row * width + colum;
        return bomb.includes(index);
    }
}

