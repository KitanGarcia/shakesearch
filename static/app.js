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

    // Regex to find occurence of string as word(s) as opposed to as substring
    const queryRegEx = new RegExp("\\b" + query.value + "\\b", "ig");

    if (results.length === 0) {
      alert("String not present in Shakespeare's works. Please try another.");
      return;
    }

    // Re-index to filter only count matches of entire word as opposed to substring
    let resultCount = 0;
    for (let i = 0; i < results.length; i++) {
      if (i === 0) {
        rows.push("<tr id='first-row'><th>Result</th><th>Text</th></tr>");
      }
      results[i] = highlightQuery(results[i], queryRegEx);

      if (results[i].length > 0) {
        resultCount++;
        rows.push(
          `<tr><td class="result-number">${resultCount}</td><td>${results[i]}</td></tr>`
        );
      }
    }
    table.innerHTML = rows.join("");
  },
};

// Adds spans to highlight regex matches
const highlightQuery = (passage, queryRegEx) => {
  let matches = passage.match(queryRegEx);
  let matchedSubstrings = passage.split(queryRegEx);
  if (!matches || matches.length === 0) {
    return "";
  }

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
