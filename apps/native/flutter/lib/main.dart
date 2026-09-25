import 'package:flutter/material.dart';
import 'package:lingva_flutter/lingva_flutter.dart';

abstract final class DemoConfiguration {
  static const bundleUrlTemplate = String.fromEnvironment(
    'LINGVA_DEMO_BUNDLE_URL_TEMPLATE',
  );
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const LingvaDemoApp());
}

class LingvaDemoApp extends StatelessWidget {
  const LingvaDemoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(useMaterial3: true).copyWith(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFA78BFA),
          brightness: Brightness.dark,
        ),
      ),
      home: const DemoScreen(),
    );
  }
}

class DemoScreen extends StatefulWidget {
  const DemoScreen({super.key});

  @override
  State<DemoScreen> createState() => _DemoScreenState();
}

class _DemoScreenState extends State<DemoScreen> {
  final lingva = LingvaBundleController();
  var locale = 'en';
  late Future<LingvaBundle> bundle;

  Future<LingvaBundle> loadBundle(String nextLocale) async {
    if (DemoConfiguration.bundleUrlTemplate.isNotEmpty) {
      try {
        final target = LingvaDeliveryTarget(
          uriTemplate: DemoConfiguration.bundleUrlTemplate,
        );
        return await lingva.refresh(target.uri(nextLocale));
      } on Object {
        // Packaged artifacts keep the app usable when hosted delivery is unavailable.
      }
    }
    return lingva.loadAsset('assets/i18n/$nextLocale.json');
  }

  @override
  void initState() {
    super.initState();
    bundle = loadBundle(locale);
  }

  void selectLocale(String nextLocale) {
    if (nextLocale == locale) return;
    setState(() {
      locale = nextLocale;
      bundle = loadBundle(nextLocale);
    });
  }

  @override
  void dispose() {
    lingva.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: bundle,
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }

        final bundle = snapshot.requireData;
        return Scaffold(
          body: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF0B1020), Color(0xFF24103F)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(32),
                child: Container(
                  constraints: const BoxConstraints(maxWidth: 760),
                  padding: const EdgeInsets.all(48),
                  decoration: BoxDecoration(
                    color: const Color(0xD9111827),
                    borderRadius: BorderRadius.circular(28),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        bundle.translate('demo.eyebrow').toUpperCase(),
                        style: const TextStyle(color: Color(0xFFA78BFA)),
                      ),
                      const SizedBox(height: 18),
                      Text(
                        bundle.translate('demo.title'),
                        style: Theme.of(context).textTheme.displayMedium,
                      ),
                      const SizedBox(height: 22),
                      Text(bundle.translate('demo.subtitle')),
                      const SizedBox(height: 20),
                      Text(
                        bundle.translate('demo.greeting', values: {
                          'name': 'Lingva',
                          'framework': bundle.translate('frameworks.flutter'),
                        }),
                        style: const TextStyle(color: Color(0xFFDDD6FE)),
                      ),
                      const SizedBox(height: 30),
                      Text(bundle.translate('demo.localeLabel')),
                      Wrap(
                        spacing: 12,
                        children: ['en', 'ru'].map((option) {
                          return ChoiceChip(
                            label: Text(bundle.translate('locales.$option')),
                            selected: locale == option,
                            onSelected: (_) => selectLocale(option),
                          );
                        }).toList(),
                      ),
                      const SizedBox(height: 30),
                      Card(
                        child: Padding(
                          padding: const EdgeInsets.all(22),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                bundle.translate('demo.featureTitle'),
                                style: Theme.of(context).textTheme.titleMedium,
                              ),
                              const SizedBox(height: 8),
                              Text(bundle.translate('demo.featureBody')),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
