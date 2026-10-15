import Link from "next/link";
import { CONTACT_EMAIL, courses } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <p className="site-footer__signature" data-reveal>
          À ta façon.
          <span>À fond.</span>
        </p>
        <div className="site-footer__col" data-reveal data-delay="0.08">
          <h3 className="kicker">Le club</h3>
          <ul>
            <li><Link href="/#visite">La visite</Link></li>
            <li><Link href="/levallois">WAYS Levallois</Link></li>
            <li><Link href="/abonnements">Abonnements</Link></li>
            <li><Link href="/abonnements#pre-inscription">Pré-inscription</Link></li>
          </ul>
        </div>
        <div className="site-footer__col" data-reveal data-delay="0.16">
          <h3 className="kicker">Studios</h3>
          <ul>
            {courses.map((course) => (
              <li key={course.slug}>
                <Link href={`/cours/${course.slug}`}>{course.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col" data-reveal data-delay="0.24">
          <h3 className="kicker">Contact</h3>
          <ul>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li><span className="muted-dark">Levallois-Perret, Hauts-de-Seine</span></li>
          </ul>
        </div>
      </div>

      <div className="site-footer__brand" data-reveal>
        <img src="/ways-logo.svg" alt="WAYS" width={980} height={200} loading="lazy" />
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} WAYS — Training Club Levallois-Perret</span>
        <span>Training · Studios · Recover · Coffee · Work</span>
      </div>
    </footer>
  );
}
