import Hero from "@/components/client/home/Hero";
import React from "react";

const Home = async () => {
  return (
    <div>
      <section className="hero min-h-screen overflow-hidden">
        <Hero />
      </section>
    </div>
  );
};

export default Home;
