import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    const newEnrollment = { _id: Date.now().toString(), user: userId, course: courseId };
    enrollments.push(newEnrollment);
    return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = Database;
    const initialLength = enrollments.length;
    Database.enrollments = enrollments.filter(
        (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
    return initialLength !== Database.enrollments.length; // Returns true if unenrolled successfully
}

export function findEnrollmentsForUser(userId) {
    const { enrollments } = Database;
    return enrollments.filter((enrollment) => enrollment.user === userId);
}