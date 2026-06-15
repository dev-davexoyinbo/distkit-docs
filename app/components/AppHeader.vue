<script setup lang="ts">
import { withBase } from 'ufo'
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { header } = useAppConfig()
const { app } = useRuntimeConfig()

// Resolve logos against the app base URL so they work on subpath deploys
// (e.g. GitHub Pages project sites) without going through @nuxt/image / IPX.
const logoLight = computed(() => header?.logo?.light ? withBase(header.logo.light, app.baseURL) : undefined)
const logoDark = computed(() => header?.logo?.dark ? withBase(header.logo.dark, app.baseURL) : undefined)
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1' }"
    :to="header?.to || '/'"
  >
    <UContentSearchButton
      v-if="header?.search"
      :collapsed="false"
      class="w-full"
    />

    <template
      v-if="header?.logo?.dark || header?.logo?.light || header?.title"
      #title
    >
      <template v-if="logoLight || logoDark">
        <img
          v-if="logoLight"
          :src="logoLight"
          :alt="header?.logo?.alt"
          class="h-6 w-auto shrink-0 dark:hidden"
        >
        <img
          v-if="logoDark"
          :src="logoDark"
          :alt="header?.logo?.alt"
          class="hidden h-6 w-auto shrink-0 dark:block"
        >
      </template>

      <span v-else-if="header?.title">
        {{ header.title }}
      </span>
    </template>

    <template
      v-else
      #left
    >
      <NuxtLink :to="header?.to || '/'">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>

      <TemplateMenu />
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        class="lg:hidden"
      />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #body>
      <UContentNavigation
        highlight
        :navigation="navigation"
      />
    </template>
  </UHeader>
</template>
