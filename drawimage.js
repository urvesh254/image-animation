let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 150;

const ACTIONS = {
    backward: [1, 2, 3, 4, 5, 6],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    forward: [1, 2, 3, 4, 5, 6],
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
};
const timeDelay = 100;
const bgImage = new Image();
bgImage.src = "images/background.jpg";
bgImage.onload = () =>
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

let actionQueue = [];

let drawImages = (imageList, action, callback) => {
    let drawImage = (imageId) => {
        let base_image = new Image();
        base_image.src = `images/${action}/${imageId}.png`;
        base_image.onload = () => {
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(base_image, 0, 0, canvas.width / 2, canvas.height);
        };
    };
    imageList.forEach((id, index) => {
        setTimeout(drawImage, index * timeDelay, id);
    });

    setTimeout(callback, imageList.length * timeDelay);
};

let animation = () => {
    if (actionQueue.length == 0) {
        actionQueue.push("idle");
    }

    let selectedAction = actionQueue.shift();
    let selectedImagesList = ACTIONS[selectedAction];

    drawImages(selectedImagesList, selectedAction, animation);
};

document.getElementsByTagName("body").onload = animation();

document.getElementById("backward").onclick = () => {
    actionQueue.push("backward");
};
document.getElementById("block").onclick = () => {
    actionQueue.push("block");
};
document.getElementById("forward").onclick = () => {
    actionQueue.push("forward");
};
document.getElementById("kick").onclick = () => {
    actionQueue.push("kick");
};
document.getElementById("punch").onclick = () => {
    actionQueue.push("punch");
};

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 150;
});

window.addEventListener("keyup", (evt) => {
    if (evt.key === " ") actionQueue.push("punch");
    else if (evt.key === "ArrowUp") actionQueue.push("kick");
    else if (evt.key === "ArrowDown") actionQueue.push("backward");
    else if (evt.key === "ArrowLeft") actionQueue.push("block");
    else if (evt.key === "ArrowRight") actionQueue.push("forward");
});
