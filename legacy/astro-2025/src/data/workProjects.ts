export type WorkProject = {
  title: string;
  href: string;
};

export const workProjects: readonly WorkProject[] = [
  {
    title: 'Design Leadership: Evolving a Team',
    href: '/Design-Leadership-Evolving-a-Team',
  },
  {
    title: 'Recruiting Platform',
    href: '/Recruiting-Platform',
  },
  {
    title: 'Smart Integrations',
    href: '/Smart-Integrations',
  },
  {
    title: 'Text-Based AI Sign-Up',
    href: '/Text-Based-AI-Sign-Up',
  },
  {
    title: 'Attendance Management',
    href: '/Attendance-Management',
  },
  {
    title: 'Predictive Email Marketing',
    href: '/Predictive-Email-Marketing',
  },
  {
    title: 'PetMatch',
    href: '/PetMatch',
  },
  {
    title: 'Redesign: CareerBliss.com',
    href: '/Redesign-CareerBliss-com',
  },
  {
    title: 'Redesign: KBB.com',
    href: '/Redesign-KBB-com',
  },
] as const;
