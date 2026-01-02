"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { BorderedContainer } from "@/components/bordered-container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "What is an eSIM?",
    a: "An eSIM is a digital SIM that's built into your device. Instead of inserting a physical SIM card, you can download and activate a data plan digitally. It's perfect for travel because you can install it before you leave and activate it when you arrive.",
    value: "item-1",
  },
  {
    q: "How do I install the eSIM?",
    a: "After purchase, you'll receive a QR code (or activation details). On your phone, go to Cellular/Mobile Data settings, choose Add eSIM, and scan the QR code to install.",
    value: "item-2",
  },
  {
    q: "When should I activate my plan?",
    a: "Install your eSIM anytime, but activate the plan when you're ready to start using data—typically when you arrive at your destination.",
    value: "item-3",
  },
  {
    q: "Do I get a local number?",
    a: "Most travel eSIMs are data-only and do not include a local phone number. You can still use apps like WhatsApp, iMessage, FaceTime, and VoIP calls.",
    value: "item-4",
  },
  {
    q: "How do top-ups work?",
    a: "If you run out of data, you can purchase a top-up from your account. The additional data is applied to your existing eSIM so you can stay connected without reinstalling.",
    value: "item-5",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left */}
          <div>
            <h2 className="text-5xl font-normal leading-[1.05] tracking-normal">
              <span className="text-primary">Frequently</span>{" "}
              <span className="text-foreground">Asked</span>
              <br />
              <span className="text-foreground">Questions</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Everything you need to know about Hiroaming eSIMs.
              <br />
              Do you have other question?
            </p>
            <div className="mt-8">
              <Button className="h-12 rounded-full px-10 bg-primary hover:bg-primary/90" asChild>
                <a href="mailto:sales@hiroaming.com">Contact Sales</a>
              </Button>
            </div>
          </div>

          {/* Right */}
          <BorderedContainer className="rounded-2xl" innerClassName="rounded-2xl p-3 sm:p-4 bg-gray-100">
            <div className="rounded-2xl bg-white p-2 sm:p-3">
              <AccordionPrimitive.Root
                type="single"
                collapsible
                defaultValue="item-1"
                className="space-y-4"
              >
                {faqs.map((item) => (
                  <AccordionPrimitive.Item
                    key={item.value}
                    value={item.value}
                    className="rounded-2xl border border-border bg-white"
                  >
                    <AccordionPrimitive.Header>
                      <AccordionPrimitive.Trigger
                        className={cn(
                          "group flex w-full items-center justify-between gap-6 px-6 py-6 text-left",
                          "[&[data-state=open]_.faq-chevron]:rotate-180"
                        )}
                      >
                        <span className="text-2xl font-semibold text-foreground">
                          {item.q}
                        </span>
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-white">
                          <ChevronDown className="faq-chevron h-5 w-5 text-foreground transition-transform duration-200" />
                        </span>
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>

                    <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="px-6 pb-6 pt-0 text-base leading-relaxed text-muted-foreground">
                        {item.a}
                      </div>
                    </AccordionPrimitive.Content>
                  </AccordionPrimitive.Item>
                ))}
              </AccordionPrimitive.Root>
            </div>
          </BorderedContainer>
        </div>
      </div>
    </section>
  )
}


