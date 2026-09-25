<script lang="ts">
  import { DEMO_LOCALES, type DemoLocale } from '@lingva-demo/i18n';
  import { lingva } from './lingva';

  const { loading, locale, setLocale, t } = lingva;
  const docsUrl = 'https://docs.lingva.dev/installation/svelte';

  function changeLocale(event: Event) {
    void setLocale((event.target as HTMLSelectElement).value as DemoLocale);
  }
</script>

<main class="demo-page" aria-busy={$loading}><article class="demo-card">
  <p class="demo-eyebrow">{$t('demo.eyebrow')}</p>
  <h1 class="demo-title">{$t('demo.title')}</h1>
  <p class="demo-subtitle">{$t('demo.subtitle')}</p>
  <p class="demo-greeting">{$t('demo.greeting', { variables: { name: 'Ada', framework: $t('frameworks.svelte') } })}</p>
  <div class="demo-controls">
    <label class="demo-field">{$t('demo.localeLabel')}
      <select class="demo-select" value={$locale} onchange={changeLocale}>
        <option value={DEMO_LOCALES.english}>{$t('locales.en')}</option>
        <option value={DEMO_LOCALES.russian}>{$t('locales.ru')}</option>
      </select>
    </label>
    <span class="demo-chip">{$t('frameworks.svelte')}</span>
  </div>
  <section class="demo-feature"><h2>{$t('demo.featureTitle')}</h2><p>{$t('demo.featureBody')}</p></section>
  <a class="demo-link" href={docsUrl} target="_blank" rel="noreferrer">{$t('demo.cta')}</a>
</article></main>
