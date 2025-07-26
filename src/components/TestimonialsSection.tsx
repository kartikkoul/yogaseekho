import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    const section = document.getElementById("testimonials");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Practicing for 2 years",
      content:
        "The yoga classes have completely transformed my life. I feel stronger, more flexible, and have found a sense of inner peace I never knew was possible.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Practicing for 5 years",
      content:
        "As someone who struggled with chronic back pain, these yoga sessions have been life-changing. The instructor's attention to proper alignment has helped me heal and grow stronger.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Practicing for 1 year",
      content:
        "I was nervous about starting yoga as a complete beginner, but the welcoming atmosphere and clear instructions made me feel comfortable from day one. Now I can't imagine my week without these classes!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Practicing for 3 years",
      content:
        "The mindfulness techniques I've learned in these classes have helped me manage stress at work and improved my focus. It's been a holistic improvement to my wellbeing.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="testimonials"
      className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-slate-50 to-slate-100 min-h-[600px] flex flex-col justify-center"
    >
      <motion.div
        className="container mx-auto max-w-6xl"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            What Our Students Say
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover how yoga has transformed the lives of our community
            members, bringing balance, strength, and peace to their everyday
            experiences.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3 pl-4"
              >
                <motion.div variants={itemVariants}>
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Quote className="text-primary w-10 h-10 mb-4 opacity-40" />
                      <p className="text-slate-700 mb-6 flex-grow">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 border-2 border-primary">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <h4 className="font-semibold text-slate-800">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="relative static left-0 right-0 translate-y-0 bg-white hover:bg-slate-100 border border-slate-200" />
            <CarouselNext className="relative static left-0 right-0 translate-y-0 bg-white hover:bg-slate-100 border border-slate-200" />
          </div>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
