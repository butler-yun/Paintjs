const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = '#2d2d2d';
ctx.lineWidth = 2.5;

let painting = false;

const stopPainting = () => {
    painting = false;
}

const startPainting = () => {
    painting = true;
}

const onMouseMove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

const onMouseDown = (event) => {
    painting = true;
}

const onMouseUp = (event) => {
    stopPainting();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}