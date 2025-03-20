"use client";

import Terminal from "@/components/Terminal";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <motion.div
        className="w-full max-w-4xl mx-auto rounded-md overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Terminal />
      </motion.div>
    </main>
  );
}
