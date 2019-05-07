//Dependencies importing
const express = require('express');
const path = require('path');
//App creation
const app = express();
//Routes declaration
app.use(express.static(__dirname + '/dist/spt-provisions-calculator'));
app.get('/*', function(req,res) {
//All calls goes to index
res.sendFile(path.join(__dirname+'/dist/spt-provisions-calculator/index.html'));
});
//Listen on Heroku
app.listen(process.env.PORT || 8080);