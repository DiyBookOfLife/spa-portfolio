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
          Provide technical support for enterprise users by diagnosing and
          resolving system issues quickly and accurately. Use a range of
          troubleshooting tools and structured workflows to keep service
          delivery consistent and well-documented. Known for staying calm under
          pressure, thinking analytically, and maintaining strong attention to
          detail in fast-paced support environments.
        </p>
      </div>

      <div className="experience-item">
        <h3>Premier Service Consultant — AT&amp;T Mobility</h3>
        <p className="experience-dates">Jan 2015 – Jul 2025 | Remote</p>
        <p className="experience-description">
          Delivered advanced technical support for mobile and web systems,
          handling complex troubleshooting and customer escalations. Worked
          closely with engineering teams to identify root causes, test backend
          fixes, and verify solutions in production. Created clear, reusable
          technical documentation that sped up training and reduced resolution
          time. Built strong communication and debugging skills that ultimately
          sparked my transition into Software Engineering.
        </p>
      </div>
    </motion.section>
  );
}
