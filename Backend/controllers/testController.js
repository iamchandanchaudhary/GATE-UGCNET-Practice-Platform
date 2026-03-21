const Test = require("../models/Test");

const createTest = async (req, res) => {
  try {
    const { name, duration, numberOfQuestions, questions } = req.body;

    if (!name || !duration || !numberOfQuestions || !questions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (questions.length !== numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: `Expected ${numberOfQuestions} questions but received ${questions.length}`,
      });
    }

    const test = new Test({
      name,
      duration,
      numberOfQuestions,
      questions,
    });

    await test.save();

    res.status(201).json({
      success: true,
      message: "Test created successfully",
      test,
    });
  } catch (error) {
    console.error("Create test error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().select("-questions").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tests.length,
      tests,
    });
  } catch (error) {
    console.error("Get all tests error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getTestById = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findById(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    res.status(200).json({
      success: true,
      test,
    });
  } catch (error) {
    console.error("Get test by id error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, numberOfQuestions, questions, isActive } = req.body;

    const test = await Test.findById(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    if (name) test.name = name;
    if (duration) test.duration = duration;
    if (numberOfQuestions) test.numberOfQuestions = numberOfQuestions;
    if (questions) test.questions = questions;
    if (typeof isActive === "boolean") test.isActive = isActive;

    await test.save();

    res.status(200).json({
      success: true,
      message: "Test updated successfully",
      test,
    });
  } catch (error) {
    console.error("Update test error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findByIdAndDelete(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Test deleted successfully",
    });
  } catch (error) {
    console.error("Delete test error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getActiveTests = async (req, res) => {
  try {
    const tests = await Test.find({ isActive: true })
      .select("-questions")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tests.length,
      tests,
    });
  } catch (error) {
    console.error("Get active tests error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getTestForAttempt = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findById(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    if (!test.isActive) {
      return res.status(400).json({
        success: false,
        message: "This test is not available",
      });
    }

    const testData = {
      _id: test._id,
      name: test.name,
      duration: test.duration,
      numberOfQuestions: test.numberOfQuestions,
      questions: test.questions.map((q, index) => ({
        id: index + 1,
        question: q.questionText,
        options: q.options,
      })),
    };

    res.status(200).json({
      success: true,
      test: testData,
    });
  } catch (error) {
    console.error("Get test for attempt error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const submitTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers, timeTaken } = req.body;

    const test = await Test.findById(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    const questionResults = test.questions.map((q, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === q.correctAnswer;

      if (userAnswer === null || userAnswer === undefined) {
        unanswered++;
      } else if (isCorrect) {
        correct++;
      } else {
        wrong++;
      }

      return {
        id: index + 1,
        question: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer: userAnswer !== null && userAnswer !== undefined ? userAnswer : null,
        isCorrect: userAnswer !== null && userAnswer !== undefined ? isCorrect : null,
      };
    });

    const totalQuestions = test.questions.length;
    const score = Math.round((correct / totalQuestions) * 100);

    res.status(200).json({
      success: true,
      result: {
        testName: test.name,
        totalQuestions,
        correct,
        wrong,
        unanswered,
        score,
        timeTaken,
        questions: questionResults,
      },
    });
  } catch (error) {
    console.error("Submit test error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
  getActiveTests,
  getTestForAttempt,
  submitTest,
};
