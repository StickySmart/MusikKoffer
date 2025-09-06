const { parseYAML, applyJson } = require('../scripts/apply-json'); // Pfad stimmt mit deiner Struktur

describe('apply-json engine', () => {
  test('parseYAML – liest einfache Werte korrekt', () => {
    const y = `
      a: 1
      b: true
      c: false
      d: "text"
      e: null
    `;
    expect(parseYAML(y)).toEqual({ a: 1, b: true, c: false, d: 'text', e: null });
  });

  test('replace_block – ersetzt Inhalt zwischen Blockankern', () => {
    const files = {
      'chapters/100_intro.md':
        'Start\n<!-- cid:101:start -->ALT<!-- cid:101:end -->\nEnde\n'
    };

    const json2 = { actions: [
      { chapter_id: 100, cid: 101, type: 'replace_block', content_md: 'NEU' }
    ]};

    const res = applyJson({ json2, files, configYAML: '' });

    expect(res.files['chapters/100_intro.md'])
      .toBe('Start\n<!-- cid:101:start -->\nNEU\n<!-- cid:101:end -->\nEnde\n');
    expect(res.changelog.some(c => c.status === 'applied')).toBe(true);
  });

  test('insert_before – erzeugt Single-Anker wenn erlaubt', () => {
    const files = { 'chapters/100_intro.md': 'Text\n' };
    const cfg = `
      defaults:
        insert_if_missing_anchor: true
    `;
    const json2 = { actions: [
      { chapter_id: 100, cid: 150, type: 'insert_before', content_md: 'EINSCHUB' }
    ]};

    const out = applyJson({ json2, files, configYAML: cfg });
    expect(out.files['chapters/100_intro.md']).toContain('EINSCHUB');
    expect(out.files['chapters/100_intro.md']).toContain('<!-- cid:150 -->');
  });

  test('Validierung – cid außerhalb Kapitelbereich wird abgelehnt', () => {
    const files = { 'chapters/200_chapter.md': 'X\n' };
    const cfg = `
      validation:
        cid_rule: true
    `;
    const json2 = { actions: [
      // cid 50 passt NICHT in 200..299
      { chapter_id: 200, cid: 50, type: 'replace', content_md: 'IGNORIEREN' }
    ]};

    const out = applyJson({ json2, files, configYAML: cfg });
    expect(out.changelog.some(c => c.status === 'error')).toBe(true);
    expect(out.files['chapters/200_chapter.md']).toBe('X\n');
  });
});
