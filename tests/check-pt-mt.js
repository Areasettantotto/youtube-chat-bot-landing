// check-pt-mt.js
// Script per individuare l'uso simultaneo di classi con prefissi "pt-" e "mt-"
// in una stessa riga di codice, che può causare conflitti di stile.
// Se trovate, le righe vengono evidenziate e il file viene aperto in VS Code.
//
// Uso: node tests/check-pt-mt.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

/* ==============================
   CONFIGURAZIONE
   ============================== */
// Simulazione __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../src'); // parte da src
const FILE_EXTENSIONS = ['.jsx', '.js', '.tsx', '.ts']; // estensioni da analizzare
const CLASS_PREFIXES = ['pt', 'mt']; // prefissi delle classi da cercare
const HIGHLIGHT_COLORS = {
  pt: '\x1b[33m', // giallo
  mt: '\x1b[31m'  // rosso
};
/* ============================== */

// codici ANSI per colori
const COLOR_RESET = '\x1b[0m';
const COLOR_YELLOW = '\x1b[33m';
const COLOR_GREEN = '\x1b[32m';

// genera una regex per ciascun prefisso, es: \bpt-\d+\b
const regexMap = CLASS_PREFIXES.reduce((acc, prefix) => {
  acc[prefix] = new RegExp(`\\b${prefix}-\\d+\\b`, 'g');
  return acc;
}, {});

function openInVSCode(filePath, line) {
  try {
    execSync(`code -g "${filePath}:${line}"`);
  } catch (err) {
    console.error(
      `${COLOR_YELLOW}⚠️ Impossibile aprire il file in VS Code. Assicurati che 'code' sia disponibile nel PATH.${COLOR_RESET}`
    );
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const matches = CLASS_PREFIXES.map(prefix => ({
      prefix,
      values: line.match(regexMap[prefix]) || []
    }));

    // controlla se ci sono almeno due prefissi diversi nella stessa riga
    if (matches.filter(m => m.values.length > 0).length > 1) {
      const lineNumber = index + 1;
      console.log(`${COLOR_YELLOW}⚠️ ${COLOR_GREEN}${filePath}:${lineNumber}${COLOR_RESET}`);

      // evidenzia i match nella riga
      let highlightedLine = line;
      matches.forEach(({ prefix }) => {
        highlightedLine = highlightedLine.replace(
          regexMap[prefix],
          match => `${HIGHLIGHT_COLORS[prefix] || COLOR_YELLOW}${match}${COLOR_RESET}`
        );
      });

      console.log(`   → ${highlightedLine}`);
      console.log(
        '   ' +
          matches
            .map(({ prefix, values }) =>
              `${prefix}: ${(HIGHLIGHT_COLORS[prefix] || '')}${values.join(', ')}${COLOR_RESET}`
            )
            .join(' | ')
      );
      console.log('');

      // apre direttamente in VS Code
      openInVSCode(filePath, lineNumber);
    }
  });
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (FILE_EXTENSIONS.includes(path.extname(fullPath))) {
      checkFile(fullPath);
    }
  });
}

walkDir(ROOT_DIR);
