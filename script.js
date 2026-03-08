const OPEN_STATUS_IMG   = 'assets/Open-Status.png';
const CLOSED_STATUS_IMG = 'assets/Closed-Status.png';

const API_BASE = 'https://phi-lab-server.vercel.app/api/v1/lab';

let allIssues      = [];
let currentFilter  = 'all';
let searchQuery    = '';
let searchDebounce = null;

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('login-btn').addEventListener('click', handleLogin);
  document.getElementById('password-input').addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
  document.getElementById('username-input').addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      if (searchQuery) {
        searchIssues(searchQuery);
      } else if (currentFilter === 'all') {
        loadIssues();
      } else {
        loadIssuesByStatus(currentFilter);
      }
    });
  });

  document.getElementById('search-input').addEventListener('input', e => {
    clearTimeout(searchDebounce);
    searchQuery = e.target.value.trim();
    searchDebounce = setTimeout(() => {
      if (searchQuery.length > 0) {
        searchIssues(searchQuery);
      } else {
        if (currentFilter === 'all') loadIssues();
        else loadIssuesByStatus(currentFilter);
      }
    }, 400);
  });

  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('issue-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});

function handleLogin() {
  const username = document.getElementById('username-input').value.trim();
  const password = document.getElementById('password-input').value.trim();
  const errorEl  = document.getElementById('login-error');

  if (username === 'admin' && password === 'admin123') {
    errorEl.classList.remove('show');
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('main-page').style.display  = 'block';
    loadIssues();
  } else {
    errorEl.classList.add('show');
  }
}

async function loadIssues() {
  showLoading();
  try {
    const res  = await fetch(`${API_BASE}/issues`);
    const data = await res.json();
    allIssues  = Array.isArray(data) ? data : (data.issues || data.data || []);
    renderCards(allIssues);
  } catch (err) {
    showError('Failed to load issues. Please try again.');
  }
}

async function loadIssuesByStatus(status) {
  showLoading();
  try {
    const res  = await fetch(`${API_BASE}/issues`);
    const data = await res.json();
    allIssues  = Array.isArray(data) ? data : (data.issues || data.data || []);
    const filtered = allIssues.filter(i => (i.status || '').toLowerCase() === status);
    renderCards(filtered);
  } catch (err) {
    showError('Failed to load issues. Please try again.');
  }
}

async function searchIssues(q) {
  showLoading();
  try {
    const res    = await fetch(`${API_BASE}/issues/search?q=${encodeURIComponent(q)}`);
    const data   = await res.json();
    const issues = Array.isArray(data) ? data : (data.issues || data.data || []);
    const filtered = currentFilter !== 'all'
      ? issues.filter(i => (i.status || '').toLowerCase() === currentFilter)
      : issues;
    renderCards(filtered);
  } catch (err) {
    showError('Search failed. Please try again.');
  }
}

function showLoading() {
  document.getElementById('cards-container').innerHTML =
    '<div class="spinner-wrapper"><div class="spinner"></div></div>';
  document.getElementById('issues-count').textContent = '— Issues';
  document.getElementById('open-count').textContent   = '—';
  document.getElementById('closed-count').textContent = '—';
}

function showError(msg) {
  document.getElementById('cards-container').innerHTML =
    `<div class="empty-state">${msg}</div>`;
}

function renderCards(issues) {
  const container   = document.getElementById('cards-container');
  const openCount   = issues.filter(i => (i.status || '').toLowerCase() === 'open').length;
  const closedCount = issues.filter(i => (i.status || '').toLowerCase() === 'closed').length;

  document.getElementById('issues-count').textContent =
    `${issues.length} Issue${issues.length !== 1 ? 's' : ''}`;
  document.getElementById('open-count').textContent   = openCount;
  document.getElementById('closed-count').textContent = closedCount;

  if (issues.length === 0) {
    container.innerHTML = '<div class="empty-state">No issues found.</div>';
    return;
  }

  container.innerHTML = `<div class="cards-grid">${issues.map(buildCard).join('')}</div>`;
  container.querySelectorAll('.issue-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
  });
}

