const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const base = path.join(process.cwd(), "src", "_data", "projects");

function readData(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const raw = fs.readFileSync(filePath, "utf8");
    if (ext === ".json") {
        return JSON.parse(raw);
    }
    if (ext === ".yaml" || ext === ".yml") {
        return yaml.load(raw);
    }
    throw new Error(`Unsupported file type: ${filePath}`);
}

const files = fs.readdirSync(base);
const layoutData = {};

for (const file of files) {
    const full = path.join(base, file);
    if (fs.statSync(full).isDirectory()) {
        continue;
    }
    const data = readData(full);
    layoutData[path.basename(file, path.extname(file))] = {
        width: data.width,
        aspect_ratio: data.aspect_ratio
    };
}

fs.writeFileSync(
    path.join(process.cwd(), "layout-data.json"),
    JSON.stringify(layoutData, null, 2)
);
