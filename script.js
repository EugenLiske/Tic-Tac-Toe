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
function init(){
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
            let symbol = '';

            if (field === 'circle') {
                symbol = generateAnimatedCircleSVG(); // bindet das SVG-HTML and die Variable und stellt somit den Kreis dar
                } else if (field === 'cross') {
                symbol = generateAnimatedCrossSVG();
                }
            tableHtml += `<td>${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }

    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}

function generateAnimatedCircleSVG() {
  const svg = `
    <svg width="70" height="70" viewBox="0 0 70 70">
      <circle
        cx="35"
        cy="35"
        r="30"
        fill="none"
        stroke="#00B0EF"
        stroke-width="5"
        stroke-dasharray="${2 * Math.PI * 30}"
        stroke-dashoffset="${2 * Math.PI * 30}"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="${2 * Math.PI * 30}"
          to="0"
          dur="1000ms"
          fill="freeze"
        />
      </circle>
    </svg>
  `;
  return svg;
}

function generateAnimatedCrossSVG() {
  const svg = `
    <svg width="70" height="70" viewBox="0 0 70 70">
      <!-- Diagonale 1 -->
      <line x1="15" y1="15" x2="55" y2="55"
        stroke="#FFC000"
        stroke-width="5"
        stroke-linecap="round"
        stroke-dasharray="56.57"
        stroke-dashoffset="56.57">
        <animate
          attributeName="stroke-dashoffset"
          from="56.57"
          to="0"
          dur="0.5s"
          fill="freeze"
        />
      </line>

      <!-- Diagonale 2 -->
      <line x1="55" y1="15" x2="15" y2="55"
        stroke="#FFC000"
        stroke-width="5"
        stroke-linecap="round"
        stroke-dasharray="56.57"
        stroke-dashoffset="56.57">
        <animate
          attributeName="stroke-dashoffset"
          from="56.57"
          to="0"
          begin="0.5s"
          dur="0.5s"
          fill="freeze"
        />
      </line>
    </svg>
  `;
  return svg;
}
