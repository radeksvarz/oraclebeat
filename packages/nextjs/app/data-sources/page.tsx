"use client";

import { type FC } from "react";
import Image from "next/image";

interface DataSource {
  name: string;
  type: string;
  status: "active" | "maintenance" | "inactive";
  merits: number;
  logo: string;
}

const dataSources: DataSource[] = [
  {
    name: "Pyth Network",
    type: "Web3 Oracle",
    status: "active",
    merits: 150,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8syUrlohvS07jKMK5_MsIHfGAZSXTrVnOQhoy1KQ-QL9_FymQNWkD9OPUJ-S7G-5UUT3CTP8bv-g_4aEIumx23_dLXdmyz_DBh6BGZxWYi8cNCT1-I3Bn7a5Xk55cxbgT7ziErWIr4HxT_aRoJ_WhTBu8NbgpVi1MiZFomrM3ecBObjpbzClHopBGMGELEE_NFdUm8yQ8HFASGmgVHijV72GSjp5gZpWGB2TSAs4qrhX7GlFP0OgGfkmvwwL_Hrkcz02em49_wzur",
  },
  {
    name: "Pyth Onchain Ethereum L1",
    type: "Web3 Oracle",
    status: "active",
    merits: 140,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSqYTBFaCTXM7iNP277xe3x9j6Jdd8CvJYLnE-lQSDzAqx7gi6XAx7bOrGc5q-C4EsZsrsy-A1vLD8NrfRDo44oqczTzgeRB-avMKUeAsHK3_cF6X92ZoCj4hj7SYjYVnPB4hx2Swcd774TKCR8V9a_WL2i7XoDcl0fxbvz73hfb5F_pcCI6DID9b3K3s4drmS57hywJrbuqV3wv9ys39e10G7yXoA3QsQh78_-oq-66K7qSIE_49Jqv7I5N1QdxvEKr6eYQZI6Sdv",
  },
  {
    name: "Chainlink Ethereum L1",
    type: "Web3 Oracle",
    status: "active",
    merits: 120,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBMtuzSXcGlwd4DpDiggFTIjV0DWX9Qr_aBEfTV3EWHSzN_cbHj3-ZwffZgmphUvB5mKrmcM-9zkW1BYIi6czLKyHkGZvy36yqKY3mt3Tm_dgOhdaxRJmO_knghXOXgV8xinIST4Or-KQuIFbvEiOM-J_cAUQNy1C8SsetzGEpnOvDgD9gvULgqyFYNDuq3cmCgvbZWs4y8LXgvqqCI7mKbS8kqTWjwsbhKwyYXby8GYOKqHdZoUWo506cYsVt6H0_bZmoVQStPqp-",
  },
  {
    name: "Tellor",
    type: "Web3 Oracle",
    status: "active",
    merits: 110,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0TGkwGN_2hA_LCfD9-4jpiEgu51ZVa34Uno39cS619hpaNYRqxRDa-YHpSzzbLiTPSY1mw6FZiyTHeDjc8xxFp68PzQQ-GxRO_99lZHyNS5HpkLz8SCerI8JeNYzXzaK8VqSURhR7fJdtzPI_5jlDFLOyJZEq9GcLol5JoZI9hSEulqE0qyjiStIDBxA_Sk2SzCPAOK0htY13y06Abql3gEuX8B4ZrH8w92YT3CQZaZu-JSL3zi34ojS30FrY8v3ecHDZ2waW30fj",
  },
  {
    name: "Redstone",
    type: "Web3 Oracle",
    status: "active",
    merits: 100,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB94G32QILxtbJUDAw_1TvPxgDw3h_x8-IgZk7g173ccwI8O-6Ks9JpDUtNWXLPtIiyVT-sh7NiPT9JGbWNbI1_NNhxZkuW2hjY7Pg1ZPa7i0sfZXa1BtIhdjAk03HhL6XVKCfNT3aVCEJIUToNog-1gjE70wZVF-stGM5OWVzGHzEoikR87oYmJdUh304MOAGFuAaYT71zd0Y98r2oOoYdP94rW5H_W6LzwuVP-aFyFkb83b2EWj4RzdHZzMeqHP5-ydI8ybxT-lTc",
  },
  {
    name: "ExchangeRate API",
    type: "Traditional Source",
    status: "active",
    merits: 90,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2xvn00LeZut2fkd6zsGhV2BNSSdG57PLJJiazWhQrvl871su-zBL_lfzb0Z18_JvRJiN5V4WVoH0X4DjaoA1epPbPH8OvD-M4sLJaGFVj-esWZRla8hca5AAb2WK1W_m3bPgEosLFpZbR3DDq_3eVl3Ygk9fBY8KZpiMVwaQmkPHuG74sSWZoRQorPm9Je5uH0eLh6LOr5bUYduOljVTbrWU-LmL1DwByed8ACD-Emo1I5hL-XOZRjev-su1vXwC0VyxUw2IfGiW4",
  },
  {
    name: "Bloomberg",
    type: "Traditional Source",
    status: "maintenance",
    merits: 85,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8uzzmtjpB5P8963rbhMRkyOBrQ2wX-BbdMj7YrZOnD-MVygMFDf_0U11dkLs9StJ7F_UrE6ObEEaGvPMIKsRidw0V1SP9PFWfSZV4phhVSc_0CXhJHC05c1w6cqWyEO6IJs5TBi5zPJoZHl1jqbRoqG-JOKBQ3bM0AEHCeXOv1CsUO8vw50N8C_S8dPFs1cV3QtgmP5HsjmrZFoHwf1huikfxWAXuWj9Pt-pco_uro8SwXJx1IJJ1vZk8lhwmLo5Vx--vWNFn2_2a",
  },
  {
    name: "Reuters",
    type: "Traditional Source",
    status: "active",
    merits: 80,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCThy_4vyJoSp_g8XUueQBd5YAH4ClqUgYZQkpqHyV9OR9L5SvR0CPDNV9QPJsj4tzSSsmpZ6XyNE0OVLtTSk_Zdy9uK94x9_9IBq9YoXWHnOQY62p-2LT7GUM2tPAl1oWJmG3p-87eFwvTte5pBfr9CZ6Tpr70sGv7CWGNlXOnZBPO4pgrqeFXmgeIDVZkgmV6LCO0LiQLWc6LqciNGRA319bmo1m19j_t04jMesWXiLWkGppf9ssCp52prSPR2O1C_C_5jdUxVx66",
  },
  {
    name: "Yahoo Finance",
    type: "Traditional Source",
    status: "inactive",
    merits: 70,
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8X1aXaIOkVNDQIKk5xRr1Ls_2HsMISymOGn7sqlQU2fJoZMnW4OhDnptwaLlsgiJFr52p3M9JQodcD-saqbOHbM6V9xqvWy_Q6dfcc0EPyLR06mlbIQuFZCHTrfU9am_txJR6TAqUTfaFVkRnRQq5Z0gy3wDVjqtEwXXMFsVkbNi2ZJw2jYfm1QVquWz9iIMfwn6n7hNOLgzpNgNYveUhNdOGZ36Eq1uJiXdNAc6XyoYNorRI2YbXgoADmyiqdPNGD4K9JyqXwbha",
  },
];

