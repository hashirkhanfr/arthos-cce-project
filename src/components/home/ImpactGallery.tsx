export default function ImpactGallery() {
  const images = [
    {
      src: "/images/Ramzan Aftar/DSC_0635.JPG",
      alt: "Food Distribution",
      title: "Ramzan Aftar Drive",
      caption: "Providing nutritious meals to the community.",
    },
    {
      src: "/images/eid/492225277_9771348932911500_9211261492123848198_n.jpg",
      alt: "Eid With Orphans",
      title: "Eid With Orphans",
      caption: "Sharing the joy of eid with orphaned children.",
    },
    {
      src: "/images/solar installment/530104383_18496602286067653_1776085617495701365_n.jpg",
      alt: "Solar Project",
      title: "Solar Installation",
      caption: "Bringing sustainable energy to remote areas.",
    },
    {
      src: "/images/orphanage visit/482050929_1037125321780433_8449263791762024342_n.jpg",
      alt: "Orphanage Games",
      title: "Time with Orphans",
      caption: "Building meaningful bonds with children.",
    },
    {
      src: "/images/winter essential/482023924_1038192695007029_6815116611498709697_n.jpg",
      alt: "Winter Essentials",
      title: "Winter Essentials",
      caption: "Providing warm clothing for those in need.",
    },
    {
      src: "/images/old age visit/590696803_1260637759429187_7072650399926511784_n.jpg",
      alt: "Old Age Home",
      title: "Old Age Home Visit",
      caption: "Caring for and honoring our elders.",
    },
    {
      src: "/images/independence day/480935317_1029024055923893_8148279267837557687_n.jpg",
      alt: "Independence Day",
      title: "Independence Day",
      caption: "Celebrating heritage with local communities.",
    },
    {
      src: "/images/shawl distribution/482029705_1039956858163946_8091470163874700675_n.jpg",
      alt: "Shawl Distribution",
      title: "Shawl Distribution",
      caption: "Offering warmth and comfort during winter.",
    },
  ];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-arthos max-w-[1400px]">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#1F6F3D] uppercase tracking-widest mb-3">
            Gallery
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Capturing Moments of Hope
          </h2>
          <div className="w-20 h-1.5 bg-[#E8D3A5] mx-auto rounded-full"></div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] space-y-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid mb-6 relative group overflow-hidden rounded-2xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3
                  className="text-white text-lg font-bold"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {image.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mt-1">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
