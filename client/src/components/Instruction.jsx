const Instruction = () => {
  return (
    <div className="px-4">
        <h1 className="text-3xl font-bold py-4">Instructions</h1>
        <div className="text-lg">
            <p>This will be an online single-player card game that consists of 4 different types of cards</p>

            <div className="py-6">
                <p>1. Cat card 😼</p>
                <p>2. Defuse card 🙅‍♂️</p>
                <p>3. Shuffle card 🔀</p>
                <p>4. Exploding kitten card 💣</p>
            </div>

            <p className="py-3">When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw. </p>

            <h2 className="text-xl font-semibold">Rules:</h2>
            <div>
                <p>1. If the card drawn from the deck is a cat card, then the card is removed from the deck.</p>
                <p>2. If the card is exploding kitten (bomb) then the player loses the game.</p>
                <p>3. If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</p>
                <p>4. If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</p>
            </div>
        </div>

    </div>
  )
}

export default Instruction