'use strict';
console.log('funguju');

/* const naTahuCircle = 'circle';
const naTahuCross = 'cross'; */

const pridejTah = (event) => {
  const natahuElm = document.querySelector('#natahu');

  if (natahuElm.classList.contains('ikony--hra---circle')) {
    natahuElm.src = 'podklady/cross.svg';
    natahuElm.alt = 'křížek';
    natahuElm.classList.remove('ikony--hra---circle');
    event.target.classList.add('board__field--circle');
    event.target.disabled = true;
  } else {
    natahuElm.src = 'podklady/circle.svg';
    natahuElm.alt = 'kolečko';
    natahuElm.classList.add('ikony--hra---circle');
    event.target.classList.add('board__field--cross');
    event.target.disabled = true;
  }
  if (isWinningMove(event.target) === true) {
    if (confirm(`Vyhrál: ${getSymbol(event.target)}. Spustit novou hru?`)) {
      location.reload();
    }
  }
};

const buttonElms = document.querySelectorAll('button');
for (let i = 0; i < buttonElms.length; i += 1) {
  buttonElms[i].addEventListener('click', pridejTah);
}

//Přichystej funkci, getSymbol(field), která pro políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined.

const getSymbol = (button) => {
  if (button.classList.contains('board__field--circle')) {
    return 'kolečko';
  } else if (button.classList.contains('board__field--cross')) {
    return 'křížek';
  } else {
    return 'undefined';
  }
};

//Napiš funkci getField(row, column), která pro číslo řádku a sloupce vrátí příslušný prvek.

const boardSize = 10; // 10x10
const fields = document.querySelectorAll('button'); // Selektor pozměň tak, aby odpovídal tvému kódu.

const getField = (row, column) => fields[row * boardSize + column];

/* const test = () => {
  let zkusebniBtn = getField(1, 3);
  console.log(getSymbol(zkusebniBtn));
}; */

/* Napiš funkci getPosition(field), která naopak pro dané políčko vrátí objekt s číslem řádku a sloupce. Pro levé horní políčko vrať {row: 0, column: 0}, pro pravé dolní {row: 9, column: 9}, pro levé dolní {row: 9, column: 0}, … 

*/

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

/* S použitím nachystaných funkcí zjisti při každém tahu, jestli se nejedná o výherní. Nový kód navaž na event listener ze čtvrtého úkolu. */

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
