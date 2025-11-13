"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

interface Review {
  id: number;
  name: string;
  text: string;
  date: string;
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [reviews]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (reviews.length === 0) return null;

  const review = reviews[current];

  return (
    <section className="w-full py-16 mt-20 shadow-inner">
      <div className="max-w-3xl mx-auto text-center px-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded-2xl shadow-lg relative"
          >
            <FaQuoteLeft className="absolute top-4 left-4 text-indigo-300 text-2xl" />
            <FaQuoteRight className="absolute bottom-4 right-4 text-indigo-300 text-2xl" />

            <p className="text-lg md:text-xl text-gray-700 italic mb-6">
              "{review.text}"
            </p>
            <div className="text-gray-800 font-semibold text-lg">
              — {review.name}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {new Date(review.date).toLocaleDateString("hu-HU")}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-6 space-x-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? "bg-indigo-500 scale-125" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
