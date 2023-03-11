import axios from 'axios';

// ==> The URL for the API
const apiURL = 'https://api.blackjackgame.mbionos.maremakom.com/api/games';
//const apiURL = 'http://localhost:9993/api/games';

const Server = {};

// ==> New game registration
Server.registerNewGame = (callbackFunc) => {
    // ==> Register a new game on the server
    axios.post(apiURL + '/', {})
      .then((response) => {
        const apiResiterResult = response.data;
        if(!apiResiterResult.data) {
          // ==> Did not register
          alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');  
          //console.log('server error', apiResiterResult);
        } else {
          // ==> Run the callback
          if (callbackFunc) { callbackFunc(apiResiterResult); }
        }
      })
      .catch((error) => {
        // ==> Server error
        alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');
        //console.log('server error', error);
      })
};

// ==> Fetch current game details
Server.getGameDetails = (savedGameId, callbackFunc) => {
    // ==> Register a new game on the server
    axios.get(apiURL + '/'+savedGameId)
      .then((response) => {
        const apiDetailsResult = response.data;
        if(!apiDetailsResult.data) {
          // ==> Did not register
          alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');  
          //console.log('server error', apiDetailsResult);
        } else {
          // ==> Run the callback
          if (callbackFunc) { callbackFunc(apiDetailsResult); }
        }
      })
      .catch((error) => {
        // ==> Server error
        alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');
        //console.log('server error', error);
      })
};

// ===> Restart the current game
Server.restartGame = (savedGameId, restartType, callbackFunc) => {
    // ==> Restart the game on the server
    axios.put(apiURL + '/restart/'+savedGameId+'?type='+(restartType ? restartType : ''), {})
      .then((response) => {
        const apiRestartResult = response.data;
        if(!apiRestartResult.data) {
            // ==> Did not register
            alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');  
            //console.log('server error', apiRestartResult);
          } else {
            // ==> Run the callback
            if (callbackFunc) { callbackFunc(apiRestartResult); }
          }
      })
      .catch((error) => {
        // ==> Server error
        alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');
        //console.log('server error', error);
      })
};

// ==> Place a bet
Server.placeBet = (savedGameId, bet, callbackFunc) => {
    // ==> Place a bet on the server
    axios.put(apiURL + '/bet/'+savedGameId, { bet })
      .then((response) => {
        const apiBetResult = response.data;
        if(!apiBetResult.data) {
            // ==> Did not register
            alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');  
            //console.log('server error', apiBetResult);
          } else {
            // ==> Run the callback
            if (callbackFunc) { callbackFunc(apiBetResult); }
          }
      })
      .catch((error) => {
        // ==> Server error
        alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');
        //console.log('server error', error);
      })
};

// ==> Player taking a card
Server.takeCard = (savedGameId, callbackFunc) => {
    // ==> Take a card on the server
    axios.put(apiURL + '/take/'+savedGameId, {})
      .then((response) => {
        const apiTakeResult = response.data;
        if(!apiTakeResult.data) {
            // ==> Did not register
            alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');  
            //console.log('server error', apiTakeResult);
          } else {
            // ==> Run the callback
            if (callbackFunc) { callbackFunc(apiTakeResult); }
          }
      })
      .catch((error) => {
        // ==> Server error
        alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');
        //console.log('server error', error);
      })
};

// ==> Expose all the cards in the game
Server.exposeCards = (savedGameId, callbackFunc) => {
    // ==> Expose dealer cards on the server
    axios.put(apiURL + '/expose/'+savedGameId, {})
      .then((response) => {
        const apiExposeResult = response.data;
        if(!apiExposeResult.data) {
            // ==> Did not register
            alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');  
            //console.log('server error', apiExposeResult);
          } else {
            // ==> Run the callback
            if (callbackFunc) { callbackFunc(apiExposeResult); }
          }
      })
      .catch((error) => {
        // ==> Server error
        alert('תקלה בתקשורת עם השרת. תיתכנה בעיות פונקציונליות במשחק');
        //console.log('server error', error);
      })
};

export default Server;
