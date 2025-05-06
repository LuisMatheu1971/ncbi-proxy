const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Reemplaza "tu-clave-api-aqui" con la clave API que obtuviste de NCBI
const NCBI_API_KEY = 'c7efd14934d6c93ec538c42c18e2d47d3008';

// Endpoint para obtener datos de NCBI
app.get('/api/fetch-genbank', async (req, res) => {
  const accession = req.query.accession;
  if (!accession) {
    return res.status(400).json({ error: 'Se requiere un identificador de acceso' });
  }

  try {
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=${accession}&rettype=gb&retmode=text&api_key=${NCBI_API_KEY}`;
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
