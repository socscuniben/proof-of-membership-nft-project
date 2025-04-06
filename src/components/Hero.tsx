"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Mint Your SOCSC UNIBEN NFT Passport
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Join the SOCSC UNIBEN community with your unique NFT passport. Showcase your identity,
              connect with other members, and unlock exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/passport">Create Your Passport</Link>
              </Button>
              <Button variant="outline" size="lg">
                View Gallery
              </Button>
            </div>
            <div className="pt-6">
              <p className="text-sm text-muted-foreground">
                Powered by blockchain technology. Your passport NFT will be stored securely.
              </p>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative bg-card rounded-lg shadow-xl overflow-hidden border border-border">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                        S
                      </div>
                      <span className="font-bold">SOCSC UNIBEN Passport</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      #00001
                    </div>
                  </div>

                  <div className="w-full h-48 bg-secondary rounded-md mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">Your Avatar Here</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold">Member Name</h3>
                    <p className="text-sm text-muted-foreground">Tech Stack: React, Node.js, Blockchain</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="bg-secondary px-2 py-1 rounded text-xs">Twitter: @socscuniben</div>
                      <div className="bg-secondary px-2 py-1 rounded text-xs">GitHub: octocat</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-border bg-card/50 text-center text-sm">
                  Mint your NFT passport today and join our community!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Get a SOCSC UNIBEN Passport?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your digital identity in the SOCSC community with exclusive benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Unique Digital Identity</h3>
            <p className="text-muted-foreground">
              Create a custom avatar and showcase your tech stack and skills through your NFT passport.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Community Access</h3>
            <p className="text-muted-foreground">
              Your passport is your ticket to exclusive SOCSC UNIBEN community events, resources, and networking.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Blockchain Verified</h3>
            <p className="text-muted-foreground">
              Your passport is minted as an NFT, providing secure verification of your community membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
