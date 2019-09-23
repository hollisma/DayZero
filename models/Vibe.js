const mongoose = require("mongoose");

const VibeSchema = new mongoose.Schema({
  vibe: {
    type: Map
  }
});

module.exports = Vibe = mongoose.model("vibe", VibeSchema);
