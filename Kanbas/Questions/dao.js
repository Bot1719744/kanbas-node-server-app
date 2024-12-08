import Database from "../Database/index.js";

// Find all questions
export const findAllQuestions = () => {
    return Database.questions;
};

// Find questions by quiz ID
export const findQuestionsByQuizId = (quizId) => {
    return Database.questions.filter((question) => question.quizId === quizId);
};

// Find question by ID
export const findQuestionById = (id) => {
    return Database.questions.find((question) => question._id === id);
};

// Create a new question
export const createQuestion = (question) => {
    const newQuestion = { ...question, _id: Date.now().toString() };
    Database.questions.push(newQuestion);
    return newQuestion;
};

// Update an existing question
export const updateQuestion = (id, updates) => {
    const questionIndex = Database.questions.findIndex((q) => q._id === id);
    if (questionIndex !== -1) {
        Database.questions[questionIndex] = {
            ...Database.questions[questionIndex],
            ...updates,
        };
        return Database.questions[questionIndex];
    }
    return null;
};

// Delete a question by ID
export const deleteQuestion = (id) => {
    const initialLength = Database.questions.length;
    Database.questions = Database.questions.filter((q) => q._id !== id);
    return Database.questions.length < initialLength;
};
