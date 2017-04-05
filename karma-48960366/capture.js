(function (phantom) {
  var page = require('webpage').create();

  

  

  

  page.onConsoleMessage = function () {
      console.log.apply(console, arguments)
  }

  
  page.open('http://localhost:9876/?id=48960366')
  
}(phantom))
