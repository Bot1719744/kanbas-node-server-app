import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
    // GET all questions
    app.get("/api/questions", async (req, res) => {
        const questions = await dao.findAllQuestions(); // Retrieve all questions
        res.json(questions); // Send the questions list
    });

    // GET questions for a specific quiz
    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const questions = await dao.findQuestionsForQuiz(quizId); // Retrieve questions for the quiz
        res.json(questions); // Send the questions list
    });

    // POST a question for a quiz
    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const question = { ...req.body, quizId }; // Attach the quiz ID to the question
        const newQuestion = await dao.createQuestion(question); // Create the question
        res.status(201).json(newQuestion); // Send the newly created question
    });

    // DELETE a question
    app.delete("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const status = await dao.deleteQuestion(questionId); // Delete the question
        res.send(status); // Send the status of the operation
    });

    // PUT (update) a question
    app.put("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        const questionUpdates = req.body;
        const status = await dao.updateQuestion(questionId, questionUpdates); // Update the question
        res.send(status); // Send the status of the operation
    });
}
