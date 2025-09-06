// Lädt die Browser-Variante, registriert window.JSON1
require('../scripts/json1-handler');

describe('JSON1 handler (browser helpers)', () => {
  beforeEach(() => {
    // fetch mocken
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ comments: [
        { chapter_id: '100', cid: '101', status: 'todo' },
        { chapter_id: '200', cid: '201', status: 'todo' }
      ] })
    });

    // Blob und URL sind in jsdom/Node vorhanden, aber createObjectURL/revoke mocken
    global.URL.createObjectURL = jest.fn(() => 'blob://x');
    global.URL.revokeObjectURL = jest.fn();

    // <a> mit klickbarem Link mocken
    document.createElement = jest.fn(() => ({ click: jest.fn() }));
  });

  test('load() lädt Kommentare via fetch', async () => {
    const data = await window.JSON1.load('imports/Struktur_JSON1.json');
    expect(fetch).toHaveBeenCalled();
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(2);
  });

  test('filterByChapter() filtert nach chapter_id', () => {
    const list = [
      { chapter_id: '100', cid: '1' },
      { chapter_id: '200', cid: '2' }
    ];
    const res = window.JSON1.filterByChapter(list, '100');
    expect(res).toEqual([{ chapter_id: '100', cid: '1' }]);
  });

  test('markDone() setzt status=done', () => {
    const list = [{ chapter_id: '100', cid: '1', status: 'todo' }];
    const out = window.JSON1.markDone(list, '1');
    expect(out[0].status).toBe('done');
  });

  test('exportFile() erzeugt Download über <a> und Blob-URL', () => {
    const comments = [{ chapter_id: '100', cid: '1', status: 'done' }];
    window.JSON1.exportFile(comments, 'Struktur_JSON1.json');

    expect(URL.createObjectURL).toHaveBeenCalled();
    // a.click() wurde aufgerufen
    const a = document.createElement.mock.results[0].value;
    expect(a.click).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });
});
