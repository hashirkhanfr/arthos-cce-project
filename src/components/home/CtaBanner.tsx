import Button from "@/components/Button";

export default function CtaBanner() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#1F6F3D]">
      <div className="absolute inset-0 bg-black/40 -z-5" />
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/Ramzan Aftar/1.JPG')` }}
      />
      <div className="container-arthos relative z-10 text-center text-white">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Ready to Change a Life Today?
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg sm:text-xl leading-relaxed">
          Whether you give your time, blood, books, or financial support — every act of
          kindness creates ripples of change throughout Pakistan.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/donate" size="lg" variant="secondary" className="px-10">
            Make a Donation
          </Button>
          <Button
            href="/volunteer"
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#1F6F3D] px-10"
          >
            Join as Volunteer
          </Button>
        </div>
      </div>
    </section>
  );
}
