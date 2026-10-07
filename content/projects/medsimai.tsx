import image from '@/assets/images/medsimai-dashboard.webp';
import type { Project } from './types';

export const medsimai: Project = {
  slug: 'medsimai',
  name: 'MedSimAi',
  description:
    'An AI-powered medical simulation platform for practicing clinical case assessment and patient diagnosis.',
  card: {
    category: 'MEDICAL SIMULATION',
    summary:
      'An AI-powered medical simulation platform where students practice clinical assessment and patient diagnosis.',
    imageAlt: 'MedSimAi student dashboard with clinical cases, average score, and session statistics'
  },
  ownership: 'own',
  image,
  imageAlt: 'MedSimAi student dashboard with recommended clinical cases, scores, and sessions',
  tags: ['Next.js', 'React', 'Auth.js', 'Gemini API', 'REST API', 'Tailwind CSS', 'MongoDB'],
  repoUrl: 'https://github.com/Rejoan2020/MedSimAi',
  liveUrl: 'https://med-sim-ai.vercel.app/dashboard',
  context: 'AI-powered medical simulation · Web application',
  body: (
    <>
      <h2>MedSimAi</h2>
      <p>
        An AI-powered medical simulation platform that helps medical students practice clinical case assessment and
        patient diagnosis.
      </p>
      <h2>Learning Experience</h2>
      <ul>
        <li>
          <strong>Clinical case practice:</strong> Work through patient scenarios and assess the information presented.
        </li>
        <li>
          <strong>Diagnosis practice:</strong> Build clinical reasoning by considering possible diagnoses for each case.
        </li>
        <li>
          <strong>Progress overview:</strong> The student dashboard summarizes cases attempted, average score, and
          session count.
        </li>
        <li>
          <strong>Recommended cases:</strong> Students can find additional cases to continue practicing.
        </li>
      </ul>
      <h2>Built With</h2>
      <p>Next.js, React, Auth.js, Gemini API, REST API, Tailwind CSS, and MongoDB.</p>
    </>
  )
};
