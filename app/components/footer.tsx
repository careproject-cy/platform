import Image from "next/image"
import Link from "next/link"

const columns = [
  { title: "Adopt", links: [["Dogs for adoption", "/dogs"], ["How adoption works", "/more/adopt"], ["Adopted dogs", "/adopted/1"]] },
  { title: "Help", links: [["Donate", "/more/donate"], ["Foster", "/more/foster"], ["Volunteer", "/more/get-involved"]] },
  { title: "About", links: [["Our story", "/more/about"], ["Stories", "/blog"], ["UANA Foundation", "https://uanafoundation.com/"]] },
]

const social = [
  ["Instagram", "https://www.instagram.com/uana.cy/"],
  ["Facebook", "https://www.facebook.com/careproject.cy"],
  ["LinkedIn", "https://www.linkedin.com/company/uana-foundation/"],
  ["Telegram", "https://t.me/care_project"],
  ["GitHub", "https://github.com/careproject-cy/"],
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-16 pb-10 grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="" width={45} height={32} className="h-8 w-auto rounded-md"/>
            <span className="font-semibold tracking-tight">CARE Project</span>
          </div>
          <p className="text-sm text-[var(--muted)] mt-4 leading-relaxed">
            Cyprus Animals Rescue Effort, a volunteer project of the UANA Foundation. We rescue, treat, and rehome stray dogs across Cyprus.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6 text-sm">
            {social.map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--ink)]">{name}</a>
            ))}
          </div>
        </div>
        {columns.map(c => (
          <div key={c.title}>
            <div className="text-sm font-medium">{c.title}</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map(([text, href]) => (
                <li key={href}><Link href={href} className="text-[var(--muted)] hover:text-[var(--ink)]">{text}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 border-t border-[var(--line)] flex flex-wrap justify-between gap-2 text-xs text-[var(--muted)]">
        <span>© {new Date().getFullYear()} CARE Project · UANA Foundation, Cyprus</span>
        <span>100% volunteer-run. Every euro goes to the animals.</span>
      </div>
      <div aria-hidden="true" className="overflow-hidden border-t border-[var(--line)] flex justify-center">
        <span className="cp-wordmark">CARE</span>
      </div>
    </footer>
  )
}
