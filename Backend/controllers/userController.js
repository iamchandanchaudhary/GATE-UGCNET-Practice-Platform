const User = require("../models/User");
const TestResult = require("../models/TestResult");

// Get all registered users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user details by ID (admin only)
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user by id error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user performance (test results) by user ID (admin only)
const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const results = await TestResult.find({ user: id })
      .select("testName totalQuestions correct wrong unanswered score timeTaken createdAt")
      .sort({ createdAt: -1 });

    // Calculate overall stats
    const totalTests = results.length;
    const avgScore = totalTests > 0
      ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / totalTests)
      : 0;

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      performance: {
        totalTests,
        avgScore,
        results: results.map((r) => ({
          id: r._id,
          testName: r.testName,
          score: r.score,
          totalQuestions: r.totalQuestions,
          correct: r.correct,
          wrong: r.wrong,
          unanswered: r.unanswered,
          timeTaken: r.timeTaken,
          date: r.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Get user performance error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserPerformance,
};
