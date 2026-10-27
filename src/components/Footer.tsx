import CorpFooter from "@/components/corp/CorpFooter";
import CompanyFooter from "@/components/company/CompanyFooter";

const Footer = ({ variant = "group" }: { variant?: "group" | "company" }) =>
  variant === "company" ? <CompanyFooter /> : <CorpFooter />;

export default Footer;
