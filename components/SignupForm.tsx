"use client";

import { useEffect, useState } from "react";
import { CONTACT_EMAIL, plans } from "@/lib/content";
import { ArrowIcon } from "./Icons";

/**
 * Pré-inscription : prépare un e-mail complet vers WAYS dans la messagerie du visiteur.
 * Aucune donnée n'est stockée par le site.
 */
export default function SignupForm() {
  const [plan, setPlan] = useState("Studio");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("formule");
    if (fromQuery && plans.some((item) => item.name === fromQuery)) setPlan(fromQuery);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-plan]");
      const chosen = link?.dataset.plan;
      if (chosen && plans.some((item) => item.name === chosen)) setPlan(chosen);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("prenom") ?? "").trim();
    const lastName = String(data.get("nom") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("telephone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Pré-inscription WAYS — formule ${plan}`;
    const body = [
      "Bonjour WAYS,",
      "",
      `Je souhaite me pré-inscrire avec la formule ${plan}.`,
      "",
      `Prénom : ${firstName}`,
      `Nom : ${lastName}`,
      `E-mail : ${email}`,
      phone ? `Téléphone : ${phone}` : "",
      message ? `\nMessage : ${message}` : "",
      "",
      "À bientôt chez WAYS.",
    ]
      .filter((line, index, lines) => line !== "" || lines[index - 1] !== "")
      .join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="form" onSubmit={onSubmit} data-reveal>
      <div className="field">
        <label className="kicker" htmlFor="formule">
          Formule
        </label>
        <select id="formule" name="formule" value={plan} onChange={(event) => setPlan(event.target.value)}>
          {plans.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name} — {item.price} € / mois
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 26 }}>
        <div className="field">
          <label className="kicker" htmlFor="prenom">
            Prénom
          </label>
          <input id="prenom" name="prenom" autoComplete="given-name" required />
        </div>
        <div className="field">
          <label className="kicker" htmlFor="nom">
            Nom
          </label>
          <input id="nom" name="nom" autoComplete="family-name" required />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 26 }}>
        <div className="field">
          <label className="kicker" htmlFor="email">
            E-mail
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label className="kicker" htmlFor="telephone">
            Téléphone (facultatif)
          </label>
          <input id="telephone" name="telephone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label className="kicker" htmlFor="message">
          Un mot pour l’équipe (facultatif)
        </label>
        <textarea id="message" name="message" rows={3} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
        <button type="submit" className="btn btn--light" data-magnetic>
          Envoyer ma pré-inscription
          <ArrowIcon className="btn__arrow" />
        </button>
        <p className="form__note" aria-live="polite">
          {sent
            ? "Ta messagerie s’ouvre avec ta demande pré-remplie. Il ne reste qu’à l’envoyer."
            : "Ta messagerie s’ouvrira avec ta demande pré-remplie. Rien n’est enregistré sur ce site."}
        </p>
      </div>
    </form>
  );
}
