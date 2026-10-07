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
apps/native/swift-demo    SwiftUI + LingvaSwift preview
apps/native/kotlin   Android Compose + dev.lingva preview
apps/native/flutter  Flutter + lingva_flutter preview
packages/i18n        The only Lingva config and translation source
packages/theme       Shared browser presentation (not translation behavior)
```

This JavaScript monorepo intentionally keeps its typed runtime adapter at
`packages/i18n/lingva.config.ts`. The portable cross-language CLI contract is
`lingva.config.yaml`, but maintaining both with identical settings would create
two sources of truth. Root scripts therefore pass the nested TypeScript path
explicitly; zero-argument discovery applies when the selected config is in the
current project root.

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
swift run --package-path apps/native/swift-demo

pnpm test:kotlin
pnpm build:kotlin

pnpm --dir apps/native/flutter exec flutter pub get
pnpm test:flutter
pnpm --dir apps/native/flutter exec flutter run -d chrome
```

`pnpm build:swift` compiles the portable `LingvaDemoVerification` product. Running
the SwiftUI executable requires a full Xcode installation because Apple's
Command Line Tools package does not include the SwiftUI macro plugins.

The Android project includes a checksum-pinned Gradle wrapper. Android Studio
can open `apps/native/kotlin` directly. Flutter includes a web runner so it can
be exercised without first generating platform files.

## Hosted delivery

Deploy the current Lingva AWS stack first; its `PublishArtifactsApiUrl` output
serves authenticated publish operations and authenticated current bundles.
Copy `.env.hosted.example` to `.env.hosted`, then set:

- `LINGVA_DEMO_PUBLISH_API_URL` to the `PublishArtifactsApiUrl` stack output
- `LINGVA_DEMO_PUBLISH_TOKEN` to a server-only `delivery:write` project key,
  authenticated CLI bearer token, or the environment publish operator token
- `LINGVA_DEMO_READ_API_KEY` to a server-only `delivery:read` project key used
  by `hosted:verify`
- `LINGVA_DEMO_BUNDLE_URL_TEMPLATE` to the authenticated current-bundle URL shown in
  the example file

Publish and verify the exact hosted payload against locally generated artifacts:

```bash
pnpm lingva:artifacts
pnpm hosted:publish
pnpm hosted:verify
```

The browser microfrontends default to their packaged local bundles. Lingva
hosted delivery is authenticated, and this demo does not put project keys in a
query string or native binary. A customer application should pass its
read-scoped key through JavaScript runtime configuration, or proxy delivery
through its authenticated backend according to its threat model.

The hosted workflow performs the same operation using the GitHub
`Development` environment. Add `LINGVA_DEMO_PUBLISH_API_URL` and
`LINGVA_DEMO_BUNDLE_URL_TEMPLATE` as environment variables, and
`LINGVA_DEMO_PUBLISH_TOKEN` plus `LINGVA_DEMO_READ_API_KEY` as environment
secrets. Because the Lingva source
repository is currently private, also add repository secret
`LINGVA_REPOSITORY_TOKEN` with read access to `usausoft/lingva`.

The native demos consume Lingva's source-level Swift, Kotlin, and Flutter SDK
previews through local package dependencies. All three validate the versioned
bundle contract and use packaged artifacts. Their preview refresh methods do
not attach Lingva credentials, so direct hosted refresh is intentionally not
presented as production-ready; use an authenticated application backend.

For a self-hosted or customer-proxied URL that does not require an embedded
Lingva key, pass the URL template to each native toolchain as follows:

```bash
export LINGVA_DEMO_BUNDLE_URL_TEMPLATE='https://example.lambda-url.eu-west-1.on.aws/bundles/lingva-framework-demo/dev/latest/{locale}.bundle.json'

LINGVA_DEMO_BUNDLE_URL_TEMPLATE="$LINGVA_DEMO_BUNDLE_URL_TEMPLATE" \
  swift run --package-path apps/native/swift-demo

LINGVA_DEMO_BUNDLE_URL_TEMPLATE="$LINGVA_DEMO_BUNDLE_URL_TEMPLATE" \
  pnpm build:kotlin

pnpm --dir apps/native/flutter exec flutter run -d chrome \
  --dart-define="LINGVA_DEMO_BUNDLE_URL_TEMPLATE=$LINGVA_DEMO_BUNDLE_URL_TEMPLATE"
```

These proxy URLs must not require an embedded Lingva key; native binaries must
never contain project or publish credentials. See
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
