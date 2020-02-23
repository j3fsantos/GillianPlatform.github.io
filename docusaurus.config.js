module.exports = {
  title: 'Gillian',
  tagline: 'Compositional Symbolic Analysis for All',
  url: 'https://GillianPlatform.github.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'GillianPlatform', // Usually your GitHub org/user name.
  projectName: 'GillianPlatform.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Gillian logo, by Valentin Magnat',
        srcDark: 'img/logo_full_black.svg',
        src: 'img/logo_full_white.svg'
      },
      links: [
        {to: 'docs/pldi-2020-artifact', label: 'Docs', position: 'left'},
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/giltho/GillianDev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/doc1',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Tutorial',
              to: 'tutorial',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/giltho/GillianDev',
            },
            {
              label: 'Papers',
              href: 'papers',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gillian Team. Gillian and WISL logos by Valentin Magnat. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/GillianPlatform/gillianplatform.github.io',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
