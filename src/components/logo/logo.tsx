import { type FunctionComponent } from "react";

interface LogoProps {
  className?: string;
}

const Logo: FunctionComponent<LogoProps> = ({ className }) => {
  return (
    <h1 className={`text-2xl ${className}`}>
      LUMEDIA.<span className="font-bold">TECH</span>
    </h1>
  );
};

export default Logo;
