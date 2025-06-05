let fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

let currentPlayer = 'circle'; // startet mit 'circle'

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
      let symbol = '';                          // Zeile 28-34 sind nicht mehr notwendig
                                                // das HTML des Kreises/Kreuzes wird nun über die onclick-Funktion generiert
      if (field === 'circle') {                 // und nicht beim Neuladen der Seite (render)
        symbol = generateAnimatedCircleSVG();   // auch das ${symbol} kann weg. Es sind leere td-Elemente, die erst beim Draufklicken
      } else if (field === 'cross') {           // jeweils mit einem Kreis oder Kreuz befüllt werden
        symbol = generateAnimatedCrossSVG();
      }

      tableHtml += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
    }
    tableHtml += '</tr>';
  }

  tableHtml += '</table>';
  contentDiv.innerHTML = tableHtml;
}

function handleClick(index, tdElement) {
  // Wenn das Feld schon belegt ist, tue nichts
  if (fields[index]) return;

  // Wert im Array setzen
  fields[index] = currentPlayer;

  // Symbol generieren und direkt in das geklickte <td> setzen
  if (currentPlayer === 'circle') {
    tdElement.innerHTML = generateAnimatedCircleSVG();
    currentPlayer = 'cross';
  } else {
    tdElement.innerHTML = generateAnimatedCrossSVG();
    currentPlayer = 'circle';
  }

  // Klick deaktivieren (damit nicht erneut geklickt wird)
  tdElement.onclick = null;
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

