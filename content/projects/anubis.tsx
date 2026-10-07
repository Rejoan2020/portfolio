import image from '@/assets/images/anubis-preview.svg';
import { newTab } from '@/lib/site';
import type { Project } from './types';

const installations: { group: string; sites: [name: string, url: string][] }[] = [
  {
    group: 'Infrastructure & open source',
    sites: [
      ['Arch Linux Wiki', 'https://wiki.archlinux.org/'],
      ['Hydra (NixOS)', 'https://hydra.nixos.org/'],
      ['FreeBSD SVN', 'https://svnweb.freebsd.org/'],
      ['Haiku', 'https://dev.haiku-os.org/'],
      ['OpenWrt', 'https://openwrt.org/'],
      ['postmarketOS', 'https://gitlab.postmarketos.org/'],
      ['GNOME', 'https://gitlab.gnome.org/'],
      ['Purism', 'https://source.puri.sm/'],
      ['Enlightenment', 'https://git.enlightenment.org/'],
      ['LupanCham Git', 'https://git.lupancham.net/'],
      ['Codeberg', 'https://codeberg.org/'],
      ['freedesktop.org', 'https://gitlab.freedesktop.org/'],
      ['Gitea', 'https://gitea.com/'],
      ['Proxmox Bugzilla', 'https://bugzilla.proxmox.com/'],
      ['Hosted Weblate', 'https://hosted.weblate.org/'],
      ['Hackerspace.pl', 'http://code.hackerspace.pl/'],
      ['FFmpeg Trac', 'https://trac.ffmpeg.org/'],
      ['WineHQ Bugzilla', 'https://bugs.winehq.org/'],
      ['Dolphin Emulator Wiki', 'https://wiki.dolphin-emu.org/'],
      ['Xe Iaso', 'https://xeiaso.net/'],
      ['Science Olympiad', 'https://scioly.org/'],
      ['CFA Archive', 'https://www.cfaarchive.org/'],
      ['SquirrelJME', 'https://squirreljme.cc/']
    ]
  },
  {
    group: 'Valve',
    sites: [
      ['Valve Developer Community', 'https://developer.valvesoftware.com/wiki/Main_Page'],
      ['SteamOS GitLab', 'https://gitlab.steamos.cloud/']
    ]
  },
  { group: 'United Nations', sites: [['UNESCO IIEP Policy Toolbox', 'https://policytoolbox.iiep.unesco.org/']] },
  {
    group: 'The Linux Foundation',
    sites: [
      ['Kernel.org', 'https://git.kernel.org/'],
      ['Kernel Mailing List Archives', 'https://lore.kernel.org/']
    ]
  },
  {
    group: 'Sourceware',
    sites: [
      ['Sourceware cgit', 'https://sourceware.org/cgit/'],
      ['glibc Wiki', 'https://sourceware.org/glibc/wiki/'],
      ['Buildbot Test Runs', 'https://builder.sourceware.org/testruns/'],
      ['Patchwork', 'https://patchwork.sourceware.org/'],
      ['GCC Bugzilla', 'https://gcc.gnu.org/bugzilla/'],
      ['GCC cgit', 'https://gcc.gnu.org/cgit/']
    ]
  },
  {
    group: 'hebis · Alliance of Hessian Libraries',
    sites: [
      ['UB Marburg Discovery', 'https://ubmr.hds.hebis.de/'],
      ['TuFind', 'https://tufind.hds.hebis.de/'],
      ['Karla', 'https://karla.hds.hebis.de/'],
      ['More about hebis Discovery', 'https://www.hebis.de/dienste/hebis-discovery-system/']
    ]
  },
  {
    group: 'FreeCAD',
    sites: [
      ['FreeCAD Forum', 'https://forum.freecad.org/'],
      ['FreeCAD Wiki', 'https://wiki.freecad.org/']
    ]
  },
  {
    group: 'ScummVM',
    sites: [
      ['ScummVM Bug Tracker', 'https://bugs.scummvm.org/'],
      ['ScummVM Forums', 'https://forums.scummvm.org/'],
      ['ScummVM Wiki', 'https://wiki.scummvm.org/']
    ]
  }
];

