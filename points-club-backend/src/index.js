import express from "express";
import testimonialsRoutes from "./routes/testimonial.routes.js";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";
import "./models/Testimonial.js"; 

const app = express();

const initializeApp = async () => {
  try {
    // Configurando middleware
    app.use(express.json());

    // Configuración de CORS
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      next();
    });

    // Aplicar rutas después de la sincronización de la base de datos
    await sequelize.sync();

    // Usar las rutas
    app.use("/api", testimonialsRoutes);

    // Iniciar el servidor después de que la base de datos se haya sincronizado
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (error) {
    console.log("There was an error during initialization:", error);
  }
};

initializeApp();
