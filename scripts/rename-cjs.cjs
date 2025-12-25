const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "dist", "cjs");

function renameJsToCjs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      renameJsToCjs(fullPath);
      continue;
    }

    if (entry.isFile() && fullPath.endsWith(".js")) {
      fs.renameSync(fullPath, fullPath.slice(0, -3) + ".cjs");
    }
  }
}

if (fs.existsSync(root)) {
  renameJsToCjs(root);
}