export const anubis: Project = {
  slug: 'anubis',
  name: 'Anubis',
  description: 'An overview of Anubis, the open-source proof-of-work security middleware from TecharoHQ.',
  ownership: 'external',
  image,
  imageAlt: 'TecharoHQ Anubis repository preview',
  tags: ['golang', 'security', 'ai', 'anti-bot', 'defense', 'proof-of-work'],
  repoUrl: 'https://github.com/TecharoHQ/anubis',
  docsUrl: 'https://anubis.techaro.lol/docs',
  date: '2025-03-01',
  context: (
    <>
      An open-source project maintained by{' '}
      <a href="https://github.com/TecharoHQ/anubis" {...newTab}>
        TecharoHQ
      </a>
      .
    </>
  ),
  body: (
    <>
      <h2>Anubis</h2>
      <p>
        Anubis is a security middleware designed to protect web services by implementing a Proof-of-Work (PoW)
        challenge. It effectively “weighs the soul” of incoming HTTP requests, deterring automated bots, AI crawlers,
        and scrapers while allowing legitimate users through.
      </p>
      <p>
        Built with Go, Anubis integrates into web applications to present a computational challenge that is trivial for
        human users but resource-intensive for bots attempting to access the service at scale. This acts as a
        significant barrier against unwanted automated traffic.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>
          <strong>Proof-of-Work Defense:</strong> Utilizes computational challenges to verify clients.
        </li>
        <li>
          <strong>Bot Mitigation:</strong> Effectively stops common bots, scrapers, and AI crawlers.
        </li>
        <li>
          <strong>Configurable:</strong> Allows tuning of difficulty and other parameters.
        </li>
        <li>
          <strong>Integration:</strong> Designed to work as middleware in Go web applications.
        </li>
        <li>
          <strong>Open Graph Passthrough:</strong> Enables social previews of protected resources without exempting
          each scraper individually.
        </li>
        <li>
          <strong>Customizable Policies:</strong> Define rules to allow, deny, or challenge incoming requests based on
          path and user agent.
        </li>
      </ul>

      <h2>Implementation Options</h2>
      <p>Anubis can be deployed in several ways:</p>
      <ul>
        <li>
          <strong>Native packages:</strong> Available for Debian-based (apt), Red Hat-based (rpm), and as a tarball for
          other systems.
        </li>
        <li>
          <strong>Docker:</strong> Ready-to-use container images for quick deployment.
        </li>
        <li>
          <strong>Kubernetes:</strong> Helm charts for orchestrated environments.
        </li>
      </ul>

      <h2>Algorithm Selection</h2>
      <p>Anubis offers two proof-of-work algorithms:</p>
      <ul>
        <li>
          <strong>Fast:</strong> Highly optimized JavaScript that runs as efficiently as possible.
        </li>
        <li>
          <strong>Slow:</strong> Intentionally inefficient JavaScript that wastes time and memory, suitable for known
          malicious clients.
        </li>
      </ul>

      <h2>Real-World Applications</h2>
      <p>Anubis is particularly effective for protecting:</p>
      <ul>
        <li>Git repositories (Gitea / Forgejo)</li>
        <li>Content management systems</li>
        <li>Web applications vulnerable to scraping or automated attacks</li>
      </ul>
      <p>
        For detailed usage, configuration options, and a live demo, see the{' '}
        <a href="https://anubis.techaro.lol/docs" {...newTab}>
          official Anubis documentation <span aria-hidden="true">↗</span>
        </a>
        .
      </p>

      <h2>Notable Installations</h2>
      <p>Anubis is deployed across open-source infrastructure, developer platforms, and public-interest services.</p>
      <div className="installations-grid">
        {installations.map(({ group, sites }) => (
          <section className="installation-group" key={group}>
            <h3>{group}</h3>
            <ul>
              {sites.map(([name, url]) => (
                <li key={url}>
                  <a href={url} {...newTab}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p>
        These examples are not exhaustive; see the{' '}
        <a href="https://www.hebis.de/dienste/hebis-discovery-system/" {...newTab}>
          hebis Discovery System
        </a>{' '}
        for more.
      </p>
    </>
  )
};
