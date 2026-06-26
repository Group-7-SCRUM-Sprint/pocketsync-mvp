import "./Features.css";
import FeatureCard from "../../components/features/FeatureCard";

// Temporary icons
import shield from "../../assets/icons/shield.svg";
import wallet from "../../assets/icons/wallet.svg";
import refresh from "../../assets/icons/refresh.svg";
import chart from "../../assets/icons/chart.svg";
import phone from "../../assets/icons/phone.svg";
import lock from "../../assets/icons/lock.svg";

const features = [
  {
    icon: shield,
    title: "Secure Connections",
    description:
      "Connect multiple Nigerian bank accounts using encrypted, secure connections."
  },
  {
    icon: wallet,
    title: "One Dashboard",
    description:
      "See all your balances in one place without switching between banking apps."
  },
  {
    icon: refresh,
    title: "Real-Time Sync",
    description:
      "Refresh balances anytime and stay updated with your latest account information."
  },
  {
    icon: chart,
    title: "Financial Visibility",
    description:
      "Understand your total available funds across every connected institution."
  },
  {
    icon: phone,
    title: "Mobile First",
    description:
      "Designed for fast access on mobile devices with support for slower networks."
  },
  {
    icon: lock,
    title: "Privacy First",
    description:
      "Your banking credentials are never stored and you can disconnect accounts anytime."
  }
];

export default function Features() {
  return (
    <section className="features">

      <div className="features__container">

        <span className="features__eyebrow">
          WHY POCKETSYNC
        </span>

        <h2>
          Everything you need to stay in control of your finances.
        </h2>

        <p className="features__subtitle">
          Manage every account from one secure dashboard designed for Nigerian users.
        </p>

        <div className="features__grid">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </div>
    </section>
  );
}