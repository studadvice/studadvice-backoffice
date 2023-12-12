const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuration des options CORS
const corsOptions = {
    origin: 'http://localhost:4200', // Remplacez par l'origine de votre application Angular
    optionsSuccessStatus: 200
};

// Utilisez CORS avec les options définies
app.use(cors(corsOptions));

// Configuration du proxy pour votre API distante
const apiProxyConfig = {
    target: 'http://codingschool-togo.com', // Remplacez par l'URL de votre serveur distant
    changeOrigin: true, // Nécessaire pour les hôtes virtuels
    pathRewrite: {
        '^/api': '/api', // Réécrire le chemin de l'API si nécessaire
    },
    onProxyReq: (proxyReq, req, res) => {
        // Ajoutez des en-têtes ou manipulez la requête proxy ici si nécessaire
    },
    onProxyRes: (proxyRes, req, res) => {
        // Manipulez la réponse proxy ici si nécessaire
        console.log(proxyRes);
    },
    onError: (err, req, res) => {
        // Gérez les erreurs de proxy ici
    }
};

// Utilisez le middleware de proxy pour les requêtes vers '/api'
app.use('/api', createProxyMiddleware(apiProxyConfig));

// Port sur lequel le serveur express écoute
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
