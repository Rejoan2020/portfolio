import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...props} />;
}

export function GitHubIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.13c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.14 1.71 1.14 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.61 5.21-5.1 5.49.4.35.76 1.02.76 2.06v3.13c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </Icon>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.34H4.96V9.5h2.97v8.84ZM6.45 8.3a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm11.89 10.04h-2.96v-4.3c0-1.03-.02-2.36-1.44-2.36-1.45 0-1.67 1.13-1.67 2.29v4.37H9.31V9.5h2.84v1.21h.04c.4-.7 1.36-1.44 2.8-1.44 3 0 3.55 1.97 3.55 4.53v4.54Z" />
    </Icon>
  );
}

export function PersonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2Zm0 3a3.25 3.25 0 1 1 0 6.5A3.25 3.25 0 0 1 12 5Zm0 14.1a7.06 7.06 0 0 1-5.7-2.9c.03-1.9 3.8-2.95 5.7-2.95s5.67 1.05 5.7 2.95a7.06 7.06 0 0 1-5.7 2.9Z" />
    </Icon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Icon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M7.5 3v4M16.5 3v4M4 9.5h16" />
    </Icon>
  );
}

export function CalendarDotsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M7.5 3v4M16.5 3v4M4 9.5h16M8 13h2m4 0h2m-8 4h2m4 0h2" />
    </Icon>
  );
}

export function DateIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </Icon>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.2" />
    </Icon>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
      <circle cx="7.5" cy="7.5" r="1" />
    </Icon>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7" />
    </Icon>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 7.5h7l2 2h9v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7.5v-2a2 2 0 0 1 2-2h4l2 2h4" />
    </Icon>
  );
}

export function RunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="15" cy="4.5" r="2" />
      <path d="m7 21 3.5-5.5L14 18v3.5M5 11.5 8.5 8h5l2.5 4 3 1M10.5 15.5 13 8" />
    </Icon>
  );
}

export function StravaIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15.39 17.94 13.3 13.83h-3.07L15.39 24l5.15-10.17h-3.07M10.46 0l-7 13.83h4.17l2.83-5.6 2.84 5.6h4.17Z" />
    </Icon>
  );
}
