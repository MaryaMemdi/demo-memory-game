import './SingleCard.css'
export default function SingleCard({card, handleChoice, flipped, disable}){

    const handleClick = () =>{
        if(!disable){
            handleChoice(card)
        }
        
    }
    return(
        
          <div className='card'>
            <div className= {flipped ? "flipped" : "s"}>
              <img src={card.src} alt='card front' className='front'/>
              <img src='img/cover.png' alt='card back' className='back' onClick={handleClick} />
            </div>
            

          </div>
    )
}