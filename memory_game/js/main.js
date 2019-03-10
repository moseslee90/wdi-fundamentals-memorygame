console.log("Up and running!");
var cards = [];
var cardsInPlay = [];
var score = 0;
var totalScore = 0;
var tries = 0;
var fileArray = ["10_of_clubs.png", "5_of_hearts.png", "ace_of_clubs.png", "10_of_diamonds.png", "5_of_spades.png", "ace_of_diamonds.png", "10_of_hearts.png", "6_of_clubs.png", "ace_of_hearts.png", "10_of_spades.png", "6_of_diamonds.png", "ace_of_spades.png", "2_of_clubs.png", "6_of_hearts.png", "2_of_diamonds.png", "6_of_spades.png", "jack_of_clubs.png", "2_of_hearts.png", "7_of_clubs.png", "jack_of_diamonds.png", "2_of_spades.png", "7_of_diamonds.png", "jack_of_hearts.png", "3_of_clubs.png", "7_of_hearts.png", "jack_of_spades.png", "3_of_diamonds.png", "7_of_spades.png", "king_of_clubs.png", "3_of_hearts.png", "8_of_clubs.png", "king_of_diamonds.png", "3_of_spades.png", "8_of_diamonds.png", "king_of_hearts.png", "4_of_clubs.png", "8_of_hearts.png", "king_of_spades.png", "4_of_diamonds.png", "8_of_spades.png", "4_of_hearts.png", "9_of_clubs.png", "queen_of_clubs.png", "4_of_spades.png", "9_of_diamonds.png", "queen_of_diamonds.png", "5_of_clubs.png", "9_of_hearts.png", "queen_of_hearts.png", "5_of_diamonds.png", "9_of_spades.png", "queen_of_spades.png"];
var randomCardId = function() {
	return Math.floor(Math.random() * 52);
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
var createDeck = function () {
    //creates an array of cards based on the filenames in fileArray
    for (var i = 0; i < fileArray.length; i++) {
        var cardAttributes = fileArray[i].split("_");
        var cardImage = "images/52-Cards/" + fileArray[i];
        var rank = cardAttributes[0];
        var suit = cardAttributes[2].split(".")[0];
        createCard(rank, suit, cardImage, false);
    }
};
createDeck();
// createCard("queen", "hearts", "images/queen-of-hearts.png", false);
// createCard("queen", "diamonds", "images/queen-of-diamonds.png", false);
// createCard("king", "diamonds", "images/king-of-hearts.png", false);
// createCard("king", "diamonds", "images/king-of-diamonds.png", false);
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
    //initialise first random id
	cardId.push(randomCardId());
    //initialise potential second random id
	var newRandom = randomCardId();
	for (i = 0; i < cards.length; i++) {
		//ensure that no duplicate cardIds are added
        //test newRandom for conflicts in existing cardId array
		for(i = 0; i < cardId.length;){
			if (newRandom === cardId[i]) {
				console.log(newRandom + " conflicts with cardId[" + i + "] of value " + cardId[i]);
				newRandom = randomCardId();
                //reset check for duplicate card id loop since duplicate was found
				i = 0;
			} else {
                //no duplicate found at current position in cardId array
				i++;
			}
		}
        //add non-duplicate random number to cardId array
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
		if (matches == cards.length){
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
        turnCardsBackFaceDown();
	}
	// turnCardsBackFaceDown();
}
createBoard();