import React, { ReactComponentElement, ReactElement, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from '@emailjs/browser';
// import ReCAPTCHA from "react-google-recaptcha";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Send, CheckCircle, FacebookIcon, YoutubeIcon, InstagramIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, {message: "Please enter a valid phone number"}),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  // const captchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Check if CAPTCHA is completed
      // if (!captchaToken) {
      //   toast({
      //     title: "CAPTCHA Required",
      //     description: "Please complete the CAPTCHA verification before submitting.",
      //     variant: "destructive",
      //   });
      //   setIsSubmitting(false);
      //   return;
      // }

      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }

      // Prepare template parameters
      const templateParams = {
        service_name: "YogaSeekho",
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        message: data.message,
        // captcha_token: captchaToken, // Include CAPTCHA token for verification
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', response);

      toast({
        title: "Success!",
        description:
          "Your message has been sent. We will get back to you soon!",
      });

      setIsSubmitted(true);
      form.reset(); // Reset the form after successful submission
      // setCaptchaToken(null); // Reset CAPTCHA
      // if (captchaRef.current) {
      //   captchaRef.current.reset(); // Reset CAPTCHA widget
      // }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description:
          "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // CAPTCHA handlers
  // const handleCaptchaChange = (token: string | null) => {
  //   setCaptchaToken(token);
  // };

  // const handleCaptchaExpired = () => {
  //   setCaptchaToken(null);
  // };

  // const handleCaptchaError = () => {
  //   setCaptchaToken(null);
  //   toast({
  //     title: "CAPTCHA Error",
  //     description: "There was an error with the CAPTCHA. Please try again.",
  //     variant: "destructive",
  //   });
  // };

  type socialMedia = {
    id: string,
    svgComponent: ReactElement,
    link: string
  }[];


  const socialMediaLinks : socialMedia = [
    {id: "instagram", svgComponent: <InstagramIcon/>, link: "https://www.instagram.com/yogawithakshay"},
    {id: "facebook", svgComponent: <FacebookIcon/>, link:"https://www.facebook.com/yogawithakshay1"},
    {id: "youtube", svgComponent: <YoutubeIcon/>, link: "https://www.youtube.com/@yogawithakshay2736"},
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-8 bg-slate-50 min-h-screen flex items-center justify-center"
    >
      <motion.div
        className="container max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to start your yoga journey? Have questions about classes or
            private sessions? Fill out the form below and We'll get back to you
            as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Feel free to reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:yogaseekhoinfo@gmail.com" className="font-medium">yogaseekhoinfo@gmail.com</a>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">(123) 456-7890</p>
                  </div>
                </div> */}

                {/* <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Studio Location</p>
                    <p className="font-medium">XYZ, Sector 1, New Delhi</p>
                  </div>
                </div> */}

                <div className="pt-4">
                  <p className="text-sm text-gray-500 mb-3">Connect with me</p>
                  <div className="flex space-x-4">
                    {socialMediaLinks.map(
                      (social) => (
                        <a
                          key={social.id}
                          href={`${social.link}`}
                          className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
                          aria-label={`Visit ${social.id} profile`}
                          target="_blank"
                        >
                          <div className="w-5 h-5 text-primary flex justify-center items-center">
                            {social.svgComponent}
                          </div>
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            {isSubmitted ? (
              <Card className="border-none shadow-lg bg-primary/5 overflow-hidden">
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-primary mb-6"
                  >
                    <CheckCircle size={80} />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-center text-gray-600 mb-6">
                    Your message has been sent successfully. We'll get back to
                    you as soon as possible.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      form.reset();
                      // setCaptchaToken(null);
                      // if (captchaRef.current) {
                      //   captchaRef.current.reset();
                      // }
                    }}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-none shadow-lg overflow-hidden">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                className="focus:ring-primary focus:border-primary transition-all duration-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your email address"
                                type="email"
                                {...field}
                                className="focus:ring-primary focus:border-primary transition-all duration-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your phone number"
                                type="tel"
                                {...field}
                                className="focus:ring-primary focus:border-primary transition-all duration-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can I help you?"
                                {...field}
                                className="min-h-[120px] focus:ring-primary focus:border-primary transition-all duration-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Google reCAPTCHA */}
                      {/* <div className="flex justify-center py-4">
                        <ReCAPTCHA
                          ref={captchaRef}
                          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ""}
                          onChange={handleCaptchaChange}
                          onExpired={handleCaptchaExpired}
                          onError={handleCaptchaError}
                          theme="light"
                        />
                      </div> */}

                      <Button
                        type="submit"
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
