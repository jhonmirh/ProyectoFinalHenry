import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import FeatureSection from "../FeatureSection/FeatureSection";
import ServicesSection from "../ServicesSection/ServicesSection";
import Testimonials from "../TestmonialsCarousel/Testimonials";
import CarouselComponent from "../Rooms/CarouselComponent";

const HomeContainer = () => {
  return (
    <div>
      <HeroSection />
      <CarouselComponent />
      <FeatureSection />
      <ServicesSection />
      <Testimonials />
    </div>
  );
};

export default HomeContainer;
