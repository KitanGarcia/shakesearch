const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results, query);
      });
    });
  },

  updateTable: (results, query) => {
    const table = document.getElementById("table-body");
    const rows = [];
    const queryRegEx = new RegExp(query.value, "ig");

    let match = "";
    let matchArray = [];

    for (let i = 0; i < results.length; i++) {
      if (i === 0) {
        rows.push("<tr id='first-row'><th>Result</th><th>Text</th></tr>");
      }

      // Add spans to highlight regex matches
      match = results[i].match(queryRegEx);
      matchArray = results[i].split(queryRegEx);
      results[i] = "";

      for (let j = 0; j < match.length; j++) {
        match[j] = `<span class="highlight">${match[j]}</span>`;
        results[i] += matchArray[j] + match[j];
      }

      results[i] += matchArray[matchArray.length - 1];

      rows.push(
        `<tr><td class="result-number">${i + 1}</td><td>${results[i]}</td></tr>`
      );
    }
    table.innerHTML = rows.join("");
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
