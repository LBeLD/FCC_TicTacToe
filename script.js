$(document).ready(function() {

var turns = 0,
    playerPoints = 0,
    computerPoints = 0,
    draws = 0;


$('#buttonX').click(function(){
  $('#intro').hide();
  $('.container').show();
  playerTurn('X');
});

$('#buttonO').click(function(){
  $('#intro').hide();
  $('.container').show();
  playerTurn('O');
});

$('#resetGame').click(function(){
  location.reload();
});

//***** FUNCTIONS ******//

// function for player's move
function playerTurn(side){
  $('.field').click(function(){
    //first check if spot have been already taken for 'X' or 'O'
    if($(this).hasClass('classX') || $(this).hasClass('classO')){
      window.alert('Place taken');
    } else {
      //Add class 'X' or 'O' to an empty spot
    $(this).addClass('class'+side);
      //Check any victory combination
      if($('#spot1').hasClass('class'+side) && $('#spot2').hasClass('class'+side) && $('#spot3').hasClass('class'+side) ||
         $('#spot4').hasClass('class'+side) && $('#spot5').hasClass('class'+side) && $('#spot6').hasClass('class'+side) ||
         $('#spot7').hasClass('class'+side) && $('#spot8').hasClass('class'+side) && $('#spot9').hasClass('class'+side) ||
         $('#spot1').hasClass('class'+side) && $('#spot4').hasClass('class'+side) && $('#spot7').hasClass('class'+side) ||
         $('#spot2').hasClass('class'+side) && $('#spot5').hasClass('class'+side) && $('#spot8').hasClass('class'+side) ||
         $('#spot3').hasClass('class'+side) && $('#spot6').hasClass('class'+side) && $('#spot9').hasClass('class'+side) ||
         $('#spot1').hasClass('class'+side) && $('#spot5').hasClass('class'+side) && $('#spot9').hasClass('class'+side) ||
         $('#spot3').hasClass('class'+side) && $('#spot5').hasClass('class'+side) && $('#spot7').hasClass('class'+side)
      ){
        // In the case of a Victory combination, display message and reset the game
        $('#winMessage').show();
        playerPoints++;
        setTimeout(resetGame,1500);
        //If there is no more turns, game tied
      } else if (turns == 8) {
        $('#drawMessage').show();
        draws++;
        setTimeout(resetGame,1500);
      } else {
    turns++;
    if(side === 'X'){
      computerPlay('O')
    } else {
    computerPlay('X');
    }
  }
  }

  });

}
//function for computer's move
  function computerPlay(side){
    //check the number of turns (avoid error due recursive function)
    if (turns < 9){
      //create a random number between 1 and 9
    var randomSpot = 1 + Math.floor(Math.random()*9);
      //if this stop is not taken, add 'X' or 'O' class
    if(!$('#spot'+randomSpot).hasClass('classX') && (!$('#spot'+randomSpot).hasClass('classO'))){
      $('#spot'+randomSpot).addClass('class'+side);
      //Check any victory combination
      if($('#spot1').hasClass('class'+side) && $('#spot2').hasClass('class'+side) && $('#spot3').hasClass('class'+side) ||
         $('#spot4').hasClass('class'+side) && $('#spot5').hasClass('class'+side) && $('#spot6').hasClass('class'+side) ||
         $('#spot7').hasClass('class'+side) && $('#spot8').hasClass('class'+side) && $('#spot9').hasClass('class'+side) ||
         $('#spot1').hasClass('class'+side) && $('#spot4').hasClass('class'+side) && $('#spot7').hasClass('class'+side) ||
         $('#spot2').hasClass('class'+side) && $('#spot5').hasClass('class'+side) && $('#spot8').hasClass('class'+side) ||
         $('#spot3').hasClass('class'+side) && $('#spot6').hasClass('class'+side) && $('#spot9').hasClass('class'+side) ||
         $('#spot1').hasClass('class'+side) && $('#spot5').hasClass('class'+side) && $('#spot9').hasClass('class'+side) ||
         $('#spot3').hasClass('class'+side) && $('#spot5').hasClass('class'+side) && $('#spot7').hasClass('class'+side)){

           $('#loseMessage').show();
           computerPoints++;
           setTimeout(resetGame,1500);
      } else {
      turns++;
      }
    } else {
      computerPlay(side);
    }
  }
  }

  //Function to reset the game

  function resetGame () {
    turns = 0;
    $('#winMessage').hide();
    $('#loseMessage').hide();
    $('#drawMessage').hide();
    $('.field').removeClass('classX');
    $('.field').removeClass('classO');
    $('#playerPoints').html(playerPoints);
    $('#computerPoints').html(computerPoints);
    $('#draws').html(draws);
  }


});
