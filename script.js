const data = {
  columns: ['ID', 'Song Name', 'Movie Name', 'Music Director', 'Movie Director', 'Artist', 'Singers', 'Genre'],
  rows: [
    ['1001', 'Tum Hi Ho', 'Aashiqui 2', 'Mithoon', 'Mohit Suri', 'Arijit Singh', 'Arijit Singh', 'Romantic'],
    ['1002', 'Chaiyya Chaiyya', 'Dil Se..', 'A. R. Rahman', 'Mani Ratnam', 'Shah Rukh Khan', 'Sukhwinder Singh, Sapna Awasthi', 'Bollywood'],
    ['1003', 'Kal Ho Naa Ho', 'Kal Ho Naa Ho', 'Shankar-Ehsaan-Loy', 'Nikkhil Advani', 'Sonu Nigam', 'Sonu Nigam', 'Bollywood'],
    ['1004', 'Bulleya', 'Ae Dil Hai Mushkil', 'Pritam', 'Karan Johar', 'Amit Mishra, Shilpa Rao', 'Amit Mishra, Shilpa Rao', 'Sufi Rock'],
    ['1005', 'Ghoomar', 'Padmaavat', 'Sanjay Leela Bhansali', 'Sanjay Leela Bhansali', 'Shreya Ghoshal, Swaroop Khan', 'Shreya Ghoshal, Swaroop Khan', 'Folk'],
    ['1006', 'Jai Ho', 'Slumdog Millionaire', 'A. R. Rahman', 'Danny Boyle', 'A. R. Rahman, Sukhwinder Singh', 'A. R. Rahman, Sukhwinder Singh', 'Bollywood'],
    ['1007', 'Tera Ban Jaunga', 'Kabir Singh', 'Akhil Sachdeva, Tulsi Kumar', 'Sandeep Reddy Vanga', 'Akhil Sachdeva, Tulsi Kumar', 'Akhil Sachdeva, Tulsi Kumar', 'Romantic'],
    ['1008', 'Apna Time Aayega', 'Gully Boy', 'Dub Sharma, Divine', 'Zoya Akhtar', 'Ranveer Singh, Divine', 'Ranveer Singh, Divine', 'Hip Hop'],
    ['1009', 'Bekhayali', 'Kabir Singh', 'Sachet-Parampara', 'Sandeep Reddy Vanga', 'Sachet Tandon', 'Sachet Tandon', 'Rock'],
    ['1010', 'Ghar More Pardesiya', 'Kalank', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Shreya Ghoshal, Vaishali Mhade', 'Classical']
  ]
};

const state = {
  visibleColumns: new Set(data.columns),
  activeSearchColumn: null,
  searchValue: '',
  stickyEnabled: true,
  editingRowId: null
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
    const cells = indices.map(idx => `<td>${row[idx]}</td>`).join('');
    return `<tr data-id="${rowId}">
              ${cells}
              <td>
                <button class="btn action-btn" onclick="openModal('${rowId}')">Edit</button>
                <button class="btn action-btn" onclick="deleteRow('${rowId}')">Delete</button>
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