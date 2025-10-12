// backend/seed.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Product from './models/Product.js';
import User from './models/User.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/groceryDB';

async function main() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to', MONGO);

  // Clear existing data (be careful in production)
  await Product.deleteMany({});
  await User.deleteMany({});
  await Cart.deleteMany({});
  await Order.deleteMany({});

  // 1) Create Products
  const productsData = [
    { name: "Organic Red Apples", price: 90.0, unit: 'kg', category: 'Fresh Picks', stock: 100, image: "" },
    { name: "Sharp Cheddar Cheese (Shredded)", price: 349.05, unit: 'pack', category: 'Dairy', stock: 50, image: "" },
    { name: "Italian Penne Pasta", price: 159.0, unit: 'pkts', category: 'Pantry', stock: 200, image: "" }
  ];
  const createdProducts = await Product.insertMany(productsData);
  console.log('Inserted products:', createdProducts.map(p => p.name));

  // 2) Create User
  const userData = {
    name: "Vansh M.",
    customerID: "CUST-8072",
    email: "vansh@example.com",
    phone: "9876543210"
  };
  const user = await User.create(userData);
  console.log('Inserted user:', user.customerID);

  // 3) Create Cart for the User
  const mockCartItems = [
    { idIndex: 0, qty: 2, unit: 'kg' },
    { idIndex: 1, qty: 1, unit: 'pack' },
    { idIndex: 2, qty: 3, unit: 'pkts' }
  ];
  const cartItems = mockCartItems.map(ci => {
    const prod = createdProducts[ci.idIndex];
    return {
      productId: prod._id,
      name: prod.name,
      price: prod.price,
      qty: ci.qty,
      unit: ci.unit
    };
  });
  const cart = await Cart.create({ userId: user._id, items: cartItems });
  console.log('Created cart for user:', user.customerID);

  // 4) Create Orders (Order history)
  const ordersData = [
    { orderId: 'ORD-10045', date: new Date('2025-09-28'), total: 680.5, status: 'Delivered', itemsCount: 3 },
    { orderId: 'ORD-10044', date: new Date('2025-09-15'), total: 1250.0, status: 'Delivered', itemsCount: 5 },
    { orderId: 'ORD-10043', date: new Date('2025-09-01'), total: 450.0, status: 'Cancelled', itemsCount: 2 }
  ];

  for (const o of ordersData) {
    await Order.create({
      orderId: o.orderId,
      userId: user._id,
      date: o.date,
      items: cartItems.slice(0, Math.min(o.itemsCount, cartItems.length)).map(ci => ({
        productId: ci.productId,
        name: ci.name,
        price: ci.price,
        qty: ci.qty,
        unit: ci.unit
      })),
      total: o.total,
      status: o.status
    });
  }

  console.log('Inserted orders:', ordersData.map(o => o.orderId));
  console.log('Seeding completed.');

  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});