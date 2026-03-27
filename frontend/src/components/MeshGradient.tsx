import { motion } from "framer-motion";

interface MeshGradientProps {
  score: number;
}

export function MeshGradient({ score }: MeshGradientProps) {
  // Score is between -1 and 1
  // We want to map it to our target colors
  let targetColor = "#708090"; // Neutral Steel Gray
  
  if (score < -0.1) {
    targetColor = "#8b0000"; // Deep Crimson
  } else if (score > 0.1) {
    targetColor = "#50c878"; // Emerald Glass
  }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-zinc-950 pointer-events-none">
      {/* Background layer */}
      <motion.div
        animate={{ backgroundColor: targetColor }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 opacity-20"
      />
      
      {/* Dynamic animating blobs to create the mesh effect */}
      <motion.div
        animate={{ backgroundColor: targetColor }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"
      />
      <motion.div
        animate={{ backgroundColor: targetColor }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob"
        style={{ animationDelay: "2s" }}
      />
      <motion.div
        animate={{ backgroundColor: targetColor }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[90px] opacity-40 animate-blob"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
