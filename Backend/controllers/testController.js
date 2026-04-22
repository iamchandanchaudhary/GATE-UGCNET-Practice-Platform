const Test = require("../models/Test");
const TestResult = require("../models/TestResult");

const createTest = async (req, res) => {
  try {
    const { name, subject, duration, numberOfQuestions, questions } = req.body;

    if (!name || !subject || !duration || !numberOfQuestions || !questions) {
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
      subject,
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
    const { name, subject, duration, numberOfQuestions, questions, isActive } = req.body;

    const test = await Test.findById(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    if (name) test.name = name;
    if (subject) test.subject = subject;
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

    // Save result to database if user is authenticated
    if (req.user) {
      const testResult = new TestResult({
        user: req.user._id,
        test: test._id,
        testName: test.name,
        subject: test.subject,
        totalQuestions,
        correct,
        wrong,
        unanswered,
        score,
        timeTaken,
        answers: answers.map((answer, index) => ({
          questionIndex: index,
          userAnswer: answer,
          isCorrect: answer !== null && answer !== undefined
            ? answer === test.questions[index].correctAnswer
            : null,
        })),
      });

      await testResult.save();
    }

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

// Get user's test results
const getUserTestResults = async (req, res) => {
  try {
    const results = await TestResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("-answers")
      .populate("test", "subject")
      .lean();

    const normalizedResults = results.map((result) => ({
      ...result,
      subject: result.subject || result.test?.subject || "Unknown",
    }));

    res.status(200).json({
      success: true,
      count: normalizedResults.length,
      results: normalizedResults,
    });
  } catch (error) {
    console.error("Get user test results error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user's test statistics for reports
const getUserTestStats = async (req, res) => {
  try {
    const results = await TestResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("test", "subject");

    if (results.length === 0) {
      return res.status(200).json({
        success: true,
        stats: {
          totalTests: 0,
          avgScore: 0,
          totalCorrect: 0,
          totalWrong: 0,
          totalUnanswered: 0,
          performanceTrend: [],
          recentTests: [],
          subjectPerformance: [],
        },
      });
    }

    const totalTests = results.length;
    const avgScore = Math.round(
      results.reduce((sum, r) => sum + r.score, 0) / totalTests
    );
    const totalCorrect = results.reduce((sum, r) => sum + r.correct, 0);
    const totalWrong = results.reduce((sum, r) => sum + r.wrong, 0);
    const totalUnanswered = results.reduce((sum, r) => sum + r.unanswered, 0);

    // Performance trend (last 10 tests)
    const performanceTrend = results.slice(0, 10).reverse().map((r, idx) => ({
      test: `Test ${idx + 1}`,
      testName: r.testName,
      score: r.score,
      date: r.createdAt,
    }));

    // Recent tests (last 5)
    const recentTests = results.slice(0, 5).map((r) => ({
      id: r._id,
      testName: r.testName,
      score: r.score,
      totalQuestions: r.totalQuestions,
      correct: r.correct,
      date: r.createdAt,
    }));

    // Subject-wise performance (average score per subject)
    const subjectStatsMap = results.reduce((acc, r) => {
      const subjectName = r.subject || r.test?.subject || "Unknown";

      if (!acc[subjectName]) {
        acc[subjectName] = { totalScore: 0, testsTaken: 0 };
      }

      acc[subjectName].totalScore += r.score;
      acc[subjectName].testsTaken += 1;

      return acc;
    }, {});

    const subjectPerformance = Object.entries(subjectStatsMap)
      .map(([subject, data]) => ({
        subject,
        avgScore: Math.round(data.totalScore / data.testsTaken),
        testsTaken: data.testsTaken,
      }))
      .sort((a, b) => b.avgScore - a.avgScore);

    res.status(200).json({
      success: true,
      stats: {
        totalTests,
        avgScore,
        totalCorrect,
        totalWrong,
        totalUnanswered,
        performanceTrend,
        recentTests,
        subjectPerformance,
      },
    });
  } catch (error) {
    console.error("Get user test stats error:", error);
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
  getUserTestResults,
  getUserTestStats,
};
