// bleibt unverändert
let fields = Array(9).fill(null); // das ist eine andere Schreibweise für das Array aus den anderen js-Dateien
let currentPlayer = 'circle';
let gameOver = false;

function init() {
  render();
}

function render() {
  let contentDiv = document.getElementById('content');
  let tableHtml = '<table>';

  for (let row = 0; row < 3; row++) {
    tableHtml += '<tr>';
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      const field = fields[index];
      tableHtml += `<td onclick="handleClick(${index}, this)" id="cell-${index}"></td>`;
    }
    tableHtml += '</tr>';
  }

  tableHtml += '</table>';
  contentDiv.innerHTML = tableHtml;
}

function handleClick(index, tdElement) {
  if (fields[index] || gameOver) return;

  fields[index] = currentPlayer;

  if (currentPlayer === 'circle') {
    tdElement.innerHTML = generateAnimatedCircleSVG();
    currentPlayer = 'cross';
  } else {
    tdElement.innerHTML = generateAnimatedCrossSVG();
    currentPlayer = 'circle';
  }

  tdElement.onclick = null;

  const winnerInfo = checkWinner();
  if (winnerInfo) {
    gameOver = true;
    drawWinningLine(winnerInfo);
  }
}

// 🔎 Prüft alle Gewinn-Kombinationen
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Zeilen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
    [0, 4, 8], [2, 4, 6]             // Diagonalen
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (fields[a] && fields[a] === fields[b] && fields[b] === fields[c]) {
      return pattern; // Gibt die Gewinnkombination zurück
    }
  }
  return null;
}

// klassische bis dato gelernte Schreibweise

function checkWinnerAlternative() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Zeilen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
    [0, 4, 8], [2, 4, 6]             // Diagonalen
  ];

  for (let i = 0; i < winPatterns.length; i++) {
    let pattern = winPatterns[i];
    let a = pattern[0];
    let b = pattern[1];
    let c = pattern[2];

    if (fields[a] && fields[a] === fields[b] && fields[b] === fields[c]) {
      return pattern; // Gibt die Gewinnkombination zurück
    }
  }

  return null;
}

// ✏️ Zeichnet eine weiße Linie über die Gewinnerkombination
function drawWinningLine([a, b, c]) {
  const cellA = document.getElementById(`cell-${a}`);
  const cellC = document.getElementById(`cell-${c}`);
  const table = document.querySelector("table");
  const rectA = cellA.getBoundingClientRect();
  const rectC = cellC.getBoundingClientRect();
  const tableRect = table.getBoundingClientRect();

  const x1 = rectA.left + rectA.width / 2 - tableRect.left;
  const y1 = rectA.top + rectA.height / 2 - tableRect.top;
  const x2 = rectC.left + rectC.width / 2 - tableRect.left;
  const y2 = rectC.top + rectC.height / 2 - tableRect.top;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.position = "absolute";
  svg.style.top = table.offsetTop + "px";
  svg.style.left = table.offsetLeft + "px";
  svg.style.pointerEvents = "none";
  svg.setAttribute("width", table.offsetWidth);
  svg.setAttribute("height", table.offsetHeight);

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "white");
  line.setAttribute("stroke-width", "8");
  line.setAttribute("stroke-linecap", "round");

  svg.appendChild(line);
  document.getElementById("content").appendChild(svg);
}

function generateAnimatedCircleSVG() {
  const r = 30;
  const dash = 2 * Math.PI * r;
  return `
    <svg width="70" height="70" viewBox="0 0 70 70">
      <circle
        cx="35"
        cy="35"
        r="${r}"
        fill="none"
        stroke="#00B0EF"
        stroke-width="5"
        stroke-dasharray="${dash}"
        stroke-dashoffset="${dash}">
        <animate
          attributeName="stroke-dashoffset"
          from="${dash}"
          to="0"
          dur="1000ms"
          fill="freeze" />
      </circle>
    </svg>`;
}

function generateAnimatedCrossSVG() {
  const length = 56.57; // diagonale Länge
  return `
    <svg width="70" height="70" viewBox="0 0 70 70">
      <line x1="15" y1="15" x2="55" y2="55"
        stroke="#FFC000"
        stroke-width="5"
        stroke-linecap="round"
        stroke-dasharray="${length}"
        stroke-dashoffset="${length}">
        <animate attributeName="stroke-dashoffset" from="${length}" to="0" dur="0.5s" fill="freeze"/>
      </line>
      <line x1="55" y1="15" x2="15" y2="55"
        stroke="#FFC000"
        stroke-width="5"
        stroke-linecap="round"
        stroke-dasharray="${length}"
        stroke-dashoffset="${length}">
        <animate attributeName="stroke-dashoffset" from="${length}" to="0" begin="0.5s" dur="0.5s" fill="freeze"/>
      </line>
    </svg>`;
}
