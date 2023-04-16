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

    for (let i = 0; i < results.length; i++) {
      if (i === 0) {
        rows.push("<tr id='first-row'><th>Result</th><th>Text</th></tr>");
      }
      results[i] = highlightQuery(results[i], queryRegEx);

      rows.push(
        `<tr><td class="result-number">${i + 1}</td><td>${results[i]}</td></tr>`
      );
    }
    table.innerHTML = rows.join("");
  },
};

// Adds spans to highlight regex matches
const highlightQuery = (passage, queryRegEx) => {
  let matches = passage.match(queryRegEx);
  let matchedSubstrings = passage.split(queryRegEx);
  passage = "";

  for (let j = 0; j < matches.length; j++) {
    matches[j] = `<span class="highlight">${matches[j]}</span>`;
    passage += matchedSubstrings[j] + matches[j];
  }

  passage += matchedSubstrings[matchedSubstrings.length - 1];
  return passage;
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
