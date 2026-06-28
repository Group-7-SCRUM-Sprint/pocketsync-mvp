import "./BankLogo.css";

interface BankLogoProps {
  src: string;
  alt: string;
  size?: number;
}

export default function BankLogo({
  src,
  alt,
  size = 44,
}: BankLogoProps) {
  return (
    <div
      className="bank-logo"
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="bank-logo__image"
      />
    </div>
  );
}