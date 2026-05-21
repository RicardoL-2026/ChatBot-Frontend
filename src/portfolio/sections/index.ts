import type { ComponentType } from 'react'
import type { PortfolioFileId } from '../types'
import Education from './Education'
import Experience from './Experience'
import HardSkills from './HardSkills'
import SoftSkills from './SoftSkills'
import AboutMe from './AboutMe'
import Hobbies from './Hobbies'

export const SECTION_COMPONENTS: Record<PortfolioFileId, ComponentType> = {
  education: Education,
  experience: Experience,
  'hard-skills': HardSkills,
  'soft-skills': SoftSkills,
  'about-me': AboutMe,
  hobbies: Hobbies,
}
