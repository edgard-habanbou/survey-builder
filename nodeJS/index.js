const express = require("express");
const { connectToMongoDB } = require("./configs/connection");
const app = express();
const cors = require("cors");

app.use(express.json());
require("dotenv").config();

app.use(cors({ origin: "http://localhost:3000" }));

// auth route
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const { authMiddleware } = require("./middlewares/auth.middleware");
//survey routes
const surveyRoutes = require("./routes/survey.routes");
app.use("/survey", authMiddleware, surveyRoutes);

//question routes
const questionRoutes = require("./routes/question.routes");
app.use("/question", authMiddleware, questionRoutes);

//question answer routes
const questionAnswerRoutes = require("./routes/question_answer.routes");
app.use("/question_answer", authMiddleware, questionAnswerRoutes);

//user answer routes
const userAnswerRoutes = require("./routes/user_answer.routes");
app.use("/user_answer", authMiddleware, userAnswerRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server listining on PORT: ", process.env.PORT);
  connectToMongoDB();
});
