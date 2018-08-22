  var output = document.getElementById('output');
  var result = document.getElementById('result');
  var rounds = document.getElementById('rounds');
  var playerMoveButton = document.querySelectorAll('.player-move');
  var playerScore;
  var computerScore;
  var numberOfRunds = 0;

  //wyświetlanie tekstu
  var log = function(outputElement ,text){
      outputElement.innerHTML = text + "<br>";
  };
  var toWin = function(numberOfRunds){
   return !(numberOfRunds % 2) ? numberOfRunds/2 + 1 : Math.round(numberOfRunds / 2);
  };
  //nowa gra
  var newGame = function(){
    // numberOfRunds = 0; 
    playerScore = 0;
    computerScore = 0;
    numberOfRunds = window.prompt('how many rounds do you want to play?');
    result.innerHTML = '';
    output.innerHTML = '';
    if (isNaN(numberOfRunds)) {
      log(rounds,'Please enter the number! <br>');
    } else if (numberOfRunds <= 0 || numberOfRunds == 2) {
      log(rounds, 'The number must be greater than zero and different from two! <br>');
    } else {
      log(rounds, 'You have chosen ' + numberOfRunds + ' rounds to win, you need ' + toWin(numberOfRunds) + ' wins');
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
    if (playerScore < toWin(numberOfRunds) && computerScore < toWin(numberOfRunds) && numberOfRunds > 0 && playerScore + computerScore != numberOfRunds) { //jeżeli liczba rund mieści się w limicie
      if (moveValue(playerChoise) - moveValue(computerMove) == -1 || moveValue(playerChoise) - moveValue(computerMove) == 2) { //gra
        gameResult = '<strong><span style="color:#27ae60;">YOU WON!</span></strong>';
        playerScore ++;
      } else if (moveValue(playerChoise) - moveValue(computerMove) == 0) {
         gameResult = '<span style="color:#f1c40f;">DRAW:</span>';
      } else {
         gameResult = '<span style="color:#e74c3c;">YOU LOSE:</span>';
         computerScore ++;
      }
      if (playerScore == toWin(numberOfRunds) || computerScore == toWin(numberOfRunds)) {
          if (playerScore > computerScore) {
            log(output, gameResult + " you played: " + playerChoise + " computer played: " + computerMove + '<br> YOU WON THE ENTIRE GAME!!!');
            log(result, 'Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
          } else {
            log(output, gameResult + " you played: " + playerChoise + " computer played: " + computerMove + '<br> YOU LOSE THE ENTIRE GAME!!!');
            log(result, 'Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
          }
      } else if (playerScore + computerScore == numberOfRunds && computerScore < toWin(numberOfRunds) && playerScore < toWin(numberOfRunds)) {
        log(output, gameResult + " you played: " + playerChoise + " computer played: " + computerMove + '<br> DRAW IN THE ENTIRE GAME!!!'); //czy to jest ok?
        log(result, 'Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
      } else {
        log(output, gameResult + " you played: " + playerChoise + " computer played: " + computerMove);
        log(result, 'Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
      }
    } else {
          output.innerHTML += numberOfRunds ?
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
