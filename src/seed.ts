import Course from "./models/Course";
import Project from "./models/Project";
import RoadmapItem from "./models/RoadmapItem";

const seed = async () => {
  try {
    const coursesCount = await Course.countDocuments();
    if (coursesCount === 0) {
      console.log("Seeding courses...");
      await Course.insertMany([
        {
          title: "Complete MERN Stack Development",
          description: "Master MongoDB, Express.js, React, and Node.js to build full-stack web applications.",
          thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
          provider: { name: "Guvi", website: "https://www.guvi.in" },
          category: "Full Stack",
          level: "intermediate",
          duration: { hours: 40 },
          price: { isFree: false, original: 2999, discounted: 1999 },
          rating: { average: 4.8, count: 1250 },
          enrollmentCount: 15420,
          language: "English",
        },
        {
          title: "JavaScript Fundamentals",
          description: "Start your programming journey with JavaScript basics.",
          thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500",
          provider: { name: "FreeCodeCamp", website: "https://www.freecodecamp.org" },
          category: "Frontend",
          level: "beginner",
          duration: { hours: 25 },
          price: { isFree: true },
          rating: { average: 4.9, count: 50000 },
          enrollmentCount: 250000,
          language: "English",
        }
      ]);
      console.log("✅ Courses seeded");
    } else {
      console.log("Courses already exist, skipping seed.");
    }
  } catch (err) {
    console.error("Seed error", err);
  }
};

export default seed;
