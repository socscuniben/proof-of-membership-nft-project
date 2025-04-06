import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock data for passport gallery
const passports = [
  {
    id: "1",
    name: "John Doe",
    techStack: "React, Node.js, MongoDB",
    avatarBg: "bg-secondary",
    joined: "Jan 2023"
  },
  {
    id: "2",
    name: "Alice Smith",
    techStack: "Python, Django, PostgreSQL",
    avatarBg: "bg-secondary",
    joined: "Feb 2023"
  },
  {
    id: "3",
    name: "Michael Johnson",
    techStack: "Vue.js, Express, MySQL",
    avatarBg: "bg-secondary",
    joined: "Mar 2023"
  },
  {
    id: "4",
    name: "Emily Brown",
    techStack: "Angular, Spring Boot, Oracle",
    avatarBg: "bg-secondary",
    joined: "Apr 2023"
  },
  {
    id: "5",
    name: "David Wilson",
    techStack: "React Native, Firebase, TypeScript",
    avatarBg: "bg-secondary",
    joined: "May 2023"
  },
  {
    id: "6",
    name: "Sarah Garcia",
    techStack: "Flutter, GraphQL, Supabase",
    avatarBg: "bg-secondary",
    joined: "Jun 2023"
  },
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">SOCSC UNIBEN Community Passport Gallery</h1>
          <p className="text-muted-foreground max-w-3xl">
            Explore the passports of our community members. Each unique NFT passport represents a member of the SOCSC UNIBEN community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passports.map((passport) => (
            <div
              key={passport.id}
              className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-card"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full ${passport.avatarBg} flex items-center justify-center text-2xl font-bold`}>
                    {passport.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{passport.name}</h3>
                    <p className="text-sm text-muted-foreground">Joined {passport.joined}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-1">Tech Stack:</h4>
                  <p className="text-sm">{passport.techStack}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Passport #{passport.id}</span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Don't have a passport yet?</p>
          <Button asChild size="lg">
            <Link href="/passport">Create Your Passport</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
