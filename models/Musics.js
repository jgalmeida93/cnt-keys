import mongoose, { Schema } from "mongoose";

const musicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true
  }
})

const Music = mongoose.models.Music || mongoose.model("Music", musicSchema)

export default Music