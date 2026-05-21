import { useState } from 'react'
import type { FileTreeNode, PortfolioFileId } from '../types'
import { PROJECT_FILE_TREE } from '../fileTree'
import { ChevronIcon, FolderIcon, ReadmeIcon, TsxFileIcon } from '../icons/Icons'
import styles from './Explorer.module.css'

interface ExplorerProps {
  onOpenFile: (fileId: PortfolioFileId) => void
}

export function Explorer({ onOpenFile }: ExplorerProps) {
  return (
    <div className={styles.explorer}>
      <header className={styles.header}>EXPLORER</header>
      <div className={styles.tree}>
        {PROJECT_FILE_TREE.map((node) => (
          <TreeNode key={node.id} node={node} depth={0} onOpenFile={onOpenFile} />
        ))}
      </div>
    </div>
  )
}

function TreeNode({
  node,
  depth,
  onOpenFile,
}: {
  node: FileTreeNode
  depth: number
  onOpenFile: (fileId: PortfolioFileId) => void
}) {
  const [expanded, setExpanded] = useState(true)

  if (node.type === 'folder') {
    return (
      <div className={styles.folderGroup}>
        <button
          type="button"
          className={styles.row}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => setExpanded((e) => !e)}
        >
          <ChevronIcon expanded={expanded} className={styles.chevron} />
          <FolderIcon open={expanded} />
          <span>{node.name}</span>
        </button>
        {expanded &&
          node.children?.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} onOpenFile={onOpenFile} />
          ))}
      </div>
    )
  }

  const FileIcon = node.fileKind === 'readme' ? ReadmeIcon : TsxFileIcon

  return (
    <button
      type="button"
      className={`${styles.row} ${styles.file}`}
      style={{ paddingLeft: `${depth * 12 + 28}px` }}
      onClick={() => node.fileId && onOpenFile(node.fileId)}
    >
      <FileIcon />
      <span>{node.name}</span>
    </button>
  )
}
