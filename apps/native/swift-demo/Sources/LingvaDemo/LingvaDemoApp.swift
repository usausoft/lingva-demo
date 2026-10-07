import Foundation
import SwiftUI
import Lingva
import LingvaDemoCore

private enum DemoLocale: String, CaseIterable, Identifiable {
    case english = "en"
    case russian = "ru"

    var id: String { rawValue }
}

private enum DemoConfiguration {
    static let bundleURLTemplateEnvironment = "LINGVA_DEMO_BUNDLE_URL_TEMPLATE"

    static var deliveryTarget: LingvaDeliveryTarget? {
        ProcessInfo.processInfo.environment[bundleURLTemplateEnvironment]
            .flatMap { $0.isEmpty ? nil : LingvaDeliveryTarget(urlTemplate: $0) }
    }
}

@main
struct LingvaDemoApp: App {
    var body: some Scene {
        WindowGroup {
            DemoView()
        }
    }
}

private struct DemoView: View {
    @State private var locale = DemoLocale.english
    @State private var bundle: LingvaBundle?
    private let store = LingvaBundleStore()

    var body: some View {
        Group {
            if let bundle {
                DemoContent(bundle: bundle, locale: $locale)
            } else {
                ContentUnavailableView("Lingva bundle unavailable", systemImage: "exclamationmark.triangle")
            }
        }
        .frame(minWidth: 680, minHeight: 640)
        .task(id: locale) {
            bundle = await loadBundle(locale: locale.rawValue)
        }
    }

    private func loadBundle(locale: String) async -> LingvaBundle? {
        if let target = DemoConfiguration.deliveryTarget,
           let url = try? target.url(locale: locale),
           let hosted = try? await store.refresh(from: url) {
            return hosted
        }
        return try? LingvaBundle.load(locale: locale)
    }
}

private struct DemoContent: View {
    let bundle: LingvaBundle
    @Binding var locale: DemoLocale

    var body: some View {
        ZStack {
            LinearGradient(
                colors: [Color(red: 0.04, green: 0.06, blue: 0.13), Color(red: 0.12, green: 0.06, blue: 0.24)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            VStack(alignment: .leading, spacing: 20) {
                Text(bundle.translate("demo.eyebrow").uppercased())
                    .font(.caption.bold())
                    .tracking(2)
                    .foregroundStyle(.purple.opacity(0.8))

                Text(bundle.translate("demo.title"))
                    .font(.system(size: 52, weight: .bold, design: .rounded))

                Text(bundle.translate("demo.subtitle"))
                    .foregroundStyle(.secondary)

                Text(bundle.translate("demo.greeting", variables: [
                    "name": "Lingva",
                    "framework": bundle.translate("frameworks.swift")
                ]))
                .foregroundStyle(.purple.opacity(0.8))

                HStack(alignment: .bottom, spacing: 16) {
                    VStack(alignment: .leading) {
                        Text(bundle.translate("demo.localeLabel"))
                            .font(.caption.bold())
                        Picker(bundle.translate("demo.localeLabel"), selection: $locale) {
                            ForEach(DemoLocale.allCases) { option in
                                Text(bundle.translate("locales.\(option.rawValue)"))
                                    .tag(option)
                            }
                        }
                        .labelsHidden()
                        .frame(width: 180)
                    }

                    VStack(alignment: .leading) {
                        Text(bundle.translate("demo.frameworkLabel"))
                            .font(.caption.bold())
                        Text(bundle.translate("frameworks.swift"))
                            .padding(.horizontal, 16)
                            .frame(height: 40)
                            .background(.purple.opacity(0.2), in: Capsule())
                    }
                }

                VStack(alignment: .leading, spacing: 8) {
                    Text(bundle.translate("demo.featureTitle"))
                        .font(.headline)
                    Text(bundle.translate("demo.featureBody"))
                        .foregroundStyle(.secondary)
                }
                .padding(22)
                .background(.black.opacity(0.22), in: RoundedRectangle(cornerRadius: 20))

                Link(bundle.translate("demo.cta"), destination: URL(string: "https://docs.lingva.dev")!)
                    .buttonStyle(.borderedProminent)
                    .tint(.purple)
            }
            .padding(48)
            .frame(maxWidth: 620)
            .background(.black.opacity(0.28), in: RoundedRectangle(cornerRadius: 28))
            .padding(32)
        }
        .preferredColorScheme(.dark)
    }
}
