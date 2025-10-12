import React from "react";

interface PromoCardProps {
  title: string;
  subtitle: string;
  priceInfo?: string;
  mainImage: string;
  smallImages?: string[];
  buttonText?: string;
}

const PromoCard: React.FC<PromoCardProps> = ({
  title,
  subtitle,
  priceInfo,
  mainImage,
  smallImages,
  buttonText,
}) => {
  return (
    <div className="card h-100 shadow-sm large-promo-card">
      <div className="card-body d-flex flex-column">
        <h3 className="section-title">{title}</h3>
        <div className="mb-3">
          <h4 className="fw-bold">{subtitle}</h4>
          {priceInfo && <p className="promo-capacity">{priceInfo}</p>}
        </div>
        <div className="text-center mb-3">
          <img src={mainImage} alt={subtitle} className="img-fluid rounded" style={{ maxWidth: 180 }} />
          {smallImages && (
            <div className="d-flex justify-content-center gap-2 mt-3 small-promo-images">
              {smallImages.map((img, idx) => (
                <img key={idx} src={img} alt={`promo-${idx}`} />
              ))}
            </div>
          )}
        </div>
        {buttonText && <button className="btn promo-button mt-auto">{buttonText}</button>}
      </div>
    </div>
  );
};

export default PromoCard;
