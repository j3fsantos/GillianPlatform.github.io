module.exports = {
  title: 'Gillian',
  tagline: 'Compositional Symbolic Analysis for All',
  url: 'http://GillianAnalysis.github.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Gillian',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        {to: 'docs/pldi-2020-artifact', label: 'Docs', position: 'left'},
        {to: 'blog', label: 'Blog', position: 'left'},
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
      copyright: `Copyright © ${new Date().getFullYear()} Gillian Team. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
