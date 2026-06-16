// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

/**
 * Walk all .md files under `dir` and return their paths relative to `dir`.
 */
function walkMd(dir: string, base = dir): string[] {
  const results: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      results.push(...walkMd(full, base))
    } else if (entry.endsWith('.md')) {
      results.push(relative(base, full))
    }
  }
  return results
}

/**
 * Convert a content file's relative path to the URL path Nuxt Content assigns it.
 *   - Strip leading numeric prefix from each segment ("1.getting-started" -> "getting-started")
 *   - "index" filename -> use the parent path
 *   - Skip root index.md (landing page, not in the docs collection)
 *   - Strip the .md extension
 */
function contentPathToRoute(relPath: string): string | null {
  const withoutExt = relPath.replace(/\\/g, '/').replace(/\.md$/, '')

  if (withoutExt === 'index') return null

  const segments = withoutExt.split('/').map(seg => seg.replace(/^\d+\./, ''))

  if (segments[segments.length - 1] === 'index') {
    segments.pop()
  }

  return '/' + segments.join('/')
}

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-llms',
    '@nuxtjs/mcp-toolkit',
    'nuxt-gtag'
  ],

  devtools: {
    enabled: true
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/'
  },

  css: ['~/assets/css/main.css'],

  // Shared site metadata, consumed by sitemap, robots, og-image, and SEO.
  site: {
    url: 'https://distkit.davidoyinbo.com',
    name: 'distkit',
    description: 'distkit is a Rust toolkit of distributed systems primitives backed by Redis: distributed counters, instance-aware counters, locks, and rate limiting.'
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          // Nuxt Content does not load every grammar by default.
          // Register the languages used across these docs.
          langs: [
            'json',
            'js',
            'ts',
            'html',
            'css',
            'vue',
            'shell',
            'bash',
            'mdc',
            'md',
            'yaml',
            'toml',
            'rust'
          ]
        },
        toc: {
          searchDepth: 1
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },

  hooks: {
    'nitro:config'(nitroConfig) {
      const contentDir = join(__dirname, 'content')
      const rawRoutes = walkMd(contentDir)
        .map(contentPathToRoute)
        .filter((r): r is string => r !== null)
        .map(r => `/raw${r}.md`)

      nitroConfig.prerender ??= {}
      nitroConfig.prerender.routes ??= []
      nitroConfig.prerender.routes.push(...rawRoutes)
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID
  },

  icon: {
    provider: 'iconify'
  },

  llms: {
    domain: 'https://distkit.davidoyinbo.com',
    title: 'distkit',
    description: 'distkit is a Rust toolkit of distributed systems primitives backed by Redis: counters, instance-aware counters, locks, and rate limiting.',
    full: {
      title: 'distkit - Full Documentation',
      description: 'Full documentation for distkit, a Rust toolkit of distributed systems primitives backed by Redis.'
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' }
        ]
      },
      {
        title: 'Concepts',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/concepts%' }
        ]
      },
      {
        title: 'Counters',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/counters%' }
        ]
      },
      {
        title: 'Instance-aware counters',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/instance-aware-counters%' }
        ]
      },
      {
        title: 'Locks',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/locks%' }
        ]
      },
      {
        title: 'Rate limiting',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/rate-limiting%' }
        ]
      },
      {
        title: 'Reference',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/reference%' }
        ]
      }
    ]
  },

  mcp: {
    name: 'distkit docs'
  },

  ogImage: {
    zeroRuntime: true
  },

  robots: {
    // Allow everything; keep crawlers out of the raw markdown exports.
    disallow: ['/raw/'],
    // robots.txt advertises the sitemap automatically via `site.url`.
    sitemap: '/sitemap.xml'
  },

  sitemap: {
    // The raw markdown exports are not real pages.
    exclude: ['/raw/**'],
    // Sensible defaults for a docs site that changes per release.
    defaults: {
      changefreq: 'weekly',
      priority: 0.7
    }
  }
})
