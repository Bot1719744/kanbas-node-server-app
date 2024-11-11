import express from "express";
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.get("/api/assignments", (req, res) => {
        const assignments = dao.findAllAssignments();
        res.json(assignments);
    });

    app.get("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignment = dao.findAssignmentById(assignmentId);
        if (!assignment) {
            res.status(404).json({ message: "Assignment not found" });
        } else {
            res.json(assignment);
        }
    });

    app.post("/api/assignments", (req, res) => {
        const newAssignment = dao.createAssignment(req.body);
        res.status(201).json(newAssignment);
    });

    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const updatedAssignment = dao.updateAssignment(assignmentId, req.body);
        if (!updatedAssignment) {
            res.status(404).json({ message: "Assignment not found" });
        } else {
            res.json(updatedAssignment);
        }
    });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const success = dao.deleteAssignment(req.params.assignmentId);
        if (!success) {
            res.status(404).json({ message: "Assignment not found" });
        } else {
            res.sendStatus(204);
        }
    });
}
