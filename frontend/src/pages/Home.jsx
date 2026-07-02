import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import SplashScreen from "../components/SplashScreen";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandHighlights from "../components/BrandHighlights";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

function Home() {
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loaderShown = sessionStorage.getItem("loaderShown");

    if (!loaderShown) {
      const timer = setTimeout(() => {
        setLoading(false);

        sessionStorage.setItem("loaderShown", "true");

        toast.success(
          user
            ? `👋 Welcome back, ${user.name}! Happy Shopping!`
            : "🎉 Welcome to ShopSphere! Explore amazing products.",
          {
            duration: 4000,
            position: "top-center",
          }
        );
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Hero />
        <BrandHighlights />
        <Categories />
        <FeaturedProducts />
      </main>

      <Footer />
    </>
  );
}

export default Home;