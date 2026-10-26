import CompanyPage from "@/components/company/CompanyPage";
import MinimalRadioPlayer from "@/components/MinimalRadioPlayer";
import { companyPages } from "@/data/companyPages";

const listenLive = (
  <section className="bg-gradient-to-br from-brand-red to-[#b00608] px-4 py-20 text-white sm:px-6 lg:px-8">
    <div className="mx-auto max-w-4xl text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">On air</span>
      <h2 className="mt-3 text-3xl font-bold md:text-5xl">Listen Live</h2>
      <p className="mx-auto mt-4 max-w-xl text-white/90">
        Tune in to KBR Radio 254 for gospel music, inspirational shows and community programming.
      </p>
      <div className="mt-10 flex justify-center">
        <MinimalRadioPlayer />
      </div>
      <p className="mx-auto mt-8 max-w-md rounded-lg bg-white/10 p-3 text-sm text-white/80">
        Stream availability may vary. If the player doesn't work, the station might be offline or broadcasting on FM.
      </p>
    </div>
  </section>
);

const KBRRadio = () => <CompanyPage config={companyPages["kbr-radio"]} extra={listenLive} />;

export default KBRRadio;
