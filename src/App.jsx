import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import UploadPage from "./pages/Upload";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import TestFunctionality from "./pages/TestFunctionality";
import Loading from "./components/Loading";
import { motion, AnimatePresence } from "framer-motion";

// Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <Loading size="lg" text="Authenticating..." fullScreen />;
  return isSignedIn ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

// Auth Page Wrapper
const AuthPage = ({ children, title }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4"
  >
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="relative z-10 w-full max-w-md"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-indigo-100">Welcome to PI Global</p>
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={
            <AuthPage title="Sign In">
              <SignIn 
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200",
                    card: "shadow-none border-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                  }
                }}
              />
            </AuthPage>
          } />
          <Route path="/signup" element={
            <AuthPage title="Sign Up">
              <SignUp 
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200",
                    card: "shadow-none border-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                  }
                }}
              />
            </AuthPage>
          } />
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/dashboard/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/dashboard/upload" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
          <Route path="/dashboard/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/test" element={<TestFunctionality />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;