console.log("Up and running!");
var cards = [];
var cardsInPlay = [];
var score = 0;
var totalScore = 0;
var tries = 0;
var random1to4 = function() {
	return Math.floor(Math.random() * 4);
}
var createCard = function (rank, suit, cardImage, matched) {
	var card = {
		rank: rank,
		suit: suit,
		cardImage: cardImage,
		matched: matched
	}
	cards.push(card);
}
createCard("queen", "hearts", "images/queen-of-hearts.png", false);
createCard("queen", "diamonds", "images/queen-of-diamonds.png", false);
createCard("king", "diamonds", "images/king-of-hearts.png", false);
createCard("king", "diamonds", "images/king-of-diamonds.png", false);
var flipCard = function (){
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	cardsInPlay.push(cardId);
	this.setAttribute('src', cards[cardId].cardImage);
	if (cardsInPlay.length === 2) {
		console.log("2 Cards are in Play");
		checkForMatch();
		cardsInPlay = [];
	}
}
var generateRandomCardId = function () {
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
	return cardId;
}
var createBoard = function () {
	var cardId = generateRandomCardId();
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', cardId[i]);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}
var refreshBoard = function () {
	var cardId = generateRandomCardId();
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.getElementsByTagName('img')[i];
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', cardId[i]);
		cardElement.removeEventListener('click', flipCard);
		cardElement.addEventListener('click', flipCard);
	}
}
var turnCardsBackFaceDown = function() {
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.getElementsByTagName('img')[i];
		cardElement.setAttribute('src', "images/back.png");
	}
}
var checkForMatch = function () {
	var matches = 0;
	tries++;
	score = 2/tries;
	score = score.toFixed(2);
	score = parseFloat(score);
	if (cards[cardsInPlay[0]].rank === cards[cardsInPlay[1]].rank) {
		cards[cardsInPlay[0]].matched = true;
		cards[cardsInPlay[1]].matched = true;
		for (var i = 0; i < cards.length; i++) {
			if(cards[i].matched){
				matches++;
			}
		}
		if (matches == 4){
			totalScore = totalScore + score;
			tries = 0;
			for (var i = 0; i < cards.length; i++) {
				cards[i].matched = false;
			}
			alert("You found a match!\nAll cards matched, game reset!\nGained " + score + " points this game!\nTotal score is " + totalScore + ".");
			return refreshBoard();
		}
		alert("You found a match!");
	} else {
		alert("Sorry, try again.");
	}
	turnCardsBackFaceDown();
}
createBoard();