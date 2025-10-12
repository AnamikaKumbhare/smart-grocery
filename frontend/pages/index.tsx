// pages/index.js
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dashboard from "./dashboard";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      // Redirect to Auth page if not logged in
      router.replace("/auth");
    }
  }, [router]);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Home;
