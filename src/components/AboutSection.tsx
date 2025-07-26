import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "./ui/card";

interface AboutSectionProps {
  instructorName?: string;
  instructorBio?: string;
  videoId?: string;
}

const AboutSection = ({
  instructorName = "Akshay Kaul",
  instructorBio = "With over 10 years of experience teaching yoga across multiple disciplines, I've helped hundreds of students find balance, strength, and inner peace through mindful practice. My journey began in Rishikesh, India, where I completed my 200-hour teacher training, and has since evolved through continuous learning and personal growth. I specialize in Vinyasa, Hatha, and Restorative yoga, creating sequences that challenge the body while nurturing the spirit.",
  videoId = "vSK7aoP5PM8",
}: AboutSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      className="py-20 bg-slate-50 min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Meet Your Instructor
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-lg shadow-xl"
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Yoga Instructor Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                    {instructorName}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {instructorBio}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-center p-4 bg-slate-100 rounded-lg">
                      <span className="block text-3xl font-bold text-primary mb-1">
                        10+
                      </span>
                      <span className="text-sm text-slate-600">
                        Years Experience
                      </span>
                    </div>
                    <div className="text-center p-4 bg-slate-100 rounded-lg">
                      <span className="block text-3xl font-bold text-primary mb-1">
                        500+
                      </span>
                      <span className="text-sm text-slate-600">
                        Students Taught
                      </span>
                    </div>
                    <div className="text-center p-4 bg-slate-100 rounded-lg">
                      <span className="block text-3xl font-bold text-primary mb-1">
                        5
                      </span>
                      <span className="text-sm text-slate-600">
                        Yoga Styles
                      </span>
                    </div>
                    <div className="text-center p-4 bg-slate-100 rounded-lg">
                      <span className="block text-3xl font-bold text-primary mb-1">
                        200hr
                      </span>
                      <span className="text-sm text-slate-600">
                        Certification
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
