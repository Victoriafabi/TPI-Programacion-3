<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/673b7029-acfd-4b83-a3ef-9baf7d6903b7" width="150"/>
    </td>
    <td>
      <h1>🎁 Sistema de Recompensas con Canje por QR</h1>
      Brindis Club es una plataforma de recompensas en la que los usuarios pueden acumular puntos por sus compras y canjearlos por premios utilizando códigos QR. Cuenta con funcionalidades diferenciadas por roles.
    </td>
  </tr>
</table>

<h2>🧠 <span style="color: #007bff;">Funciones Principales</span></h2>

👤 **Gestión de Usuarios (ABM)**: Registro de nuevos usuarios, edición de sus datos y eliminación desde el panel administrativo. 

🎁 **Gestión de Premios (ABM)**: Los administradores pueden agregar nuevos premios al catálogo, editar sus datos (nombre, puntos necesarios, imagen, etc.) y eliminarlos cuando ya no están disponibles.

📜 **Gestión del Historial de Canjes (ABM)**: Cada vez que un usuario canjea un premio, se crea automáticamente un registro en el historial. 

✅ **Cargar compra**: Al registrar una compra, el sistema suma automáticamente los puntos correspondientes al usuario.

🎁 **Canjear premio**: El usuario puede canjear premios con sus puntos acumulados. Se genera un **QR único** para cada canje.

📊 **Historial de premios**: Visualización de los premios canjeados por el usuario.

🧑‍💻 **Dashboard por rol**: Vista personalizada para cada tipo de usuario según su nivel de acceso (super-admin, admin o usuario).

🔳 **Código QR del premio**: Generado con la librería `qrcode.react`.

🛡️ **Autenticación y permisos**: Inicio de sesión con validación, restricción de acceso según rol y seguridad en las rutas.

⚠️ **Validación de formularios**: Todos los formularios tienen validaciones con avisos claros al usuario ante errores de ingreso.

---

<h2> 🛠️ <span style="color: #007bff;">Tecnologías Utilizadas</span></h2>

### **Frontend:**
- ![HTML5](https://img.shields.io/badge/HTML5-Markup-red) **HTML5**
- ![CSS3](https://img.shields.io/badge/CSS3-Styling-blue) **CSS3**
- ![JavaScript](https://img.shields.io/badge/JavaScript-Scripting-yellow) **JavaScript**
- ![React](https://img.shields.io/badge/React-JavaScript--Library-brightgreen) **React**
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-CSS--Framework-purple) **Bootstrap**

### **Backend:**
- ![Node.js](https://img.shields.io/badge/Node.js-JavaScript--Runtime-green) **Node.js**
- ![Express](https://img.shields.io/badge/Express-Framework-lightblue) **Express**: Framework web de Node.js para crear aplicaciones y APIs rápidas y escalables.
- ![Morgan](https://img.shields.io/badge/Morgan-Logger-yellow) **Morgan**: Middleware para Node.js que permite registrar las solicitudes HTTP para la depuración y monitoreo.
- ![Sequelize](https://img.shields.io/badge/Sequelize-ORM-green) **Sequelize**: ORM (Object-Relational Mapping) para Node.js que facilita la interacción con bases de datos relacionales como SQLite, PostgreSQL, etc.
- ![SQLite](https://img.shields.io/badge/SQLite-Database-lightyellow) **SQLite**: Base de datos SQL ligera, útil para aplicaciones con requisitos de almacenamiento simples.

### **Otros:**
- ![qrcode.react](https://img.shields.io/badge/qrcode.react-React-brightgreen) **qrcode.react**: Librería para generar códigos QR dinámicos dentro de la aplicación React.
- ![FontAwesome](https://img.shields.io/badge/FontAwesome-Icons-orange) **FontAwesome**: Iconos de uso general en la interfaz de usuario.
- ![React Bootstrap](https://img.shields.io/badge/React--Bootstrap-UI-blue) **React-Bootstrap**: Implementación de los componentes de Bootstrap con React.
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-CSS-lightblue) **Bootstrap**: Framework de CSS utilizado para el diseño responsivo y moderno.
- ![React Router](https://img.shields.io/badge/React--Router-DOM-red) **React Router DOM**: Librería para el enrutamiento y la navegación entre vistas en React.
- ![Bootstrap Icons](https://img.shields.io/badge/Bootstrap--Icons-Icons-yellow) **Bootstrap Icons**: Conjunto de iconos SVG para complementar Bootstrap.
- ![AOS](https://img.shields.io/badge/AOS-Animations-orange) **AOS (Animate On Scroll)**: Librería para agregar animaciones al hacer scroll.
- ![Postman](https://img.shields.io/badge/Postman-API_testing-lightgrey) **Postman**: Herramienta para probar APIs y realizar pruebas de solicitudes HTTP en el backend.

