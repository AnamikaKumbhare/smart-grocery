import React from "react";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";

interface Product {
  name: string;
  price: string;
  badge: string;
  img: string;
}

interface SectionProps {
  title: string;
  slug: string;
  products: Product[];
  addToCart: (product: Product) => void;
}

const Section: React.FC<SectionProps> = ({ title, slug, products, addToCart }) => {
  const router = useRouter();

  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h3 className="section-title d-flex justify-content-between align-items-center">
            {title}
            <button
              className="btn btn-link btn-sm text-primary p-0"
              onClick={() => router.push(`/category/${slug}`)}
            >
              More Products →
            </button>
          </h3>
          <div className="row g-3">
            {products.map((p, idx) => (
              <ProductCard key={idx} {...p} addToCart={() => addToCart(p)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
