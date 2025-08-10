import React from "react";
import type { SearchResult } from "../types";

interface EmployeeResultsProps {
  results: SearchResult[];
}

const EmployeeResults: React.FC<EmployeeResultsProps> = ({ results }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case "available":
        return "text-green-600 bg-green-100";
      case "busy":
        return "text-yellow-600 bg-yellow-100";
      case "on leave":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const parseEmployeeInfo = (sentence: string) => {
    // Extract information from the sentence format
    const nameMatch = sentence.match(/^([^,]+) has/);
    const experienceMatch = sentence.match(/(\d+) years of experience/);
    const skillsMatch = sentence.match(/Skills include ([^.]+)/);
    const projectsMatch = sentence.match(/Worked on projects such as ([^.]+)/);
    const availabilityMatch = sentence.match(/Currently ([^.]+)/);

    return {
      name: nameMatch ? nameMatch[1].trim() : "Unknown",
      experience: experienceMatch ? parseInt(experienceMatch[1]) : 0,
      skills: skillsMatch ? skillsMatch[1].split(",").map((s) => s.trim()) : [],
      projects: projectsMatch
        ? projectsMatch[1].split(",").map((s) => s.trim())
        : [],
      availability: availabilityMatch ? availabilityMatch[1].trim() : "unknown",
    };
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Found {results.length} matching employee
        {results.length !== 1 ? "s" : ""}:
      </h3>
      <div className="grid gap-3">
        {results.map((result) => {
          const employeeInfo = parseEmployeeInfo(result.sentence);

          return (
            <div
              key={result.employee_id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">
                  {employeeInfo.name}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(
                    employeeInfo.availability
                  )}`}
                >
                  {employeeInfo.availability}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                <span className="font-medium">
                  {employeeInfo.experience} years
                </span>{" "}
                of experience
              </div>

              {employeeInfo.skills.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Skills
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {employeeInfo.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {employeeInfo.projects.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Recent Projects
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {employeeInfo.projects.map((project, projectIndex) => (
                      <span
                        key={projectIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Match score: {(result.score * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeResults;
