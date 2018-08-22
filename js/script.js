  var output = document.getElementById('output');
  var result = document.getElementById('result');
  var rounds = document.getElementById('rounds');
  var playerMoveButton = document.querySelectorAll('.player-move');
  var params = {playerScore:'', computerScore:'', numberOfRunds: 0};

  // var playerScore;
  // var computerScore;
  // var numberOfRunds = 0;

  //wyświetlanie tekstu
  var log = function(outputElement ,text){
      outputElement.innerHTML = text + "<br>";
  };
  var toWin = function(numberOfRunds){
   return !(numberOfRunds % 2) ? numberOfRunds/2 + 1 : Math.round(numberOfRunds / 2);
  };
  //nowa gra
  var newGame = function(){
    // params.numberOfRunds = 0; 
    params.playerScore = 0;
    params.computerScore = 0;
    params.numberOfRunds = window.prompt('how many rounds do you want to play?');
    result.innerHTML = '';
    output.innerHTML = '';
    if (isNaN(params.numberOfRunds)) {
      log(rounds,'Please enter the number! <br>');
    } else if (params.numberOfRunds <= 0 || params.numberOfRunds == 2) {
      log(rounds, 'The number must be greater than zero and different from two! <br>');
    } else {
      log(rounds, 'You have chosen ' + params.numberOfRunds + ' rounds to win, you need ' + toWin(params.numberOfRunds) + ' wins');
    };
  };
  //przypisywanie stringa do wartości
  function getComputerMove() {
  return ['PAPER', 'ROCK', 'SCISSORS'][Math.floor(Math.random()*3)];
  }

  function moveValue(value) {
    if (value == 'PAPER') {
      return 0;
    } else if (value == 'ROCK') {
      return 1;
    } else {
      return 2;
    }
  }
  //główna funkcja
  var playerMove = function(playerChoise){ 
    var playerChoise = playerChoise.toUpperCase();
    var gameResult;
    var computerMove = getComputerMove();
    if (params.playerScore < toWin(params.numberOfRunds) && params.computerScore < toWin(params.numberOfRunds) && params.numberOfRunds > 0 && params.playerScore + params.computerScore != params.numberOfRunds) { //jeżeli liczba rund mieści się w limicie
      if (moveValue(playerChoise) - moveValue(computerMove) == -1 || moveValue(playerChoise) - moveValue(computerMove) == 2) { //gra
        gameResult = '<strong><span style="color:#27ae60;">YOU WON!</span></strong>';
        params.playerScore ++;
      } else if (moveValue(playerChoise) - moveValue(computerMove) == 0) {
         gameResult = '<span style="color:#f1c40f;">DRAW:</span>';
      } else {
         gameResult = '<span style="color:#e74c3c;">YOU LOSE:</span>';
         params.computerScore ++;
      }
      if (params.playerScore == toWin(params.numberOfRunds) || params.computerScore == toWin(params.numberOfRunds)) {
          if (params.playerScore > params.computerScore) {
            log(output, gameResult + " you played: " + playerChoise + " computer played: " + computerMove);
            log(result, 'Player ' + params.playerScore + ' - ' + 'Computer ' + params.computerScore);
            log(matchStat,'YOU WON THE ENTIRE GAME!!!');
            showModal();
          } else {
            log(output, gameResult + " you played: " + playerChoise + " computer played: " + computerMove);
            log(result, 'Player ' + params.playerScore + ' - ' + 'Computer ' + params.computerScore);
            log(matchStat,'YOU LOSE THE ENTIRE GAME!!!');
            showModal();
          }
      } else if (params.playerScore + params.computerScore == params.numberOfRunds && params.computerScore < toWin(params.numberOfRunds) && params.playerScore < toWin(params.numberOfRunds)) {
        log(output, gameResult + " you played: " + playerChoise + " computer played: " + computerMove);
        log(result, 'Player ' + params.playerScore + ' - ' + 'Computer ' + params.computerScore);
        log(matchStat,'DRAW IN THE ENTIRE GAME!!!');
        showModal();
      } else {
        log(output, gameResult + " you played: " + playerChoise + " computer played: " + computerMove);
        log(result, 'Player ' + params.playerScore + ' - ' + 'Computer ' + params.computerScore);
      }
    } else {
          output.innerHTML += params.numberOfRunds ?
            'Game over, please press the new game button!<br>' :
            ' Please press the new game button!<br>' 
    }
  };
    //Przypisywanie wartości do ruchu
  for (var i = 0; i < playerMoveButton.length; i++) {
    playerMoveButton[i].addEventListener("click", function(event){
      var dataMove = event.target.getAttribute('data-move');
      playerMove(dataMove);
    });
  };
//modals
var matchStat = document.getElementById('matchStat');
var showModal = function(){
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('#modal-one').classList.add('show');
  };
//wyłączanie modala
  var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
  };
  
  var closeButtons = document.querySelectorAll('.modal .close');
  
  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
  }
  
  //umożliwianie zamykania modala poprzez kliknięcie w overlay. 
  
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  
  //blokada propagacji kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 
  
  var modals = document.querySelectorAll('.modal');
  
  for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }