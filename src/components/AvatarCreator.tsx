"use client";

import React, { useState, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AvatarCreatorProps {
  onAvatarChange: (avatarSvg: string) => void;
  initialSeed?: string;
}

// Hair styles in Micah
const hairStyles = [
  { value: "dannyPhantom", label: "Danny Phantom" },
  { value: "dougFunny", label: "Doug Funny" },
  { value: "fonze", label: "Fonze" },
  { value: "full", label: "Full" },
  { value: "mrClean", label: "Mr Clean" },
  { value: "mrT", label: "Mr T" },
  { value: "pixie", label: "Pixie" },
  { value: "turban", label: "Turban" },
];

// Eyes styles in Micah
const eyeStyles = [
  { value: "eyes", label: "Default" },
  { value: "eyesShadow", label: "Shadow" },
  { value: "round", label: "Round" },
  { value: "smiling", label: "Smiling" },
  { value: "smilingShadow", label: "Smiling Shadow" },
];

// Mouth styles in Micah
const mouthStyles = [
  { value: "frown", label: "Frown" },
  { value: "laughing", label: "Laughing" },
  { value: "nervous", label: "Nervous" },
  { value: "pucker", label: "Pucker" },
  { value: "sad", label: "Sad" },
  { value: "smile", label: "Smile" },
  { value: "smirk", label: "Smirk" },
  { value: "surprised", label: "Surprised" },
];

// Nose styles in Micah
const noseStyles = [
  { value: "curve", label: "Curve" },
  { value: "pointed", label: "Pointed" },
  { value: "tound", label: "Round" },
];

// Color options for customization
const colorOptions = [
  { value: "000000", label: "Black" },
  { value: "ffffff", label: "White" },
  { value: "9287ff", label: "Purple" },
  { value: "6bd9e9", label: "Blue" },
  { value: "fc909f", label: "Pink" },
  { value: "f4d150", label: "Yellow" },
  { value: "77311d", label: "Dark Brown" },
  { value: "ac6651", label: "Brown" },
  { value: "f9c9b6", label: "Light Brown" },
];

export function AvatarCreator({ onAvatarChange, initialSeed = "SOCSC" }: AvatarCreatorProps) {
  const [seed, setSeed] = useState(initialSeed);
  const [avatarOptions, setAvatarOptions] = useState({
    hair: ["full"],
    hairColor: ["000000"],
    eyes: ["eyes"],
    eyesColor: ["000000"],
    mouth: ["smile"],
    mouthColor: ["000000"],
    nose: ["curve"],
    glasses: [],
    glassesColor: ["000000"],
    glassesProbability: 0,
    earrings: [],
    earringsColor: ["f4d150"],
    earringsProbability: 0,
    beard: false,
    beardColor: "000000",
  });
  const [avatarSvg, setAvatarSvg] = useState("");

  useEffect(() => {
    generateAvatar();
  }, [seed, avatarOptions]);

  const generateAvatar = () => {
    try {
      const facialHair = avatarOptions.beard ? ["beard"] : [];

      const avatar = createAvatar(micah, {
        seed,
        backgroundColor: ['ffffff'],
        backgroundType: ['solid'],
        base: ["standard"],
        baseColor: ["f9c9b6"],
        hair: avatarOptions.hair,
        hairColor: avatarOptions.hairColor,
        eyes: avatarOptions.eyes,
        eyesColor: avatarOptions.eyesColor,
        mouth: avatarOptions.mouth,
        mouthColor: avatarOptions.mouthColor,
        nose: avatarOptions.nose,
        glasses: avatarOptions.glasses,
        glassesColor: avatarOptions.glassesColor,
        glassesProbability: avatarOptions.glassesProbability,
        earrings: avatarOptions.earrings,
        earringsColor: avatarOptions.earringsColor,
        earringsProbability: avatarOptions.earringsProbability,
        facialHair,
        facialHairColor: [avatarOptions.beardColor],
        radius: 0,
      });

      const svgString = avatar.toString();
      setAvatarSvg(svgString);
      onAvatarChange(svgString);
    } catch (error) {
      toast.error("Failed to generate avatar");
      console.error("Error generating avatar:", error);
    }
  };

  const updateOptions = (key: string, value: any) => {
    setAvatarOptions(prev => ({ ...prev, [key]: value }));
  };

  const randomizeSeed = () => {
    const randomSeed = Math.random().toString(36).substring(2, 10);
    setSeed(randomSeed);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 flex flex-col items-center">
            <div className="mb-4 p-4 bg-secondary rounded-lg w-full max-w-[250px] h-[250px] flex items-center justify-center">
              {avatarSvg ? (
                <div dangerouslySetInnerHTML={{ __html: avatarSvg }} className="w-full h-full" />
              ) : (
                <div className="text-center text-muted-foreground">Loading avatar...</div>
              )}
            </div>
            <div className="w-full max-w-[250px] space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="seed">Avatar Seed</Label>
                <div className="flex space-x-2">
                  <input
                    id="seed"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button variant="outline" size="sm" onClick={randomizeSeed}>
                    Random
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  The seed determines the base of your avatar
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Tabs defaultValue="features">
              <TabsList className="w-full">
                <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
                <TabsTrigger value="colors" className="flex-1">Colors</TabsTrigger>
                <TabsTrigger value="accessories" className="flex-1">Accessories</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Hair Style</Label>
                  <RadioGroup
                    value={avatarOptions.hair[0]}
                    onValueChange={(value) => updateOptions("hair", [value])}
                    className="grid grid-cols-2 gap-2"
                  >
                    {hairStyles.map((style) => (
                      <div key={style.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={style.value} id={`hair-${style.value}`} />
                        <Label htmlFor={`hair-${style.value}`}>{style.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Eyes Style</Label>
                  <RadioGroup
                    value={avatarOptions.eyes[0]}
                    onValueChange={(value) => updateOptions("eyes", [value])}
                    className="grid grid-cols-2 gap-2"
                  >
                    {eyeStyles.map((style) => (
                      <div key={style.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={style.value} id={`eyes-${style.value}`} />
                        <Label htmlFor={`eyes-${style.value}`}>{style.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Mouth Style</Label>
                  <RadioGroup
                    value={avatarOptions.mouth[0]}
                    onValueChange={(value) => updateOptions("mouth", [value])}
                    className="grid grid-cols-2 gap-2"
                  >
                    {mouthStyles.map((style) => (
                      <div key={style.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={style.value} id={`mouth-${style.value}`} />
                        <Label htmlFor={`mouth-${style.value}`}>{style.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Nose Style</Label>
                  <RadioGroup
                    value={avatarOptions.nose[0]}
                    onValueChange={(value) => updateOptions("nose", [value])}
                    className="grid grid-cols-2 gap-2"
                  >
                    {noseStyles.map((style) => (
                      <div key={style.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={style.value} id={`nose-${style.value}`} />
                        <Label htmlFor={`nose-${style.value}`}>{style.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Hair Color</Label>
                  <Select
                    value={avatarOptions.hairColor[0]}
                    onValueChange={(value) => updateOptions("hairColor", [value])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hair color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={`hair-${color.value}`} value={color.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded-full bg-[#${color.value}] border border-border`} />
                            <span>{color.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Eyes Color</Label>
                  <Select
                    value={avatarOptions.eyesColor[0]}
                    onValueChange={(value) => updateOptions("eyesColor", [value])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select eyes color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={`eyes-${color.value}`} value={color.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded-full bg-[#${color.value}] border border-border`} />
                            <span>{color.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mouth Color</Label>
                  <Select
                    value={avatarOptions.mouthColor[0]}
                    onValueChange={(value) => updateOptions("mouthColor", [value])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mouth color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={`mouth-${color.value}`} value={color.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded-full bg-[#${color.value}] border border-border`} />
                            <span>{color.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="accessories" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="beard"
                      checked={avatarOptions.beard}
                      onCheckedChange={(checked) => updateOptions("beard", checked)}
                    />
                    <Label htmlFor="beard">Beard</Label>
                  </div>
                  {avatarOptions.beard && (
                    <Select
                      value={avatarOptions.beardColor}
                      onValueChange={(value) => updateOptions("beardColor", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select beard color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((color) => (
                          <SelectItem key={`beard-${color.value}`} value={color.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-4 h-4 rounded-full bg-[#${color.value}] border border-border`} />
                              <span>{color.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="glasses"
                      checked={avatarOptions.glassesProbability === 100}
                      onCheckedChange={(checked) => {
                        updateOptions("glassesProbability", checked ? 100 : 0);
                        if (checked) {
                          updateOptions("glasses", ["round"]);
                        } else {
                          updateOptions("glasses", []);
                        }
                      }}
                    />
                    <Label htmlFor="glasses">Glasses</Label>
                  </div>
                  {avatarOptions.glassesProbability === 100 && (
                    <>
                      <RadioGroup
                        value={avatarOptions.glasses[0]}
                        onValueChange={(value) => updateOptions("glasses", [value])}
                        className="grid grid-cols-2 gap-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="round" id="glasses-round" />
                          <Label htmlFor="glasses-round">Round</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="square" id="glasses-square" />
                          <Label htmlFor="glasses-square">Square</Label>
                        </div>
                      </RadioGroup>
                      <Select
                        value={avatarOptions.glassesColor[0]}
                        onValueChange={(value) => updateOptions("glassesColor", [value])}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select glasses color" />
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map((color) => (
                            <SelectItem key={`glasses-${color.value}`} value={color.value}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded-full bg-[#${color.value}] border border-border`} />
                                <span>{color.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="earrings"
                      checked={avatarOptions.earringsProbability === 100}
                      onCheckedChange={(checked) => {
                        updateOptions("earringsProbability", checked ? 100 : 0);
                        if (checked) {
                          updateOptions("earrings", ["stud"]);
                        } else {
                          updateOptions("earrings", []);
                        }
                      }}
                    />
                    <Label htmlFor="earrings">Earrings</Label>
                  </div>
                  {avatarOptions.earringsProbability === 100 && (
                    <>
                      <RadioGroup
                        value={avatarOptions.earrings[0]}
                        onValueChange={(value) => updateOptions("earrings", [value])}
                        className="grid grid-cols-2 gap-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="stud" id="earrings-stud" />
                          <Label htmlFor="earrings-stud">Stud</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hoop" id="earrings-hoop" />
                          <Label htmlFor="earrings-hoop">Hoop</Label>
                        </div>
                      </RadioGroup>
                      <Select
                        value={avatarOptions.earringsColor[0]}
                        onValueChange={(value) => updateOptions("earringsColor", [value])}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select earrings color" />
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map((color) => (
                            <SelectItem key={`earrings-${color.value}`} value={color.value}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded-full bg-[#${color.value}] border border-border`} />
                                <span>{color.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
