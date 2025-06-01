import { FC, useEffect, useState } from "react";

interface SuccessOverlayProps {
  amount: string;
  onComplete: () => void;
}

const SuccessOverlay: FC<SuccessOverlayProps> = ({ amount, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-8 text-center transform animate-success-pop-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="material-icons text-blue-600 text-5xl animate-success-icon">verified</span>
            </div>
            <div className="absolute -top-2 -right-2">
              <span className="material-icons text-yellow-400 text-2xl animate-star-1">star</span>
            </div>
            <div className="absolute -bottom-1 -left-3">
              <span className="material-icons text-yellow-400 text-2xl animate-star-2">star</span>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Congratulations! 🎉</h3>
        <p className="text-lg text-slate-600 mb-1">You earned</p>
        <p className="text-3xl font-bold text-blue-600 mb-3">{amount} Merits</p>
        <p className="text-sm text-slate-500">Keep hunting those deviations!</p>
      </div>
    </div>
  );
};

export default SuccessOverlay;
