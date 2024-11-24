const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const generateSVG = require("./lib/generateSVG");

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

function init() {
    inquirer.prompt(questions).then((answers) => {
        const svgContent = generateSVG(answers);
        const outputDir = path.join(__dirname, "dist");

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        fs.writeFile("./dist/logo.svg", svgContent, (err) => {
            if (err) {
                console.error("error writing file: ", err);
            } else {
                console.log("Generated logo.svg");
            }
        });
});
}

init();