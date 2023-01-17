const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  no_of_people: {
    type: Number,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  costperday: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  totalbookings: {
    type: Array,
    required: true,
  },
  roomtype: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: { type: String, required: true },
  location_id: { type: Number, required: true },
  city_id: { type: Number, required: true },
  locality: { type: String, required: true },

  aggregate_rating: { type: Number, required: true },
  rating_text: { type: String, required: true },
  image: { type: String, required: true },
  facilities: { type: String, required: true }
});

const roommodel = mongoose.model("rooms",roomSchema)

module.exports = roommodel;