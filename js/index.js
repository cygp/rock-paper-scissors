var output = document.getElementById('output');
var result = document.getElementById('result');
var rounds = document.getElementById('rounds');
var playerScore;
var computerScore;
var numberOfRunds = 0;
//wyświetlanie tekstu - skróć ją do jednej funkcji log = function (result, text)
var log = function(text){
    output.innerHTML = text + "<br>";
};
var logTable = function(text){
    result.innerHTML = text + "<br>";
};
var toWin = function(numberOfRunds){
  if(numberOfRunds%2 == 0){
     return numberOfRunds/2 + 1;
  } else {
    return Math.round(numberOfRunds / 2);
  }
};
//nowa gra
var newGame = function(){
  numberOfRunds = 0;
  playerScore = 0;
  computerScore = 0;
  numberOfRunds = window.prompt('how many rounds do you want to play?');
  if(isNaN(numberOfRunds)){
    rounds.innerHTML = 'Please enter the number! <br>';
    result.innerHTML = '';
    output.innerHTML = '';
  }
  else if(numberOfRunds <= 0 || numberOfRunds == 2){
    rounds.innerHTML = 'The number must be greater than zero and different from two! <br>';
    result.innerHTML = '';
    output.innerHTML = '';
  } else {
    rounds.innerHTML = 'You have chosen ' + numberOfRunds + ' rounds to win, you need ' + toWin(numberOfRunds) + ' wins<br>';
    result.innerHTML = '';
    output.innerHTML = '';
  };
};
//przypisywanie stringa do wartości
var choise = function(value){
  if(value == 1){
    return "PAPER";
  } else if (value == 2){
    return "ROCK";
  } else{
    return "SCISSORS";
  };
};
//główna funkcja
var playerMove = function(playerChoise){
  var playerChoise;
  var result;
  var computerMove = this.Math.floor(Math.random()*3+1);
  if(playerScore < toWin(numberOfRunds) && computerScore < toWin(numberOfRunds) && numberOfRunds > 0){ //jeżeli liczba rund mieści się w limicie
    if(playerChoise - computerMove == -1 || playerChoise - computerMove == 2){ //gra
      result = '<strong><span style="color:#27ae60;">YOU WON!</span></strong>';
      playerScore ++;
    } else if(playerChoise - computerMove == 0){
       result = '<span style="color:#f1c40f;">DRAW:</span>';
    } else{
       result = '<span style="color:#e74c3c;">YOU LOSE:</span>';
       computerScore ++;
    };
    if (playerScore == toWin(numberOfRunds) || computerScore == toWin(numberOfRunds)) {
        if(playerScore > computerScore) {
          output.innerHTML = result + " you played: " + choise(playerChoise) + " computer played: " + choise(computerMove) + '<br> YOU WON THE ENTIRE GAME!!!<br>';
          logTable('Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
        } else{
          output.innerHTML = result + " you played: " + choise(playerChoise) + " computer played: " + choise(computerMove) + '<br> YOU LOSE THE ENTIRE GAME!!!<br>';
          logTable('Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
        }
    }else{
      log(result + " you played: " + choise(playerChoise) + " computer played: " + choise(computerMove));
      logTable('Player ' + playerScore + ' - ' + 'Computer ' + computerScore);
    };
} else {
      if(numberOfRunds == true){
        output.innerHTML += ' Game over, please press the new game button!<br>';
      } else {
        output.innerHTML += ' Please press the new game button!<br>';
      }
}
};