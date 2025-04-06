"use client";

import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AvatarCreator } from "./AvatarCreator";

interface SocialLink {
  platform: string;
  username: string;
}

interface UserInfo {
  name: string;
  techStack: string;
  bio: string;
  email: string;
  socialLinks: SocialLink[];
}

export function PassportGenerator() {
  const [avatarSvg, setAvatarSvg] = useState("");
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    techStack: "",
    bio: "",
    email: "",
    socialLinks: [
      { platform: "Twitter", username: "" },
      { platform: "GitHub", username: "" },
      { platform: "LinkedIn", username: "" }
    ]
  });
  const passportRef = useRef<HTMLDivElement>(null);

  const handleAvatarChange = (svg: string) => {
    setAvatarSvg(svg);
  };

  const handleInputChange = (field: keyof Omit<UserInfo, "socialLinks">, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const updatedLinks = [...userInfo.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setUserInfo(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  const addSocialLink = () => {
    setUserInfo(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "", username: "" }]
    }));
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = userInfo.socialLinks.filter((_, i) => i !== index);
    setUserInfo(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  const goToNextStep = () => {
    if (step === 1) {
      if (!userInfo.name) {
        toast.error("Please enter your name");
        return;
      }
    }
    setStep(prevStep => prevStep + 1);
  };

  const goToPrevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const downloadPassport = async () => {
    if (!passportRef.current) {
      toast.error("Cannot generate passport");
      return;
    }

    try {
      const dataUrl = await toPng(passportRef.current, { quality: 0.95 });
      saveAs(dataUrl, `${userInfo.name.replace(/\s+/g, "-")}-socsc-passport.png`);
      toast.success("Passport downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download passport");
      console.error("Error downloading passport:", error);
    }
  };

  const mintNFT = () => {
    // This would interface with blockchain in a real application
    toast.success("NFT minted successfully! Welcome to SOCSC UNIBEN community!");
  };

  return (
    <div className="w-full">
      {step === 1 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={userInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack</Label>
              <Input
                id="techStack"
                value={userInfo.techStack}
                onChange={(e) => handleInputChange("techStack", e.target.value)}
                placeholder="e.g., React, Node.js, Python"
              />
              <p className="text-xs text-muted-foreground">
                List the technologies you work with, separated by commas
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={userInfo.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us a bit about yourself"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Social Links</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSocialLink}
                  disabled={userInfo.socialLinks.length >= 5}
                >
                  Add Link
                </Button>
              </div>

              {userInfo.socialLinks.map((link, index) => (
                <div key={index} className="grid grid-cols-5 gap-2 items-center">
                  <div className="col-span-2">
                    <Input
                      value={link.platform}
                      onChange={(e) => handleSocialLinkChange(index, "platform", e.target.value)}
                      placeholder="Platform"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      value={link.username}
                      onChange={(e) => handleSocialLinkChange(index, "username", e.target.value)}
                      placeholder="Username"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => removeSocialLink(index)}
                    disabled={userInfo.socialLinks.length <= 1}
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={goToNextStep}>
              Next: Create Avatar
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Create Your Avatar</h2>
          <p className="text-muted-foreground mb-8">
            Customize your avatar that will appear on your SOCSC UNIBEN passport.
          </p>
          <AvatarCreator
            onAvatarChange={handleAvatarChange}
            initialSeed={userInfo.name}
          />
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={goToPrevStep}>
              Back
            </Button>
            <Button onClick={goToNextStep}>
              Next: Preview Passport
            </Button>
          </div>
        </>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your SOCSC UNIBEN Passport</h2>
          <p className="text-muted-foreground mb-4">
            Review your passport before minting it as an NFT.
          </p>
          <div className="max-w-xl mx-auto">
            <div
              ref={passportRef}
              className="bg-white text-black border-2 border-black rounded-lg p-6 w-full"
            >
              <div className="border-b-2 border-black pb-4 mb-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold">
                    S
                  </div>
                  <span className="font-bold text-lg">SOCSC UNIBEN Passport</span>
                </div>
                <div className="text-xs">
                  ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 flex justify-center">
                  {avatarSvg ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: avatarSvg }}
                      className="w-32 h-32 border border-black rounded-lg overflow-hidden"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                      No Avatar
                    </div>
                  )}
                </div>

                <div className="col-span-2 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg">{userInfo.name || "Your Name"}</h3>
                    <p className="text-sm">SOCSC UNIBEN Community Member</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm">Tech Stack:</h4>
                    <p className="text-sm">{userInfo.techStack || "Not specified"}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm">About:</h4>
                    <p className="text-xs">{userInfo.bio || "No bio provided"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-black">
                <h4 className="font-semibold text-sm mb-2">Connect:</h4>
                <div className="flex flex-wrap gap-2">
                  {userInfo.socialLinks.filter(link => link.username).map((link, index) => (
                    <div key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {link.platform}: {link.username}
                    </div>
                  ))}
                  {userInfo.email && (
                    <div className="bg-gray-100 px-2 py-1 rounded text-xs">
                      Email: {userInfo.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-black flex justify-between items-center">
                <div className="text-xs">
                  Minted on: {new Date().toLocaleDateString()}
                </div>
                <div className="text-xs">
                  SOCSC.UNIBEN.ORG
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Button variant="outline" onClick={goToPrevStep}>
              Back
            </Button>
            <Button onClick={downloadPassport}>
              Download Passport
            </Button>
            <Button onClick={mintNFT} variant="default">
              Mint NFT Passport
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
