import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
export default function CourseRoutes(app) {
    // GET all courses
    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses(); // Retrieve courses
        res.json(courses); // Send the courses list
    });

    // DELETE a course
    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.send(status);
    });

        // PUT (update) a course
    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });

    // GET modules for a course
    app.get("/api/courses/:courseId/modules",  (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    // POST a module for a course
    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = { ...req.body, course: courseId };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });

}
