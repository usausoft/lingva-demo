import { createLingvaResources, defineLingvaProject } from '@lingva/core';
import enLocale from '../translations/en.json';
import ruLocale from '../translations/ru.json';

export type LingvaProjectResources = {
  readonly 'en': {
    readonly 'demo': {
      readonly 'cta': 'Explore Lingva documentation';
      readonly 'eyebrow': 'Lingva framework laboratory';
      readonly 'featureBody': 'Every application reads the same Lingva keys, interpolation variables, fallback locale, and generated delivery bundles.';
      readonly 'featureTitle': 'Shared localization contract';
      readonly 'frameworkLabel': 'Current implementation';
      readonly 'greeting': 'Hello, {name}! This screen is powered by {framework}.';
      readonly 'loading': 'Loading {framework}…';
      readonly 'localeLabel': 'Language';
      readonly 'nativeHint': 'Swift, Kotlin, and Flutter consume the same versioned Lingva bundle through ecosystem-native SDK previews.';
      readonly 'nativeTitle': 'Native applications';
      readonly 'openStandalone': 'Open standalone';
      readonly 'shellHint': 'Choose an implementation. Each web demo runs as an isolated microfrontend.';
      readonly 'shellTitle': 'Framework demos';
      readonly 'subtitle': 'The same interface and translation contract rendered by independent web and native applications.';
      readonly 'title': 'One product, every framework';
    };
    readonly 'frameworks': {
      readonly 'angular': 'Angular';
      readonly 'flutter': 'Flutter';
      readonly 'kotlin': 'Kotlin';
      readonly 'react': 'React';
      readonly 'svelte': 'Svelte';
      readonly 'swift': 'Swift';
      readonly 'vanilla': 'JavaScript';
      readonly 'vue': 'Vue';
    };
    readonly 'locales': {
      readonly 'en': 'English';
      readonly 'ru': 'Russian';
    };
  };
  readonly 'ru': {
    readonly 'demo': {
      readonly 'cta': 'Открыть документацию Lingva';
      readonly 'eyebrow': 'Лаборатория фреймворков Lingva';
      readonly 'featureBody': 'Все приложения используют одинаковые ключи Lingva, переменные интерполяции, резервный язык и сгенерированные delivery-бандлы.';
      readonly 'featureTitle': 'Единый контракт локализации';
      readonly 'frameworkLabel': 'Текущая реализация';
      readonly 'greeting': 'Привет, {name}! Этот экран работает на {framework}.';
      readonly 'loading': 'Загрузка {framework}…';
      readonly 'localeLabel': 'Язык';
      readonly 'nativeHint': 'Swift, Kotlin и Flutter используют один версионированный Lingva-бандл через нативные preview SDK.';
      readonly 'nativeTitle': 'Нативные приложения';
      readonly 'openStandalone': 'Открыть отдельно';
      readonly 'shellHint': 'Выберите реализацию. Каждое веб-демо работает как изолированный микрофронтенд.';
      readonly 'shellTitle': 'Демо фреймворков';
      readonly 'subtitle': 'Одинаковый интерфейс и контракт переводов в независимых веб- и нативных приложениях.';
      readonly 'title': 'Один продукт для всех фреймворков';
    };
    readonly 'frameworks': {
      readonly 'angular': 'Angular';
      readonly 'flutter': 'Flutter';
      readonly 'kotlin': 'Kotlin';
      readonly 'react': 'React';
      readonly 'svelte': 'Svelte';
      readonly 'swift': 'Swift';
      readonly 'vanilla': 'JavaScript';
      readonly 'vue': 'Vue';
    };
    readonly 'locales': {
      readonly 'en': 'Английский';
      readonly 'ru': 'Русский';
    };
  };
};

export const resources = createLingvaResources({
  en: enLocale,
  ru: ruLocale,
}) as unknown as LingvaProjectResources;

export const project = defineLingvaProject({
  projectId: 'lingva-framework-demo',
  resources,
  defaultLocale: 'en',
  fallbackLocale: 'en',
  environment: 'dev',
  keyMetadata: {
  "demo.cta": {
    "description": "Link label for opening the Lingva documentation",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.eyebrow": {
    "description": "Short product label above the demo title",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.featureBody": {
    "description": "Explanation of the shared localization contract",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.featureTitle": {
    "description": "Heading for the shared localization contract card",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.frameworkLabel": {
    "description": "Label identifying the active framework",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.greeting": {
    "description": "Greeting interpolated with a user and framework name",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team",
    "tags": [
      "demo",
      "interpolation"
    ]
  },
  "demo.loading": {
    "description": "Microfrontend loading feedback interpolated with a framework name",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.localeLabel": {
    "description": "Accessible label for locale controls",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.nativeHint": {
    "description": "Explanation of how native applications consume Lingva bundles",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.nativeTitle": {
    "description": "Heading for the native application list",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.openStandalone": {
    "description": "Link label for opening a microfrontend directly",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.shellHint": {
    "description": "Instructions shown by the microfrontend host",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.shellTitle": {
    "description": "Main heading of the microfrontend host",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.subtitle": {
    "description": "Supporting text shared by every framework demo",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "demo.title": {
    "description": "Primary heading shared by every framework demo",
    "namespace": "demo",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team",
    "tags": [
      "demo",
      "heading"
    ]
  },
  "frameworks.angular": {
    "description": "Display name for the Angular implementation",
    "namespace": "frameworks",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "frameworks.flutter": {
    "description": "Display name for the Flutter implementation",
    "namespace": "frameworks",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "frameworks.kotlin": {
    "description": "Display name for the Kotlin implementation",
    "namespace": "frameworks",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "frameworks.react": {
    "description": "Display name for the React implementation",
    "namespace": "frameworks",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "frameworks.svelte": {
    "description": "Display name for the Svelte implementation",
    "namespace": "frameworks",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "frameworks.swift": {
    "description": "Display name for the Swift implementation",
    "namespace": "frameworks",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "frameworks.vanilla": {
    "description": "Display name for the plain JavaScript implementation",
    "namespace": "frameworks",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "frameworks.vue": {
    "description": "Display name for the Vue implementation",
    "namespace": "frameworks",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "locales.en": {
    "description": "Localized display name for English",
    "namespace": "locales",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  },
  "locales.ru": {
    "description": "Localized display name for Russian",
    "namespace": "locales",
    "status": "approved",
    "translator": "demo-team",
    "reviewer": "demo-team"
  }
},
});

export default project;
