
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/1.png", matched : false},
  {"src": "/img/2.png", matched : false},
  {"src": "/img/3.png", matched : false},
  {"src": "/img/4.png", matched : false},
  {"src": "/img/5.png", matched : false},
  {"src": "/img/6.png", matched : false}

]

function App() {
  const [cards, setCards] = useState ([])
  const [turns, setTurns] = useState (0)
  const [choseOne, setChoseOne] = useState(null)
  const [chosetwo, setChosetwo] = useState(null)
  const [disable, setDisable] = useState(false)
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
    setChoseOne(null)
    setChosetwo(null)
    
    setCards(shuffleCards)
    setTurns(0)
  }
  const handleChoice = (card) => {
    choseOne ? setChosetwo (card) : setChoseOne(card)
  }

  useEffect (() => {
    if (choseOne && chosetwo){
      setDisable(true)
      if (choseOne.src === chosetwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choseOne.src){
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
        resetTurn()
      }else{
        
       setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choseOne, chosetwo])
 

  const resetTurn = ()=> {
    setChoseOne(null)
    setChosetwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisable(false)
  }
  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card = {card} 
          handleChoice={handleChoice}
          flipped = {card === choseOne || card === chosetwo || card.matched}
          disable = {disable}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
