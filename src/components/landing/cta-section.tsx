import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type CTASectionProps = {
  className?: string;
};
export function CTASection({ className }: CTASectionProps) {
  return (
    <section className={className}>
      <div className="w-full">
        {/* CTA banner */}
        <div className="relative overflow-hidden rounded-t-3xl bg-black text-white">
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              backgroundPosition: "0 0",
            }}
          />
          {/* Pattern SVG in bottom left corner */}
          <div className="absolute bottom-0 left-0 pointer-events-none">
            <Image
              src="/pattern.svg"
              alt=""
              width={400}
              height={400}
              className="opacity-60 scale-150 translate-y-1/2"
            />
          </div>
          <div className="relative grid gap-10 px-10 py-14 lg:grid-cols-2 lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-5xl font-normal leading-[1.05] tracking-normal md:text-6xl">
                Ready to <span className="text-primary">Roam</span>
                <br />
                <span className="text-primary">Smarter</span>?
              </h2>
              <p className="mt-6 text-base text-white/60">
                Join millions of travelers who trust Hiroaming for seamless
                global connectivity
              </p>
              <div className="mt-8">
                <Button
                  className="h-12 rounded-full px-10 bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link href="/store">Join Hiroaming Today</Link>
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block pr-16">
              <div className="relative ml-auto h-[360px] w-[380px] scale-[2] translate-y-3/4">
                <Image
                  src="/phone.png"
                  alt="HiRoaming app"
                  fill
                  className="object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
