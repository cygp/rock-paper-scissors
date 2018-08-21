
  var output = document.getElementById('output');
  var result = document.getElementById('result');
  var rounds = document.getElementById('rounds');
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
  function getMove(value) {
  return ['PAPER', 'ROCK', 'SCISSORS'][value]; //trochę zmodyfikowałem, żeby była unwersalna dla wyświetlania ruchu gracza i komputera
  }
  //główna funkcja
  var playerMove = function(playerChoise){
    var playerChoise;
    var gameResult;
    var computerMove = Math.floor(Math.random()*3);
    if (playerScore < toWin(numberOfRunds) && computerScore < toWin(numberOfRunds) && numberOfRunds > 0 && playerScore + computerScore != numberOfRunds) { //jeżeli liczba rund mieści się w limicie
      if (playerChoise - computerMove == -1 || playerChoise - computerMove == 2) { //gra
        gameResult = '<strong><span style="color:#27ae60;">YOU WON!</span></strong>';
        playerScore ++;
      } else if (playerChoise - computerMove == 0) {
         gameResult = '<span style="color:#f1c40f;">DRAW:</span>';
      } else {
         gameResult = '<span style="color:#e74c3c;">YOU LOSE:</span>';
         computerScore ++;
      }
      if (playerScore == toWin(numberOfRunds) || computerScore == toWin(numberOfRunds)) {
          if (playerScore > computerScore) {
            log(output, gameResult + " you played: " + getMove(playerChoise) + " computer played: " + getMove(computerMove) + '<br> YOU WON THE ENTIRE GAME!!!');
            log(result, 'Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
          } else {
            log(output, gameResult + " you played: " + getMove(playerChoise) + " computer played: " + getMove(computerMove) + '<br> YOU LOSE THE ENTIRE GAME!!!');
            log(result, 'Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
          }
      } else if (playerScore + computerScore == numberOfRunds && computerScore < toWin(numberOfRunds) && playerScore < toWin(numberOfRunds)) {
        log(output, gameResult + " you played: " + getMove(playerChoise) + " computer played: " + getMove(computerMove) + '<br> DRAW IN THE ENTIRE GAME!!!'); //czy to jest ok?
        log(result, 'Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
      } else {
        log(output, gameResult + " you played: " + getMove(playerChoise) + " computer played: " + getMove(computerMove));
        log(result, 'Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
      }
    } else {
          output.innerHTML += numberOfRunds ?
            'Game over, please press the new game button!<br>' :
            ' Please press the new game button!<br>'
    }
  };
