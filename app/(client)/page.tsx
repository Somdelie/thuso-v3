import { About } from "@/components/client/home/About";
import { Featured } from "@/components/client/home/Featured";
import { FeaturedJobs } from "@/components/client/home/FeaturedJobs";
import Hero from "@/components/client/home/Hero";
import React from "react";

const Home = async () => {
  return (
    <div>
      <section className="hero min-h-screen overflow-hidden">
        <Hero />
      </section>
      <section className="about w-90% sm:w-[90%] mx-auto overflow-hidden">
        <About />
      </section>
      <section className="featured w-full mx-auto overflow-hidden">
        <Featured />
      </section>
      <section className="featuredJobs overflow-hidden ">
        <FeaturedJobs />
      </section>
    </div>
  );
};

export default Home;
