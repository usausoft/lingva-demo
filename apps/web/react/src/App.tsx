import { useEffect } from "react";
import { useLocale, useTranslation } from "@lingva/react";
import {
  DEMO_LOCALES,
  resolveDemoLocale,
  type DemoLocale,
  type resources,
} from "@lingva-demo/i18n";

type DemoResources = typeof resources;
const DOCS_URL = "https://docs.lingva.dev/installation/react";

export function App() {
  const { locale, setLocale } = useLocale<DemoResources>();
  const { t } = useTranslation<DemoResources>();

  useEffect(
    () =>
      setLocale(
        resolveDemoLocale(
          new URLSearchParams(window.location.search).get("locale"),
        ),
      ),
    [setLocale],
  );

  return (
    <main className="demo-page">
      <article className="demo-card">
        <p className="demo-eyebrow">{t("demo.eyebrow")}</p>
        <h1 className="demo-title">{t("demo.title")}</h1>
        <p className="demo-subtitle">{t("demo.subtitle")}</p>
        <p className="demo-greeting">
          {t("demo.greeting", {
            variables: { name: "Ada", framework: t("frameworks.react") },
          })}
        </p>
        <div className="demo-controls">
          <label className="demo-field">
            {t("demo.localeLabel")}
            <select
              className="demo-select"
              value={locale}
              onChange={(event) => setLocale(event.target.value as DemoLocale)}
            >
              <option value={DEMO_LOCALES.english}>{t("locales.en")}</option>
              <option value={DEMO_LOCALES.russian}>{t("locales.ru")}</option>
            </select>
          </label>
          <span className="demo-chip">{t("frameworks.react")}</span>
        </div>
        <section className="demo-feature">
          <h2>{t("demo.featureTitle")}</h2>
          <p>{t("demo.featureBody")}</p>
        </section>
        <a
          className="demo-link"
          href={DOCS_URL}
          target="_blank"
          rel="noreferrer"
        >
          {t("demo.cta")}
        </a>
      </article>
    </main>
  );
}
