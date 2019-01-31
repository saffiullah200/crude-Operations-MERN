const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let Business = new Schema(
  {
    person_name: { type: String },
    business_gst_number: { type: String },
    business_name: { type: String }
  },
  { collation: "Bussiness" }
);

module.exports = mongoose.model("Business", Business);
