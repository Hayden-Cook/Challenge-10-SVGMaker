const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Square, Triangle } = require("./lib/shapes");

const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter up to three characters for the logo:",
        validate: (input) => input.length <= 3 || "Please enter no more than three characters.",
    },
    {
        type: "input",
        name: "textColor",
        message: "Enter the text color (keyword or hex):",
    },
    {
        type: "list",
        name: "shape",
        message: "Choose a shape for the logo:",
        choices: ["Circle", "Square", "Triangle"],
    },
    {
        type: "input",
        name: "shapeColor",
        message: "Enter the shape color (keyword or hex):",
    },
];

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

function init() {
    inquirer.prompt(questions).then((answers) => {
        const svgContent = generateSVG(answers);
        fs.writeFile("./dist/logo.svg", svgContent, (err) => {
            if (err) {
                console.error("error writing file: ", err);
            } else {
                console.log("Successfully generated logo.svg");
            }
        });
});
}

init();