import image from '@/assets/images/macrokite-os-overview.webp';
import type { Project } from './types';

export const macrokiteOs: Project = {
  slug: 'macrokite-os',
  name: 'Macrokite OS',
  description:
    'An internal workspace for the Macrokite team that runs client projects, tasks, meetings, and team chat in one place, with roles, notifications, and email.',
  card: {
    category: 'TEAM WORKSPACE',
    summary:
      'An internal workspace for the Macrokite team that runs client projects, tasks, meetings, and team chat in one place.',
    imageAlt: 'Macrokite OS overview with weekly progress, task status, my tasks, and meetings panels'
  },
  image,
  imageAlt: 'Macrokite OS overview showing weekly task progress, task status by column, my tasks, and today’s meetings',
  tags: ['Next.js', 'React', 'MongoDB', 'Mongoose', 'WorkOS', 'Zod', 'Nodemailer', 'Tailwind CSS'],
  repoUrl: 'https://github.com/Rejoan2020/macrokite-os',
  liveUrl: 'https://macrokite-os.vercel.app',
  context: 'Solo project · Internal workspace for Macrokite · Web application',
  body: (
    <>
      <h2>Macrokite OS</h2>
      <p>
        The internal workspace for Macrokite, a small agency. It replaces scattered chats and spreadsheets with one
        place for the team&apos;s client work: who the clients are, what each project needs, who is doing what, and
        what was decided in meetings.
      </p>
      <h2>Features</h2>
      <ul>
        <li>
          <strong>Overview:</strong> A daily dashboard with tasks completed this week, task status across the team,
          your own tasks, and today&apos;s meetings.
        </li>
        <li>
          <strong>Clients and projects:</strong> Each client has a page with its projects, and internal work sits under
          Company. Every project has its own task table, its own set of phases, and one or more leads.
        </li>
        <li>
          <strong>Tasks:</strong> Several assignees, four priority levels, and due dates. Each task has its own page
          with inline editing, an activity panel, and a discussion with <code>@mentions</code>.
        </li>
        <li>
          <strong>Meetings:</strong> Agenda, call link, attendees, notes, and decisions, plus per-person reminders.
          Action items added in a meeting become real tasks, and their assignees are notified when the meeting ends.
        </li>
        <li>
          <strong>Inbox:</strong> A team-wide channel, named group chats, and direct messages. Any message can be
          turned into a task.
        </li>
        <li>
          <strong>Roles and permissions:</strong> Admins create projects, manage clients, and choose leads. Leads
          manage their project&apos;s tasks, and assignees can move a task&apos;s status. The same rules hide controls
          in the UI and are enforced on the server.
        </li>
        <li>
          <strong>Notifications:</strong> An in-app bell for mentions, messages, assignments, and meeting invites.
          Emails for task assignments, meeting invites, and meeting summaries, controlled per person in Settings.
        </li>
        <li>
          <strong>Accounts:</strong> Sign in with Google or email and password. Admins invite teammates by email, and
          each company only ever sees its own workspace.
        </li>
        <li>
          <strong>Themes and demo mode:</strong> Light, dark, and system themes. With no setup, the app runs on a
          sample workspace stored in the browser.
        </li>
      </ul>
      <h2>How It Works</h2>
      <p>
        Every change in the app, from creating a task to ending a meeting, goes through one domain engine: a pure
        function that validates the input, checks permissions, creates notifications, and returns the changes. Demo
        mode runs it in the browser against <code>localStorage</code>. Database mode runs the same engine on the server
        and writes the changes to MongoDB, always scoped to the signed-in member&apos;s company. The engine has its
        own test suite covering validation, permissions, phases, meetings, mentions, and unread state.
      </p>
      <h2>Built With</h2>
      <p>
        Next.js (App Router), React, MongoDB with Mongoose, WorkOS AuthKit for sign-in and invites, Zod for validation,
        Nodemailer for email, and Tailwind CSS, deployed on Vercel.
      </p>
    </>
  )
};
