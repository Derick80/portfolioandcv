# Resume Builder Implementation Plan

## Overview
We will build a responsive resume builder that allows logged-in users to view and edit their resume. The public resume page will be server-rendered for SEO and performance.

## 1. Database Schema
We need to model the resume data in Prisma.

### Models:
- **Resume**: One-to-one with User. Contains top-level info (name, email, phone, blurb).
- **Conference**: Relation to Resume.
- **Experience**: Relation to Resume.
- **Duty**: Relation to Experience. Ordered.
- **Education**: Relation to Resume.
- **EducationDuty**: Relation to Education. Ordered.
- **Skill**: Relation to Resume.
- **Publication**: Relation to Resume.

## 2. Server Actions (React 19)
We will use `useActionState` and server actions for all mutations to minimize client state.

- `saveResumeBasicInfo(prevState, formData)`
- `addExperience(prevState, formData)`
- `updateExperience(prevState, formData)`
- `deleteExperience(id)`
- `addDuty(experienceId, title)`
- `reorderDuties(experienceId, newOrder)`
- `addEducation`, `updateEducation`, `deleteEducation`
- `addSkill`, `deleteSkill`

## 3. Component Structure
- `app/resume/page.tsx`: Public view. Fetches data via RSC and renders `ResumeView`.
- `app/resume/edit/page.tsx`: Protected route. Renders `ResumeEditor`.
- `components/resume/`:
    - `ResumeView.tsx`: Read-only responsive layout.
    - `ResumeEditor.tsx`: Main editor wrapper.
    - `ExperienceEditor.tsx`
    - `EducationEditor.tsx`
    - `SkillsEditor.tsx`
    - `SortableList.tsx` (for dnd-kit or simple up/down buttons since we want minimal dependencies, we might just use up/down actions first, or simple drag and drop if requested later. User mentioned "movable" - we will implement up/down arrows for simplicity and robustness with server actions first).

## 4. UI/UX
- **Responsive**: Stacked layout on mobile, grid on desktop.
- **Styling**: Tailwind CSS + shadcn/ui.
- **Print**: `@media print` styles to hide editor controls and format perfectly for A4/Letter.
- **Download**: `react-to-print` or browser print functionality.

## 5. Authentication
- Check standard NextAuth session in `layout` or `page` to protect `/edit` route.
