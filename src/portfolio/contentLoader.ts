import type { GitHubProject, PortfolioFileId, SearchableDocument } from './types'

import educationMd from '../content/education.md?raw'
import experienceMd from '../content/experience.md?raw'
import hardSkillsMd from '../content/hardSkills.md?raw'
import softSkillsMd from '../content/softSkills.md?raw'
import aboutMeMd from '../content/aboutMe.md?raw'
import hobbiesMd from '../content/hobbies.md?raw'
import githubProjectsJson from '../content/github-projects.json'

export const PORTFOLIO_CONTENT: Record<PortfolioFileId, string> = {
  education: educationMd,
  experience: experienceMd,
  'hard-skills': hardSkillsMd,
  'soft-skills': softSkillsMd,
  'about-me': aboutMeMd,
  hobbies: hobbiesMd,
}

export const FILE_LABELS: Record<PortfolioFileId, string> = {
  education: 'Education.tsx',
  experience: 'Experience.tsx',
  'hard-skills': 'HardSkills.tsx',
  'soft-skills': 'SoftSkills.tsx',
  'about-me': 'AboutMe.readme',
  hobbies: 'Hobbies.tsx',
}

export const FILE_PATHS: Record<PortfolioFileId, string> = {
  education: 'Project_Resume/SRC/Education.tsx',
  experience: 'Project_Resume/SRC/Experience.tsx',
  'hard-skills': 'Project_Resume/SRC/HardSkills.tsx',
  'soft-skills': 'Project_Resume/SRC/SoftSkills.tsx',
  'about-me': 'Project_Resume/SRC/AboutMe.me',
  hobbies: 'Project_Resume/SRC/Hobbies.tsx',
}

export const SEARCH_INDEX: SearchableDocument[] = (
  Object.entries(PORTFOLIO_CONTENT) as [PortfolioFileId, string][]
).map(([fileId, content]) => ({
  fileId,
  label: FILE_LABELS[fileId],
  path: FILE_PATHS[fileId],
  content,
}))

export const GITHUB_PROJECTS = githubProjectsJson as GitHubProject[]
