/** author: eabartlett
* file containing all the functions for querying
* the database for questions, users, answers, etc
*/

var mongoose = require('mongoose');

//Load in schema to use for queries

var schema = {};
require('./schema')(schema);
