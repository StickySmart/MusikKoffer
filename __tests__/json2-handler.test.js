require('../scripts/json2-handler'); // registriert globalThis.JSON2H

describe('JSON2 handler', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'blob://y');
    global.URL.revokeObjectURL = jest.fn();
    globalThis.document = { createElement: jest.fn(() => ({ click: jest.fn() })) };
  });

  test('createAction() erstellt gültige Aktion', () => {
    const a = globalThis.JSON2H.createAction(200, 201, 'replace', 'cid-201', 'Text');
    expect(a).toEqual({
      chapter_id: '200',
      cid: '201',
      type: 'replace',
      id: 'cid-201',
      content_md: 'Text'
    });
  });

  test('build() kapselt Aktionen in {actions}', () => {
    const list = [globalThis.JSON2H.createAction(1, 1, 'replace', '1', '')];
    expect(globalThis.JSON2H.build(list)).toEqual({ actions: list });
  });

  test('exportFile() triggert Datei-Download', () => {
    const json2 = { actions: [] };
    globalThis.JSON2H.exportFile(json2, 'Struktur_JSON2.json');

    expect(URL.createObjectURL).toHaveBeenCalled();
    const a = document.createElement.mock.results[0].value;
    expect(a.click).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });
});
