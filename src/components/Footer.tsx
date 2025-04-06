"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">SOCSC UNIBEN Passport</h3>
            <p className="text-sm text-muted-foreground">
              Join the SOCSC UNIBEN community by minting your unique NFT passport.
              Showcase your membership and connect with other members.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/passport" className="text-sm hover:underline">
                  Create Passport
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm hover:underline">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm">Email: contact@socscuniben.org</li>
              <li className="text-sm">Twitter: @socscuniben</li>
              <li className="text-sm">Discord: discord.gg/socscuniben</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SOCSC UNIBEN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
