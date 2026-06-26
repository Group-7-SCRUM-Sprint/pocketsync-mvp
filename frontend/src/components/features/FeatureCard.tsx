import "./FeatureCard.css";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="feature-card">
      <div className="feature-card__icon">
        <img src={icon} alt="" />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  );
}