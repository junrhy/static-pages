const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3456;
const DB_FILE = path.join(__dirname, 'telematics_db.json');

function loadDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {}
  return {};
}

function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {}
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const db = loadDb();

  if (req.method === 'POST' && parsedUrl.pathname.includes('/api/telematics')) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const plate = (payload.truckPlate || parsedUrl.query.plate || 'DEFAULT').toUpperCase();
        db[plate] = payload;
        saveDb(db);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success', received: payload }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  if (req.method === 'GET' && parsedUrl.pathname.includes('/api/telematics')) {
    const rawPlate = (parsedUrl.query.plate || parsedUrl.query.truck || parsedUrl.query.id || '').toUpperCase().trim();
    
    // Find matching record by plate, or fallback to DEFAULT / most recent record
    let record = db[rawPlate];
    if (!record && db['DEFAULT']) {
      record = { ...db['DEFAULT'], truckPlate: rawPlate || db['DEFAULT'].truckPlate };
    }
    if (!record) {
      const keys = Object.keys(db);
      if (keys.length > 0) {
        record = { ...db[keys[keys.length - 1]], truckPlate: rawPlate || db[keys[keys.length - 1]].truckPlate };
      }
    }
    if (!record) {
      record = {
        status: "success",
        truckPlate: rawPlate || "CAG-8894",
        locationName: "Sagbayan, Bohol",
        latitude: 9.9125,
        longitude: 124.0886,
        updatedAt: new Date().toISOString()
      };
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(record));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Dynamic Telematics Server listening on http://localhost:${PORT}`);
});
