import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  name: string;
  price: string;
  badge: string;
  img: string;
}

interface SectionProps {
  title: string;
  products: Product[];
}

const Section: React.FC<SectionProps> = ({ title, products }) => (
  <div className="col-xl-3 col-lg-4 col-md-6">
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h3 className="section-title">{title}</h3>
        <div className="row g-3">
          {products.map((p, idx) => <ProductCard key={idx} {...p} />)}
        </div>
        <a href="#" className="see-all-link d-block mt-3">
          See all {title} <i className="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
);

export default Section;
