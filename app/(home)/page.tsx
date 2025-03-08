import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PricingPage from "@/components/PricingPage";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const HomePage =async () => {
  const user = await currentUser();
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20">
      <HeroSection />
      <PricingPage userId={user?.id}/>
      <Footer />
    </div>
  );
};

export default HomePage;
