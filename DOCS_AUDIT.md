# Lingva public documentation audit

This audit records what was learned by implementing the demo from Lingva's public installation documentation. It distinguishes confirmed behavior from missing product surface rather than presenting planned adapters as available.

## Confirmed

- The local-first workflow (`lingva.config.ts` → translation JSON → `lingva sync` → generated project) supports a shared monorepo translation package.
- React works through the documented `LingvaProvider`, `useLocale`, and `useTranslation` APIs.
- Plain JavaScript works through the documented `createLingvaJsRuntime` API.
- Angular, Vue, and Svelte now have first-class framework adapters and runnable SSR/browser references.
- Publish artifacts provide a portable manifest and one JSON bundle per locale, making them suitable as the contract for non-JavaScript consumers.
- Swift, Kotlin, and Flutter source previews now validate the versioned contract, resolve the documented hosted URL placeholders, and preserve the last valid bundle after a failed refresh.

## Defects found

1. `installation/cdn.md` imported `configureLingva` from `@lingva/js`, but the package exports `configureLingvaJs`.
2. The hosted platform persisted bundles in private S3 without exposing a public read-only current-bundle route, so the documented browser CDN flow was incomplete.
3. The hosted verification recipe used `lingva pull` as a remote smoke test, although the current command reads the configured local source.
4. The public docs did not describe the publish bundle JSON schema as a native-consumer boundary.
5. Generated projects imported translations from JSON without preserving literal message types, so `TranslationVariables` resolved to `Record<string, never>`.
6. `@lingva/react` declared `react-dom` only as a development dependency. The package builder consequently bundled its CommonJS bridge into the ESM artifact and emitted a browser-fatal `node:module/createRequire` import.

The CDN example, hosted read path, verification guidance, native bundle
contract, missing React peer declaration, and generated interpolation typing
were corrected in the adjacent Lingva source repository while building this
demo.

## Coverage gaps

- Native clients are source previews rather than registry-published stable packages. Their local package shapes and release gate are now CI-verified, but external publication remains deliberately disabled.
- Persistent cache, signature/integrity, plural, rich-message, and platform lifecycle policies remain intentionally undefined.

## Recommended documentation additions

1. Publish the native previews only after registry release automation and compatibility guarantees exist.
2. Add signed artifacts and documented persistent cache/refresh behavior if private or offline-sensitive delivery becomes a requirement.
3. Run every documentation snippet as part of CI so renamed exports cannot drift unnoticed.
