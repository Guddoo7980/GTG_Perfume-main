function initChoice() {
  console.log("Initializing Choice Table...");

  const table = document.getElementById("comparisonTable");
  if (!table) return;

  const headers = table.querySelectorAll("th");
  const cells = table.querySelectorAll("td");

  // function to highlight a column
  function highlightColumn(colIndex) {
    // skip column 0 (the labels)
    if (colIndex === 0) return;

    // highlight header
    const header = table.rows[0].cells[colIndex];
    if (header) header.classList.add("col-hover");

    // highlight body cells
    for (let i = 1; i < table.rows.length; i++) {
      const cell = table.rows[i].cells[colIndex];
      if (cell) cell.classList.add("col-hover");
    }
  }

  // function to remove highlight
  function removeHighlight() {
    const highlighted = table.querySelectorAll(".col-hover");
    highlighted.forEach((el) => el.classList.remove("col-hover"));
  }

  // add event listeners to all cells (th and td)
  const allCells = table.querySelectorAll("th, td");

  allCells.forEach((cell) => {
    cell.addEventListener("mouseenter", function () {
      const colIndex = this.cellIndex;
      removeHighlight(); // clean up previous
      highlightColumn(colIndex);
    });
  });

  // clear when leaving table
  table.addEventListener("mouseleave", removeHighlight);
}
