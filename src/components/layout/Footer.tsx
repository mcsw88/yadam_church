import Link from "next/link";

import { MENU_ITEMS } from "@/constants/menu";
import { ROUTES } from "@/constants/routes";
import { CONTAINER_MAX, PAGE_PADDING_X } from "@/constants/ui";
import { CHURCH_INFO } from "@/data/church-info";
import { ContactOverlayTrigger } from "@/components/features/ContactOverlayTrigger";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-theme="dark"
      className={`bg-dado-dark text-dado-light ${PAGE_PADDING_X} pt-20 pb-10`}
    >
      <div className={`${CONTAINER_MAX} mx-auto`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_12rem_minmax(0,1fr)] lg:items-start lg:gap-x-24">
          <div className="lg:justify-self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-dado-accent">
              Yedam Church
            </p>
            <p className="mt-4 font-serif text-3xl text-dado-light">
              {CHURCH_INFO.name}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-dado-light/70">
              {CHURCH_INFO.address}
            </p>
          </div>

          <nav aria-label="사이트 맵" className="lg:justify-self-center">
            <h2 className="text-xs uppercase tracking-[0.3em] text-dado-accent">
              Site Map
            </h2>
            <ul className="mt-6 flex flex-col gap-5 text-sm">
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={ROUTES[item.id]}
                    className="text-dado-light/80 transition-colors hover:text-dado-light"
                  >
                    {item.labelKo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-1 lg:w-[10rem] lg:justify-self-end">
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] text-dado-accent">
                Contact
              </h2>
              <ul className="mt-6 space-y-3 text-sm">
                <li>
                  <a
                    href={`tel:${CHURCH_INFO.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-dado-light/80 transition-colors hover:text-dado-light"
                  >
                    {CHURCH_INFO.phone}
                  </a>
                </li>
                {CHURCH_INFO.email ? (
                  <li>
                    <a
                      href={`mailto:${CHURCH_INFO.email}`}
                      className="text-dado-light/80 transition-colors hover:text-dado-light"
                    >
                      {CHURCH_INFO.email}
                    </a>
                  </li>
                ) : null}
              </ul>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] text-dado-accent">
                Worship
              </h2>
              <ul className="mt-6 space-y-3 text-sm">
                {CHURCH_INFO.worship.map((service) => (
                  <li
                    key={service.name}
                    className="flex items-center gap-4 text-dado-light/80"
                  >
                    <span>{service.name}</span>
                    <span className="text-dado-light/60">{service.time}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <ContactOverlayTrigger variant="footerText" />
            </section>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-dado-light/10 pt-8 text-xs text-dado-light/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {CHURCH_INFO.name}. All rights reserved.
          </p>
          <p className="tracking-[0.2em] uppercase">In Christ, Together.</p>
        </div>
      </div>
    </footer>
  );
}
