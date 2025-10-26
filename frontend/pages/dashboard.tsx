"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  customerID: string;
}

interface Product {
  name: string;
  price: string;
  badge: string;
  img: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      router.replace("/auth");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

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

  const allProducts = {
    freshPicks: [
      { name: "Organic Red Apples", price: "$2.99/lb", badge: "25% Off", img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=300&fit=crop" },
      { name: "Dairy Farm Milk (1 gal)", price: "$3.49", badge: "BOGO", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop" },
      { name: "Artisan Whole Wheat Bread", price: "$3.75", badge: "New", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop" },
      { name: "Ripe Avocados (2-pack)", price: "$4.50", badge: "Limited", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop" },
    ],
    pantryEssentials: [
      { name: "Premium Basmati Rice (5lb)", price: "$7.99", badge: "15% Off", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop" },
      { name: "Italian Penne Pasta", price: "$1.89", badge: "Bulk Buy", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop" },
      { name: "Extra Virgin Olive Oil (1L)", price: "$12.50", badge: "Best Seller", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop" },
      { name: "Premium Ground Coffee (12oz)", price: "$9.25", badge: "Daily Deal", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop" },
    ],
    snackBeverage: [
      { name: "Chocolate Chip Cookies", price: "$3.25", badge: "New", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop" },
      { name: "Green Tea Bags (20ct)", price: "$4.50", badge: "15% Off", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=300&fit=crop" },
      { name: "Soda Pack (6 cans)", price: "$5.99", badge: "Limited", img: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop" },
      { name: "Mixed Nuts (250g)", price: "$6.49", badge: "Best Seller", img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=300&fit=crop" },
    ],
    popularItems: [
      { name: "Organic Bananas", price: "$1.29/lb", badge: "Top Pick", img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=300&h=300&fit=crop" },
      { name: "Fresh Strawberries", price: "$3.99/pint", badge: "Trending", img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop" },
      { name: "Almond Milk (1L)", price: "$3.75", badge: "Hot Deal", img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop" },
      { name: "Whole Grain Bread", price: "$3.50", badge: "Popular", img: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=300&h=300&fit=crop" },
    ],
    weeklySaver: [
      { name: "Chicken Breasts (1kg)", price: "$9.99", badge: "Weekly Saver", img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop" },
      { name: "Salmon Fillets (500g)", price: "$12.50", badge: "Discount", img: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=300&h=300&fit=crop" },
      { name: "Eggs (12pcs)", price: "$2.99", badge: "Best Deal", img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop" },
      { name: "Greek Yogurt (500g)", price: "$4.50", badge: "Save More", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop" },
    ],
    dailyEssentials: [
      { name: "Toothpaste (100ml)", price: "$1.99", badge: "Daily Use", img: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=300&h=300&fit=crop" },
      { name: "Shampoo (250ml)", price: "$3.25", badge: "Must Have", img: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&h=300&fit=crop" },
      { name: "Bath Soap (100g)", price: "$0.99", badge: "Top Rated", img: "https://images.unsplash.com/photo-1622786041832-cbfb2f0e5c8d?w=300&h=300&fit=crop" },
      { name: "Hand Sanitizer (200ml)", price: "$2.50", badge: "Essential", img: "https://images.unsplash.com/photo-1584483766552-a1b5b0a96fb4?w=300&h=300&fit=crop" },
    ],
  };

  const filterProducts = (products: Product[]) => {
    if (!searchQuery.trim()) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredProducts = {
    freshPicks: filterProducts(allProducts.freshPicks),
    pantryEssentials: filterProducts(allProducts.pantryEssentials),
    snackBeverage: filterProducts(allProducts.snackBeverage),
    popularItems: filterProducts(allProducts.popularItems),
    weeklySaver: filterProducts(allProducts.weeklySaver),
    dailyEssentials: filterProducts(allProducts.dailyEssentials),
  };

  const hasResults = Object.values(filteredProducts).some((arr) => arr.length > 0);

  if (!user) return null;

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container-fluid py-4">
        {!searchQuery && (
          <div className="row g-3 mb-4">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=150&fit=crop"
                className="ad-banner"
                alt="Veg Deals"
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=150&fit=crop"
                className="ad-banner"
                alt="Dairy Promo"
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        )}

        <div className="row g-4">
          <Section title="Fresh Picks for You" slug="freshPicks" products={filteredProducts.freshPicks} addToCart={addToCart} />
          <Section title="Your Pantry Essentials" slug="pantryEssentials" products={filteredProducts.pantryEssentials} addToCart={addToCart} />
          <Section title="Snack & Beverage Bargains" slug="snackBeverage" products={filteredProducts.snackBeverage} addToCart={addToCart} />
          <Section title="Popular Items" slug="popularItems" products={filteredProducts.popularItems} addToCart={addToCart} />
          <Section title="Weekly Super Saver" slug="weeklySaver" products={filteredProducts.weeklySaver} addToCart={addToCart} />
          <Section title="Daily Essentials" slug="dailyEssentials" products={filteredProducts.dailyEssentials} addToCart={addToCart} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
