import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }
    });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const registerUser = async (req, res) => {
   console.log("Request body received:", req.body); 
  try {
    const { email, password, nombre, apellido } = req.body;


    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      nombre,
      apellido
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "Usuario registrado con éxito",
      token,
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        email: newUser.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    console.log("User found:", user); 

    if (!user) return res.status(400).json({ error: "Credenciales inválidas" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isPasswordValid); 

    if (!isPasswordValid) return res.status(400).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        puntos: user.puntos,
        rol: user.rol
      }
    });
  } catch (err) {
    console.error("Error en login:", err); 
    res.status(500).json({ error: "Error interno en el servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.update(req.body);
    const updated = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};