function buildCard(issue) {
  const status    = (issue.status   || 'open').toLowerCase();
  const priority  = (issue.priority || 'medium').toLowerCase();
  const labels    = Array.isArray(issue.labels) ? issue.labels : (issue.label ? [issue.label] : []);
  const statusImg = status === 'closed' ? CLOSED_STATUS_IMG : OPEN_STATUS_IMG;
  const desc      = issue.description || issue.body || '';
  const shortDesc = desc.length > 80 ? desc.slice(0, 80) + '…' : desc;
  const author    = issue.author || issue.user?.login || issue.createdBy || 'unknown';
  const date      = issue.createdAt || issue.created_at || '';
  const fmtDate   = date ? new Date(date).toLocaleDateString() : '';
  const category  = issue.category || '';

  return `
    <div class="issue-card ${status}" data-id="${issue.id || issue._id}">
      <div class="card-top">
        <div class="card-meta">
          <img class="card-status-img" src="${statusImg}" alt="${status}" />
          <span class="priority-badge priority-${priority}">${priority}</span>
        </div>
        <div class="card-content">
          <div class="card-title">${escHtml(issue.title || '')}</div>
          <div class="card-desc">${escHtml(shortDesc)}</div>
        </div>
        <div class="card-labels">
          ${labels.map(l => `<span class="label-badge ${getLabelClass(l)}">${escHtml(l)}</span>`).join('')}
          ${category ? `<span class="label-badge ${getLabelClass(category)}">${escHtml(category)}</span>` : ''}
        </div>
      </div>
      <div class="card-bottom">
        <div class="card-mini">#${issue.id || issue._id || '?'} by ${escHtml(String(author))}</div>
        <div class="card-mini">${fmtDate}</div>
      </div>
    </div>`;
}

function getLabelClass(label) {
  const l = (label || '').toLowerCase().replace(/\s+/g, '-');
  const map = {
    'bug':           'label-bug',
    'enhancement':   'label-enhancement',
    'documentation': 'label-documentation',
    'question':      'label-question',
    'help-wanted':   'label-help-wanted',
  };
  return map[l] || 'label-default';
}

async function openModal(id) {
  const overlay = document.getElementById('issue-modal');
  overlay.classList.add('open');

  let issue = allIssues.find(i => String(i.id || i._id) === String(id));

  if (!issue) {
    try {
      const res  = await fetch(`${API_BASE}/issue/${id}`);
      const data = await res.json();
      issue = data.issue || data.data || data;
    } catch (err) { console.error(err); }
  }

  if (!issue) return;

  const status   = (issue.status   || 'open').toLowerCase();
  const priority = (issue.priority || 'medium').toLowerCase();
  const labels   = Array.isArray(issue.labels) ? issue.labels : (issue.label ? [issue.label] : []);
  const author   = issue.author || issue.user?.login || issue.createdBy || 'unknown';
  const date     = issue.createdAt || issue.created_at || '';
  const fmtDate  = date ? new Date(date).toLocaleDateString() : '';
  const assignee = issue.assignee || issue.assignees?.[0]?.login || 'Unassigned';
  const category = issue.category || '';
  const desc     = issue.description || issue.body || 'No description provided.';

  document.getElementById('modal-status-badge').textContent =
    status === 'open' ? '● Open' : '✓ Closed';
  document.getElementById('modal-status-badge').className = `modal-status-badge ${status}`;
  document.getElementById('modal-title').textContent = issue.title || '';
  document.getElementById('modal-meta').innerHTML = `
    <span>#${issue.id || issue._id}</span>
    <span class="modal-meta-dot"></span>
    <span>By ${escHtml(String(author))}</span>
    <span class="modal-meta-dot"></span>
    <span>${fmtDate}</span>`;

  const allLabels = [...labels, ...(category ? [category] : [])];
  document.getElementById('modal-labels').innerHTML = allLabels
    .map(l => `<span class="label-badge ${getLabelClass(l)}">${escHtml(l)}</span>`)
    .join('');

  document.getElementById('modal-body').textContent = desc;

  document.getElementById('modal-info').innerHTML = `
    <div class="modal-info-item">
      <span class="modal-info-label">Assignee</span>
      <span class="modal-info-value">${escHtml(String(assignee))}</span>
    </div>
    <div class="modal-info-item">
      <span class="modal-info-label">Priority</span>
      <span class="priority-badge priority-${priority}" style="margin-top:2px;">${priority}</span>
    </div>
    <div class="modal-info-item">
      <span class="modal-info-label">Status</span>
      <span class="modal-info-value" style="text-transform:capitalize;">${status}</span>
    </div>
    <div class="modal-info-item">
      <span class="modal-info-label">Created</span>
      <span class="modal-info-value">${fmtDate}</span>
    </div>`;
}

function closeModal() {
  document.getElementById('issue-modal').classList.remove('open');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}