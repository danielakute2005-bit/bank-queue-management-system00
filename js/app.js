let queue = [];
let nextNumber = 1;

function addCustomer() {
  const input = document.getElementById("customerName");
  const name = input.value.trim();

  if (!name) {
    showMessage("Please enter a customer name.");
    return;
  }

  queue.push({
    number: nextNumber++,
    name: name
  });

  input.value = "";
  showMessage(`${name} has been added to the queue.`);
  renderQueue();
}

function serveNext() {
  if (queue.length === 0) {
    showMessage("The queue is empty.");
    return;
  }

  const customer = queue.shift();

  showMessage(
    `${customer.name} (Ticket #${customer.number}) has been served.`
  );

  renderQueue();
}

function clearQueue() {
  if (queue.length === 0) {
    showMessage("The queue is already empty.");
    return;
  }

  queue = [];
  showMessage("All waiting customers have been removed.");
  renderQueue();
}

function renderQueue() {
  const list = document.getElementById("queueList");
  const count = document.getElementById("queueCount");
  const next = document.getElementById("nextCustomer");

  count.textContent =
    `${queue.length} customer${queue.length === 1 ? "" : "s"}`;

  next.textContent = queue.length
    ? `${queue[0].name} (Ticket #${queue[0].number})`
    : "None";

  if (queue.length === 0) {
    list.innerHTML =
      '<p class="empty">No customers are waiting.</p>';
    return;
  }

  list.innerHTML = queue.map((customer, index) => `
    <div class="customer">
      <span>
        <span class="badge">#${customer.number}</span>
        ${escapeHtml(customer.name)}
      </span>
      <span>${index === 0 ? "NEXT" : "Waiting"}</span>
    </div>
  `).join("");
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.getElementById("customerName").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addCustomer();
  }
});

renderQueue();
