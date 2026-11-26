(() => {
  'use strict';
  const fileInput = document.getElementById('csvFile');
  const error = document.getElementById('csvError');
  const result = document.getElementById('csvResult');
  const search = document.getElementById('csvSearch');
  const table = document.getElementById('csvTable');
  const prev = document.getElementById('csvPrev');
  const next = document.getElementById('csvNext');
  const pageInfo = document.getElementById('csvPageInfo');
  const pageSize = 50;
  let headers = [], rows = [], filtered = [], page = 0;

  // Leitura CSV com campos entre aspas, aspas escapadas e quebras de linha.
  function parseCSV(text, separator) {
    const records = []; let record = [], field = '', quoted = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (quoted && text[i + 1] === '"') { field += '"'; i++; }
        else if (quoted) quoted = false;
        else if (field === '') quoted = true;
        else field += c;
      } else if (c === separator && !quoted) {
        record.push(field); field = '';
      } else if ((c === '\n' || c === '\r') && !quoted) {
        if (c === '\r' && text[i + 1] === '\n') i++;
        record.push(field); field = '';
        if (record.some(value => value.trim() !== '')) records.push(record);
        record = [];
      } else field += c;
    }
    if (quoted) throw new Error('O CSV contém aspas sem fechamento.');
    record.push(field);
    if (record.some(value => value.trim() !== '')) records.push(record);
    return records;
  }

  function guessSeparator(text) {
    const candidates = [';', ',', '\t', '|'];
    let winner = ',', best = -Infinity;
    for (const sep of candidates) {
      let sample;
      try { sample = parseCSV(text.slice(0, 150000), sep).slice(0, 15); }
      catch { continue; }
      if (!sample.length) continue;
      const widths = sample.map(r => r.length);
      const common = widths.reduce((a, n) => { a[n] = (a[n] || 0) + 1; return a; }, {});
      const maxWidth = Math.max(...widths);
      const consistency = Math.max(...Object.values(common));
      const score = maxWidth > 1 ? consistency * 10 + maxWidth - (sample.length - consistency) * 15 : -100;
      if (score > best) { best = score; winner = sep; }
    }
    return winner;
  }

  function render() {
    const thead = table.tHead || table.createTHead();
    const tbody = table.tBodies[0] || table.createTBody();
    thead.replaceChildren(); tbody.replaceChildren();
    const headerRow = document.createElement('tr');
    headers.forEach(name => { const th = document.createElement('th'); th.scope = 'col'; th.textContent = name; headerRow.appendChild(th); });
    thead.appendChild(headerRow);
    const start = page * pageSize;
    const fragment = document.createDocumentFragment();
    filtered.slice(start, start + pageSize).forEach(record => {
      const tr = document.createElement('tr');
      headers.forEach((_, i) => { const td = document.createElement('td'); td.textContent = record[i] ?? ''; tr.appendChild(td); });
      fragment.appendChild(tr);
    });
    tbody.appendChild(fragment);
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    pageInfo.textContent = `${filtered.length} linha(s) encontrada(s) • Página ${page + 1} de ${totalPages}`;
    prev.disabled = page === 0;
    next.disabled = page >= totalPages - 1;
    document.getElementById('csvStats').textContent = `${rows.length} linha(s) de dados • ${headers.length} coluna(s)`;
  }

  function applySearch() {
    const query = search.value.toLocaleLowerCase('pt-BR').trim();
    filtered = query ? rows.filter(row => row.some(cell => cell.toLocaleLowerCase('pt-BR').includes(query))) : rows;
    page = 0; render();
  }

  fileInput.addEventListener('change', async () => {
    result.hidden = true; error.hidden = true; search.value = '';
    const file = fileInput.files?.[0]; if (!file) return;
    if (!/\.csv$/i.test(file.name)) { error.textContent = 'Selecione um arquivo com extensão .csv.'; error.hidden = false; return; }
    try {
      let text = await file.text();
      text = text.replace(/^\uFEFF/, '');
      if (!text.trim()) throw new Error('O arquivo CSV está vazio.');
      const parsed = parseCSV(text, guessSeparator(text));
      if (!parsed.length) throw new Error('Não foram encontradas linhas no arquivo.');
      const width = Math.max(...parsed.map(r => r.length));
      headers = Array.from({ length: width }, (_, i) => parsed[0][i]?.trim() || `Coluna ${i + 1}`);
      rows = parsed.slice(1);
      document.getElementById('csvFilename').textContent = file.name;
      result.hidden = false;
      applySearch();
    } catch (e) { error.textContent = `Não foi possível ler o CSV: ${e.message}`; error.hidden = false; }
  });
  search.addEventListener('input', applySearch);
  prev.addEventListener('click', () => { if (page > 0) { page--; render(); } });
  next.addEventListener('click', () => { if ((page + 1) * pageSize < filtered.length) { page++; render(); } });
})();
