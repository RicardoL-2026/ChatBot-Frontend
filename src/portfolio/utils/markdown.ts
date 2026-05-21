export function markdownToHtml(markdown: string): string {
  const lines = markdown.split('\n')
  const html: string[] = []
  let inList = false

  const closeList = () => {
    if (inList) {
      html.push('</ul>')
      inList = false
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()

    if (line.startsWith('### ')) {
      closeList()
      html.push(`<h3>${escapeHtml(line.slice(4))}</h3>`)
    } else if (line.startsWith('## ')) {
      closeList()
      html.push(`<h2>${escapeHtml(line.slice(3))}</h2>`)
    } else if (line.startsWith('# ')) {
      closeList()
      html.push(`<h1>${escapeHtml(line.slice(2))}</h1>`)
    } else if (line.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${inlineFormat(line.slice(2))}</li>`)
    } else if (line === '') {
      closeList()
    } else {
      closeList()
      html.push(`<p>${inlineFormat(line)}</p>`)
    }
  }

  closeList()
  return html.join('\n')
}

function inlineFormat(text: string): string {
  let out = escapeHtml(text)
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>')
  return out
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
