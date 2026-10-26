(() => {
  'use strict';
  // Embedded browsers may route link clicks outside the document. Give those
  // routers absolute URLs while retaining portable relative URLs in the files.
  for (const anchor of document.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#')) continue;
    const resolved = new URL(href, document.baseURI);
    if (resolved.origin === location.origin) anchor.href = resolved.href;
    if (anchor.hasAttribute('download') && resolved.origin === location.origin) {
      anchor.addEventListener('click', async event => {
        if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        event.stopPropagation();
        try {
          const response = await fetch(resolved.href);
          if (!response.ok) throw new Error('download unavailable');
          // Explicit attachment MIME also works in embedded browsers that open
          // JSON/Markdown links in an editor instead of honoring `download`.
          const url = URL.createObjectURL(new Blob([await response.arrayBuffer()], {type:'application/octet-stream'}));
          const link = document.createElement('a');
          link.href = url;
          link.download = resolved.pathname.split('/').pop();
          document.body.append(link);
          link.click();
          link.remove();
          setTimeout(() => URL.revokeObjectURL(url), 10000);
        } catch {
          let notice = document.querySelector('#download-notice');
          if (!notice) {
            notice = document.createElement('p');
            notice.id = 'download-notice';
            notice.className = 'notice';
            notice.setAttribute('role', 'alert');
            document.querySelector('main').prepend(notice);
          }
          notice.textContent = '下载暂时未完成，请稍后重试。';
        }
      });
    }
  }
  const form = document.querySelector('#library-filters');
  if (!form) return;
  const grid = document.querySelector('#paper-grid');
  const cards = Array.from(grid.querySelectorAll('.paper-card'));
  const fields = ['q', 'topic', 'status', 'since', 'until', 'sort'];
  const pageSize = 24;
  const pager = document.querySelector('#pagination');
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-results');
  const search = new Map(cards.map(c => [c, c.dataset.search.normalize('NFKC').toLocaleLowerCase()]));
  let page = 1;
  let filtered = cards;

  function restore() {
    const params = new URLSearchParams(location.search);
    for (const name of fields) {
      const field = form.elements.namedItem(name);
      const value = params.get(name);
      if (value !== null) field.value = value;
    }
    page = Math.max(1, Number.parseInt(params.get('page') || '1', 10) || 1);
    update(false);
  }

  function update(writeUrl = true) {
    const get = name => form.elements.namedItem(name).value;
    const query = get('q').trim().normalize('NFKC').toLocaleLowerCase().split(/\s+/u).filter(Boolean);
    filtered = cards.filter(c => query.every(word => search.get(c).includes(word)) &&
      (!get('topic') || c.dataset.topics.split(' ').includes(get('topic'))) &&
      (!get('status') || c.dataset.status === get('status')) &&
      (!get('since') || c.dataset.submitted >= get('since')) &&
      (!get('until') || c.dataset.submitted <= get('until')));
    const sort = get('sort');
    if (sort === 'updated') filtered.sort((a, b) => b.dataset.updated.localeCompare(a.dataset.updated));
    if (sort === 'submitted') filtered.sort((a, b) => b.dataset.submitted.localeCompare(a.dataset.submitted));
    if (sort === 'title') filtered.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
    const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
    page = Math.min(page, pages);
    cards.forEach(c => { c.hidden = true; });
    filtered.slice((page - 1) * pageSize, page * pageSize).forEach(c => { grid.append(c); c.hidden = false; });
    count.textContent = `${filtered.length} 篇论文${filtered.length === cards.length ? '' : ` / 共 ${cards.length} 篇`}`;
    empty.hidden = filtered.length !== 0;
    pager.hidden = pages <= 1;
    document.querySelector('#page-label').textContent = `第 ${page} / ${pages} 页`;
    pager.querySelector('[data-page="prev"]').disabled = page <= 1;
    pager.querySelector('[data-page="next"]').disabled = page >= pages;
    if (writeUrl) {
      const params = new URLSearchParams();
      for (const name of fields) {
        const value = get(name);
        if (value && !(name === 'sort' && value === 'priority')) params.set(name, value);
      }
      if (page > 1) params.set('page', String(page));
      history.replaceState(null, '', location.pathname + (params.size ? '?' + params : ''));
    }
  }

  form.addEventListener('submit', event => { event.preventDefault(); page = 1; update(); });
  form.addEventListener('input', () => { page = 1; update(); });
  form.addEventListener('change', () => { page = 1; update(); });
  form.addEventListener('reset', () => requestAnimationFrame(() => { page = 1; update(); }));
  pager.addEventListener('click', event => {
    const button = event.target.closest('[data-page]');
    if (!button || button.disabled) return;
    page += button.dataset.page === 'next' ? 1 : -1;
    update();
    form.scrollIntoView({block: 'start', behavior: 'smooth'});
  });
  window.addEventListener('popstate', restore);
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      event.preventDefault(); form.elements.namedItem('q').focus();
    }
  });
  restore();
})();
