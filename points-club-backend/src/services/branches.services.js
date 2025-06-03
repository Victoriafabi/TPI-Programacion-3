import { Branch } from "../models/Branches.js";

export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll();  
    res.json(branches);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener las sucursales' });  
  }
};

export const getBranchById = async (req, res) => {
  const { id } = req.params;  
  try {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });  
    }
    res.json(branch);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener la sucursal' }); 
  }
};
