import express from 'express';
import runGraph from './ai/graph.ai.js';

const app = express();

// Parse JSON bodies
app.use(express.json());

// Enable CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.get('/', (req, res) => {
  res.json({ status: "healthy", message: "AI Battle Arena API is running" });
});

app.post('/api/battle', async (req, res) => {
  try {
    const { problem } = req.body;
    if (!problem) {
      return res.status(400).json({ error: "Problem prompt is required" });
    }
    const result = await runGraph(problem);
    res.json(result);
  } catch (error: any) {
    console.error("Error in battle endpoint:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

export default app;
