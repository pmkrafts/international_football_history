import { motion } from "framer-motion";

interface SkeletonCardProps {
  className?: string;
}

export default function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-surface border border-border-pitch rounded-xl p-6 ${className}`}
    >
      <div className="h-4 bg-border-pitch rounded w-1/3 mb-4 animate-pulse" />
      <div className="h-8 bg-border-pitch rounded w-2/3 animate-pulse" />
    </motion.div>
  );
}
