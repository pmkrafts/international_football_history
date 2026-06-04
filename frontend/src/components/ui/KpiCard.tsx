import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: number;
  suffix?: string;
  className?: string;
}

export default function KpiCard({ title, value, suffix = "", className }: KpiCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 800;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "bg-surface border border-border-pitch rounded-xl p-6 transition-shadow hover:shadow-lg hover:shadow-accent-green/10",
        className
      )}
    >
      <p className="text-muted text-sm font-medium mb-2">{title}</p>
      <p className="text-3xl font-bold text-light">
        {displayValue.toLocaleString()}
        {suffix}
      </p>
    </motion.div>
  );
}
