// swift-tools-version: 6.0

import PackageDescription

let package = Package(
    name: "LingvaDemo",
    platforms: [.macOS(.v14)],
    dependencies: [
        .package(name: "LingvaSwift", path: "../../../../lingva/sdks/swift")
    ],
    products: [
        .executable(name: "LingvaDemo", targets: ["LingvaDemo"])
    ],
    targets: [
        .executableTarget(
            name: "LingvaDemo",
            dependencies: [
                "LingvaDemoCore",
                .product(name: "Lingva", package: "LingvaSwift")
            ]
        ),
        .target(
            name: "LingvaDemoCore",
            dependencies: [
                .product(name: "Lingva", package: "LingvaSwift")
            ],
            resources: [.process("Resources")]
        ),
        .executableTarget(
            name: "LingvaDemoVerification",
            dependencies: [
                "LingvaDemoCore",
                .product(name: "Lingva", package: "LingvaSwift")
            ]
        )
    ]
)
