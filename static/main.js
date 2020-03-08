if (!(window.File && window.FileReader && window.FileList)) {
  window.alert('The File APIs are not fully supported in this browser.');
}

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const HOLDER = '<div class="result-box"><img class="result-icon"/></div>';
const TIME_DIFF = 100;

var candidates = [];
var anchor = 0;
var randomNumberCounter;

$('#files').addEventListener('change', ev => {
  let files = ev.target.files;
  for (let i = 0; i < files.length; ++i) {
    var reader = new FileReader();
    reader.onload = ev => {
      candidates.push(ev.target.result);
    }
    reader.readAsDataURL(files[i]);
  }
});

$('#load').addEventListener('click', ev => {
  if (candidates.length === 0) {
    window.alert('應選擇至少一個圖檔！');
  } else {
    $('#uploader').style.display = 'none';
    $('#player').style.display = 'block';
    deploy();
  }
});

function deploy() {
  for (let i = 0; i < candidates.length; ++i) {
    $('#result-holder').innerHTML += HOLDER;
  }
  
  randomNumberCounter = setInterval(randomizeNumber, TIME_DIFF);

  $('#play').addEventListener('click', ev => {
    let util = ev.target.getAttribute('data-utility');

    if (candidates.length === 0) {
      $('#play').setAttribute('data-utility', 'end');
    } else if (util === 'stop') {
      clearInterval(randomNumberCounter);
      $('#play').setAttribute('data-utility', 'continue');

      let img = $('#icon').getAttribute('src');
      store(img);
    } else {
      randomNumberCounter = setInterval(randomizeNumber, TIME_DIFF);
      $('#play').setAttribute('data-utility', 'stop');
    }
  });
}

function randomizeNumber() {
  let run = Math.floor(Math.random() * candidates.length);
  $('#icon').setAttribute('src', candidates[run]);
}

function store(img) {
  $$('.result-icon')[anchor].setAttribute('src', img);
  candidates = candidates.filter(value => value != img);
  anchor = anchor + 1;
}
