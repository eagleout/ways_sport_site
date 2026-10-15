import Link from "next/link";
import { ArrowIcon } from "./Icons";

type CtaBandProps = {
  title: React.ReactNode;
  text: string;
  href: string;
  label: string;
};

export default function CtaBand({ title, text, href, label }: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="cta-band__inner">
        <h2 className="display" data-split>
          {title}
        </h2>
        <div data-reveal>
          <p>{text}</p>
          <Link href={href} className="btn btn--dark" data-magnetic>
            {label}
            <ArrowIcon className="btn__arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
