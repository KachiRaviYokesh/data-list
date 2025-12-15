const data = {
  columns: ['ID', 'Song Name', 'Movie Name', 'Movie Released Year', 'Music Director', 'Movie Director', 'Artist', 'Singers', 'Lyricist', 'Language'],
  rows: [
    ['1001', 'Tum Hi Ho', 'Aashiqui 2', '2013', 'Mithoon', 'Mohit Suri', 'Arijit Singh', 'Arijit Singh', 'Mithoon', 'Hindi'],
    ['1002', 'Chaiyya Chaiyya', 'Dil Se..', '1998', 'A. R. Rahman', 'Mani Ratnam', 'Shah Rukh Khan', 'Sukhwinder Singh, Sapna Awasthi', 'Gulzar', 'Hindi'],
    ['1003', 'Kal Ho Naa Ho', 'Kal Ho Naa Ho', '2003', 'Shankar-Ehsaan-Loy', 'Nikkhil Advani', 'Sonu Nigam', 'Sonu Nigam', 'Javed Akhtar', 'Hindi'],
    ['1004', 'Bulleya', 'Ae Dil Hai Mushkil', '2016', 'Pritam', 'Karan Johar', 'Amit Mishra, Shilpa Rao', 'Amit Mishra, Shilpa Rao', 'Amitabh Bhattacharya', 'Hindi'],
    ['1005', 'Ghoomar', 'Padmaavat', '2018', 'Sanjay Leela Bhansali', 'Sanjay Leela Bhansali', 'Shreya Ghoshal, Swaroop Khan', 'Shreya Ghoshal, Swaroop Khan', 'A. M. Turaz', 'Hindi'],
    ['1006', 'Jai Ho', 'Slumdog Millionaire', '2008', 'A. R. Rahman', 'Danny Boyle', 'A. R. Rahman, Sukhwinder Singh', 'A. R. Rahman, Sukhwinder Singh', 'Gulzar', 'Hindi'],
    ['1007', 'Tera Ban Jaunga', 'Kabir Singh', '2019', 'Akhil Sachdeva, Tulsi Kumar', 'Sandeep Reddy Vanga', 'Akhil Sachdeva, Tulsi Kumar', 'Kumaar', 'Hindi'],
    ['1008', 'Apna Time Aayega', 'Gully Boy', '2019', 'Dub Sharma, Divine', 'Zoya Akhtar', 'Ranveer Singh, Divine', 'Divine, Ankur Tewari', 'Hindi'],
    ['1009', 'Bekhayali', 'Kabir Singh', '2019', 'Sachet-Parampara', 'Sandeep Reddy Vanga', 'Sachet Tandon', 'Irshad Kamil', 'Hindi'],
    ['1010', 'Ghar More Pardesiya', 'Kalank', '2019', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
    ['1011', 'Ghar More Pardesiya', 'Kalank', '2019', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
    ['1012', 'Ghar More Pardesiya', 'Kalank', '2019', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
    ['1013', 'Ghar More Pardesiya', 'Kalank', '2019', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
    ['1014', 'Ghar More Pardesiya', 'Kalank', '2019', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
    ['1015', 'Ghar More Pardesiya', 'Kalank', '2019', 'Pritam', 'Abhishek Varman', 'Shreya Ghoshal, Vaishali Mhade', 'Amitabh Bhattacharya', 'Hindi'],
  ]
};

const state = {
  visibleColumns: new Set(data.columns),
  columnSearchValues: {},
  stickyEnabled: true,
  editingRowId: null,
  theme: 'light',
  searchVisible: true
};

const icons = {
  sun: `<img src="https://openmoji.org/data/color/svg/2600.svg" alt="sun" width="24" height="24">`,
  moon: `<img src="https://openmoji.org/data/color/svg/1F315.svg" alt="moon" width="24" height="24">`,
  edit: `<img src="https://openmoji.org/data/color/svg/1F58B.svg" alt="edit" width="24" height="24">`,
  delete: `<img src="https://openmoji.org/data/color/svg/1F5D1.svg" alt="delete" width="24" height="24">`
};

const els = {
  tableHead: document.getElementById('tableHead'),
  tableBody: document.getElementById('tableBody'),
  dataTable: document.getElementById('dataTable'),
  columnDropdown: document.getElementById('columnDropdown'),
  columnBtn: document.getElementById('columnBtn'),
  stickyBtn: document.getElementById('stickyBtn'),
  themeBtn: document.getElementById('themeBtn'),
  toggleSearchBtn: document.getElementById('toggleSearchBtn'),
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
  const searchTerms = Object.entries(state.columnSearchValues).filter(([, value]) => value);

  if (searchTerms.length === 0) {
    return data.rows;
  }

  return data.rows.filter(row => {
    return searchTerms.every(([column, searchTerm]) => {
      const colIndex = data.columns.indexOf(column);
      return row[colIndex].toLowerCase().includes(searchTerm.toLowerCase());
    });
  });
}

function renderTable() {
  const cols = getVisibleColumns();
  const indices = getVisibleIndices();
  
  const headerRow = `<tr>${cols.map(col => `<th data-col="${col}">${col}</th>`).join('')}<th>Actions</th></tr>`;
  const searchRow = state.searchVisible ? `<tr>${cols.map(col => `<th><input type="text" class="column-search-input" data-col="${col}" placeholder="Search..." value="${state.columnSearchValues[col] || ''}"></th>`).join('')}<th></th></tr>` : '';
  els.tableHead.innerHTML = headerRow + searchRow;

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

function setTheme(mode) {
  state.theme = mode;
  document.documentElement.setAttribute('data-theme', state.theme);
  els.themeBtn.innerHTML = state.theme === 'light' ? icons.sun : icons.moon;
}

function toggleTheme() {
  setTheme(state.theme === 'light' ? 'dark' : 'light');
}

els.tableHead.addEventListener('input', (e) => {
  const input = e.target.closest('.column-search-input');
  if (!input) return;
  
  const col = input.dataset.col;
  if (col) {
    state.columnSearchValues[col] = input.value;
    renderTable();
  }
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
      if (state.columnSearchValues[col]) {
        delete state.columnSearchValues[col];
      }
    }
    renderTable();
  }
});

els.stickyBtn.addEventListener('click', () => {
  state.stickyEnabled = !state.stickyEnabled;
  updateStickyClass();
});

els.toggleSearchBtn.addEventListener('click', () => {
  state.searchVisible = !state.searchVisible;
  renderTable();
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
setTheme('light');