plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

val lingvaBundleUrlTemplate = providers.environmentVariable("LINGVA_DEMO_BUNDLE_URL_TEMPLATE").orElse("")

android {
    namespace = "dev.lingva.demo"
    compileSdk = 36

    defaultConfig {
        applicationId = "dev.lingva.demo"
        minSdk = 26
        targetSdk = 36
        versionCode = 1
        versionName = "0.1.0"
        buildConfigField(
            "String",
            "LINGVA_BUNDLE_URL_TEMPLATE",
            "\"${lingvaBundleUrlTemplate.get().replace("\\", "\\\\").replace("\"", "\\\"")}\"",
        )
    }

    buildFeatures {
        buildConfig = true
        compose = true
    }
}

dependencies {
    implementation("dev.lingva:lingva-kotlin:0.1.0-SNAPSHOT")
    implementation(platform("androidx.compose:compose-bom:2025.10.01"))
    implementation("androidx.activity:activity-compose:1.11.0")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")
    debugImplementation("androidx.compose.ui:ui-tooling")
    testImplementation("junit:junit:4.13.2")
}
