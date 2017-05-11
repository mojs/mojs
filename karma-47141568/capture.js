(function (phantom) {
  var page = require('webpage').create();

  

  

  

  page.onConsoleMessage = function () {
      console.log.apply(console, arguments)
  }

  
  page.open('http://localhost:9877/?id=47141568')
  
}(phantom))
