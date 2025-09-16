
import { Chapter } from "./types";

export const formConfig: Chapter[] = [
  {
    id: "chapter-1",
    title: "Personal Info",
    screens: [
      {
        id: "screen-1-1",
        title: "Basic Details",
        questions: [
          { id: "q_name", type: "text", label: "Full Name", placeholder: "Enter your name", required: true },
          { id: "q_email", type: "text", label: "Email Address", placeholder: "Enter your email", required: true },
        ],
      },
      {
        id: "screen-1-2",
        title: "Preferences",
        questions: [
          {
            id: "q_gender",
            type: "radio",
            label: "Gender",
            required: true,
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ],
          },
          {
            id: "q_hobbies",
            type: "checkbox",
            label: "Hobbies",
            required: true,
            options: [
              { value: "reading", label: "Reading" },
              { value: "sports", label: "Sports" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "chapter-2",
    title: "Work Info",
    screens: [
      {
        id: "screen-2-1",
        title: "Job Details",
        questions: [
          { id: "q_role", type: "text", label: "Current Role", placeholder: "Enter your role", required: true },
          { id: "q_experience", type: "text", label: "Years of Experience", placeholder: "Enter years", required: true },
        ],
      },
      {
        id: "screen-2-2",
        title: "Tools & Skills",
        questions: [
          {
            id: "q_tools",
            type: "checkbox",
            label: "Tools you use",
            required: true,
            options: [
              { value: "react", label: "React" },
              { value: "node", label: "Node.js" },
            ],
          },
          {
            id: "q_languages",
            type: "radio",
            label: "Primary Programming Language",
            required: true,
            options: [
              { value: "js", label: "JavaScript" },
              { value: "ts", label: "TypeScript" },
            ],
          },
        ],
      },
    ],
  },
];
