console.log("Up and running!");
var cards = [];
var cardsInPlay = [];
var random1to4 = function() {
	return Math.floor(Math.random() * 4);
}
var createCard = function (rank, suit, cardImage) {
	var card = {
		rank: rank,
		suit: suit,
		cardImage: cardImage
	}
	cards.push(card);
}
createCard("queen", "hearts", "images/queen-of-hearts.png");
createCard("queen", "diamonds", "images/queen-of-diamonds.png");
createCard("king", "diamonds", "images/king-of-hearts.png");
createCard("king", "diamonds", "images/king-of-diamonds.png");
var flipCard = function (){
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	cardsInPlay.push(cards[cardId].rank);
	this.setAttribute('src', cards[cardId].cardImage);
	if (cardsInPlay.length === 2) {
		console.log("2 Cards are in Play");
		checkForMatch();
		location.reload();
	}
}
var createBoard = function () {
	//randomising cardId
	var cardId = [];
	cardId.push(random1to4());
	var newRandom = random1to4();
	for (i = 0; i < 4; i++) {
		//ensure that no duplicate cardIds are added
		for(i = 0; i < cardId.length;){
			if (newRandom === cardId[i]) {
				console.log(newRandom + " conflicts with cardId[" + i + "] of value " + cardId[i]);
				newRandom = random1to4();
				i = 0;
			} else {
				i++;
			}
		}
		cardId.push(newRandom);
	}
	console.log("Random array with no conflict generated!");
	console.log(cardId);
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', cardId[i]);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}
var checkForMatch = function () {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert("You found a match!");
	} else {
		alert("Sorry, try again.");
	}
}
createBoard();