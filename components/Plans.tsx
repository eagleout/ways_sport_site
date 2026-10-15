import Link from "next/link";
import { PRICE_NOTE, plans } from "@/lib/content";
import { ArrowIcon, CheckIcon } from "./Icons";

type PlansProps = {
  title?: React.ReactNode;
  intro?: string;
  ctaHref?: string;
  headingLevel?: 2 | 3;
};

export default function Plans({
  title = (
    <>
      Choisis ta façon <span className="accent">de vivre WAYS.</span>
    </>
  ),
  intro = "Trois formules, sans promesse compliquée. Choisis simplement la place que tu veux donner au club dans ta semaine.",
  ctaHref = "/abonnements",
  headingLevel = 2,
}: PlansProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <section className="plans-section" id="abonnements" aria-labelledby="plans-title">
      <div className="plans-section__head">
        <div>
          <span className="kicker" data-reveal>
            Memberships
          </span>
          <Heading id="plans-title" className="display" data-split>
            {title}
          </Heading>
        </div>
        <p data-reveal>{intro}</p>
      </div>

      <div className="plans">
        {plans.map((plan, index) => (
          <article
            key={plan.name}
            className={plan.featured ? "plan plan--featured" : "plan"}
            data-reveal
            data-delay={String(index * 0.08)}
            data-spotlight
          >
            {plan.featured ? <span className="kicker plan__badge">Recommandé</span> : null}
            <span className="kicker plan__tag">{plan.tag}</span>
            <h3 className="display plan__name">{plan.name}</h3>
            <p className="plan__desc">{plan.description}</p>
            <p className="plan__price" aria-label={`${plan.price} euros par mois`}>
              {plan.price}
              <sup>€</sup>
              <small>/ mois</small>
            </p>
            <ul className="plan__features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={`${ctaHref}?formule=${encodeURIComponent(plan.name)}#pre-inscription`}
              className={plan.featured ? "btn btn--light btn--block" : "btn btn--dark btn--block"}
              data-plan={plan.name}
            >
              Choisir {plan.name}
              <ArrowIcon className="btn__arrow" />
            </Link>
          </article>
        ))}
      </div>
      <p className="plans-note">{PRICE_NOTE}</p>
    </section>
  );
}
