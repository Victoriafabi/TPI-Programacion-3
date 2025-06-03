
import "./ProductsTable.css"; 

const ProductsTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Puntos</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.id}</td>
            <td>{prod.nombre}</td>
            <td>{prod.descripcion}</td>
            <td>{prod.puntosRequeridos}</td>
            <td>{prod.stock}</td>
            <td>
              <button onClick={() => onEdit(prod.id)}>Editar</button>
              <button onClick={() => onDelete(prod.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
