import { v4 as uuidv4 } from "uuid";
import { Record } from "../models/Record.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import { sequelizeClub } from "../db-club.js";

export const createRecord = async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const t = await sequelizeClub.transaction();

    try {
        const user = await User.findByPk(userId, { transaction: t });
        const product = await Product.findByPk(productId, { transaction: t });

        if (!user || !product) {
            await t.rollback();
            return res.status(404).json({ error: "Usuario o producto no encontrado" });
        }

        if (user.puntos < product.puntosRequeridos) {
            await t.rollback();
            return res.status(400).json({ error: "Puntos insuficientes para canjear" });
        }

        if (product.stock <= 0) {
            await t.rollback();
            return res.status(400).json({ error: "Producto sin stock disponible" });
        }

        user.puntos -= product.puntosRequeridos;
        product.stock -= 1;

        await user.save({ transaction: t });
        await product.save({ transaction: t });

        const qr = uuidv4(); 

        const record = await Record.create(
            { userId, productId, qr },
            { transaction: t }
        );

        await t.commit(); 

        res.status(201).json({
            message: "Canje exitoso",
            puntosRestantes: user.puntos,
            qr,
            record,
            redeemedReward: {
                id: record.id,
                nombre: product.nombre,
                puntosRequeridos: product.puntosRequeridos,
                fechaCanje: record.fechaCanje,
                qr,
            },
        });

    } catch (error) {
        await t.rollback(); 
        console.error("Error en createRecord (backend):", error); 
        res.status(500).json({ error: error.message || "Error interno del servidor al crear registro." }); // Mensaje de error más descriptivo
    }
};

export const getRecords = async (req, res) => {
    const userId = req.params.userId;
    try {
        const records = await Record.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    attributes: ["nombre", "descripcion", "puntosRequeridos"],
                },
            ],
            order: [["fechaCanje", "DESC"]], 
        });

        const simplified = records.map((rec) => {
            if (!rec.Product) {
                console.warn(`Advertencia: Registro de canje (ID: ${rec.id}) para usuario ${userId} no tiene un Producto asociado. Se usarán valores por defecto.`);
                return {
                    id: rec.id,
                    nombre: "Producto Desconocido",
                    puntosRequeridos: 0,
                    fechaCanje: rec.fechaCanje, 
                };
            }
            return {
                id: rec.id,
                nombre: rec.Product.nombre,
                puntosRequeridos: rec.Product.puntosRequeridos,
                fechaCanje: rec.fechaCanje, 
                qr: rec.qr,
            };
        }).filter(item => item !== null);

        res.json(simplified);
    } catch (error) {
        console.error("Error en getRecords (backend):", error);
        res.status(500).json({ error: "Error interno del servidor al obtener registros. Revisa los logs del backend para más detalles." });
    }
};