const DataSourceCard: FC<{ source: DataSource }> = ({ source }) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    maintenance: "bg-yellow-100 text-yellow-800",
    inactive: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl flex flex-col group">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center p-4 relative">
        <Image
          alt={`${source.name} Logo`}
          className="object-contain"
          src={source.logo}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 text-xl font-semibold tracking-tight">{source.name}</h3>
          <span
            className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
              statusColors[source.status]
            }`}
          >
            {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-1">{source.type}</p>
        <div className="flex items-center text-gray-500 text-sm mt-auto pt-3">
          <span className="material-icons merit-icon text-yellow-500 mr-1 text-base">star</span>
          {source.merits} Merits
        </div>
      </div>
    </div>
  );
};

const DataSourcesPage: FC = () => {
  return (
    <main className="px-4 sm:px-10 lg:px-20 xl:px-40 flex flex-1 flex-col py-8">
      <div className="layout-content-container flex flex-col max-w-7xl w-full mx-auto">
        <div className="mb-8 px-4">
          <h2 className="text-gray-900 text-3xl sm:text-4xl font-bold tracking-tight">Data Sources</h2>
          <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed mt-2">
            Explore the data sources that power Oracle Beat&apos;s real-time and historical price comparisons.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-4">
          {dataSources.map((source, index) => (
            <DataSourceCard key={index} source={source} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default DataSourcesPage;
