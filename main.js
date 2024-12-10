require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour vérifier les heures ouvrables
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const hour = currentDate.getHours();

  // Vérifier si c'est un jour ouvrable (lundi à vendredi) et une heure ouvrable (9h à 17h)
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send(
      "L'application web est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h)."
    );
  }
};

// Utiliser le middleware pour toutes les routes
app.use(workingHoursMiddleware);

// Configurer le dossier des vues
app.use(express.static(path.join(__dirname, "views")));


// Routes pour les pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "services.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

