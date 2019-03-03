console.log("Up and running!");
var cards = [];
var createCard = function(rank, suit, cardImage) {
	var card = {
		rank: rank,
		suit: suit,
		cardImage: cardImage
	};
	cards.push(card);
};
createCard("queen", "hearts", "images/queen-of-hearts.png");
createCard("queen", "diamonds", "images/queen-of-diamonds.png");
createCard("king", "diamonds", "images/king-of-hearts.png");
createCard("king", "diamonds", "images/king-of-diamonds.png");
var cardsInPlay = [];
var checkForMatch = function () {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert("You found a match!");
	} else {
		alert("Sorry, try again.");
	};
};
var flipCard = function (cardId){
	console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	cardsInPlay.push(cards[cardId].rank);
	if (cardsInPlay.length === 2) {
		console.log("2 Cards are in Play");
		checkForMatch();
	};
};
flipCard(0);
flipCard(2);