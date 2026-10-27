import CorpNavigation from "@/components/corp/CorpNavigation";
import CompanyNavigation from "@/components/company/CompanyNavigation";

/**
 * "group" is the K Group Kenya corporate navigation (default).
 * "company" keeps the original red and black navigation used on the individual company sites.
 */
const Navigation = ({ variant = "group" }: { variant?: "group" | "company" }) =>
  variant === "company" ? <CompanyNavigation /> : <CorpNavigation />;

export default Navigation;
