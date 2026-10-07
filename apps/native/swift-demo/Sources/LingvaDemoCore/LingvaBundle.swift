import Foundation
import Lingva

public extension LingvaBundle {
    /// Resolves a generated locale bundle from this target's packaged resources.
    static func load(locale: String) throws -> LingvaBundle {
        guard let url = Bundle.module.url(forResource: locale, withExtension: "json") else {
            throw CocoaError(.fileNoSuchFile)
        }

        return try JSONDecoder().decode(LingvaBundle.self, from: Data(contentsOf: url))
    }
}
