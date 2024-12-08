import express from "express";
import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    // Get all quizzes
    app.get("/api/quizzes", (req, res) => {
        const quizzes = dao.findAllQuizzes();
        res.json(quizzes);
    });

    // Get a quiz by ID
    app.get("/api/quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        const quiz = dao.findQuizById(quizId);
        if (!quiz) {
            res.status(404).json({ message: "Quiz not found" });
        } else {
            res.json(quiz);
        }
    });

    // Create a new quiz
    app.post("/api/quizzes", (req, res) => {
        const newQuiz = dao.createQuiz(req.body);
        res.status(201).json(newQuiz);
    });

    // Update an existing quiz
    app.put("/api/quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        const updatedQuiz = dao.updateQuiz(quizId, req.body);
        if (!updatedQuiz) {
            res.status(404).json({ message: "Quiz not found" });
        } else {
            res.json(updatedQuiz);
        }
    });

    // Delete a quiz
    app.delete("/api/quizzes/:quizId", (req, res) => {
        const success = dao.deleteQuiz(req.params.quizId);
        if (!success) {
            res.status(404).json({ message: "Quiz not found" });
        } else {
            res.sendStatus(204);
        }
    });


}
