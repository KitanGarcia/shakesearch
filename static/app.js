const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results);
      });
    });
  },

  updateTable: (results) => {
    const table = document.getElementById("table-body");
    const rows = ["<tr id='first-row'><th>Result</th><th>Text</th></tr>"];
    for (let i = 0; i < results.length; i++) {
      rows.push(
        `<tr><td class="result-number">${i + 1}</td><td>${results[i]}</td></tr>`
      );
    }
    table.innerHTML = rows.join("");
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
