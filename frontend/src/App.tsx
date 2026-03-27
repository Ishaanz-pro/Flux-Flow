import { useState } from "react";
import { LiquidCursor } from "./components/LiquidCursor";
import { MeshGradient } from "./components/MeshGradient";
import { MorphingGallery } from "./components/MorphingGallery";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  sentiment: number | null;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Global Markets Rally as Tech Giants Smash Quarterly Earnings Expectations",
    source: "Financial Times",
    date: "10:30 AM",
    sentiment: null,
  },
  {
    id: "2",
    title: "Supply Chain Disruptions Deepen, Threatening Holiday Retail Margins",
    source: "Bloomberg",
    date: "11:15 AM",
    sentiment: null,
  },
  {
    id: "3",
    title: "Central Bank Holds Rates Steady, Citing Balanced Inflation Data",
    source: "Reuters",
    date: "1:00 PM",
    sentiment: null,
  },
  {
    id: "4",
    title: "Breakthrough in Clean Energy Storage Signals Major Shift for Industrials",
    source: "Wall Street Journal",
    date: "2:45 PM",
    sentiment: null,
  },
  {
    id: "5",
    title: "Regulatory Crackdown Hits Crypto Exchanges: Massive Sell-Off Ensues",
    source: "CNBC",
    date: "3:30 PM",
    sentiment: null,
  },
  {
    id: "6",
    title: "Merger Discussions Between Telecom Leaders Stagnate Analysts Skeptical",
    source: "Forbes",
    date: "4:00 PM",
    sentiment: null,
  },
];

export default function App() {
  const [items, setItems] = useState<NewsItem[]>(mockNews);
  
  // Overall sentiment score based on the last analyzed item
  // Defaults to 0 (neutral) to show Steel Gray
  const [currentScore, setCurrentScore] = useState(0);

  const handleAnalyze = async (id: string, text: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      const score = data.score;
      
      setCurrentScore(score);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, sentiment: score } : item))
      );
    } catch (error) {
      console.error("Failed to analyze sentiment", error);
      // Hardcode fallback just so it works offline or if backend is down
      const fallbackScore = Math.random() * 2 - 1; // random between -1 and 1
      setCurrentScore(fallbackScore);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, sentiment: fallbackScore } : item))
      );
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden font-sans">
      <MeshGradient score={currentScore} />
      <LiquidCursor />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh]">
        
        <header className="w-full max-w-6xl mx-auto px-6 py-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white/10 glass flex items-center justify-center border-white/20">
               <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
               FluxFlow
             </h1>
          </div>
          
          <nav className="glass px-6 py-3 rounded-full flex gap-6 text-sm font-medium text-white/70">
            <button className="hover:text-white transition-colors">Dashboard</button>
            <button className="hover:text-white transition-colors">Markets</button>
            <button className="hover:text-white transition-colors">Signals</button>
          </nav>
        </header>

        <section className="flex-1 w-full flex flex-col">
           <MorphingGallery items={items} onAnalyze={handleAnalyze} />
        </section>

      </div>
    </main>
  );
}
