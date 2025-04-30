import React, { useEffect, useState } from "react";
import "./Testimonials.css"; 

const TestimonialsSection = () => {
  const [testimonios, setTestimonios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/testimonials")  // Cambié /Testimonials a /api/testimonials
      .then(res => res.json())
      .then(data => setTestimonios(data))
      .catch(err => console.error("Error al cargar testimonios:", err));
  }, []);
  
  return (
    <div className="container my-5 testimonials-section">
      <div className="row justify-content-center">
        {testimonios.map((t, i) => (
          <div className="col-12 col-md-6 col-lg-3 d-flex align-items-stretch mb-4" key={i}>
            <div className="card testimonial-card text-center p-4">
              <img src={t.imagen} alt={t.nombre} className="rounded-circle mx-auto mb-3 img-fluid profile-img" />
              <p className="testimonial-text">{t.texto}</p>
              <p className="fw-bold mb-0">{t.nombre}</p>
              <p className="text-muted">{t.usuario}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
