"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground font-bold">
            S
          </div>
          <span className="font-bold">SOCSC UNIBEN Passport</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm hover:underline">
            Home
          </Link>
          <Link href="/passport" className="text-sm hover:underline">
            Create Passport
          </Link>
          <Link href="/gallery" className="text-sm hover:underline">
            Gallery
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Connect Wallet
          </Button>
          <Button variant="default" size="sm">
            Create Passport
          </Button>
        </div>
      </div>
    </header>
  );
}
