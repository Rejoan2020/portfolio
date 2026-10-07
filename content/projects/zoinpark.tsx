import image from '@/assets/images/zoinpark-dashboard.webp';
import type { Project } from './types';

export const zoinpark: Project = {
  slug: 'zoinpark',
  name: 'Zoinpark',
  description:
    'A modern crypto platform featuring staking, rewards, weekly challenges, transaction history, and a responsive dashboard.',
  card: {
    category: 'CRYPTO PLATFORM',
    summary:
      'A modern crypto platform for staking, rewards, weekly challenges, transaction history, and a responsive dashboard.',
    imageAlt: 'Zoinpark crypto dashboard showing staking balance, weekly challenges, and reward cards'
  },
  ownership: 'own',
  image,
  imageAlt: 'Zoinpark crypto dashboard showing balance, weekly challenges, and reward cards',
  tags: ['Next.js', 'React', 'MongoDB', 'NextAuth', 'Tailwind CSS', 'Server Actions', 'Resend'],
  repoUrl: 'https://github.com/Rejoan2020/zoinpark',
  liveUrl: 'https://zoinpark.vercel.app/',
  context: 'Crypto platform · Web application',
  body: (
    <>
      <h2>Zoinpark</h2>
      <p>
        A modern crypto platform featuring staking, rewards, weekly challenges, transaction history, and a responsive
        dashboard, built with Next.js and React.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li>
          <strong>Staking and rewards:</strong> A crypto platform experience centered around staking and earning
          rewards.
        </li>
        <li>
          <strong>Weekly challenges:</strong> Challenge progress and reward activity presented in the dashboard.
        </li>
        <li>
          <strong>Transaction history:</strong> A place to review account transactions.
        </li>
        <li>
          <strong>Responsive dashboard:</strong> Core account and challenge information arranged for different screen
          sizes.
        </li>
      </ul>
      <h2>Built With</h2>
      <p>Next.js, React, MongoDB, NextAuth, Tailwind CSS, Server Actions, and Resend.</p>
    </>
  )
};
