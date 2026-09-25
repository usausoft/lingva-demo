import 'package:flutter_test/flutter_test.dart';
import 'package:lingva_flutter/lingva_flutter.dart';

void main() {
  test('interpolates variables and preserves missing keys', () {
    final bundle = LingvaBundle.decode('''
      {
        "schemaVersion": 1,
        "locale": "en",
        "defaultLocale": "en",
        "generatedAt": "2026-09-25T00:00:00.000Z",
        "keyCount": 1,
        "fallbackKeys": [],
        "messages": {"greeting": "Hello, {name}!"},
        "sources": {"greeting": "en"},
        "variables": {"greeting": ["name"]},
        "entries": []
      }
    ''');

    expect(bundle.translate('greeting', values: {'name': 'Ada'}), 'Hello, Ada!');
    expect(bundle.translate('missing'), 'missing');
  });
}
