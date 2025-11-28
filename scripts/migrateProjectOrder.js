const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const projectsDir = path.join(process.cwd(), "src", "_data", "projects");
const orderPath = path.join(process.cwd(), "src", "_data", "project_order.json");

function readProject(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const raw = fs.readFileSync(filePath, "utf8");
    if (ext === ".json") {
        return JSON.parse(raw);
    }
    if (ext === ".yaml" || ext === ".yml") {
        return yaml.load(raw);
    }
    return {};
}

const projectFiles = fs.readdirSync(projectsDir);
const layoutBySlug = {};
for (const file of projectFiles) {
    const full = path.join(projectsDir, file);
    if (fs.statSync(full).isDirectory()) {
        continue;
    }
    const slug = path.basename(file, path.extname(file));
    const data = readProject(full);
    layoutBySlug[slug] = {
        width: data.width,
        aspect_ratio: data.aspect_ratio
    };
}

const order = JSON.parse(fs.readFileSync(orderPath, "utf8"));
const newOrder = order.map((entry) => {
    if (typeof entry === "string") {
        const layout = layoutBySlug[entry] || {};
        return {
            project: entry,
            width: layout.width || "1/2",
            aspect_ratio: layout.aspect_ratio || "1/1"
        };
    }
    return entry;
});

fs.writeFileSync(orderPath, JSON.stringify(newOrder, null, 4));
