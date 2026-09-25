# Lingva multi-framework demo

This repository proves that one Lingva translation contract can drive independent applications written with React, Angular, Vue, Svelte, plain JavaScript, Swift, Kotlin, and Flutter.

The browser experience is a microfrontend laboratory: a React host switches among five separately built and separately served applications through iframe isolation. This deliberately avoids coupling framework runtimes or CSS scopes. Every implementation renders the same content and supports English and Russian.

## Repository layout

```text
apps/web/shell       React microfrontend host (:4100)
apps/web/react       React + @lingva/react (:4101)
apps/web/angular     Angular + @lingva/js adapter (:4102)
apps/web/vue         Vue + @lingva/js composable (:4103)
apps/web/svelte      Svelte + @lingva/js wrapper (:4104)
apps/web/vanilla     Browser TypeScript + @lingva/js (:4105)
apps/native/swift    SwiftUI + LingvaSwift preview
apps/native/kotlin   Android Compose + dev.lingva preview
apps/native/flutter  Flutter + lingva_flutter preview
packages/i18n        The only Lingva config and translation source
packages/theme       Shared browser presentation (not translation behavior)
```

## Prerequisites

- Node.js 26+
- pnpm 10+
- the Lingva source repository at `../lingva`
- Swift 6 / Xcode 16+ for the Swift demo
- Android Studio with JDK 17+ and Android SDK 36 for Kotlin
- Flutter 3.47.2 for Flutter

The Lingva packages are currently linked from the adjacent source repository because they are private packages. Replace the `link:../lingva/...` dependencies with released package versions when public distribution is available.

## First run

Build the locally linked Lingva packages once, then install and start the demo:

```bash
pnpm --dir ../lingva --filter @lingva/core build
pnpm --dir ../lingva --filter @lingva/js build
pnpm --dir ../lingva --filter @lingva/react build
pnpm --dir ../lingva --filter @lingva/cli build
pnpm install
pnpm lingva:sync
pnpm dev
```

Open `http://127.0.0.1:4100`. The host and every microfrontend have their own Lingva runtime. Switching the host locale reloads the selected microfrontend with the same locale; switching inside a microfrontend demonstrates that it remains independently controlled.

## Translation workflow

Edit the default-locale source at `packages/i18n/.lingva/translations/en.json`, then run:

```bash
pnpm lingva:sync
pnpm lingva:check
pnpm lingva:artifacts
```

`lingva:sync` updates the generated typed project and fills missing keys in secondary locales. `lingva:check` validates key, variable, and metadata consistency. `lingva:artifacts` uses the documented Lingva publish command, then copies the generated bundle JSON into each native application's resource convention. Native adapters read the exact publish artifact; they do not maintain separate translations.

## Native applications

Generate fresh resource bundles before opening a native project:

```bash
pnpm lingva:artifacts
```

Run and verify the native applications with:

```bash
pnpm test:swift
swift run --package-path apps/native/swift

pnpm test:kotlin
pnpm build:kotlin

pnpm --dir apps/native/flutter exec flutter pub get
pnpm test:flutter
pnpm --dir apps/native/flutter exec flutter run -d chrome
```

The Android project includes a checksum-pinned Gradle wrapper. Android Studio
can open `apps/native/kotlin` directly. Flutter includes a web runner so it can
be exercised without first generating platform files.

## Hosted delivery

Deploy the current Lingva AWS stack first; its `PublishArtifactsApiUrl` output
now serves both authenticated publish operations and public read-only current
bundles. Copy `.env.hosted.example` to `.env.hosted`, then set:

- `LINGVA_DEMO_PUBLISH_API_URL` to the `PublishArtifactsApiUrl` stack output
- `LINGVA_DEMO_PUBLISH_TOKEN` to a server-only `delivery:write` project key,
  authenticated CLI bearer token, or the environment publish operator token
- `LINGVA_DEMO_BUNDLE_URL_TEMPLATE` to the public current-bundle URL shown in
  the example file

Publish and verify the exact hosted payload against locally generated artifacts:

```bash
pnpm lingva:artifacts
pnpm hosted:publish
pnpm hosted:verify
```

To exercise the browser applications against that hosted bundle, start the demo
and pass the public URL template as the shell's `delivery` query parameter:

```text
http://127.0.0.1:4100/?delivery=https%3A%2F%2Fexample.lambda-url.eu-west-1.on.aws%2Fbundles%2F%7BprojectId%7D%2F%7Benvironment%7D%2Flatest%2F%7Blocale%7D.bundle.json
```

The shell propagates the same public URL to every isolated microfrontend. No
publish token is sent to browser code.

The hosted workflow performs the same operation using the GitHub
`Development` environment. Add `LINGVA_DEMO_PUBLISH_API_URL` and
`LINGVA_DEMO_BUNDLE_URL_TEMPLATE` as environment variables, and
`LINGVA_DEMO_PUBLISH_TOKEN` as an environment secret. Because the Lingva source
repository is currently private, also add repository secret
`LINGVA_REPOSITORY_TOKEN` with read access to `usausoft/lingva`.

The native demos consume Lingva's source-level Swift, Kotlin, and Flutter SDK
previews through local package dependencies. All three validate the versioned
bundle contract, resolve the public URL template, try hosted delivery first,
and fall back to their packaged artifacts when the network is unavailable.

Pass the URL template to each native toolchain as follows:

```bash
export LINGVA_DEMO_BUNDLE_URL_TEMPLATE='https://example.lambda-url.eu-west-1.on.aws/bundles/lingva-framework-demo/dev/latest/{locale}.bundle.json'

LINGVA_DEMO_BUNDLE_URL_TEMPLATE="$LINGVA_DEMO_BUNDLE_URL_TEMPLATE" \
  swift run --package-path apps/native/swift

LINGVA_DEMO_BUNDLE_URL_TEMPLATE="$LINGVA_DEMO_BUNDLE_URL_TEMPLATE" \
  pnpm build:kotlin

pnpm --dir apps/native/flutter exec flutter run -d chrome \
  --dart-define="LINGVA_DEMO_BUNDLE_URL_TEMPLATE=$LINGVA_DEMO_BUNDLE_URL_TEMPLATE"
```

These are public read-only bundle URLs; native binaries must never contain the
publish token. See
[DOCS_AUDIT.md](./DOCS_AUDIT.md) for the documentation findings recorded while
building the demo.

## Verification

```bash
pnpm build
pnpm format:check
```

The complete local build validates Lingva resources, regenerates delivery
artifacts, builds all browser applications, and compiles Swift. CI separately
tests and builds Swift, Android, and Flutter with their supported toolchains.
