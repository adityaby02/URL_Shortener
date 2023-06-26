const mongoose = require('mongoose');
const shortId = require('shortid')
const Schema = mongoose.Schema;

const shortUrlSchema = new Schema({
    full: {
      type: String,
      required: true,
      //unique: true
    },
    short: {
      type: String,
      required:true,
      default: shortId.generate
    },
    description:{
        type: String,
        //unique: true
    },
    clicks: {
      type: Number,
      required:true,
      default: 0
    }
    
  })

const Database = mongoose.model('ShortUrl',shortUrlSchema);

module.exports = Database;
