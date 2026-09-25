package dev.lingva.demo

import dev.lingva.LingvaBundle
import org.junit.Assert.assertEquals
import org.junit.Test

class LingvaBundleTest {
    @Test
    fun interpolatesVariablesAndPreservesMissingKeys() {
        val bundle = LingvaBundle(
            schemaVersion = 1,
            locale = "en",
            defaultLocale = "en",
            generatedAt = "2026-09-25T00:00:00.000Z",
            keyCount = 1,
            fallbackKeys = emptyList(),
            messages = mapOf("greeting" to "Hello, {name}!"),
            sources = mapOf("greeting" to "en"),
            variables = mapOf("greeting" to listOf("name")),
            entries = emptyList(),
        )

        assertEquals("Hello, Ada!", bundle.translate("greeting", mapOf("name" to "Ada")))
        assertEquals("missing", bundle.translate("missing"))
    }
}
