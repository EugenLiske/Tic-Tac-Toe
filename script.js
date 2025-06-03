let fields = [
    'cross',
    null,
    null,
    null,
    null,
    'cross',
    'circle',
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
                symbol = 'o';
                } else if (field === 'cross') {
                symbol = 'x';
                }
            tableHtml += `<td>${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }

    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}