const knexFile = require('../../knexfile');
module.exports.connect = require('knex')(knexFile.development);
