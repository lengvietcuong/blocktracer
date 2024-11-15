"use client";

import { FormEvent, MouseEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import BlockchainSelection from "./blockchain-selection";
import { BlockchainSymbol } from "@/types";
import { useRouter } from "next/navigation";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { ImSpinner10 as LoadingSpinner } from "react-icons/im";
import BlockSearch from "@/components/icons/block-search";
import { cn } from "@/lib/utils";

interface WalletSearchProps {
  defaultBlockchain?: BlockchainSymbol;
  variant?: "full" | "compact";
  showLoading?: boolean;
  className?: string;
}

export default function WalletSearch({
  defaultBlockchain = "eth",
  variant = "full",
  showLoading = false,
  className,
}: WalletSearchProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [blockchainSymbol, setBlockchainSymbol] =
    useState<BlockchainSymbol>(defaultBlockchain);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleWalletSearch(event: FormEvent | MouseEvent) {
    event.preventDefault(); // Prevent a full page reload
    if (walletAddress.trim()) {
      setLoading(true);
      // Redirect the user to the appropriate wallet details page
      router.push(`/${blockchainSymbol}/${walletAddress.trim()}`);
    }
  }

  return (
    // Render a larger size search bar with a soft white shadow in the full variant (in the hero section)
    // In the header, render a smaller version without the shadow
    <>
      {loading && showLoading && (
        <>
          <div className="pointer-events-none fixed inset-0 z-10 bg-background/50 backdrop-blur-md"></div>
          <div className="fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner className="size-32 animate-spin text-primary" />
          </div>
          <BlockSearch className="fixed left-1/2 top-1/2 z-20 size-16 -translate-x-1/2 -translate-y-1/2 fill-foreground" />
        </>
      )}
      <form
        id="wallet-search"
        className={cn(
          `flex items-center rounded-lg ${
            variant === "full"
              ? "bg-background shadow-[0_0_10px_3px_hsl(var(--muted-foreground)/0.5)] lg:shadow-[0_0_20px_5px_hsl(var(--muted-foreground)/0.5)]"
              : "max-w-64 bg-secondary sm:max-w-none"
          }`,
          className,
        )}
        onSubmit={handleWalletSearch}
      >
        <div className="relative flex-1">
          <button
            aria-label="Search wallet"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1"
            onClick={handleWalletSearch}
          >
            {/* If showLoading is true (in the hero section), after the user presses enter or clicks the search icon, the search bar component will display a loading spinner until they are redirected to the wallet details page. */}
            <SearchIcon className="size-5 fill-primary hover:fill-primary/90" />
          </button>
          <Input
            type="text"
            id="address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter address"
            className={`border-none bg-transparent pl-12 ${variant === "full" ? "h-12" : "h-10 text-xs"} `}
            autoComplete="on"
          />
        </div>
        <BlockchainSelection
          className="w-24 flex-shrink-0 border-none bg-transparent"
          blockchainSymbol={blockchainSymbol}
          setBlockchainSymbol={setBlockchainSymbol}
        />
      </form>
    </>
  );
}
