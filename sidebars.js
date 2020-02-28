module.exports = {
  someSidebar: {
    Gillian: ['start'],
    Development: ['development/install', 'development/developing'],
    Instantiations: [
      {
        type: 'category',
        label: 'Gillian-JS',
        items: [
          'js/intro',
          'js/structure',
          'js/js-2-gil',
          'js/cosette',
          'js/references',
        ],
      },
      {
        type: 'category',
        label: 'Gillian-C',
        items: ['c/intro', 'c/structure', 'c/cstest'],
      },
    ],
    Publications: [
      {
        type: 'category',
        label: 'PLDI 2020 - Gillian, Part I',
        items: [
          'publications/pldi20/pldi20-ref',
          'publications/pldi20/pldi20-diff',
        ],
      },
    ],
  },
};
