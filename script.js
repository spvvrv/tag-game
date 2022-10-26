const field = document.querySelector('.field');
const cellSize = 100;


const empty = {
    top: 0,
    left: 0,
    value: 0,
};

const cells = [];
cells.push(empty);

function move(index) {
    const cell = cells[index];
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyleft = empty.left;
    const emptytop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;

    cell.left = emptyleft;
    cell.top = emptytop;

    const isFinished = cells.every(cell => {
        return cell.value === cell.top * 4 + cell.left;
    });

    if (isFinished) {
        alert('you won! Congratulations')
    }

}

const numbers = [...Array(15).keys()]
    .sort(() => Math.random() - 0.5);


for (let i = 1; i <= 15; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    const value = numbers[i - 1] + 1
    cell.innerHTML = value;

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell,
    });

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field.append(cell);

    cell.addEventListener('click', () => {
        move(i);
    });

    function setupSynth() {
        window.synth = new Tone.Synth({
            oscillator: {
                type: 'sine',
                modulationFrequency: 0.5,
            },
            envelope: {
                attack: 0,
                decay: 0.2,
                sustain: 0,
                release: 0.5,
            }
        }).toMaster();
    }
    
    function boopMe() {
        if (!window.synth) {
            setupSynth();
        }
    
        window.synth.triggerAttackRelease(600, '9n');
    }
    
    cell.addEventListener('touchend', function (e) {
        e.stopPropagation();
        // e.preventDefault();
        boopMe();
    });
    cell.addEventListener('mouseup', boopMe);
    
}


function startGame() {
    window.location.reload();
}

