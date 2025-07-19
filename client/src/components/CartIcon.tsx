
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const CartIcon = () => {
  const { totalItems } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [, setLocation] = useLocation();
  
  const handleClick = () => {
    setLocation("/checkout");
  };
  
  // Animar quando o totalItems mudar
  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <div 
      className="relative cursor-pointer" 
      onClick={handleClick}
    >
      <ShoppingBag className="h-6 w-6 text-botanical-white hover:text-botanical-beige transition-colors" />
      {totalItems > 0 && (
        <span 
          className={`absolute -top-2 -right-2 bg-botanical-copper text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${
            isAnimating ? 'animate-scale-in' : ''
          }`}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
