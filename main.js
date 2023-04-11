document.addEventListener('DOMContentLoaded', () => {
  const EMPTY_HEART = '♡'
  const FULL_HEART = '♥'
  const likeButtons = document.querySelectorAll('.like-glyph');
  const modal = document.getElementById('modal');

  //likebuttons is an array, we must use forEach
  likeButtons.forEach(button => {
    like(button)
  });

//When a user clicks
  function like(button) {
    button.addEventListener('click', (event) => {
      if (event.target.innerHTML === EMPTY_HEART) {
        mimicServerCall().then(() => {
            event.target.innerHTML = FULL_HEART;
            event.target.setAttribute('class', 'like-glyph activated-heart');
        }).catch(() => {
            displayError(function(){
                event.target.innerHTML = FULL_HEART;
                event.target.setAttribute('class', 'like-glyph activated-heart');
            });
        });
      } else {
        event.target.innerHTML = EMPTY_HEART
        event.target.setAttribute('class', 'like-glyph')
      }
    });
  };

  //Respond to the error
  function displayError(callback) {
    modal.removeAttribute('class');
    setTimeout(function(){
        modal.setAttribute('class','hidden');
        callback();
    }, 3000);
  };
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
