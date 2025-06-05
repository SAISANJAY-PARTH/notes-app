const textNoteBtn = document.getElementById("add-text-note");
const checklistNoteBtn = document.getElementById("add-checklist-note");
const notesContainer = document.getElementById("notes-container");

textNoteBtn.addEventListener("click", () => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tools">
      <button onclick="saveTextNote(this)" title="Save Note">💾</button>
      <button onclick="deleteNote(this)" title="Delete Note">🗑️</button>
    </div>
    <textarea placeholder="Type your note here..."></textarea>
  `;
  notesContainer.appendChild(note);
});

checklistNoteBtn.addEventListener("click", () => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tools">
      <button onclick="saveChecklist(this)" title="Save Checklist">💾</button>
      <button onclick="deleteNote(this)" title="Delete Checklist">🗑️</button>
    </div>
    <ul class="task-list"></ul>
    <div class="new-task">
      <input type="text" placeholder="New task..." />
      <button onclick="addTask(this)">➕</button>
    </div>
  `;
  notesContainer.appendChild(note);
});

function deleteNote(button) {
  button.closest(".note").remove();
}

function saveTextNote(button) {
  const textarea = button.closest(".note").querySelector("textarea");
  const content = textarea.value.trim();
  if (!content) return;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "note.txt";
  link.href = url;
  link.click();
}

function addTask(button) {
  const input = button.previousElementSibling;
  const taskText = input.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" /> <span>${taskText}</span>`;
  const taskList = button.closest(".note").querySelector(".task-list");
  taskList.appendChild(li);
  input.value = "";
}

function saveChecklist(button) {
  const items = button.closest(".note").querySelectorAll("li");
  let content = "";
  items.forEach(item => {
    const checkbox = item.querySelector("input[type='checkbox']");
    const text = item.querySelector("span").innerText;
    content += `${checkbox.checked ? "[x]" : "[ ]"} ${text}\n`;
  });

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "checklist.txt";
  link.href = url;
  link.click();
}
