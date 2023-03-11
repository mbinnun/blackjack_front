import React from 'react';

import './App.css';
import Header from './Header/Header';
import Card from './Card/Card';
import Server from './Server/Server';

let savedGameId = null;
let wasInitialized = false;

class App extends React.Component {
  
  // ==> Blackjack App Constructor
  constructor(props) {
    super(props);
    
    // ==> State construction (will be updated constantly from the server)
    this.state = {
      possibleCards: [], // the card deck
      dealer: null,
      player: null,
      wallet: 0, // the user's wallet tells how much money left to perform bets
      inputValue: '', // will hold the bet's input value from the HTML input tag
      currentBet: null,
      gameOver: false,
      message: null,
    };
  }

  // ==> On app load
  componentWillMount() {
    if (!wasInitialized) {
      // ==> Allow initialize only once
      wasInitialized = true;
      // ==> Try to fetch the saved game id
      if (!savedGameId) {
        savedGameId = localStorage.getItem('savedGameId');
      }
      // ==> Initialize the game at the beginning
      if (!savedGameId) {
        this.restartGame();
      } else {
        this.gameDetails();
      }
      // ==> Handle enters after bet input
      const body = document.querySelector('body');
      body.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
  }

  updateTheStateFromServerResult(apiResult, inputValue, callbackFunc) {
    // ==> Update the state from server results
    this.setState({
      possibleCards: apiResult.updatedPossibleCards,
      dealer: apiResult.dealer,
      player: apiResult.player,
      wallet: apiResult.wallet,
      currentBet: apiResult.currentBet,
      gameOver: apiResult.gameOver,
      message: apiResult.message,
      inputValue: (inputValue && inputValue === 'y') ? '' : this.state.inputValue,
    }, callbackFunc);
  }
  
  restartGame(type) {
    // ==> Try to fetch the saved game id
    if (!savedGameId) {
      savedGameId = localStorage.getItem('savedGameId');
    }
    if (!savedGameId) {
      // ==> No saved id ==> Register a new game on server
      Server.registerNewGame((apiResiterResult) => {
          savedGameId = apiResiterResult.data._id;
          localStorage.setItem('savedGameId', savedGameId);
          this.updateTheStateFromServerResult(apiResiterResult.data, 'y');
      });
    } else {
      // ==> Restart the game on server
      Server.restartGame(savedGameId, type, (apiRestartResult) => {
          this.updateTheStateFromServerResult(apiRestartResult.data, 'y');
      });
    }
  }

  gameDetails() {
    // ==> Fetch current game details
    Server.getGameDetails(savedGameId, (apiDetailsResult) => {
      this.updateTheStateFromServerResult(apiDetailsResult.data);
    });
  }
       
  placeBet() {
    // ==> Check what the player chosen to bet and act accordingly
    const currentBet = this.state.inputValue;

    // ==> Place a bet on server
    Server.placeBet(savedGameId, currentBet, (apiBetResult) => {
      this.updateTheStateFromServerResult(apiBetResult.data);
    });
  }
  
  takeCard() {
    // ==> Place a bet on server
    Server.takeCard(savedGameId, (apiTakeResult) => {
      this.updateTheStateFromServerResult(apiTakeResult.data);
    });
  }
  
  exposeCards() {
    // ==> Place a bet on server
    Server.exposeCards(savedGameId, (apiExposeResult) => {
      this.updateTheStateFromServerResult(apiExposeResult.data);
    });
  }
  
  inputChange(e) {
    // ==> Placing a bet, save the input
    const inputValue = +e.target.value;
    this.setState({inputValue});
  }
  
  handleKeyDown(e) {
    // ==> Handle clicking Enter after setting the bet's input
    const enter = 13;
    if (e.keyCode === enter) {
      this.placeBet();
    }
  }
  
  render() {
    return (
      <>
        <Header />

        <div>

          {/* Game restart button */}
          <div className="buttons">
            <button onClick={() => {this.restartGame()}}>אתחול המשחק</button>
          </div>
          
          {/* Show balance */}
          <div className="balance">
            <div>
              <u>המאזן שלך בדולרים</u>: 
              ${ this.state.wallet }
            </div>
          </div>

          {/* Bet setting form */}
          {
            !this.state.currentBet ? 
            <div className="input-bet">
              <form>
                <input type="text" name="bet" 
                  placeholder="הזן סכום להימור..." 
                  value={this.state.inputValue} 
                  onChange={this.inputChange.bind(this)}
                />
              </form>
              <button onClick={() => {this.placeBet()}}>קבע את סכום ההימור</button>
            </div>
            : null
          }

          {/* Buttons show fetch a card or request to expose cards */}
          {
            (this.state.currentBet && !this.state.gameOver) ? 
            <div className="buttons">
              <button onClick={() => {this.takeCard()}}>משוך קלף נוסף</button>
              <button onClick={() => {this.exposeCards()}}>בקש לחשוף את הקלפים מול הדילר</button>
            </div> 
            : null
          }

          {/* Button to continue to another round */}
          {
            this.state.gameOver ?
            <div className="buttons">
              <button onClick={() => {this.restartGame('continue')}}>המשך לסיבוב נוסף</button>
            </div>
            : null
          }

          {/* Player's hand show */}
          <p className="show_cards">הקלפים שלך</p>
          <table className="cards">
            <tbody>
              <tr>
                { this.state.player && this.state.player.cards.map((card, i) => {
                  return <Card key={i} number={card.number} suit={card.suit}/>
                }) }
              </tr>
            </tbody>
          </table>
          
          {/* Dealer's hand show (expose only first card to the player) */}
          <p className="show_cards">הקלפים של הדילר</p>
          <table className="cards">
            <tbody>
              <tr>
                { this.state.dealer && this.state.dealer.cards.map((card, i) => {
                  return <Card key={i} number={card.number} suit={card.suit}/>;
                }) }
              </tr>
            </tbody>
          </table>
          
          <p>{ this.state.message }</p>

        </div>

      </>
    );
  }
};

export default App;
