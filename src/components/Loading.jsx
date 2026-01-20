import React from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

const Loading = ({ size = "md", text = "Loading...", fullScreen = false }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className={`border-4 border-indigo-100 rounded-full ${sizeClasses[size]}`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner spinning loader */}
        <motion.div
          className={`absolute inset-0 border-4 border-transparent border-t-indigo-600 border-r-purple-600 rounded-full ${sizeClasses[size]}`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center sparkle */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
        </motion.div>
      </div>
      
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <p className={`font-medium text-gray-700 ${textSizes[size]} mb-2`}>
            {text}
          </p>
          <motion.div
            className="flex justify-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-indigo-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8"
        >
          <LoadingContent />
        </motion.div>
        
        {/* Background animation */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <LoadingContent />
    </motion.div>
  );
};

export default Loading;