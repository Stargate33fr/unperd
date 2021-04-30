var globalScore1 =0; var globalScore2=0; var currentScore =0, playerActif =0, isPlaying =false, dice=1;

var n = 5; // Nombre final du compteur
var cpt = 0; // Initialisation du compteur
var duree = 2; // Durée en seconde pendant laquel le compteur ira de 0 à 15
var delta = Math.ceil((duree * 1000) / n); // On calcule l'intervalle de temps entre chaque rafraîchissement du compteur (durée mise en milliseconde)
var node =  document.getElementById("compteur");

init();

function init() {
    globalScore1 =0;
    globalScore2 =0;
    currentScore =0;
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score1').textContent ='0';
    document.getElementById('score2').textContent ='0';
    document.getElementById('current1').textContent ='0';
    document.getElementById('current2').textContent ='0';

    document.querySelector('.btn-launchdice').style.display ='none';
    document.querySelector('.btn-add-global').style.display ='none';
}

document.querySelector('.btn-new').addEventListener('click', newGame);

document.querySelector('.btn-launchdice').addEventListener('click', function() {
    if(isPlaying) {
        var n = 15; // Nombre final du compteur
        var cpt = 0; // Initialisation du compteur
        var duree = 5; // Durée en seconde pendant laquel le compteur ira de 0 à 15
        var delta = Math.ceil((duree * 1000) / n); // On calcule l'intervalle de temps entre chaque rafraîchissement du compteur (durée mise en milliseconde)
        var node =  document.getElementById("compteur"); // On récupère notre noeud où sera rafraîchi la valeur du compteur
        document.querySelector('.loading').style.display ='inline-block';
        cpt = 0;
        delta = Math.ceil((duree * 1000) / n);
        setTimeout(countdown, delta);
    }    
});

function countdown() {
    dice = Math.floor(Math.random() * 6) + 1;
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'images/dice' + dice + '.png';
    cpt = cpt + 1;
    if( cpt < n ) { // Si on est pas arrivé à la valeur finale, on relance notre compteur une nouvelle fois
       setTimeout(countdown, delta);
    }else{
        cpt =0;
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector('#current' + playerActif).textContent = currentScore;
            document.querySelector('.loading').style.display ='none';
        } else {
            nextPlayer(false);
        }
    }
  }

document.querySelector('.btn-add-global').addEventListener('click', function() {
    if (isPlaying) {
        if (playerActif ==1){
            globalScore1 += currentScore;

            document.querySelector('#score' + playerActif).textContent = globalScore1;
        }else{
            globalScore2 += currentScore;
            document.querySelector('#score' + playerActif).textContent = globalScore2;
        }
        if (globalScore1 >= 100 || globalScore2>=100) {
            if (globalScore1>=100){
                document.querySelector('#player1').textContent = 'player 1 winner!';
                document.querySelector('.left-panel').classList.add('winner');
                document.querySelector('.left-panel').classList.remove('active');
              
            }else{
                document.querySelector('#player2').textContent = 'player 2 winner!';
                document.querySelector('.right-panel').classList.add('winner');
                document.querySelector('.right-panel').classList.remove('active');
            }
            document.querySelector('#current1').textContent = '0';
            document.querySelector('#current2').textContent = '0';
            document.querySelector('.btn-launchdice').style.display ='none';
            document.querySelector('.btn-add-global').style.display ='none';
            document.querySelector('.dice').style.display = 'none';
           
            isPlaying = false;
        } else {
            nextPlayer(false);
        }
    }
});

function newGame() {
    globalScore1 = 0;
    globalScore2 = 0;
    currentScore = 0;
    
    document.querySelector("#score1").textContent = globalScore1;
    document.querySelector("#score2").textContent = globalScore2;
    document.querySelector('.btn-launchdice').style.display ='block';
    document.querySelector('.btn-add-global').style.display ='block';
    document.querySelector('#player2').textContent ='PLAYER 2';
    document.querySelector('#player1').textContent ='PLAYER 1';
    document.querySelector('.loading').style.display ='none';
    playerActif = Math.floor(Math.random() * 2) + 1;

    nextPlayer(true);
    isPlaying =true;
}

function nextPlayer(isNewGame) {
    if (isNewGame==false){
        playerActif === 1 ? playerActif = 2 : playerActif = 1;
    }
    isNewGame = false;
    currentScore = 0;
    document.querySelector('.loading').style.display ='none';
    document.getElementById('current1').textContent = '0';
    document.getElementById('current2').textContent = '0';
  if (playerActif ==1){
    document.querySelector('.left-panel').classList.add('active');
    document.querySelector('.right-panel').classList.remove('active');
  }else{
    document.querySelector('.right-panel').classList.add('active');
    document.querySelector('.left-panel').classList.remove('active');
  }

    document.querySelector('.dice').style.display = 'none';
}

