import React from "react";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>Experience</h2>

      <div className="experience-item">
        <h3>Technical Support Specialist — TEKsystems</h3>
        <p className="experience-dates">Jul 2025 – Present | Remote</p>
        <p className="experience-description">
          Provide technical support for enterprise users by diagnosing,
          documenting, and resolving system issues efficiently. Utilize
          troubleshooting tools and structured workflows to ensure consistent
          service delivery and maintain detailed technical documentation.
          Recognized for strong analytical problem-solving and attention to
          detail in high-volume support environments.
        </p>
      </div>

      <div className="experience-item">
        <h3>Premier Service Consultant — AT&amp;T Mobility</h3>
        <p className="experience-dates">Jan 2015 – Jul 2025 | Remote</p>
        <p className="experience-description">
          Delivered advanced technical support for mobile and web systems,
          specializing in complex troubleshooting and customer escalation
          management. Collaborated directly with engineering teams to identify
          root causes, test backend solutions, and verify production fixes.
          Authored clear, repeatable technical documentation that improved
          resolution time and onboarding efficiency. Developed strong
          cross-functional communication and debugging skills that laid the
          groundwork for a career in software engineering.
        </p>
      </div>
    </motion.section>
  );
}
