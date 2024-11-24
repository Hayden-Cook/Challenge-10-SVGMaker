const { Circle, Square, Triangle } = require("./shapes");

function generateSVG({ text, textColor, shape, shapeColor }) {
    let shapeInstance;
    switch (shape) {
        case "Circle":
            shapeInstance = new Circle();
            break;
        case "Square":
            shapeInstance = new Square();
            break;
        case "Triangle":
            shapeInstance = new Triangle();
            break;
    }

    shapeInstance.setColor(shapeColor);

    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
        ${shapeInstance.render()}
        <text x="150" y="125" font-size="60" fill="${textColor}" text-anchor="middle">${text}</text>
    </svg>
`;
}

module.exports = generateSVG;