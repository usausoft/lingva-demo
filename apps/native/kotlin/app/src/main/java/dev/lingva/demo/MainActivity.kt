package dev.lingva.demo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import dev.lingva.LingvaBundle
import dev.lingva.LingvaDeliveryTarget
import dev.lingva.LingvaBundleStore
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class MainActivity : ComponentActivity() {
    private val lingva = LingvaBundleStore()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { LingvaDemo() }
    }

    private fun loadBundle(locale: String): LingvaBundle {
        val hosted = BuildConfig.LINGVA_BUNDLE_URL_TEMPLATE
            .takeIf(String::isNotBlank)
            ?.let { template ->
                runCatching { lingva.refresh(LingvaDeliveryTarget(template).uri(locale)) }.getOrNull()
            }
        if (hosted != null) return hosted

        val resourceId = resources.getIdentifier("lingva_$locale", "raw", packageName)
        val document = resources.openRawResource(resourceId).bufferedReader().use { it.readText() }
        return lingva.load(document)
    }

    @Composable
    private fun LingvaDemo() {
        var locale by remember { mutableStateOf("en") }
        var bundle by remember { mutableStateOf<LingvaBundle?>(null) }
        val violet = Color(0xFFA78BFA)

        LaunchedEffect(locale) {
            bundle = null
            bundle = withContext(Dispatchers.IO) { loadBundle(locale) }
        }

        MaterialTheme {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .background(
                        Brush.linearGradient(listOf(Color(0xFF0B1020), Color(0xFF24103F)))
                    )
                    .padding(32.dp),
                verticalArrangement = Arrangement.Center
            ) {
                val currentBundle = bundle
                if (currentBundle == null) {
                    CircularProgressIndicator(color = violet)
                    return@Column
                }
                Surface(
                    modifier = Modifier.fillMaxWidth(),
                    color = Color(0xD9111827),
                    shape = RoundedCornerShape(28.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(40.dp),
                        verticalArrangement = Arrangement.spacedBy(20.dp)
                    ) {
                        Text(currentBundle.translate("demo.eyebrow").uppercase(), color = violet)
                        Text(
                            currentBundle.translate("demo.title"),
                            color = Color.White,
                            fontSize = 46.sp
                        )
                        Text(currentBundle.translate("demo.subtitle"), color = Color(0xFFB8C1D9))
                        Text(
                            currentBundle.translate(
                                "demo.greeting",
                                mapOf(
                                    "name" to "Lingva",
                                    "framework" to currentBundle.translate("frameworks.kotlin")
                                )
                            ),
                            color = Color(0xFFDDD6FE)
                        )
                        Text(currentBundle.translate("demo.localeLabel"), color = Color(0xFFA5B4CE))
                        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            listOf("en", "ru").forEach { option ->
                                Button(onClick = { locale = option }) {
                                    Text(currentBundle.translate("locales.$option"))
                                }
                            }
                        }
                        Surface(color = Color(0x66020617), shape = RoundedCornerShape(20.dp)) {
                            Column(modifier = Modifier.padding(22.dp)) {
                                Text(currentBundle.translate("demo.featureTitle"), color = Color.White)
                                Text(currentBundle.translate("demo.featureBody"), color = Color(0xFFB8C1D9))
                            }
                        }
                    }
                }
            }
        }
    }
}
