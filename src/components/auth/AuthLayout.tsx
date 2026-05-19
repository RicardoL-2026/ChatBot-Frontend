import { Link } from 'react-router-dom'
import styles from './AuthLayout.module.css'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
  footerText: string
  footerLinkText: string
  footerLinkTo: string
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <span className={styles.brand}>ChatBot</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </header>
        {children}
        <p className={styles.footer}>
          {footerText}{' '}
          <Link to={footerLinkTo}>{footerLinkText}</Link>
        </p>
      </div>
    </div>
  )
}
