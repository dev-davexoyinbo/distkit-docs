export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'neutral'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'distkit'
  },
  header: {
    title: 'distkit',
    to: '/',
    logo: {
      alt: 'distkit',
      light: '/distkit-logo.webp',
      dark: '/distkit-logo-light.webp'
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-lucide-scroll',
      'to': '/changelog',
      'aria-label': 'Changelog'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/dev-davexoyinbo/distkit',
      'target': '_blank',
      'aria-label': 'GitHub'
    }, {
      'icon': 'i-simple-icons-rust',
      'to': 'https://docs.rs/distkit',
      'target': '_blank',
      'aria-label': 'docs.rs'
    }, {
      'icon': 'i-lucide-package',
      'to': 'https://crates.io/crates/distkit',
      'target': '_blank',
      'aria-label': 'crates.io'
    }]
  },
  footer: {
    credits: `distkit • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-lucide-scroll',
      'to': '/changelog',
      'aria-label': 'Changelog'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/dev-davexoyinbo/distkit',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Links',
      edit: 'https://github.com/dev-davexoyinbo/distkit-docs/edit/main/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/dev-davexoyinbo/distkit',
        target: '_blank'
      }, {
        icon: 'i-lucide-book-open',
        label: 'API docs (docs.rs)',
        to: 'https://docs.rs/distkit',
        target: '_blank'
      }]
    }
  }
})
