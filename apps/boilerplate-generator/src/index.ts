import path from 'path'
import fs from 'fs'

function generatePartialBoilerPlate(generatorFilePath:string) {
    const inputFilePath = path.join(__dirname, generatorFilePath, "Structure.md")
    const boilerFilePath = path.join(__dirname, generatorFilePath, "boilerPlate")
    

    const input = fs.readFileSync(inputFilePath, "utf-8");

    const parser = new ProblemDefinitionParser();
    parser.parse(input);

    const cppCode = parser.generateCpp();
    const jsCode = parser.generateJs();
    const rsCode = parser.generateRs();

    if (!fs.existsSync(boilerFilePath)) {
        fs.mkdirSync(boilerFilePath, { recursive: true });
    }

    fs.writeFileSync(path.join(boilerFilePath, "function.cpp"), cppCode);
    fs.writeFileSync(path.join(boilerFilePath, "function.js"), jsCode);
    fs.writeFileSync(path.join(boilerFilePath, "function.rs"), rsCode);

    console.log("Boilerplate code is generated");
    
}

function generateFullBoilerPlate(generatorFilePath: string) {
    const inputFilePath = path.join(__dirname, generatorFilePath, "Structure.md");
    const boilerFilePath = path.join(__dirname, generatorFilePath, "boilerPlate-Full");

    const input = fs.readFileSync(inputFilePath, "utf-8");
    const parser = new FullDefinitionParser();
    parser.parse(input);

    const cppCode = parser.generateCpp();
    const jsCode = parser.generateJs();
    const rsCode = parser.generateRs();

    if (!fs.existsSync(boilerFilePath)) {
        fs.mkdirSync(boilerFilePath, { recursive: true });
    }

    fs.writeFileSync(path.join(boilerFilePath, "function.cpp"), cppCode);
    fs.writeFileSync(path.join(boilerFilePath, "function.js"), jsCode);
    fs.writeFileSync(path.join(boilerFilePath, "function.rs"), rsCode);
    console.log("Full BoilerPlate code is generated successfully");
    
}