/** Index file loading all of the schema into the schema object that the 
* module.exports is called with. Used to modularize the import of Schema
*/

module.exports = function(schema){
  require('./User.js')(schema);
  require('./Answer.js')(schema);
  require('./Question.js')(schema);
}
