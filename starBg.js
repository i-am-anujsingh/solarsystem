let maxX = window.innerWidth;
let maxY = window.innerHeight;

let space = document.getElementById("space")

for (let index = 0; index < 200; index++) {
    let star = document.createElement("div");
    star.className = "stars";
    let scale = Math.random() * 0.6;
    star.style.transform = `scale(${scale})`;
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.left = Math.random() * window.innerWidth + "px";
    let s = Math.random() * (1 - 0.5) + 0.5;
    star.style.animation = `twinkle ${s}s infinite alternate-reverse`
    space.appendChild(star);
}