const loader = htmlToElement(
  "<div class='loader hidden'><img class='loading-gif' src='https://thumbs.gfycat.com/MatureBestBlackbear-max-1mb.gif' alt='loading gif'></div>"
);
const table = document.getElementById("table");
document.body.appendChild(loader);

const Controller = {
  search: (ev) => {
    ev.preventDefault();
    loader.classList.toggle("hidden");
    table.classList.toggle("hidden");

    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results, query);
      });
    });
  },

  updateTable: (results, query) => {
    const rows = [];

    // Regex to find occurence of string as word(s) as opposed to as substring
    const queryRegEx = new RegExp("\\b" + query.value + "\\b", "ig");

    if (results.length === 0) {
      alert(
        "Your search is not present in Shakespeare's works. Please try another."
      );
      return;
    }

    // Re-index to only count matches of entire word as opposed to substring
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
    table.classList.toggle("hidden");
    loader.classList.toggle("hidden");
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

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
