<script setup lang="ts">
import { useLingva } from "@lingva/vue";
import {
  DEMO_LOCALES,
  type DemoLocale,
  type resources,
} from "@lingva-demo/i18n";
const { loading, locale, setLocale, t } = useLingva<typeof resources>();
const docsUrl = "https://docs.lingva.dev/installation/vue";
</script>

<template>
  <main class="demo-page" :aria-busy="loading">
    <article class="demo-card">
      <p class="demo-eyebrow">{{ t("demo.eyebrow") }}</p>
      <h1 class="demo-title">{{ t("demo.title") }}</h1>
      <p class="demo-subtitle">{{ t("demo.subtitle") }}</p>
      <p class="demo-greeting">
        {{
          t("demo.greeting", {
            variables: { name: "Ada", framework: t("frameworks.vue") },
          })
        }}
      </p>
      <div class="demo-controls">
        <label class="demo-field"
          >{{ t("demo.localeLabel") }}
          <select
            class="demo-select"
            :value="locale"
            @change="
              setLocale(
                ($event.target as HTMLSelectElement).value as DemoLocale,
              )
            "
          >
            <option :value="DEMO_LOCALES.english">{{ t("locales.en") }}</option>
            <option :value="DEMO_LOCALES.russian">{{ t("locales.ru") }}</option>
          </select>
        </label>
        <span class="demo-chip">{{ t("frameworks.vue") }}</span>
      </div>
      <section class="demo-feature">
        <h2>{{ t("demo.featureTitle") }}</h2>
        <p>{{ t("demo.featureBody") }}</p>
      </section>
      <a class="demo-link" :href="docsUrl" target="_blank" rel="noreferrer">{{
        t("demo.cta")
      }}</a>
    </article>
  </main>
</template>
