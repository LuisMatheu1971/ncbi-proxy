const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint para obtener datos de NCBI
app.get('/api/fetch-genbank', async (req, res) => {
  const accession = req.query.accession;
  if (!accession) {
    return res.status(400).json({ error: 'Se requiere un identificador de acceso' });
  }

  try {
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=${accession}&rettype=gb&retmode=text`;
    const response = await fetch(url);
    const data = await response.text();
    res.set('Content-Type', 'text/plain');
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de NCBI: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});