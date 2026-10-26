import CompanyPage from "@/components/company/CompanyPage";
import KachSoundMediaBookingForm from "@/components/KachSoundMediaBookingForm";
import { companyPages } from "@/data/companyPages";

const KachSoundMedia = () => (
  <CompanyPage config={companyPages["kach-sound-media"]} form={<KachSoundMediaBookingForm />} />
);

export default KachSoundMedia;
