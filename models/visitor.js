var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const visitorSchema = new Schema({
    count: Number,
    date: { type: Date }
});

module.exports =  mongoose.model('visitor', visitorSchema);
