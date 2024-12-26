const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let workspaces = [];

// Create a new workspace
app.post('/api/workspaces', (req, res) => {
    const { name } = req.body;
    const newWorkspace = {
        id: workspaces.length + 1,
        name,
        apps: [],
        createdAt: new Date(),
    };
    workspaces.push(newWorkspace);
    res.status(201).json(newWorkspace);
});

// Get all workspaces
app.get('/api/workspaces', (req, res) => {
    res.json(workspaces);
});

// Add an app to a workspace
app.post('/api/workspaces/:id/apps', (req, res) => {
    const workspace = workspaces.find((w) => w.id === parseInt(req.params.id));
    if (!workspace) {
        return res.status(404).json({ error: 'Workspace not found' });
    }
    const { name, url, icon } = req.body;
    const newApp = {
        id: workspace.apps.length + 1,
        name,
        url,
        icon,
    };
    workspace.apps.push(newApp);
    res.status(201).json(newApp);
});

// Get apps in a workspace
app.get('/api/workspaces/:id/apps', (req, res) => {
    const workspace = workspaces.find((w) => w.id === parseInt(req.params.id));
    if (!workspace) {
        return res.status(404).json({ error: 'Workspace not found' });
    }
    res.json(workspace.apps);
});

app.listen(PORT, () => {
    console.log(`Backend API server running at http://localhost:${PORT}`);
});
