import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  sentiment: number | null;
}

interface MorphingGalleryProps {
  items: NewsItem[];
  onAnalyze: (id: string, text: string) => void;
}

export function MorphingGallery({ items, onAnalyze }: MorphingGalleryProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-light tracking-tight text-white/90 drop-shadow-sm">
          Market Intelligence
        </h2>
        <div className="glass flex items-center p-1 rounded-2xl">
          <button
             onClick={() => setViewMode("grid")}
             className={`p-3 rounded-xl transition-all ${
               viewMode === "grid" ? "bg-white/20 shadow-md text-white" : "text-white/50 hover:text-white/80"
             }`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
             onClick={() => setViewMode("list")}
             className={`p-3 rounded-xl transition-all ${
               viewMode === "list" ? "bg-white/20 shadow-md text-white" : "text-white/50 hover:text-white/80"
             }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`w-full ${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }`}
      >
        <AnimatePresence>
          {items.map((item) => {
            const isNegative = item.sentiment !== null && item.sentiment < -0.1;
            const isPositive = item.sentiment !== null && item.sentiment > 0.1;
            
            let sentimentBorder = "border-white/10";
            if (isNegative) sentimentBorder = "border-red-500/50";
            if (isPositive) sentimentBorder = "border-emerald-500/50";

            return (
              <motion.div
                layout
                layoutId={`card-${item.id}`}
                variants={itemVariants}
                key={item.id}
                onClick={() => onAnalyze(item.id, item.title)}
                className={`glass group cursor-none overflow-hidden hover:bg-white/5 transition-colors border ${sentimentBorder} ${
                  viewMode === "grid"
                    ? "rounded-3xl p-6 flex flex-col justify-between aspect-square"
                    : "rounded-2xl p-5 flex flex-row items-center justify-between"
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div layout="position" className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                    {item.source} • {item.date}
                  </span>
                  <p
                    className={`font-medium ${
                      viewMode === "grid" ? "text-xl md:text-2xl mt-4 line-clamp-4" : "text-lg line-clamp-1 max-w-2xl"
                    }`}
                  >
                    {item.title}
                  </p>
                </motion.div>

                <motion.div layout="position" className={viewMode === "grid" ? "mt-8" : "ml-6 whitespace-nowrap"}>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${
                    item.sentiment === null
                      ? "bg-white/10 text-white/70"
                      : isPositive
                      ? "bg-emerald-500/20 text-emerald-300"
                      : isNegative
                      ? "bg-red-500/20 text-red-300"
                      : "bg-slate-500/20 text-slate-300"
                  }`}>
                    {item.sentiment === null ? "Analyze Impact" : 
                      isPositive ? "+ Positive" : isNegative ? "- Negative" : "Neutral"}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
