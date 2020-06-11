const mongoose = require("mongoose");
     
var sportSchema = new mongoose.Schema({
   teamname: String,
   sportname: String,
   year: String,
   participantone: String,
   participanttwo: String,
   participantthree: String,
   participantfour: String,
   participantfive: String,
   participantsix: String,
   participantseven: String,
   participanteight: String,
   participantnine: String,
   participantten: String,
   participanteleven: String,
   branch: String,
   score: String,
});

module.exports = mongoose.model("Sport", sportSchema);