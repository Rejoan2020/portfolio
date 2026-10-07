export type Experience = {
  role: string;
  org: { name: string; url: string };
  period: string;
  detail: string;
  summary: string;
};

export type Education = {
  degree: string;
  period: string;
  school: string;
  result: string;
};

export type Competition = {
  name: string;
  date: string;
  url: string;
  /** Short headline stat shown as a badge. */
  highlight: string;
  result: string;
};

export const experience: Experience[] = [
  {
    role: 'AI Data Trainer (Software Engineer)',
    org: { name: 'Outlier', url: 'https://outlier.ai/' },
    period: 'Mar 2024–Oct 2025',
    detail: 'Contract',
    summary:
      'Contributed to LLM training with human-quality feedback and evaluations, focusing on coding and software development tasks.'
  },
  {
    role: 'Trainee',
    org: { name: 'B-JET', url: 'https://bjet.org/' },
    period: 'Sep 2023–Mar 2024',
    detail: 'Bangladesh-Japan ICT Engineers’ Training Program',
    summary: 'Learned Japanese language, business culture, and IT.'
  }
];

export const education: Education[] = [
  {
    degree: 'BSc in Computer Science and Engineering',
    period: '2019–2023',
    school: 'BRAC University',
    result: 'Duration: 4 years · CGPA: 3.19'
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    period: '2016–2018',
    school: 'Cambrian School & College',
    result: 'GPA: 5.00'
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    period: '2014–2016',
    school: 'Cambrian School & College',
    result: 'GPA: 5.00'
  }
];

export const competitions: Competition[] = [
  {
    name: 'Meta Hacker Cup',
    date: '2023',
    url: 'https://www.facebook.com/codingcompetitions/hacker-cup/2023/certificate/1050620602603679',
    highlight: 'Top 20%',
    result: 'Placed in the top 20% in Round 1 and participated in Round 2.'
  },
  {
    name: 'Google Code Jam Farewell Round A',
    date: 'Apr 2023',
    url: 'https://clist.by/standings/code-jam-farewell-round-a-41185807/?search=Rejoan&detail=true',
    highlight: '3/5 solved',
    result: 'Solved 3 of 5 problems.'
  },
  {
    name: 'ICPC Asia Dhaka Regional Online Preliminary',
    date: 'Feb 2023',
    url: 'https://icpc.global/regionals/finder/Dhaka-Preliminary-2024/standings',
    highlight: '#3 at BRACU',
    result: 'Ranked 3rd among BRAC University teams.'
  },
  {
    name: 'IEEEXtreme 16.0',
    date: 'Oct 2022',
    url: 'https://ieeextreme.org/ieeextreme-16-0-ranking/',
    highlight: '#9 in BD',
    result: 'Ranked 9th in Bangladesh and 731st globally out of 6,376 teams, competing solo.'
  }
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Programming languages', items: ['JavaScript', 'TypeScript', 'C++', 'Python'] },
  { group: 'Frameworks & libraries', items: ['React.js', 'Next.js', 'Tailwind', 'Django'] },
  { group: 'Other', items: ['MongoDB', 'HTML', 'CSS'] }
];
