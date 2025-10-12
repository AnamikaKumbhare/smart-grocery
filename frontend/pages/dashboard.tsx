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

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  // Redirect to auth if not logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      router.replace("/auth");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const freshPicks = [
    { name: "Organic Red Apples", price: "$2.99/lb", badge: "25% Off", img: "https://source.unsplash.com/random/150x150/?red+apples" },
    { name: "Dairy Farm Milk (1 gal)", price: "$3.49", badge: "BOGO", img: "https://source.unsplash.com/random/150x150/?fresh+milk" },
    { name: "Artisan Whole Wheat Bread", price: "$3.75", badge: "New", img: "https://source.unsplash.com/random/150x150/?whole+wheat+bread" },
    { name: "Ripe Avocados (2-pack)", price: "$4.50", badge: "Limited", img: "https://source.unsplash.com/random/150x150/?ripe+avocados" },
  ];

  const pantryEssentials = [
    { name: "Premium Basmati Rice (5lb)", price: "$7.99", badge: "15% Off", img: "https://source.unsplash.com/random/150x150/?basmati+rice" },
    { name: "Italian Penne Pasta", price: "$1.89", badge: "Bulk Buy", img: "https://source.unsplash.com/random/150x150/?italian+pasta" },
    { name: "Extra Virgin Olive Oil (1L)", price: "$12.50", badge: "Best Seller", img: "https://source.unsplash.com/random/150x150/?olive+oil" },
    { name: "Premium Ground Coffee (12oz)", price: "$9.25", badge: "Daily Deal", img: "https://source.unsplash.com/random/150x150/?ground+coffee" },
  ];

  const snackBeverage = [
    { name: "Chocolate Chip Cookies", price: "$3.25", badge: "New", img: "https://source.unsplash.com/random/150x150/?cookies" },
    { name: "Green Tea Bags (20ct)", price: "$4.50", badge: "15% Off", img: "https://source.unsplash.com/random/150x150/?green+tea" },
    { name: "Soda Pack (6 cans)", price: "$5.99", badge: "Limited", img: "https://source.unsplash.com/random/150x150/?soda" },
    { name: "Mixed Nuts (250g)", price: "$6.49", badge: "Best Seller", img: "https://source.unsplash.com/random/150x150/?nuts" },
  ];

  const popularItems = [
    { name: "Organic Bananas", price: "$1.29/lb", badge: "Top Pick", img: "https://source.unsplash.com/random/150x150/?bananas" },
    { name: "Fresh Strawberries", price: "$3.99/pint", badge: "Trending", img: "https://source.unsplash.com/random/150x150/?strawberries" },
    { name: "Almond Milk (1L)", price: "$3.75", badge: "Hot Deal", img: "https://source.unsplash.com/random/150x150/?almond+milk" },
    { name: "Whole Grain Bread", price: "$3.50", badge: "Popular", img: "https://source.unsplash.com/random/150x150/?whole+grain+bread" },
  ];

  const weeklySaver = [
    { name: "Chicken Breasts (1kg)", price: "$9.99", badge: "Weekly Saver", img: "https://source.unsplash.com/random/150x150/?chicken" },
    { name: "Salmon Fillets (500g)", price: "$12.50", badge: "Discount", img: "https://source.unsplash.com/random/150x150/?salmon" },
    { name: "Eggs (12pcs)", price: "$2.99", badge: "Best Deal", img: "https://source.unsplash.com/random/150x150/?eggs" },
    { name: "Greek Yogurt (500g)", price: "$4.50", badge: "Save More", img: "https://source.unsplash.com/random/150x150/?yogurt" },
  ];

  const dailyEssentials = [
    { name: "Toothpaste (100ml)", price: "$1.99", badge: "Daily Use", img: "https://source.unsplash.com/random/150x150/?toothpaste" },
    { name: "Shampoo (250ml)", price: "$3.25", badge: "Must Have", img: "https://source.unsplash.com/random/150x150/?shampoo" },
    { name: "Bath Soap (100g)", price: "$0.99", badge: "Top Rated", img: "https://source.unsplash.com/random/150x150/?soap" },
    { name: "Hand Sanitizer (200ml)", price: "$2.50", badge: "Essential", img: "https://source.unsplash.com/random/150x150/?hand+sanitizer" },
  ];

  if (!user) return null;

  return (
    <>
      <Header />
      <main className="container-fluid py-4">
        <div className="row g-3 mb-4">
          <div className="col-lg-6">
            <img
              src="https://source.unsplash.com/random/600x120/?vegetables,sale"
              className="ad-banner"
              alt="Veg Deals"
            />
          </div>
          <div className="col-lg-6">
            <img
              src="https://source.unsplash.com/random/600x120/?dairy,promo"
              className="ad-banner"
              alt="Dairy Promo"
            />
          </div>
        </div>

        <div className="row g-4">
          <Section title="Fresh Picks for You" products={freshPicks} />
          <Section title="Your Pantry Essentials" products={pantryEssentials} />
          <Section title="Snack & Beverage Bargains" products={snackBeverage} />
          <Section title="Popular Items" products={popularItems} />
          <Section title="Weekly Super Saver" products={weeklySaver} />
          <Section title="Daily Essentials" products={dailyEssentials} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
