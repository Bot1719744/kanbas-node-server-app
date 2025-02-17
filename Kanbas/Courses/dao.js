import model from "./model.js";

export function findAllCourses() {
    return model.find();
}

export async function findCoursesForEnrolledUser(userId) {
    const enrollments = await EnrollmentModel.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}

export function createCourse(course) {
    delete course._id;
    return model.create(course);
}

export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
