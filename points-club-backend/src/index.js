import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

// Sequelize
import { sequelize } from "./db.js";
import { sequelizeClub } from "./db-club.js";
import { sequelizeBranches } from "./db-branches.js";

// Modelos
//import { Testimonial } from "./models/Testimonial.js";
import { User } from "./models/User.js";
import { Product } from "./models/Product.js";
import { Record } from "./models/Record.js";
//import { Branch } from "./models/Branches.js";

// Rutas
import testimonialsRoutes from "./routes/testimonial.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import recordRoutes from "./routes/record.routes.js";
import branchRoutes from "./routes/branches.routes.js";

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const initializeApp = async () => {
  try {
    User.hasMany(Record, { foreignKey: "userId" });
    Record.belongsTo(User, { foreignKey: "userId" });

    Product.hasMany(Record, { foreignKey: "productId" });
    Record.belongsTo(Product, { foreignKey: "productId" });

    await sequelize.sync({ force: false });
    await sequelizeClub.sync({ force: false });
    await sequelizeBranches.sync({ force: false });

    app.use("/api", testimonialsRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/products", productRoutes);      
    app.use("/api/records", recordRoutes);
    app.use("/api/branches", branchRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Initialization error:", err);
  }
};

initializeApp();
