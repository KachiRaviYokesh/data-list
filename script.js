const data = {
  columns: ['ID', 'Song Name', 'Movie Name', 'Music Director', 'Movie Director', 'Artist', 'Singers', 'Lyricist', 'Language'],
  rows: [
    ['1001', 'Tum Hi Ho', 'Aashiqui 2', 'Mithoon', 'Mohit Suri', 'Arijit Singh', 'Arijit Singh', 'Mithoon', 'Hindi'],
    ['1002', 'Chaiyya Chaiyya', 'Dil Se..', 'A. R. Rahman', 'Mani Ratnam', 'Shah Rukh Khan', 'Sukhwinder Singh, Sapna Awasthi', 'Gulzar', 'Hindi'],
    ['1003', 'Kal Ho Naa Ho', 'Kal Ho Naa Ho', 'Shankar-Ehsaan-Loy', 'Nikkhil Advani', 'Sonu Nigam', 'Sonu Nigam', 'Javed Akhtar', 'Hindi'],
    ['1004', 'Bulleya', 'Ae Dil Hai Mushkil', 'Pritam', 'Karan Johar', 'Amit Mishra, Shilpa Rao', 'Amit Mishra, Shilpa Rao', 'Amitabh Bhattacharya', 'Hindi'],
    ['1005', 'Ghoomar', 'Padmaavat', 'Sanjay Leela Bhansali', 'Sanjay Leela Bhansali', 'Shreya Ghoshal, Swaroop Khan', 'Shreya Ghoshal, Swaroop Khan', 'A. M. Turaz', 'Hindi'],
    ['1006', 'Jai Ho', 'Slumdog Millionaire', 'A. R. Rahman', 'Danny Boyle', 'A. R. Rahman, Sukhwinder Singh', 'A. R. Rahman, Sukhwinder Singh', 'Gulzar', 'Hindi'],
    ['1007', 'Tera Ban Jaunga', 'Kabir Singh', 'Akhil Sachdeva, Tulsi Kumar', 'Sandeep Reddy Vanga', 'Akhil Sachdeva, Tulsi Kumar', 'Kumaar', 'Hindi'],
    ['1008', 'Apna Time Aayega', 'Gully Boy', 'Dub Sharma, Divine', 'Zoya Akhtar', 'Ranveer Singh, Divine', 'Divine, Ankur Tewari', 'Hindi'],
    ['1009', 'Bekhayali', 'Kabir Singh', 'Sachet-Parampara', 'Sandeep Reddy Vanga', 'Sachet Tandon', 'Irshad Kamil', 'Hindi'],
    ['1010', 'Ghar More Pardesiya', 'Kalank', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
    ['1011', 'Ghar More Pardesiya', 'Kalank', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
    ['1012', 'Ghar More Pardesiya', 'Kalank', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
    ['1013', 'Ghar More Pardesiya', 'Kalank', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
    ['1014', 'Ghar More Pardesiya', 'Kalank', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
    ['1015', 'Ghar More Pardesiya', 'Kalank', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
  ]
};

const state = {
  visibleColumns: new Set(data.columns),
  activeSearchColumn: null,
  searchValue: '',
  stickyEnabled: true,
  editingRowId: null,
  theme: 'light'
};

const icons = {
  sun: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  `,
  moon: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.66 12.66C20.01 16.92 15.81 20 11 20C6.19 20 2 16.92 0.34 12.66C-1.31 8.4 2.89 5.34 7.71 5.34C12.52 5.34 16.72 8.4 18.38 12.66C19.05 14.33 19.38 16.11 19.38 17.91C19.38 18.57 19.34 19.22 19.27 19.86C20.6 18.53 21.4 16.67 21.66 14.66C21.74 14.01 21.78 13.34 21.78 12.66C21.78 12.66 21.78 12.66 21.66 12.66Z" fill="currentColor"/>
    </svg>
  `,
  edit: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
    </svg>
  `,
  delete: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  `
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
  searchLabel: document.getElementById('searchLabel'),
  addBtn: document.getElementById('addBtn'),
  dataModal: document.getElementById('dataModal'),
  modalTitle: document.getElementById('modalTitle'),
  dataForm: document.getElementById('dataForm'),
  saveBtn: document.getElementById('saveBtn'),
  cancelBtn: document.getElementById('cancelBtn')
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
  ).join('')}<th>Actions</th></tr>`;

  const filtered = filterRows();
  els.tableBody.innerHTML = filtered.map(row => {
    const rowId = row[0];
    const cells = indices.map(idx => `<td><span>${row[idx]}</span></td>`).join('');
    return `<tr data-id="${rowId}">
              ${cells}
              <td>
                <div class="action-btns">
                    <button class="btn action-btn" onclick="openModal('${rowId}')" title="Edit">${icons.edit}</button>
                    <button class="btn action-btn" onclick="deleteRow('${rowId}')" title="Delete">${icons.delete}</button>
                </div>
              </td>
            </tr>`;
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

function openModal(rowId = null) {
  state.editingRowId = rowId;
  els.dataForm.innerHTML = '';
  
  const rowData = rowId ? data.rows.find(r => r[0] === rowId) : null;

  data.columns.forEach((col, index) => {
    const isIdField = index === 0;
    const value = rowData ? rowData[index] : (isIdField ? generateNewId() : '');
    
    const label = document.createElement('label');
    label.textContent = col;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.name = col;
    input.classList.add('press-start-2p-regular');
    input.value = value;
    if (isIdField) {
      input.readOnly = true;
    }

    els.dataForm.appendChild(label);
    els.dataForm.appendChild(input);
  });

  els.modalTitle.textContent = rowId ? 'Edit Data' : 'Add Data';
  els.dataModal.style.display = 'block';
}

function closeModal() {
  els.dataModal.style.display = 'none';
  state.editingRowId = null;
}

function saveData() {
  const formData = new FormData(els.dataForm);
  const newRow = data.columns.map(col => formData.get(col));

  if (state.editingRowId) {
    const rowIndex = data.rows.findIndex(r => r[0] === state.editingRowId);
    if (rowIndex !== -1) {
      data.rows[rowIndex] = newRow;
    }
  } else {
    data.rows.push(newRow);
  }
  
  renderTable();
  closeModal();
}

function deleteRow(rowId) {
  if (confirm('Are you sure you want to delete this row?')) {
    const rowIndex = data.rows.findIndex(r => r[0] === rowId);
    if (rowIndex !== -1) {
      data.rows.splice(rowIndex, 1);
      renderTable();
    }
  }
}

function generateNewId() {
  const maxId = data.rows.reduce((max, row) => Math.max(max, parseInt(row[0], 10)), 1000);
  return (maxId + 1).toString();
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  els.themeBtn.innerHTML = state.theme === 'light' ? icons.sun : icons.moon;
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

els.themeBtn.addEventListener('click', toggleTheme);

els.addBtn.addEventListener('click', () => openModal());
els.saveBtn.addEventListener('click', saveData);
els.cancelBtn.addEventListener('click', closeModal);

document.addEventListener('click', (e) => {
  if (!e.target.closest('.column-selector')) {
    els.columnDropdown.classList.remove('show');
  }
  if (e.target === els.dataModal) {
    closeModal();
  }
});

renderColumnSelector();
renderTable();
toggleTheme();