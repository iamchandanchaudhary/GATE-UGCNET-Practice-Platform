const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, "Question text is required"],
    trim: true,
  },
  options: {
    type: [String],
    required: [true, "Options are required"],
    validate: {
      validator: function (arr) {
        return arr.length === 4;
      },
      message: "Exactly 4 options are required",
    },
  },
  correctAnswer: {
    type: Number,
    required: [true, "Correct answer index is required"],
    min: 0,
    max: 3,
  },
});

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Test name is required"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      enum: [10, 20, 30, 60],
    },
    numberOfQuestions: {
      type: Number,
      required: [true, "Number of questions is required"],
      enum: [10, 30, 50, 100],
    },
    questions: {
      type: [questionSchema],
      required: [true, "Questions are required"],
      validate: {
        validator: function (arr) {
          return arr.length === this.numberOfQuestions;
        },
        message: "Number of questions must match the specified count",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
