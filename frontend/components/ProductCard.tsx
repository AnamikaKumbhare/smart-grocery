import React from "react";

interface ProductCardProps {
  name: string;
  price: string;
  badge: string;
  img: string;
  addToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, badge, img, addToCart }) => (
  <div className="col-6">
    <div className="product-card card border-0 position-relative">
      <span className="badge bg-danger position-absolute top-0 start-0 m-2">{badge}</span>
      <img src={img} className="card-img-top p-2" alt={name} />
      <div className="card-body p-2 text-center">
        <p className="product-name mb-1 fw-bold">{name}</p>
        <p className="product-price mb-2 text-muted">Rs {price}</p>
        <button className="btn btn-sm btn-primary w-100" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
