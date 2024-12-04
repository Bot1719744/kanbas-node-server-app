import express from "express";
import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    // Enroll a user in a course
    app.post("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        const newEnrollment = dao.enrollUserInCourse(userId, courseId);
        res.status(201).json(newEnrollment);
    });

    // Unenroll a user from a course
    app.delete("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        const success = dao.unenrollUserFromCourse(userId, courseId);
        if (success) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message: "Enrollment not found" });
        }
    });

    // Get enrollments for a user
    app.get("/api/enrollments/:userId", (req, res) => {
        const { userId } = req.params;
        const enrollments = dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    });
}