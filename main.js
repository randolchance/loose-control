import App from "./src/app";


var app = null;
function onWindowLoaded( event ) {
  
  const appElement = document.getElementById('app');

  app = new App( appElement );

  window.app = app; //  debug

}


window.onload = onWindowLoaded;