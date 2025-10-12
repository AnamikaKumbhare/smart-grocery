import React from "react";

interface ProductCardProps {
  name: string;
  price: string;
  badge: string;
  img: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, badge, img }) => (
  <div className="col-6">
    <div className="product-card card border-0 position-relative">
      <span className="badge bg-danger position-absolute top-0 start-0 m-2 deal-tag">{badge}</span>
      <img src={img} className="card-img-top p-2" alt={name} />
      <div className="card-body p-2 text-center">
        <p className="product-name mb-1">{name}</p>
        <p className="product-price mb-0">{price}</p>
      </div>
    </div>
  </div>
);

export default ProductCard;
