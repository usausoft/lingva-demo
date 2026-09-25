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
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
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
import dev.lingva.LingvaBundleStore

class MainActivity : ComponentActivity() {
    private val lingva = LingvaBundleStore()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { LingvaDemo() }
    }

    private fun loadBundle(locale: String): LingvaBundle {
        val resourceId = resources.getIdentifier("lingva_$locale", "raw", packageName)
        val document = resources.openRawResource(resourceId).bufferedReader().use { it.readText() }
        return lingva.load(document)
    }

    @Composable
    private fun LingvaDemo() {
        var locale by remember { mutableStateOf("en") }
        val bundle = remember(locale) { loadBundle(locale) }
        val violet = Color(0xFFA78BFA)

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
                Surface(
                    modifier = Modifier.fillMaxWidth(),
                    color = Color(0xD9111827),
                    shape = RoundedCornerShape(28.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(40.dp),
                        verticalArrangement = Arrangement.spacedBy(20.dp)
                    ) {
                        Text(bundle.translate("demo.eyebrow").uppercase(), color = violet)
                        Text(
                            bundle.translate("demo.title"),
                            color = Color.White,
                            fontSize = 46.sp
                        )
                        Text(bundle.translate("demo.subtitle"), color = Color(0xFFB8C1D9))
                        Text(
                            bundle.translate(
                                "demo.greeting",
                                mapOf(
                                    "name" to "Lingva",
                                    "framework" to bundle.translate("frameworks.kotlin")
                                )
                            ),
                            color = Color(0xFFDDD6FE)
                        )
                        Text(bundle.translate("demo.localeLabel"), color = Color(0xFFA5B4CE))
                        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            listOf("en", "ru").forEach { option ->
                                Button(onClick = { locale = option }) {
                                    Text(bundle.translate("locales.$option"))
                                }
                            }
                        }
                        Surface(color = Color(0x66020617), shape = RoundedCornerShape(20.dp)) {
                            Column(modifier = Modifier.padding(22.dp)) {
                                Text(bundle.translate("demo.featureTitle"), color = Color.White)
                                Text(bundle.translate("demo.featureBody"), color = Color(0xFFB8C1D9))
                            }
                        }
                    }
                }
            }
        }
    }
}
