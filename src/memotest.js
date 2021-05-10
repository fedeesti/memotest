const cards = document.querySelectorAll('.cards');
const resultado = document.querySelector('.game-score');
const juegoCompleto = document.querySelector('.juegoCompleto');
const tablero = document.querySelector('.tablero');
const score = document.querySelector('#tiempo');

let cartaInvertida = false;
let bloquearTablero = false;
let primeraCarta, segundaCarta, primeraCartaElegida, segundaCartaElegida;
let tiempo = 0;
let cartasIguales = 0;


function voltearCarta () {
  if (bloquearTablero) return;
  if (this === primeraCarta) return;

  this.classList.add('voltear');

  if(!cartaInvertida) {
    cartaInvertida = true;
    primeraCarta = this;
    primeraCartaElegida = this.querySelector('#dorso').name;
  } else {
    cartaInvertida = false;
    segundaCarta = this;
    segundaCartaElegida = this.querySelector('#dorso').name;
    cartasCoinciden(primeraCartaElegida, segundaCartaElegida);
  }
}

function cartasCoinciden(primeraCartaElegida, segundaCartaElegida) {
  let coinciden = primeraCartaElegida === segundaCartaElegida;

  coinciden ? desactivarCartas() : noVoltearCartas();
}

function desactivarCartas() {
  primeraCarta.removeEventListener('click', voltearCarta);
  segundaCarta.removeEventListener('click', voltearCarta);

  cartasIguales++;

  setTimeout(() => {

    primeraCarta.style.opacity = '0';
    segundaCarta.style.opacity = '0';

    reiniciarTablero();
    finDelJuego();

  }, 500);
}

function noVoltearCartas() {
  bloquearTablero = true;

  setTimeout(() => {
    primeraCarta.classList.remove('voltear');
    segundaCarta.classList.remove('voltear');

    reiniciarTablero();
  }, 1000)
}

(function mezclarCartas () {
  const $dorso = document.querySelectorAll("#dorso");

  const cardArray = [
    {
      name: 'cell',
      img: 'img/cell.png'
    },
    {
      name: 'gohan',
      img: 'img/gohan.png'
    },
    {
      name: 'goku',
      img: 'img/goku.png'
    },
    {
      name: 'gotenks',
      img: 'img/gotenks.png'
    },
    {
      name: 'majinboo',
      img: 'img/majinboo.png'
    },
    {
      name: 'piccolo',
      img: 'img/piccolo.png'
    },
    {
      name: 'saibaman',
      img: 'img/saibaman.png'
    },
    {
      name: 'vegeta',
      img: 'img/vegeta.png'
    },
    {
      name: 'cell',
      img: 'img/cell.png'
    },
    {
      name: 'gohan',
      img: 'img/gohan.png'
    },
    {
      name: 'goku',
      img: 'img/goku.png'
    },
    {
      name: 'gotenks',
      img: 'img/gotenks.png'
    },
    {
      name: 'majinboo',
      img: 'img/majinboo.png'
    },
    {
      name: 'piccolo',
      img: 'img/piccolo.png'
    },
    {
      name: 'saibaman',
      img: 'img/saibaman.png'
    },
    {
      name: 'vegeta',
      img: 'img/vegeta.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random());

  for(let i=0; i < cardArray.length;i++){
    $dorso[i].src = cardArray[i].img;
    $dorso[i].name = cardArray[i].name;
  }

  temporizador();
})();

function reiniciarTablero() {
  cartaInvertida = false;
  bloquearTablero = false;
  primeraCarta = null;
  segundaCarta = null;
}

function temporizador() {
  cronometro = setTimeout(() => {
    resultado.textContent = (tiempo++) + ' segundos';
    temporizador();
  }, 1000);
}

function finDelJuego () {
  if (cartasIguales > 7) {
    clearTimeout(cronometro);
    tablero.style.display = 'none';
    score.style.display = 'none';
    juegoCompleto.querySelector('strong').textContent = resultado.textContent;
    juegoCompleto.style.display = 'block';
  }
}

cards.forEach(card => card.addEventListener('click', voltearCarta));