import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 16) => ({
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg',
})

// ─── VS Code Logo ─────────────────────────────────────────────────────────────
export function VsCodeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props} aria-hidden>
      <path
        fill="#007ACC"
        d="M10.94 1.34l-4.19 3.83L4.5 3.5 1.5 5v6l3 1.5 2.25-1.67 4.19 3.83L14.5 13V3l-3.56-1.66zM4.5 9.5l-2-1.5 2-1.5v3zm6.44 2.16L6.75 8l4.19-3.66v7.32z"
      />
    </svg>
  )
}

// ─── Explorer (File Tree) ─────────────────────────────────────────────────────
export function ExplorerIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props} aria-hidden>
      <path
        d="M2 3h5l1.5 2H14v9H2V3zm1 1v9h10V6H8L6.5 4H3z"
        fill="currentColor"
      />
    </svg>
  )
}

// ─── Search (Magnifying Glass) ────────────────────────────────────────────────
export function SearchIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props} aria-hidden fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

// ─── Source Control (Git Branch) ──────────────────────────────────────────────
export function SourceControlIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="4.5" cy="3.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M4.5 5v6" />
      <path d="M6 3.5h2.5a2 2 0 012 2V7" />
    </svg>
  )
}

// ─── Run & Debug (Play + Bug) ─────────────────────────────────────────────────
export function RunDebugIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props} aria-hidden>
      <path d="M5 3v10l7-5-7-5z" fill="currentColor" />
      <circle cx="12.5" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <line x1="12.5" y1="10" x2="12.5" y2="9" stroke="currentColor" strokeWidth="1.1" />
      <line x1="11" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  )
}

// ─── Folder (Open / Closed) ───────────────────────────────────────────────────
export function FolderIcon({ size = 16, open = false, ...props }: IconProps & { open?: boolean }) {
  return (
    <svg {...base(size)} {...props} aria-hidden>
      {open ? (
        <>
          <path fill="#dcb67a" d="M1.5 3h4l1.5 1.5H13v2H3.5L2 12.5h11L14.5 6.5V3H7L5.5 1.5H1.5z" opacity="0.4" />
          <path fill="#dcb67a" d="M2 6.5h11l-1.5 6H2V6.5z" />
        </>
      ) : (
        <path fill="#dcb67a" d="M1.5 3h4.5l1.5 1.5H14v9H1.5V3zm1 1v8.5h10.5V5.5H7L5.5 4H2.5z" />
      )}
    </svg>
  )
}

// ─── TSX File Icon ────────────────────────────────────────────────────────────
export function TsxFileIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props} aria-hidden>
      <rect x="3" y="1.5" width="10" height="13" rx="1" fill="none" stroke="#268bd2" strokeWidth="1" />
      <text x="8" y="10.5" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#268bd2" fontFamily="monospace">
        TS
      </text>
    </svg>
  )
}

// ─── Readme / Markdown Icon ───────────────────────────────────────────────────
export function ReadmeIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props} aria-hidden>
      <rect x="2.5" y="2" width="11" height="12" rx="1" fill="none" stroke="#2aa198" strokeWidth="1" />
      <path d="M5 5.5h6M5 7.5h6M5 9.5h4" stroke="#2aa198" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  )
}

// ─── Terminal Icon ────────────────────────────────────────────────────────────
export function TerminalIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
      <polyline points="4.5,6 6.5,8 4.5,10" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="10" x2="11.5" y2="10" strokeLinecap="round" />
    </svg>
  )
}

// ─── Chevron (Expand / Collapse) ──────────────────────────────────────────────
export function ChevronIcon({ size = 12, expanded = false, ...props }: IconProps & { expanded?: boolean }) {
  return (
    <svg
      {...base(size)}
      {...props}
      style={{
        transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 0.15s ease',
      }}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polyline points="5,3 10,8 5,13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Close (X) Icon ───────────────────────────────────────────────────────────
export function CloseIcon({ size = 14, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4">
      <line x1="4" y1="4" x2="12" y2="12" strokeLinecap="round" />
      <line x1="12" y1="4" x2="4" y2="12" strokeLinecap="round" />
    </svg>
  )
}