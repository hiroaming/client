import Link from "next/link"
import { ArrowRight, Search, HelpCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BorderedContainer } from "@/components/bordered-container"
import { WhyChooseHiRoamingSection } from "@/components/landing/why-choose-section"
import { DestinationCard } from "@/components/landing/destination-card"
import { ComparePricesSection } from "@/components/landing/compare-prices-section"
import { FAQSection } from "@/components/landing/faq-section"
import { CTASection } from "@/components/landing/cta-section"

const popularDestinations = [
  { name: "Australia", code: "au", flag: "🇦🇺", price: 3 },
  { name: "Japan", code: "jp", flag: "🇯🇵", price: 3 },
  { name: "Singapore", code: "sg", flag: "🇸🇬", price: 3 },
  { name: "United States of America", code: "us", flag: "🇺🇸", price: 3 },
  { name: "United Kingdom", code: "gb", flag: "🇬🇧", price: 3 },
  { name: "Brazil", code: "br", flag: "🇧🇷", price: 3 },
  { name: "Switzerland", code: "ch", flag: "🇨🇭", price: 3 },
  { name: "India", code: "in", flag: "🇮🇳", price: 3 },
  { name: "Germany", code: "de", flag: "🇩🇪", price: 3 },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative overflow-hidden pt-16 pb-0 md:pt-16 md:pb-0" 
          style={{ 
            background: "linear-gradient(180deg, rgba(255, 255, 255, 1) 52%, rgba(206, 255, 243, 1) 100%)"
          }}
        >
          {/* Globe Background Image */}
          <div 
            className="absolute inset-x-0 bottom-0 h-full pointer-events-none"
            style={{
              backgroundImage: "url('/globe.png')",
              backgroundPosition: "center bottom",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-4xl">
              {/* Promotional Banner */}
              <div className="mb-8 flex items-center justify-center">
                <Link href="/store?promo=japan" className="inline-flex items-center bg-white rounded-full border transition-shadow text-sm">
                  <div className="bg-[#E0F8F3] text-primary px-2 py-1.5 rounded-full font-medium text-sm ml-1 mt-1 mb-1">
                    Promo!
                  </div>
                  <div className="px-1 py-1 text-muted-foreground text-sm font-medium">
                    Japan e-sim 20% off!
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground mr-3" />
                </Link>
              </div>

              {/* Headline */}
              <div className="text-center mb-8">
                <h1 className="mb-4 text-7xl font-normal tracking-normal leading-[1.125]">
                  Roam{" "}
                  <span className="text-primary">Freely</span>,<br />
                  Stay Connected
                </h1>
                <p className="text-base text-muted-foreground md:text-lg max-w-2xl mx-auto">
                  Affordable eSIM data in 200+ destinations. Instant activation. No physical SIM. 4G/5G speeds.
                </p>
              </div>

              {/* Search Bar */}
              <div className="mb-6 max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for your destination (e.g., Japan, Europe, USA...)"
                    className="w-full h-14 pl-12 pr-4 text-base rounded-full border-2"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-12 max-w-md mx-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90" asChild>
                  <Link href="/store">Shop Plan</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="/store">Compare Price</Link>
                </Button>
              </div>

              {/* Phone Illustration with Globe and Flags */}
              <div className="relative mt-12 md:mt-16 h-[300px] md:h-[400px] overflow-hidden">
                {/* Floating Country Flags */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  {/* France - Left side, slightly offset */}
                  <div 
                    className="absolute flag-breathe" 
                    style={{ 
                      '--final-left': '5%',
                      '--final-top': '15%',
                      '--final-y': '-35%',
                      animationDelay: '0s'
                    } as React.CSSProperties}
                  >
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-lg bg-white flex items-center justify-center text-3xl md:text-4xl shadow-lg">
                      🇫🇷
                    </div>
                  </div>
                  
                  {/* Australia - Left side, middle */}
                  <div 
                    className="absolute flag-breathe" 
                    style={{ 
                      '--final-left': '8%',
                      '--final-top': '45%',
                      '--final-y': '-5%',
                      animationDelay: '0.2s'
                    } as React.CSSProperties}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white flex items-center justify-center text-2xl md:text-3xl shadow-lg">
                      🇦🇺
                    </div>
                  </div>
                  
                  {/* Japan - Left side, bottom */}
                  <div 
                    className="absolute flag-breathe" 
                    style={{ 
                      '--final-left': '3%',
                      '--final-top': '65%',
                      '--final-y': '15%',
                      animationDelay: '0.4s'
                    } as React.CSSProperties}
                  >
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg bg-white flex items-center justify-center text-3xl md:text-5xl shadow-lg">
                      🇯🇵
                    </div>
                  </div>
                  
                  {/* Malaysia - Right side, top */}
                  <div 
                    className="absolute flag-breathe" 
                    style={{ 
                      '--final-left': '88%',
                      '--final-top': '20%',
                      '--final-y': '-30%',
                      animationDelay: '0.6s'
                    } as React.CSSProperties}
                  >
                    <div className="w-[52px] h-[52px] md:w-[72px] md:h-[72px] rounded-lg bg-white flex items-center justify-center text-2xl md:text-3xl shadow-lg">
                      🇲🇾
                    </div>
                  </div>
                  
                  {/* Switzerland - Right side, middle */}
                  <div 
                    className="absolute flag-breathe" 
                    style={{ 
                      '--final-left': '90%',
                      '--final-top': '50%',
                      '--final-y': '0%',
                      animationDelay: '0.8s'
                    } as React.CSSProperties}
                  >
                    <div className="w-11 h-11 md:w-[60px] md:h-[60px] rounded-lg bg-white flex items-center justify-center text-xl md:text-2xl shadow-lg">
                      🇨🇭
                    </div>
                  </div>
                  
                  {/* Brazil - Right side, bottom */}
                  <div 
                    className="absolute flag-breathe" 
                    style={{ 
                      '--final-left': '86%',
                      '--final-top': '70%',
                      '--final-y': '20%',
                      animationDelay: '1s'
                    } as React.CSSProperties}
                  >
                    <div className="w-[60px] h-[60px] md:w-[88px] md:h-[88px] rounded-lg bg-white flex items-center justify-center text-3xl md:text-4xl shadow-lg">
                      🇧🇷
                    </div>
                  </div>
                </div>

                {/* Phone Image */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10" style={{ top: '-308px', height: '700px' }}>
                  <img 
                    src="/phone.png" 
                    alt="Phone" 
                    className="w-auto h-[700px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Processors Section */}
        <section className="py-8 bg-background">
          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-12 items-center justify-center">
              {/* Duplicate the logos for seamless infinite scroll */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-12 items-center shrink-0">
                  <img 
                    src="/payment/AmericanExpress.svg" 
                    alt="American Express" 
                    className="h-8 md:h-10 opacity-40 grayscale object-contain"
                  />
                  <img 
                    src="/payment/ApplePay.svg" 
                    alt="Apple Pay" 
                    className="h-8 md:h-10 opacity-40 grayscale object-contain"
                  />
                  <img 
                    src="/payment/mastercard.svg" 
                    alt="Mastercard" 
                    className="h-8 md:h-10 opacity-40 grayscale object-contain"
                  />
                  <img 
                    src="/payment/Visa.svg" 
                    alt="Visa" 
                    className="h-8 md:h-10 opacity-40 grayscale object-contain"
                  />
                  <img 
                    src="/payment/Paypal.svg" 
                    alt="PayPal" 
                    className="h-8 md:h-10 opacity-40 grayscale object-contain"
                  />
                  <img 
                    src="/payment/GooglePay.svg" 
                    alt="Google Pay" 
                    className="h-8 md:h-10 opacity-40 grayscale object-contain"
                  />
                  <img 
                    src="/payment/Stripe.svg" 
                    alt="Stripe" 
                    className="h-8 md:h-10 opacity-40 grayscale object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="pb-20 pt-10 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="mb-4 text-5xl font-normal leading-12 tracking-normal">
                <span className="text-primary">Popular</span>{" "}
                <span className="text-foreground">Destination</span>
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                Get connected instantly in your favorite travel destinations
              </p>
            </div>
            <BorderedContainer className="mb-8">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {popularDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.name}
                    name={destination.name}
                    code={destination.code}
                    flag={destination.flag}
                    price={destination.price}
                    href={`/store/${destination.code}`}
                  />
                ))}
              </div>
            </BorderedContainer>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link href="/store">Shop Plan</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-background border-border hover:bg-muted" asChild>
                <Link href="#compare-prices">Compare Price</Link>
              </Button>
            </div>
          </div>
        </section>
        <WhyChooseHiRoamingSection />
        <ComparePricesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer className="pt-0" />
    </div>
  )
}
