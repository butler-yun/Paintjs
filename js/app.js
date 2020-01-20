const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.querySelector('#jsRange');
const buttonMode = document.querySelector('#jsMode');
const buttonSave = document.querySelector('#jsSave');

const INITIAL_COLOR = "#2d2d2d";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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


const onMouseUp = (event) => {
    stopPainting();
}

const handleClickColor = (event) => {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
} 

const handleRangeChange = (event) => {
    const size = event.target.value;
    ctx.lineWidth = size;
}

const handleChangeMode = () => {
    if (filling === true) {
        filling = false;
        buttonMode.innerText = 'Fill';
    } else {
        filling = true;
        buttonMode.innerText = 'Paint';
    }
}

const handleFillCanvas = () => {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

const handleCM = (event) => {
    event.preventDefault();
}

const handleSaveImg = () => {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = `PaintJs[🎨]`;
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleFillCanvas);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) => color.addEventListener('click', handleClickColor));

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (buttonMode) {
    buttonMode.addEventListener('click', handleChangeMode);
}

if (buttonSave) {
    buttonSave.addEventListener('click', handleSaveImg);
}