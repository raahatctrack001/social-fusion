import express from 'express'
import mongoose from 'mongoose'

const highlightSchema = new mongoose.Schema({
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
    name: {
        type: String,
      },
      thumbnail:{
        type:String,
      },
      stories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
      }]
}, {timestamps: true});

const HighlightModel = new mongoose.model("HighlightModel", highlightSchema);
export default HighlightModel;