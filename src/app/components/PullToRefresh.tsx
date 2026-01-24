import { useState, useRef, ReactNode } from 'react';
import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const threshold = 80; // Pull distance needed to trigger refresh
  const maxPull = 120; // Maximum pull distance

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isRefreshing || startY === 0) return;
    
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;
    
    if (distance > 0 && containerRef.current?.scrollTop === 0) {
      // Apply resistance: diminishing pull effect
      const resistance = 0.5;
      const pull = Math.min(distance * resistance, maxPull);
      setPullDistance(pull);
      
      // Prevent default scrolling when pulling
      if (pull > 10) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      setPullDistance(threshold);
      
      try {
        await onRefresh();
      } finally {
        setTimeout(() => {
          setIsRefreshing(false);
          setPullDistance(0);
        }, 500);
      }
    } else {
      setPullDistance(0);
    }
    setStartY(0);
  };

  const rotation = isRefreshing ? 360 : (pullDistance / threshold) * 180;
  const scale = Math.min(pullDistance / threshold, 1);

  return (
    <div 
      ref={containerRef}
      className="relative h-full overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center"
        style={{
          height: pullDistance,
          opacity: scale,
        }}
        animate={{
          opacity: pullDistance > 0 ? 1 : 0,
        }}
      >
        <motion.div
          className="bg-blue-500 rounded-full p-2 shadow-lg"
          animate={{
            rotate: rotation,
            scale: scale,
          }}
          transition={{
            rotate: { duration: isRefreshing ? 1 : 0.3, repeat: isRefreshing ? Infinity : 0, ease: 'linear' },
            scale: { duration: 0.2 },
          }}
        >
          <RefreshCw className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isRefreshing ? 'transform 0.3s' : 'none',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
