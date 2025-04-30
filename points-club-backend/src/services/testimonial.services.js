import { Testimonial } from "../models/Testimonial.js";

export const findTestimonials = async (req, res) => {
  try {
    const allTestimonials = await Testimonial.findAll();
    res.json(allTestimonials);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener testimonios" });
  }
};

export const findTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "No encontrado" });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el testimonio" });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { nombre, usuario, texto, imagen } = req.body;
    const newTestimonial = await Testimonial.create({ nombre, usuario, texto, imagen });
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: "Error al crear testimonio" });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "No encontrado" });

    const { nombre, usuario, texto, imagen } = req.body;
    await testimonial.update({ nombre, usuario, texto, imagen });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar testimonio" });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "No encontrado" });

    await testimonial.destroy();
    res.json({ message: "Testimonio eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar testimonio" });
  }
};
