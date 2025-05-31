import { FC } from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const WhyOracleBeat: FC = () => {
  const features: Feature[] = [
    {
      icon: "M3 13.125C3 12.504 3.504 12 4.125 12H6.75V8.25C6.75 7.629 7.254 7.125 7.875 7.125H10.5V18H7.875C7.254 18 6.75 17.496 6.75 16.875V13.125H4.125C3.504 13.125 3 12.504 3 13.125ZM10.5 18V7.125M10.5 18H13.125C13.746 18 14.25 17.496 14.25 16.875V13.125H16.875C17.496 13.125 18 12.504 18 11.875V8.25C18 7.629 17.496 7.125 16.875 7.125H14.25M10.5 7.125H7.875M14.25 7.125V13.125M3.75 21.75H20.25M6 3.75H18M6 3.75V6.75M18 3.75V6.75",
      title: "Diverse Asset Coverage",
      description:
        "Compare price data across FX, equities, and commodities from both Web3 and traditional financial sources.",
    },
    {
      icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
      title: "Visualize & Quantify Deviations",
      description:
        "Clearly see and measure differences in price feeds through intuitive charts and detailed analytics.",
    },
    {
      icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21M9 17.25v-4.5M9 17.25H5.25M15 17.25v1.007a3 3 0 00.879 2.122L16.5 21m-1.5-3.75v-4.5m1.5 4.5h3.75M3 4.5h18M4.5 4.5v12.75a3 3 0 003 3h9a3 3 0 003-3V4.5M12 4.5v6.75",
      title: "Comparative Matrix",
      description:
        "Understand data source characteristics (e.g., update frequency, methodology) for informed analysis.",
    },
    {
      icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
      title: "Dedicated Detail Pages",
      description:
        "Explore in-depth information for each asset pair and data source, including historical performance and community feedback.",
    },
    {
      icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Real-Time & Historical Data",
      description: "Track price movements with up-to-the-minute updates and deep historical data for robust analysis.",
    },
    {
      icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A8.962 8.962 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
      title: "Merits System: Community Feedback",
      description:
        "Participate in a social feedback loop. Earn Merits by highlighting interesting asset pairs and price deviations, reflecting community focus.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why Oracle Beat?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={feature.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOracleBeat;
