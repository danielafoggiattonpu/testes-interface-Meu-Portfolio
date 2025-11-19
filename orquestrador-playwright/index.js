const express = require('express');
const bodyParser = require('body-parser');
const { runPlaywright } = require('./runPlaywright');

const app = express();
app.use(bodyParser.json());

// Endpoint que recebe webhook do GitHub
app.post('/webhook', async (req, res) => {
    try {
        const payload = req.body;

        // Só agir em pull request
        if (payload.pull_request) {
            const baseBranch = payload.pull_request.base.ref;

            if (baseBranch === 'main' || baseBranch === 'staging') {
                console.log(`PR detectado em ${baseBranch}. Executando testes...`);
                const result = await runPlaywright(baseBranch);
                res.json({ status: 'ok', result });
            } else {
                console.log(`PR detectado em ${baseBranch}. Ignorando.`);
                res.json({ status: 'ignored', branch: baseBranch });
            }
        } else {
            console.log('Evento não é pull request. Ignorando.');
            res.json({ status: 'ignored', message: 'Não é PR' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Orquestrador rodando na porta 3000'));
