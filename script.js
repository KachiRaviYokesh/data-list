const data = {
  columns: ['ID', 'Name', 'Email', 'City', 'Country', 'Department', 'Position', 'Salary', 'Age', 'Status'],
  rows: [
    ['1001', 'Sarah Johnson', 'sarah.j@company.com', 'New York', 'USA', 'Engineering', 'Senior Developer', '$95,000', '32', 'Active'],
    ['1002', 'Michael Chen', 'michael.c@company.com', 'San Francisco', 'USA', 'Design', 'UI Designer', '$78,000', '28', 'Active'],
    ['1003', 'Emma Williams', 'emma.w@company.com', 'London', 'UK', 'Marketing', 'Marketing Manager', '$85,000', '35', 'Active'],
    ['1004', 'James Brown', 'james.b@company.com', 'Toronto', 'Canada', 'Sales', 'Sales Representative', '$62,000', '26', 'Active'],
    ['1005', 'Sophia Martinez', 'sophia.m@company.com', 'Berlin', 'Germany', 'Engineering', 'DevOps Engineer', '$88,000', '30', 'Active'],
    ['1006', 'Oliver Davis', 'oliver.d@company.com', 'Sydney', 'Australia', 'Finance', 'Financial Analyst', '$72,000', '29', 'Inactive'],
    ['1007', 'Isabella Garcia', 'isabella.g@company.com', 'Madrid', 'Spain', 'HR', 'HR Coordinator', '$58,000', '27', 'Active'],
    ['1008', 'William Miller', 'william.m@company.com', 'Paris', 'France', 'Engineering', 'Backend Developer', '$82,000', '31', 'Active'],
    ['1009', 'Ava Rodriguez', 'ava.r@company.com', 'Tokyo', 'Japan', 'Design', 'Product Designer', '$76,000', '28', 'Active'],
    ['1010', 'Liam Anderson', 'liam.a@company.com', 'Singapore', 'Singapore', 'Operations', 'Operations Manager', '$92,000', '36', 'Inactive'],
    ['1011', 'Mia Thompson', 'mia.t@company.com', 'Mumbai', 'India', 'Engineering', 'Frontend Developer', '$68,000', '25', 'Active'],
    ['1012', 'Noah White', 'noah.w@company.com', 'Amsterdam', 'Netherlands', 'Marketing', 'Content Strategist', '$64,000', '29', 'Active'],
    ['1013', 'Charlotte Lee', 'charlotte.l@company.com', 'Seoul', 'South Korea', 'Sales', 'Account Executive', '$70,000', '30', 'Active'],
    ['1014', 'Elijah Harris', 'elijah.h@company.com', 'Dublin', 'Ireland', 'Finance', 'Budget Analyst', '$66,000', '28', 'Active'],
    ['1015', 'Amelia Clark', 'amelia.c@company.com', 'Vancouver', 'Canada', 'Engineering', 'Tech Lead', '$105,000', '34', 'Active']
  ]
};

const state = {
  visibleColumns: new Set(data.columns),
  activeSearchColumn: null,
  searchValue: '',
  stickyEnabled: true
};

const els = {
  tableHead: document.getElementById('tableHead'),
  tableBody: document.getElementById('tableBody'),
  dataTable: document.getElementById('dataTable'),
  columnDropdown: document.getElementById('columnDropdown'),
  columnBtn: document.getElementById('columnBtn'),
  stickyBtn: document.getElementById('stickyBtn'),
  themeBtn: document.getElementById('themeBtn'),
  searchPanel: document.getElementById('searchPanel'),
  searchInput: document.getElementById('searchInput'),
  searchLabel: document.getElementById('searchLabel')
};

function getVisibleColumns() {
  return data.columns.filter(col => state.visibleColumns.has(col));
}

function getVisibleIndices() {
  return data.columns.map((col, idx) => state.visibleColumns.has(col) ? idx : -1).filter(idx => idx !== -1);
}

function filterRows() {
  if (!state.activeSearchColumn || !state.searchValue) {
    return data.rows;
  }

  const colIndex = data.columns.indexOf(state.activeSearchColumn);
  return data.rows.filter(row => 
    row[colIndex].toLowerCase().includes(state.searchValue.toLowerCase())
  );
}

function renderTable() {
  const cols = getVisibleColumns();
  const indices = getVisibleIndices();
  
  els.tableHead.innerHTML = `<tr>${cols.map(col => 
    `<th data-col="${col}" class="${state.activeSearchColumn === col ? 'active' : ''}">${col}</th>`
  ).join('')}</tr>`;

  const filtered = filterRows();
  els.tableBody.innerHTML = filtered.map(row => {
    const cells = indices.map(idx => row[idx]).join('</td><td>');
    return `<tr><td>${cells}</td></tr>`;
  }).join('');

  updateStickyClass();
}

function renderColumnSelector() {
  els.columnDropdown.innerHTML = data.columns.map(col => `
    <label class="column-option">
      <input type="checkbox" ${state.visibleColumns.has(col) ? 'checked' : ''} data-col="${col}">
      ${col}
    </label>
  `).join('');
}

function updateStickyClass() {
  els.dataTable.classList.toggle('sticky-first', state.stickyEnabled);
  els.dataTable.classList.toggle('sticky-last', state.stickyEnabled);
}

function showSearchPanel(column) {
  state.activeSearchColumn = column;
  state.searchValue = '';
  els.searchLabel.textContent = `Search ${column}`;
  els.searchInput.value = '';
  els.searchPanel.classList.add('show');
  els.searchInput.focus();
  renderTable();
}

function hideSearchPanel() {
  state.activeSearchColumn = null;
  state.searchValue = '';
  els.searchPanel.classList.remove('show');
  renderTable();
}

els.tableHead.addEventListener('click', (e) => {
  const th = e.target.closest('th');
  if (!th) return;
  
  const col = th.dataset.col;
  if (!col) return;

  if (state.activeSearchColumn === col) {
    hideSearchPanel();
  } else {
    showSearchPanel(col);
  }
});

els.searchInput.addEventListener('input', (e) => {
  state.searchValue = e.target.value;
  renderTable();
});

els.columnBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  els.columnDropdown.classList.toggle('show');
});

els.columnDropdown.addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    const col = e.target.dataset.col;
    if (e.target.checked) {
      state.visibleColumns.add(col);
    } else {
      state.visibleColumns.delete(col);
      if (state.activeSearchColumn === col) {
        hideSearchPanel();
      }
    }
    renderTable();
  }
});

els.stickyBtn.addEventListener('click', () => {
  state.stickyEnabled = !state.stickyEnabled;
  updateStickyClass();
});

els.themeBtn.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.column-selector')) {
    els.columnDropdown.classList.remove('show');
  }
});

renderColumnSelector();
renderTable();