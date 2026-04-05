let maxX = window.innerWidth;
let maxY = window.innerHeight;

let space = document.getElementById("space")
// alert(Math.random())

for (let index = 0; index < 150; index++) {
    let star = document.createElement("div");
    star.className = "stars";
    let scale = Math.random() * 1; // random number between 0 and 5
    star.style.transform = `scale(${scale})`;   
    // Randomize position within the viewport
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.left = Math.random() * window.innerWidth + "px";
    let s = Math.random() * (1 - 0.5) + 0.5; 
    star.style.animation = `twinkle ${s}s infinite alternate-reverse`

    space.appendChild(star);
    
}