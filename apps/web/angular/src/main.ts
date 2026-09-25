import { bootstrapApplication } from "@angular/platform-browser";
import { provideLingvaAngular } from "@lingva/angular";
import { createDemoRuntimeConfig, resolveDemoLocale } from "@lingva-demo/i18n";
import { AppComponent } from "./app/app.component";
const search = window.location.search;
bootstrapApplication(AppComponent, {
  providers: [
    provideLingvaAngular({
      ...createDemoRuntimeConfig(search),
      locale: resolveDemoLocale(new URLSearchParams(search).get("locale")),
    }),
  ],
}).catch((error: unknown) => console.error(error));
