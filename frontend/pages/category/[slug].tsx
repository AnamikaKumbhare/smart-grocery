"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Product {
  name: string;
  price: string;
  badge: string;
  img: string;
}

const allProductsByCategory: Record<string, Product[]> = {
  freshPicks: [
    { name: "Organic Red Apples", price: "$2.99/lb", badge: "25% Off", img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=300&fit=crop" },
    { name: "Avocados (2-pack)", price: "$4.50", badge: "Limited", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop" },
    { name: "Fresh Lettuce", price: "$1.49", badge: "New", img: "https://images.unsplash.com/photo-1617196039931-428b41c76093?w=300&h=300&fit=crop" },
    { name: "Tomatoes (1kg)", price: "$2.49", badge: "Hot", img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=300&fit=crop" },
    { name: "Potatoes (2kg)", price: "$3.25", badge: "Saver", img: "https://images.unsplash.com/photo-1617137968427-85924c800b4c?w=300&h=300&fit=crop" },
    { name: "Cucumber", price: "$1.99", badge: "Top Pick", img: "https://images.unsplash.com/photo-1590080875837-4a1e1c43e8a8?w=300&h=300&fit=crop" },
    { name: "Oranges (2kg)", price: "$3.75", badge: "Trending", img: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=300&h=300&fit=crop" },
    { name: "Spinach Bunch", price: "$1.50", badge: "Fresh", img: "https://images.unsplash.com/photo-1603052876540-fbdbf7be6b8d?w=300&h=300&fit=crop" },
    { name: "Dairy Farm Milk (1 gal)", price: "$3.49", badge: "BOGO", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop" },
    { name: "Artisan Whole Wheat Bread", price: "$3.75", badge: "New", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop" },
    { name: "Carrots (1kg)", price: "$1.89", badge: "Fresh", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop" },
    { name: "Broccoli", price: "$2.29", badge: "Healthy", img: "https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=300&h=300&fit=crop" },
  ],
  pantryEssentials: [
    { name: "Premium Basmati Rice (5lb)", price: "$7.99", badge: "15% Off", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop" },
    { name: "Cooking Oil (2L)", price: "$10.50", badge: "Save More", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop" },
    { name: "Wheat Flour (5kg)", price: "$6.75", badge: "New", img: "https://images.unsplash.com/photo-1590080875837-4a1e1c43e8a8?w=300&h=300&fit=crop" },
    { name: "Sugar (2kg)", price: "$3.99", badge: "Hot", img: "https://images.unsplash.com/photo-1579983926774-1d7c10b4c3b8?w=300&h=300&fit=crop" },
    { name: "Salt (1kg)", price: "$1.29", badge: "Daily Use", img: "https://images.unsplash.com/photo-1612902379783-2a793bcee83f?w=300&h=300&fit=crop" },
    { name: "Italian Penne Pasta", price: "$1.89", badge: "Bulk Buy", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop" },
    { name: "Tea Powder (500g)", price: "$4.49", badge: "Hot", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=300&fit=crop" },
    { name: "Premium Ground Coffee (12oz)", price: "$9.25", badge: "Daily Deal", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop" },
    { name: "Extra Virgin Olive Oil (1L)", price: "$12.50", badge: "Best Seller", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop" },
    { name: "Honey (500g)", price: "$8.99", badge: "Pure", img: "https://images.unsplash.com/photo-1587049352846-4a222e784538?w=300&h=300&fit=crop" },
    { name: "Oats (1kg)", price: "$4.25", badge: "Healthy", img: "https://images.unsplash.com/photo-1590154103973-b829709e8bd1?w=300&h=300&fit=crop" },
    { name: "Lentils (1kg)", price: "$3.75", badge: "Protein", img: "https://images.unsplash.com/photo-1599909533708-85bf9b033805?w=300&h=300&fit=crop" },
  ],
  snackBeverage: [
    { name: "Chocolate Chip Cookies", price: "$3.25", badge: "New", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop" },
    { name: "Green Tea Bags (20ct)", price: "$4.50", badge: "15% Off", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=300&fit=crop" },
    { name: "Soda Pack (6 cans)", price: "$5.99", badge: "Limited", img: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop" },
    { name: "Mixed Nuts (250g)", price: "$6.49", badge: "Best Seller", img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=300&fit=crop" },
    { name: "Potato Chips", price: "$2.99", badge: "Crunchy", img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop" },
    { name: "Energy Drink", price: "$3.49", badge: "Boost", img: "https://images.unsplash.com/photo-1622543925917-763c34063fca?w=300&h=300&fit=crop" },
    { name: "Dark Chocolate Bar", price: "$2.75", badge: "Premium", img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=300&fit=crop" },
    { name: "Fruit Juice (1L)", price: "$4.25", badge: "Fresh", img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop" },
    { name: "Popcorn Pack", price: "$3.75", badge: "Movie Time", img: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=300&h=300&fit=crop" },
    { name: "Granola Bars (6ct)", price: "$5.50", badge: "Healthy", img: "https://images.unsplash.com/photo-1526055860-2feb41cabb26?w=300&h=300&fit=crop" },
  ],
  popularItems: [
    { name: "Organic Bananas", price: "$1.29/lb", badge: "Top Pick", img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=300&h=300&fit=crop" },
    { name: "Fresh Strawberries", price: "$3.99/pint", badge: "Trending", img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop" },
    { name: "Almond Milk (1L)", price: "$3.75", badge: "Hot Deal", img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop" },
    { name: "Whole Grain Bread", price: "$3.50", badge: "Popular", img: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=300&h=300&fit=crop" },
    { name: "Cheddar Cheese (200g)", price: "$5.99", badge: "Tasty", img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=300&fit=crop" },
    { name: "Orange Juice (1L)", price: "$4.49", badge: "Fresh", img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop" },
    { name: "Blueberries (250g)", price: "$5.25", badge: "Antioxidant", img: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&h=300&fit=crop" },
    { name: "Butter (250g)", price: "$4.75", badge: "Creamy", img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop" },
    { name: "Peanut Butter (500g)", price: "$6.25", badge: "Protein", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop" },
    { name: "Ice Cream (1L)", price: "$7.99", badge: "Sweet", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop" },
  ],
  weeklySaver: [
    { name: "Chicken Breasts (1kg)", price: "$9.99", badge: "Weekly Saver", img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop" },
    { name: "Salmon Fillets (500g)", price: "$12.50", badge: "Discount", img: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=300&h=300&fit=crop" },
    { name: "Eggs (12pcs)", price: "$2.99", badge: "Best Deal", img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop" },
    { name: "Greek Yogurt (500g)", price: "$4.50", badge: "Save More", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop" },
    { name: "Ground Beef (500g)", price: "$7.99", badge: "Weekly Deal", img: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=300&h=300&fit=crop" },
    { name: "Frozen Pizza", price: "$5.99", badge: "Quick Meal", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop" },
    { name: "Bacon (250g)", price: "$6.49", badge: "Save", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop" },
    { name: "Cheese Block (400g)", price: "$8.25", badge: "Bulk Buy", img: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=300&h=300&fit=crop" },
    { name: "Sausages (500g)", price: "$7.75", badge: "BBQ Ready", img: "https://images.unsplash.com/photo-1552507673-2a6c80e2b3b9?w=300&h=300&fit=crop" },
    { name: "Cottage Cheese (300g)", price: "$3.99", badge: "Protein Rich", img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=300&fit=crop" },
  ],
  dailyEssentials: [
    { name: "Toothpaste (100ml)", price: "$1.99", badge: "Daily Use", img: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=300&h=300&fit=crop" },
    { name: "Shampoo (250ml)", price: "$3.25", badge: "Must Have", img: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&h=300&fit=crop" },
    { name: "Bath Soap (100g)", price: "$0.99", badge: "Top Rated", img: "https://images.unsplash.com/photo-1622786041832-cbfb2f0e5c8d?w=300&h=300&fit=crop" },
    { name: "Hand Sanitizer (200ml)", price: "$2.50", badge: "Essential", img: "https://images.unsplash.com/photo-1584483766552-a1b5b0a96fb4?w=300&h=300&fit=crop" },
    { name: "Tissue Box", price: "$1.75", badge: "Soft", img: "https://images.unsplash.com/photo-1584305574112-a06c0e8f2a15?w=300&h=300&fit=crop" },
    { name: "Laundry Detergent (1L)", price: "$5.99", badge: "Clean", img: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=300&h=300&fit=crop" },
    { name: "Dish Soap (500ml)", price: "$2.49", badge: "Powerful", img: "https://images.unsplash.com/photo-1600857062241-98e5e6e24ee2?w=300&h=300&fit=crop" },
    { name: "Paper Towels", price: "$3.75", badge: "Absorbent", img: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=300&h=300&fit=crop" },
    { name: "Body Lotion (200ml)", price: "$4.25", badge: "Moisturize", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop" },
    { name: "Deodorant", price: "$3.49", badge: "Fresh", img: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&h=300&fit=crop" },
  ],
};

const categoryTitles: Record<string, string> = {
  freshPicks: "Fresh Picks for You",
  pantryEssentials: "Your Pantry Essentials",
  snackBeverage: "Snack & Beverage Bargains",
  popularItems: "Popular Items",
  weeklySaver: "Weekly Super Saver",
  dailyEssentials: "Daily Essentials",
};

const ProductCard = ({ name, price, badge, img, addToCart }: Product & { addToCart: () => void }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div style={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
        <img
          src={img}
          alt={name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            backgroundColor: "#dc3545",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: "600",
          }}
        >
          {badge}
        </span>
      </div>
      <div className="card-body">
        <h6 className="card-title" style={{ fontSize: "0.9rem", marginBottom: "8px" }}>
          {name}
        </h6>
        <p className="text-primary fw-bold mb-2">{price}</p>
        <button
          className="btn btn-primary btn-sm w-100"
          onClick={addToCart}
          style={{ fontSize: "0.85rem" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCart(storedCart);
  }, []);

  const addToCart = (product: Product) => {
    const updatedCart = [...cart];
    const existing = updatedCart.find((item) => item.name === product.name);
    if (existing) {
      alert(`✅ ${product.name} is already in your cart.`);
    } else {
      updatedCart.push(product);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCart(updatedCart);
      alert(`🛒 ${product.name} added to cart.`);
    }
  };

  const products = slug ? allProductsByCategory[slug] || [] : [];
  const categoryTitle = slug ? categoryTitles[slug] || slug : "";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#007bff", color: "white", padding: "16px 0" }}>
        <div className="container">
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>GroceryMart</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-4">
        <button
          className="btn btn-link mb-3 p-0"
          onClick={() => router.back()}
          style={{ textDecoration: "none", color: "#007bff" }}
        >
          ← Back to Dashboard
        </button>

        <h2 className="mb-4" style={{ fontSize: "1.75rem", fontWeight: "600" }}>
          {categoryTitle}
        </h2>

        <div className="row g-4">
          {products.map((p, idx) => (
            <div key={idx} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <ProductCard {...p} addToCart={() => addToCart(p)} />
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center mt-5">
            <p className="text-muted" style={{ fontSize: "1.1rem" }}>
              No products found for this category.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "#343a40", color: "white", padding: "24px 0", marginTop: "48px" }}>
        <div className="container text-center">
          <p style={{ margin: 0 }}>© 2025 GroceryMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;