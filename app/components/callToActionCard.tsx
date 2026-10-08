import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from "react-feather";

// Set --cta-accent on a parent to recolour the primary button.
const CTACard: React.FC = () => {
  return (
    <section className="px-4 md:px-6 py-20">
      <div className="relative max-w-6xl mx-auto md:min-h-[440px] overflow-hidden rounded-[32px] bg-stone-900 text-white flex flex-col md:flex-row">
        <div className="relative h-64 shrink-0 md:absolute md:inset-0 md:h-auto">
          <Image src="/dog-card.png" alt="A rescued dog in a recovery cone, waiting in a shelter kennel" fill
                 sizes="(max-width: 768px) 100vw, 1152px" className="object-cover object-[72%_30%]"/>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(28,25,23)_0%,rgba(28,25,23,0)_45%)] md:bg-[linear-gradient(90deg,rgba(12,10,9,.9)_0%,rgba(12,10,9,.72)_38%,rgba(12,10,9,0)_70%)]"/>
        </div>
        <div className="relative z-10 md:self-center px-8 pb-8 pt-2 md:p-14 max-w-xl">
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-6xl leading-[1] tracking-[-0.02em]">
            Ready to power the rescue?
          </h2>
          <p className="mt-5 text-lg text-white/80 leading-relaxed">
            Help pay for vet exams, vaccinations, rehab, and basic supplies like food and blankets. We support
            different shelters and track each case until adoption.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/more/donate"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--cta-accent,#ea580c)] text-white px-6 py-3 font-medium hover:opacity-90 transition-opacity">
              Donate now <Heart className="size-4"/>
            </Link>
            <Link href="/more/get-involved"
                  className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 font-medium hover:bg-white/10 transition-colors">
              Other ways to help
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/60">€5 buys a deworming tablet. Run entirely by volunteers.</p>
        </div>
      </div>
    </section>
  );
};

export default CTACard;
