import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// Types for data structures
interface AccessResult {
  granted: boolean;
  message: string;
}

interface CapabilityCode {
  code: string;
  level: 'admin' | 'write' | 'read';
}

// Mock database (in-memory for demonstration)
const accessResult: AccessResult = {
  granted: true,
  message: 'Access granted to protected resource',
};

const capabilityCodes: CapabilityCode[] = [
  { code: 'CAP_ADMIN_001', level: 'admin' },
  { code: 'CAP_WRITE_002', level: 'write' },
  { code: 'CAP_READ_003', level: 'read' },
  { code: 'CAP_READ_004', level: 'read' },
];

// Initialize Express app
const app = express();
const port = 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend origin
app.use(express.json());

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// API Endpoints
app.get('/api/access-result', (req: Request, res: Response) => {
  try {
    res.json(accessResult);
  } catch (err) {
    next(err);
  }
});

app.get('/api/capability-codes', (req: Request, res: Response) => {
  try {
    res.json(capabilityCodes);
  } catch (err) {
    next(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});