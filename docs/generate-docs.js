import { fileURLToPath } from 'url';
import fs from "fs";
import {parse} from "react-docgen";
import path from "path";
import { dirname } from 'path';
import reactDocsTS from "react-docgen-typescript";
import {readdir} from 'node:fs/promises'
import {join} from 'node:path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const componentPath = path.resolve(__dirname, './../lib');
const outputPath = path.resolve(__dirname, './componentDocs.json');
const isTypeScript = (file) => file.endsWith('.ts') || file.endsWith('.tsx');


const walk = async (dirPath) => Promise.all(
  await readdir(dirPath, { withFileTypes: true }).then((entries) => entries.map((entry) => {
    const childPath = join(dirPath, entry.name)
    return entry.isDirectory() ? walk(childPath) : childPath
  })),
)
const allFiles = await walk('./../lib')
console.log(allFiles.flat(Number.POSITIVE_INFINITY))


  const docs = allFiles.flat(Number.POSITIVE_INFINITY).reduce((acc, file) => {
    const filePath = path.join(componentPath, file);
    const componentCode = fs.readFileSync(filePath, "utf8");
    try {
      if(isTypeScript(file)){
        const tsDocsParser = reactDocsTS.withDefaultConfig();
        acc[file] = tsDocsParser.parse(filePath);
      }else {
        acc[file] = parse(componentCode);
      }
    } catch (err) {
      console.warn(`Could not parse component: ${file}`, err);
    }
    return acc;
  }, {});

  fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2));
