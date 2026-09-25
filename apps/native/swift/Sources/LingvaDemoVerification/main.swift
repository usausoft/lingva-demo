import Lingva
import LingvaDemoCore

let bundle = try LingvaBundle(
    locale: "en",
    defaultLocale: "en",
    generatedAt: "2026-09-25T00:00:00.000Z",
    messages: ["greeting": "Hello, {name}!"],
    sources: ["greeting": "en"],
    variables: ["greeting": ["name"]],
    entries: []
)

precondition(bundle.translate("greeting", variables: ["name": "Ada"]) == "Hello, Ada!")
precondition(bundle.translate("missing") == "missing")
print("LingvaBundle verification passed.")
