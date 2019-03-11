
//lets write good JS syntax
'use strict';



//lets create a state object to track changes necessary for app UX logic
const state = {
    api_base_url: "https://deckofcardsapi.com/api/deck/new/draw/?count=5",
    current_cards: [],
    past_cards: [],
    clicks: 0    
}

// ajax function to get data from API & to add to state
function getCardsfromApi(){
    const settings = {
        url: state.api_base_url,
        dataType: 'json',
        type: 'GET',
    };
    $.ajax(settings).done(function(data) {
        let new_cards;
        let result = data.cards;
        //conditional so this doesn't run if there's no data
        if (result.length > 0) {
            new_cards = result.map(card => ({
                code: card.code,
                image_url: card.image,
                suit: card.suit,
                value: card.value
            }));            
          state.current_cards = new_cards;
          state.past_cards.push(state.current_cards);
          state.clicks = state.clicks + 1; 
          createVisualCards();
        } else {
          noResults();
        }
      });

}

//fallback function if API isn't working 
function noResults(){
    console.log('something went wrong');
}

function createVisualCards(){
    let cardDivContainer = $('.card-container');
    //clear old results
    $('.card').remove();
    // for all data in state.current_cards, make a card & add to the DOM
    state.current_cards.forEach(function(eachResult) {
        cardDivContainer.append(
            `<div class="card">
                <div class="front">
                    <img src="img/card-back.png" alt="Deckr" class="card-img">
                </div>
                <div class="back">
                    <img src="${eachResult.image_url}" alt="${eachResult.value}" class="card-img">
                </div>
            </div>`);       
      });

    $('.card').each(function(i){
        let front = $(this).find('.front');
        let back = $(this).find('.back');
        setTimeout(function() {
              back.toggleClass('flip-card-back');
              front.toggleClass('flip-card-front');
          }, 200*i);     
    });

}

$('.deal-cards-btn').on('click', function(e) {
    e.preventDefault();
    getCardsfromApi(); 
});


  


