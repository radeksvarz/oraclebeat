import { FC } from "react";

interface FormattedPriceProps {
  price: number;
  prefix?: string;
  className?: string;
}

const FormattedPrice: FC<FormattedPriceProps> = ({ price, prefix = "$", className = "" }) => {
  const priceStr = price.toFixed(6);
  const [wholePart, decimalPart = ""] = priceStr.split(".");
  const mainDigits = wholePart + "." + decimalPart.slice(0, 2);
  const detailDigits = decimalPart.slice(2);

  return (
    <span className={`font-mono ${className}`}>
      {prefix}
      <span className="text-base-content">{mainDigits}</span>
      <span className="text-base-content/60">{detailDigits}</span>
    </span>
  );
};

export default FormattedPrice;
