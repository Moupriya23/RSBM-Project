import { createContext, useContext, useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Minimal Watch",
    price: "₹1299",
    category: "Accessories",
    description: "Clean design, built to last.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  },
  {
    id: 2,
    name: "Leather Wallet",
    price: "₹599",
    category: "Accessories",
    description: "Full-grain leather, slim profile.",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
  },
  {
    id: 3,
    name: "Desk Lamp",
    price: "₹899",
    category: "Home",
    description: "Warm light for focused work.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
  },
  {
    id: 4,
    name: "Canvas Bag",
    price: "₹759",
    category: "Bags",
    description: "Durable and everyday-ready.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
  },
  {
    id: 5,
    name: "Ceramic Mug",
    price: "₹359",
    category: "Home",
    description: "Handcrafted, holds 12oz.",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
  },
  {
    id: 6,
    name: "Sunglasses",
    price: "₹999",
    category: "Accessories",
    description: "UV400 protection, lightweight.",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
  },
];

const initialOrders = [
  {
    id: 1,
    customer: "Rahul Sharma",
    product: "Minimal Watch",
    price: "₹1299",
    status: "Pending",
    date: "2026-05-01",
  },
  {
    id: 2,
    customer: "Priya Mehta",
    product: "Leather Wallet",
    price: "₹599",
    status: "Delivered",
    date: "2026-05-03",
  },
  {
    id: 3,
    customer: "Amit Singh",
    product: "Desk Lamp",
    price: "₹899",
    status: "Shipped",
    date: "2026-05-06",
  },
  {
    id: 4,
    customer: "Sneha Roy",
    product: "Sunglasses",
    price: "₹999",
    status: "Pending",
    date: "2026-05-07",
  },
];

const initialMessages = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@email.com",
    message: "Do you have COD option?",
    date: "2026-05-02",
    read: false,
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya@email.com",
    message: "Can I return a product?",
    date: "2026-05-04",
    read: true,
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "amit@email.com",
    message: "When will the watch restock?",
    date: "2026-05-07",
    read: false,
  },
];

const AdminCtx = createContext();
export const useAdmin = () => useContext(AdminCtx);

export default function AdminProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [messages, setMessages] = useState(initialMessages);

  const addProduct = (p) =>
    setProducts((prev) => [...prev, { ...p, id: Date.now() }]);
  const updateProduct = (p) =>
    setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((x) => x.id !== id));
  const updateOrderStatus = (id, status) =>
    setOrders((prev) => prev.map((x) => (x.id === id ? { ...x, status } : x)));
  const markRead = (id) =>
    setMessages((prev) =>
      prev.map((x) => (x.id === id ? { ...x, read: true } : x)),
    );
  const deleteMessage = (id) =>
    setMessages((prev) => prev.filter((x) => x.id !== id));

  return (
    <AdminCtx.Provider
      value={{
        products,
        orders,
        messages,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        markRead,
        deleteMessage,
      }}
    >
      {children}
    </AdminCtx.Provider>
  );
}
