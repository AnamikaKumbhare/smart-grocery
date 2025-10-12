// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');

const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/groceryDB';

async function main() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to', MONGO);

  // Clear existing data (be careful in production)
  await Product.deleteMany({});
  await User.deleteMany({});
  await Cart.deleteMany({});
  await Order.deleteMany({});

  // 1) Create Products (use the cart items as products)
  const productsData = [
    { name: "Organic Red Apples", price: 90.00, unit: 'kg', category: 'Fresh Picks', stock: 100, image: "" },
    { name: "Sharp Cheddar Cheese (Shredded)", price: 349.05, unit: 'pack', category: 'Dairy', stock: 50, image: "" },
    { name: "Italian Penne Pasta", price: 159.00, unit: 'pkts', category: 'Pantry', stock: 200, image: "" }
  ];

  const createdProducts = await Product.insertMany(productsData);
  console.log('Inserted products:', createdProducts.map(p => p.name));

  // 2) Create user (account details)
  const userData = {
    name: "Vansh M.",
    customerID: "CUST-8072",
    email: "vansh@example.com",
    phone: "9876543210",
    // password omitted for mock user
  };
  const user = await User.create(userData);
  console.log('Inserted user:', user.customerID);

  // 3) Create cart for the user using product references and qty
  // Map mock cart items to product IDs
  const mockCartItems = [
    { idIndex: 0, qty: 2, unit: 'kg' },    // Organic Red Apples
    { idIndex: 1, qty: 1, unit: 'pack' },  // Cheddar
    { idIndex: 2, qty: 3, unit: 'pkts' }   // Pasta
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

  // 4) Create orders (order history)
  const ordersData = [
    { orderId: 'ORD-10045', date: new Date('2025-09-28'), total: 680.50, status: 'Delivered', itemsCount: 3 },
    { orderId: 'ORD-10044', date: new Date('2025-09-15'), total: 1250.00, status: 'Delivered', itemsCount: 5 },
    { orderId: 'ORD-10043', date: new Date('2025-09-01'), total: 450.00, status: 'Cancelled', itemsCount: 2 }
  ];

  // For demo, we'll attach the same cart items but adjust as needed
  const createdOrders = [];
  for (const o of ordersData) {
    const order = await Order.create({
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
    createdOrders.push(order);
  }

  console.log('Inserted orders:', createdOrders.map(o => o.orderId));

  console.log('Seeding completed.');
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
