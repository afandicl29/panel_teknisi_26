let currentPath = '.';
let currentFile = null;

// LOAD FILE LIST
async function loadFiles(path = '.') {
    currentPath = path;

    const res = await fetch(`/api/files/list?path=${encodeURIComponent(path)}`);
    const files = await res.json();

    const container = document.getElementById('fileList');
    container.innerHTML = '';

    // tombol back
    if (path !== '.') {
        const back = document.createElement('div');
        back.innerText = '⬅️ ..';
        back.style.cursor = 'pointer';
        back.onclick = () => {
            const parent = path.split('/').slice(0, -1).join('/') || '.';
            loadFiles(parent);
        };
        container.appendChild(back);
    }

    files.forEach(file => {
        const el = document.createElement('div');
        el.style.cursor = 'pointer';
        el.innerText = file.isDir ? '📁 ' + file.name : '📄 ' + file.name;

        el.onclick = () => {
            const fullPath = path === '.' ? file.name : path + '/' + file.name;

            if (file.isDir) {
                loadFiles(fullPath);
            } else {
                openFile(fullPath);
            }
        };

        container.appendChild(el);
    });
}

// OPEN FILE
async function openFile(path) {
    currentFile = path;

    const res = await fetch(`/api/files/read?path=${encodeURIComponent(path)}`);
    const text = await res.text();

    document.getElementById('editor').value = text;
}

// SAVE FILE
async function saveFile() {
    if (!currentFile) return alert('No file selected');

    await fetch('/api/files/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            path: currentFile,
            content: document.getElementById('editor').value
        })
    });

    alert('Saved!');
}

// DELETE FILE
async function deleteFile() {
    if (!currentFile) return alert('No file selected');

    if (!confirm('Yakin hapus?')) return;

    await fetch(`/api/files/delete?path=${encodeURIComponent(currentFile)}`, {
        method: 'DELETE'
    });

    alert('Deleted!');
    loadFiles(currentPath);
}

// INIT
loadFiles();