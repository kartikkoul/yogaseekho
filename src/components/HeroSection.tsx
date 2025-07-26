import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDownCircle } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Find Your Inner Balance",
  subtitle = "Transform your mind and body through the ancient practice of yoga. Join me on a journey to wellness, strength, and peace.",
  ctaText = "Begin Your Journey",
  onCtaClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  },
  backgroundImage = "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1400&q=80",
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ backgroundColor: "#121212" }}
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-8 max-w-2xl"
        >
          <p className="text-lg text-gray-200 sm:text-xl">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            onClick={onCtaClick}
            size="lg"
            className="bg-white text-black hover:bg-white/90"
          >
            {ctaText}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-white hover:bg-white/10"
          >
            <ArrowDownCircle className="h-8 w-8 animate-bounce" />
          </Button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
        animate={{
          x: [0, -10, 0],
          y: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default HeroSection;
