import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface MeritBalanceResponse {
  address: string;
  total_merits: string;
  rank: number;
}

export const MeritBalance = () => {
  const { address } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMerits = async () => {
      if (!address) {
        setBalance(null);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`https://merits-staging.blockscout.com/partner/api/v1/users/${address}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "PE5GNPK911JUNTI65357CHGRGL7KIPPA",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch merit balance");
        }
        const data: MeritBalanceResponse = await response.json();
        setBalance(data.total_merits);
      } catch (error) {
        console.error("Error fetching merit balance:", error);
        setBalance(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      fetchMerits();
    }
  }, [address]);

  if (!address) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5 font-medium min-w-[120px]">
      <span className="material-icons merit-icon text-blue-600 text-xl">workspace_premium</span>
      <span className="text-blue-600 whitespace-nowrap">
        {isLoading ? (
          <span className="inline-flex gap-1">
            <span className="animate-pulse">•••</span>
            <span className="opacity-50">Merits</span>
          </span>
        ) : balance ? (
          <>{parseFloat(balance).toFixed(2)} Merits</>
        ) : (
          <span className="opacity-50">0.00 Merits</span>
        )}
      </span>
    </div>
  );
};
