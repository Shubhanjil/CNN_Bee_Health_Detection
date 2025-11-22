const dropArea   = document.getElementById('drop-area');
const fileInput  = document.getElementById('file-input');
const preview    = document.getElementById('preview');
const previewImg = document.getElementById('preview-img');
const predictBtn = document.getElementById('predict-btn');
const resultDiv  = document.getElementById('result');
const labelSpan  = document.getElementById('label');
const confSpan   = document.getElementById('confidence');

let currentFile = null;

// ---- Drag & Drop -------------------------------------------------
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => {
    dropArea.addEventListener(ev, e => e.preventDefault());
});
dropArea.addEventListener('dragenter', () => dropArea.style.borderColor = '#007bff');
dropArea.addEventListener('dragleave', () => dropArea.style.borderColor = '#aaa');
dropArea.addEventListener('drop', e => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length) handleFile(files[0]);
});

// ---- Click to select ---------------------------------------------
dropArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
    if (fileInput.files.length) handleFile(fileInput.files[0]);
});

// ---- Process selected file ---------------------------------------
function handleFile(file) {
    if (!file.type.startsWith('image/')) return alert('Please select an image');
    currentFile = file;

    const reader = new FileReader();
    reader.onload = e => {
        previewImg.src = e.target.result;
        preview.classList.remove('hidden');
        predictBtn.classList.remove('hidden');
        resultDiv.classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

// ---- Predict button -----------------------------------------------
predictBtn.addEventListener('click', async () => {
    if (!currentFile) return;
    predictBtn.disabled = true;
    predictBtn.textContent = 'Analyzing…';

    const form = new FormData();
    form.append('file', currentFile);

    try {
        const resp = await fetch('/predict', {method: 'POST', body: form});
        const data = await resp.json();

        if (data.error) throw new Error(data.error);

        labelSpan.textContent = data.label.toUpperCase();
        confSpan.textContent  = (data.confidence * 100).toFixed(1) + '%';
        resultDiv.classList.remove('hidden');
    } catch (err) {
        alert('Error: ' + err.message);
    } finally {
        predictBtn.disabled = false;
        predictBtn.textContent = 'Predict Health';
    }
});