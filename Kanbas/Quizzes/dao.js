import Database from "../Database/index.js";

export function findAllQuizzes() {
    const { quizzes } = Database;
    return quizzes;
}

export function findQuizById(quizId) {
    const { quizzes } = Database;
    return quizzes.find((quiz) => quiz._id === quizId);
}

export function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: Date.now().toString() };
    Database.quizzes = [...Database.quizzes, newQuiz];
    return newQuiz;
}

export function deleteQuiz(quizId) {
    const { quizzes } = Database;
    const initialLength = quizzes.length;
    Database.quizzes = quizzes.filter((quiz) => quiz._id !== quizId);
    return initialLength !== Database.quizzes.length;
}

export function updateQuiz(quizId, quizUpdates) {
    const { quizzes } = Database;
    const quiz = quizzes.find((quiz) => quiz._id === quizId);
    if (quiz) {
        Object.assign(quiz, quizUpdates);
        return quiz;
    }
    return null;
}


