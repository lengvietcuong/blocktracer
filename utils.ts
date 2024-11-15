import { USD_VALUE, BLOCKCHAIN_NAMES } from "./constants";
import { BlockchainSymbol } from "./types";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import { redirect, notFound } from "next/navigation";
import status from "http-status";

export function convertToUsd(
  value: number,
  blockchainSymbol: BlockchainSymbol,
) {
  // Converts an amount in crypto to USD
  const convertedAmount = value * USD_VALUE[blockchainSymbol];
  return parseFloat(convertedAmount.toFixed(2));
}

export function getTimeAgo(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const times = [
    { unit: "year", value: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)) },
    { unit: "month", value: Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) },
    { unit: "week", value: Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) },
    { unit: "day", value: Math.floor(diff / (1000 * 60 * 60 * 24)) },
    { unit: "hour", value: Math.floor(diff / (1000 * 60 * 60)) },
    { unit: "minute", value: Math.floor(diff / (1000 * 60)) },
    { unit: "second", value: Math.floor(diff / 1000) },
  ];

  // Find the first non-zero unit and return the corresponding string
  for (const { unit, value } of times) {
    if (value > 0) {
      // Append "s" for plural units
      return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
    }
  }
  return "";
}

export function formatAmount(amount: number, maximumFractionDigits = 5) {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "N/A"; // or any default fallback value
  }
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maximumFractionDigits,
  });
}

export function abbreviateAddress(address: string, maxLength: number = 8) {
  if (address.length <= maxLength) {
    return address; // If the address is short enough, no need to abbreviate
  }
  // Shorten the address with "..." in the middle
  const half = Math.floor(maxLength / 2);
  return `${address.slice(0, half)}...${address.slice(-half)}`;
}

export function isValidAddress(address: string, blockchain: BlockchainSymbol) {
  // This function currently supports eth, bnb, avax, matic, and klaytn address
  // Check if the blockchain is supported
  if (!(blockchain in BLOCKCHAIN_NAMES)) return false;

  const hexRegex = /^[0-9a-fA-F]+$/;
  return (
    address.startsWith("0x") &&
    address.length === 42 &&
    hexRegex.test(address.slice(2))
  );
}

export function getJsonOfError(error: unknown) {
  if (error instanceof AxiosError) {
    // Error calling external APIs
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
  // Other error
  return NextResponse.json(
    { message: error instanceof Error ? error.message : "Unknown error" },
    { status: status.INTERNAL_SERVER_ERROR },
  );
}

export function redirectIfFailed(response: Response) {
  if (response.status === status.NOT_FOUND) {
    notFound();
  }
  if (response.status === status.TOO_MANY_REQUESTS) {
    redirect("/rate-limit-reached");
  }
  if (!response.ok) {
    // This will redirect to the error.tsx page
    throw new Error(`${response.statusText} (Code: ${response.status})`);
  }
}
