import { ChangeDetectionStrategy, Component } from "@angular/core";
import { injectLingva } from "@lingva/angular";
import {
  DEMO_LOCALES,
  type DemoLocale,
  type resources,
} from "@lingva-demo/i18n";

@Component({
  selector: "app-root",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="demo-page" [attr.aria-busy]="lingva.loading()">
      <article class="demo-card">
        <p class="demo-eyebrow">{{ lingva.t("demo.eyebrow") }}</p>
        <h1 class="demo-title">{{ lingva.t("demo.title") }}</h1>
        <p class="demo-subtitle">{{ lingva.t("demo.subtitle") }}</p>
        <p class="demo-greeting">
          {{
            lingva.t("demo.greeting", {
              variables: {
                name: "Ada",
                framework: lingva.t("frameworks.angular"),
              },
            })
          }}
        </p>
        <div class="demo-controls">
          <label class="demo-field"
            >{{ lingva.t("demo.localeLabel") }}
            <select
              class="demo-select"
              [value]="lingva.locale()"
              (change)="changeLocale($event)"
            >
              <option [value]="locales.english">
                {{ lingva.t("locales.en") }}
              </option>
              <option [value]="locales.russian">
                {{ lingva.t("locales.ru") }}
              </option>
            </select>
          </label>
          <span class="demo-chip">{{ lingva.t("frameworks.angular") }}</span>
        </div>
        <section class="demo-feature">
          <h2>{{ lingva.t("demo.featureTitle") }}</h2>
          <p>{{ lingva.t("demo.featureBody") }}</p>
        </section>
        <a
          class="demo-link"
          href="https://docs.lingva.dev/installation/angular"
          target="_blank"
          rel="noreferrer"
          >{{ lingva.t("demo.cta") }}</a
        >
      </article>
    </main>
  `,
})
export class AppComponent {
  readonly lingva = injectLingva<typeof resources>();
  readonly locales = DEMO_LOCALES;
  changeLocale(event: Event) {
    void this.lingva.setLocale(
      (event.target as HTMLSelectElement).value as DemoLocale,
    );
  }
}
