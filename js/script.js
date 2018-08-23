  var output = document.getElementById('output');
  var result = document.getElementById('result');
  var rounds = document.getElementById('rounds');
  var scoreboard = document.getElementById('scoreboard');
  var matchStat = document.getElementById('matchStat');
  var newGameButton = document.querySelector('.newgame');
  var startButton = document.querySelector('.starter');
  var playerMoveButton = document.querySelectorAll('.player-move');
  var statement = document.querySelector('#statement'); 
  var params = {playerName: '', playerScore: '', computerScore: '', playerScore: '', gameResult: '', computerScore: 0, numberOfRunds: 0, round: '', progress:[]};

  //wyświetlanie tekstu
  var log = function(outputElement ,text){
      outputElement.innerHTML = text + "<br>";
  };
  var toWin = function(numberOfRunds){
   return !(numberOfRunds % 2) ? numberOfRunds/2 + 1 : Math.round(numberOfRunds / 2);
  };
  //nowa gra
  var newGame = function(numberOfRundsValue, playerNameValue){
    params.playerName = playerNameValue.toUpperCase();
    params.progress = [];
    params.round = 0;
    params.playerScore = 0;
    params.computerScore = 0;
    params.numberOfRunds = numberOfRundsValue;
    result.innerHTML = '';
    output.innerHTML = '';
    scoreboard.innerHTML = '<tr><th>Round</th><th>Player move</th><th>Computer move</th><th>Result</th><th>Score</th></tr>';
    log(rounds, 'You have chosen ' + params.numberOfRunds + ' rounds to win, you need ' + toWin(params.numberOfRunds) + ' wins');
  };
  //przypisywanie stringa do wartości
  function getComputerMove() {
  return ['PAPER', 'ROCK', 'SCISSORS'][Math.floor(Math.random()*3)];
  }
  //przypisywanie wartiści do ruchu gracza
  function moveValue(value) {
    if (value == 'PAPER') {
      return 0;
    } else if (value == 'ROCK') {
      return 1;
    } else {
      return 2;
    }
  }
  var progress = function(gameResult, playerChoise, computerMove) {
    params.gameResult = gameResult;
    params.playerChoise = playerChoise;
    params.computerMove = computerMove;
    var gameStatus = {};
    gameStatus['round'] = params.round;
    gameStatus['player'] = params.playerChoise;
    gameStatus['computer'] = params.computerMove;
    gameStatus["result"] = params.gameResult;
    gameStatus['score'] = params.playerScore + ' - ' + params.computerScore;
    params.progress.push(gameStatus);
  }
  //zwracanie params.progress!!!!
  var table = function() {
    for (var i = 0; i < params.progress.length; i++) {
       scoreboard.innerHTML += '<tr><td>' + params.progress[i]['round'] + '</td><td>' + params.progress[i]['player'] + '</td><td>' + params.progress[i]['computer'] + '</td><td>' + params.progress[i]['result'] + '</td><td>' + params.progress[i]['score']+ '</td></tr>';
    }
    showModal();
  }
  //główna funkcja
    var playerMove = function(playerChoise){
    var playerChoise = playerChoise.toUpperCase();
    var gameResult;
    var computerMove = getComputerMove();
    if (params.playerScore < toWin(params.numberOfRunds) && params.computerScore < toWin(params.numberOfRunds) && params.numberOfRunds > 0 && params.playerScore + params.computerScore != params.numberOfRunds && params.numberOfRunds != 2) { //jeżeli liczba rund mieści się w limicie
      if (moveValue(playerChoise) - moveValue(computerMove) == -1 || moveValue(playerChoise) - moveValue(computerMove) == 2) { //gra
          gameResult = '<strong><span style="color:#27ae60;">YOU WON!</span></strong>';
          params.playerScore ++;
          params.round ++;
          progress(gameResult, playerChoise, computerMove);
      } else if (moveValue(playerChoise) - moveValue(computerMove) == 0) {
          gameResult = '<span style="color:#f1c40f;">DRAW</span>';
          params.round ++;
          progress(gameResult, playerChoise, computerMove);
      } else {
          gameResult = '<span style="color:#e74c3c;">YOU LOSE</span>';
          params.computerScore ++;
          params.round ++;
          progress(gameResult, playerChoise, computerMove);
      }
      if (params.playerScore == toWin(params.numberOfRunds) || params.computerScore == toWin(params.numberOfRunds)) {
          if (params.playerScore > params.computerScore) {
            log(output, gameResult + " " + params.playerName + " played: " + playerChoise + " computer played: " + computerMove);
            log(result, 'Player ' + params.playerScore + ' - '  + params.computerScore + ' Computer');
            log(matchStat,'<strong><span style="color:#27ae60;">YOU WON THE ENTIRE GAME!!!</span><br>');
            table();
          } else {
            log(output, gameResult + " " + params.playerName + " played: " + playerChoise + " computer played: " + computerMove);
            log(result, 'Player ' + params.playerScore + ' - '  + params.computerScore + ' Computer');
            log(matchStat,'<span style="color:#e74c3c;">YOU LOSE THE ENTIRE GAME!!!</span><br>');
            table();
          }
      } else if (params.playerScore + params.computerScore == params.numberOfRunds && params.computerScore < toWin(params.numberOfRunds) && params.playerScore < toWin(params.numberOfRunds)) {
        log(output, gameResult + " " + params.playerName + " played: " + playerChoise + " computer played: " + computerMove);
        log(result, 'Player ' + params.playerScore + ' - '  + params.computerScore + ' Computer');
        log(matchStat,'<span style="color:#f1c40f;">DRAW IN THE ENTIRE GAME!!!</span><br>'); 
        table();
      } else {
        log(output, gameResult + " " + params.playerName + " played: " + playerChoise + " computer played: " + computerMove);
        log(result, 'Player ' + params.playerScore + ' - '  + params.computerScore + ' Computer');
      }
    } else {
          output.innerHTML += !isNaN(params.numberOfRunds) && params.numberOfRunds > 0 && params.numberOfRunds != 2 ?
            'Game over, please press the new game button!<br>' :
            'Please press the new game button!<br>' 
    }
  };
    //Przypisywanie wartości do ruchu
  for (var i = 0; i < playerMoveButton.length; i++) {
    playerMoveButton[i].addEventListener("click", function(event){
      var dataMove = event.target.getAttribute('data-move');
      playerMove(dataMove);
    });
  };
  //przycisk new game
  newGameButton.addEventListener("click", function(event){
      statement.innerHTML = '';
      var gameStart = event.target.getAttribute('data-move');
      showModal(gameStart);
  });
//modals
var showModal = function(dataMove){ 
    document.querySelector('#modal-overlay').classList.add('show');
    dataMove ? 
      document.querySelector('#modal-two').classList.add('show') :
      document.querySelector('#modal-two').classList.remove('show');
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

  //zamykanie modala po kliknięiu w przycisk start
  startButton.addEventListener("click", function(event){
    var numberOfRundsValue = document.getElementById('number-of-rounds').value;
    var playerNameValue = document.getElementById('playerName').value;
    playerNameValue ? playerNameValue = playerNameValue : playerNameValue = 'anonymous ninja';
    if (isNaN(numberOfRundsValue)) {
      statement.insertAdjacentHTML("afterBegin",'<span style="color:#e74c3c;">Please enter the number</span><br>');
    } else if (numberOfRundsValue <= 0 || numberOfRundsValue == 2) {
      statement.insertAdjacentHTML("afterBegin",'<span style="color:#e74c3c;">The number must be greater than zero and different from two</span><br>');
    } else {
    hideModal(event);
    newGame(numberOfRundsValue, playerNameValue); 
  }
  });
  //blokada propagacji kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 
  
  var modals = document.querySelectorAll('.modal');
   
  for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }