const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function execPromise(cmd, options = {}) {
    return new Promise((resolve, reject) => {
        const child = exec(cmd, options, (error, stdout, stderr) => {
            if (error) return reject(error);
            resolve({ stdout, stderr });
        });
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    });
}

async function runPlaywright(branch, env) {
    const repoDir = `/tmp/playwright-repo-${Date.now()}`;
    const resultsDir = path.join(repoDir, 'playwright-results');

    fs.mkdirSync(resultsDir, { recursive: true });

    // 1️⃣ Clona o repositório
    await execPromise(`git clone -b ${branch} https://github.com/seu-repo.git ${repoDir}`);

    // 2️⃣ Instala dependências
    await execPromise('npm install', { cwd: repoDir });

    // 3️⃣ Executa testes Playwright
    await execPromise(
        `npx playwright test --reporter=json --output=${resultsDir}`,
        { cwd: repoDir }
    );

    // 4️⃣ Coleta artefatos
    const artifacts = fs.existsSync(resultsDir)
        ? fs.readdirSync(resultsDir).map(f => path.join(resultsDir, f))
        : [];

    // 5️⃣ Lê JSON de resultados
    const resultsFile = path.join(resultsDir, 'report.json');
    const results = fs.existsSync(resultsFile) ? JSON.parse(fs.readFileSync(resultsFile)) : {};

    // 6️⃣ Retorna resultados + artefatos
    return { results, artifacts };
}

module.exports = { runPlaywright };
