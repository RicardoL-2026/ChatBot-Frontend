import type { FileTreeNode } from './types'

export const PROJECT_FILE_TREE: FileTreeNode[] = [
  {
    id: 'project-resume',
    name: 'Project_Resume',
    type: 'folder',
    children: [
      {
        id: 'src',
        name: 'SRC',
        type: 'folder',
        children: [
          { id: 'education', name: 'Education.tsx', type: 'file', fileId: 'education', fileKind: 'tsx' },
          { id: 'experience', name: 'Experience.tsx', type: 'file', fileId: 'experience', fileKind: 'tsx' },
          { id: 'hard-skills', name: 'HardSkills.tsx', type: 'file', fileId: 'hard-skills', fileKind: 'tsx' },
          { id: 'soft-skills', name: 'SoftSkills.tsx', type: 'file', fileId: 'soft-skills', fileKind: 'tsx' },
          { id: 'about-me', name: 'AboutMe.me', type: 'file', fileId: 'about-me', fileKind: 'readme' },
          { id: 'hobbies', name: 'Hobbies.tsx', type: 'file', fileId: 'hobbies', fileKind: 'tsx' },
        ],
      },
    ],
  },
]
