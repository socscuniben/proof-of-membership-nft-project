import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PassportGenerator } from "@/components/PassportGenerator";

export default function PassportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your SOCSC UNIBEN Passport</h1>
            <p className="text-muted-foreground">
              Complete the form below to generate your unique NFT passport and join the SOCSC UNIBEN community.
            </p>
          </div>

          <PassportGenerator />
        </div>
      </main>
      <Footer />
    </div>
  );
}
