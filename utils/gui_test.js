var Brig = require('brig');
 
var brig = new Brig();
 
brig.on('ready', function(brig) {
 
  // Loading QML file to play 
  brig.open('Application.qml', function(err, window) {
    // window was opened 
  });
});
 