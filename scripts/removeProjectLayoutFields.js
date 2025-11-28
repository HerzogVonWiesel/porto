const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const projectsDir = path.join(process.cwd(), "src", "_data", "projects");

function readFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const raw = fs.readFileSync(filePath, "utf8");
    if (ext === ".json") {
        return { data: JSON.parse(raw), ext };
    }
    if (ext === ".yaml" || ext === ".yml") {
        return { data: yaml.load(raw), ext: ".yaml" };
    }
    return { data: null, ext };
}

function writeFile(filePath, ext, data) {
    if (ext === ".json") {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + "\n");
    } else if (ext === ".yaml") {
        fs.writeFileSync(filePath, yaml.dump(data, { lineWidth: -1 }));
    }
}

for (const file of fs.readdirSync(projectsDir)) {
    const full = path.join(projectsDir, file);
    if (fs.statSync(full).isDirectory()) {
        continue;
    }
    const { data, ext } = readFile(full);
    if (!data || (data.width === undefined && data.aspect_ratio === undefined)) {
        continue;
    }
    delete data.width;
    delete data.aspect_ratio;
    writeFile(full, ext, data);
}
