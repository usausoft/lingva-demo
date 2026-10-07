// swift-tools-version: 6.0

import PackageDescription

let package = Package(
    name: "LingvaDemo",
    platforms: [.macOS(.v14)],
    products: [
        .executable(name: "LingvaDemo", targets: ["LingvaDemo"])
    ],
    dependencies: [
        .package(path: "../../../../lingva/sdks/swift")
    ],
    targets: [
        .executableTarget(
            name: "LingvaDemo",
            dependencies: [
                "LingvaDemoCore",
                .product(name: "Lingva", package: "swift")
            ]
        ),
        .target(
            name: "LingvaDemoCore",
            dependencies: [
                .product(name: "Lingva", package: "swift")
            ],
            resources: [.process("Resources")]
        ),
        .executableTarget(
            name: "LingvaDemoVerification",
            dependencies: [
                "LingvaDemoCore",
                .product(name: "Lingva", package: "swift")
            ]
        )
    ]
)
