export type ActivityView = 'explorer' | 'search' | 'source-control' | 'run-debug'

export type PortfolioFileId =
  | 'education'
  | 'experience'
  | 'hard-skills'
  | 'soft-skills'
  | 'about-me'
  | 'hobbies'

export interface FileTreeNode {
  id: string
  name: string
  type: 'folder' | 'file'
  fileId?: PortfolioFileId
  fileKind?: 'tsx' | 'readme'
  children?: FileTreeNode[]
}

export interface OpenTab {
  fileId: PortfolioFileId
  label: string
}

export interface GitHubProject {
  id: string
  name: string
  description: string
  url: string
  language: string
  stars?: number
}

export interface SearchableDocument {
  fileId: PortfolioFileId
  label: string
  path: string
  content: string
}
