import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Package, Upload, Shield, LogIn, Star, ArrowRight, CheckCircle, Zap, Users, TrendingUp, Globe, Award } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";

const Landing = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/dashboard");
    }
  }, [isLoaded, isSignedIn, navigate]);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "PI Global transformed our inventory management. Sales increased by 40% in just 3 months!",
      avatar: "SJ",
      rating: 5,
      company: "TechStart Inc."
    },
    {
      name: "Mike Chen",
      role: "Operations Manager",
      content: "The analytics dashboard gives us insights we never had. Real-time tracking is a game-changer.",
      avatar: "MC",
      rating: 5,
      company: "Global Retail Co."
    },
    {
      name: "Emma Davis",
      role: "Retail Manager",
      content: "Finally, a system that actually works! Our team productivity improved by 60%.",
      avatar: "ED",
      rating: 5,
      company: "Fashion Forward"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        ></motion.div>
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        ></motion.div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 mb-4">
                <Zap className="w-4 h-4 mr-2" />
                #1 Inventory Management Solution
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Streamline Your{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  PI Global
                </span>{" "}
                Experience
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Transform your business with our powerful purchase inventory management solution. 
              Get real-time analytics, seamless tracking, and boost your productivity by{" "}
              <span className="font-semibold text-indigo-600">300%</span>.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-2xl"
                >
                  <LogIn size={24} />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 text-lg font-medium">
                  <BarChart3 size={24} />
                  Watch Demo
                </button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>10,000+ Happy Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Enterprise Security</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: TrendingUp, label: "Revenue Growth", value: "+127%", color: "text-green-600" },
                    { icon: Package, label: "Products Managed", value: "50K+", color: "text-indigo-600" },
                    { icon: Users, label: "Active Users", value: "2.5K", color: "text-purple-600" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="text-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 mb-4">
              <Award className="w-4 h-4 mr-2" />
              Powerful Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to{" "}
              <span className="text-indigo-600">Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed to streamline your inventory management and boost your business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Package size={48} className="text-indigo-600" />,
                title: "Smart Product Management",
                description: "AI-powered categorization and tracking with automated reorder alerts and inventory optimization.",
                features: ["Auto-categorization", "Smart alerts", "Bulk operations"]
              },
              {
                icon: <BarChart3 size={48} className="text-purple-600" />,
                title: "Advanced Analytics",
                description: "Real-time insights with predictive analytics, custom reports, and performance dashboards.",
                features: ["Predictive insights", "Custom reports", "Real-time data"]
              },
              {
                icon: <Upload size={48} className="text-green-600" />,
                title: "Seamless Media Upload",
                description: "Drag-and-drop media management with automatic optimization and cloud storage integration.",
                features: ["Drag & drop", "Auto optimization", "Cloud storage"]
              },
              {
                icon: <Shield size={48} className="text-blue-600" />,
                title: "Enterprise Security",
                description: "Bank-level security with end-to-end encryption, role-based access, and audit trails.",
                features: ["256-bit encryption", "Role management", "Audit logs"]
              },
              {
                icon: <Globe size={48} className="text-pink-600" />,
                title: "Global Integration",
                description: "Connect with 100+ platforms including e-commerce, accounting, and shipping solutions.",
                features: ["100+ integrations", "API access", "Webhooks"]
              },
              {
                icon: <Zap size={48} className="text-yellow-600" />,
                title: "Lightning Fast",
                description: "Optimized performance with 99.9% uptime, instant search, and real-time synchronization.",
                features: ["99.9% uptime", "Instant search", "Real-time sync"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by <span className="text-indigo-600">Thousands</span>
            </h2>
            <p className="text-xl text-gray-600">See what our customers say about their experience</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className="text-indigo-600 text-sm font-medium">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-indigo-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using PI Global to streamline their operations and boost growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-2xl hover:bg-gray-50 transition-all duration-300 text-lg font-semibold shadow-xl"
                >
                  <LogIn size={24} />
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-indigo-600 transition-all duration-300 text-lg font-medium">
                  <BarChart3 size={24} />
                  Schedule Demo
                </button>
              </motion.div>
            </div>
            <p className="text-indigo-200 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;