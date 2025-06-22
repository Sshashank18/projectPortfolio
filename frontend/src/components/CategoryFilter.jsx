 
import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
              : 'glass-morphism text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;
