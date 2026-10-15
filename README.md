# WAYS — Training Club Levallois-Perret · V8 « L'entrée »

Site Next.js 15 du club WAYS. Expérience immersive : on arrive devant les portes du club,
elles s'ouvrent au scroll, puis on visite les espaces comme si on y marchait.

## Parcours de la page d'accueil
1. **Préchargement** : le logo se dessine, compteur 000 → 100, rideau qui se lève (une fois par session).
2. **L'entrée** : portes vitrées, logo partagé entre les battants, filet de lumière ; au scroll les portes
   s'ouvrent vers l'intérieur, la caméra avance, vidéo d'ambiance (desktop) et signature « À ta façon. À fond. ».
3. **Manifeste** : le texte s'allume mot à mot, compteurs 6 / 5 / 1.
4. **La visite** : défilement horizontal épinglé à travers 5 zones (coffee, training, studios, recover, work)
   avec signalétique et barre de progression. Vertical sur mobile.
5. **À fond.** : l'image n'apparaît qu'à travers les lettres, puis le mot grandit jusqu'à ouvrir la scène.
6. **Studios** : les 6 cours en grandes lignes, aperçu image qui suit le pointeur, bandeau réactif à la vitesse.
7. **Une journée chez WAYS** : 07:30 → 18:30, la lumière change et les espaces se succèdent.
8. **Founding members**, **abonnements**, **Levallois + FAQ**, **appel final**.

Pages : `/cours`, `/cours/[slug]` (6 fiches), `/abonnements` (avec pré-inscription), `/levallois`, 404.

## Technique
- GSAP 3.13 (ScrollTrigger, SplitText) + Lenis pour le défilement fluide.
- `prefers-reduced-motion` respecté partout (portes ouvertes, pas d'épinglage, pas de grain).
- Vidéos chargées uniquement sur desktop, hors mode économie de données, quand la section est visible.
- Contenu entièrement rendu côté serveur (SEO), animations ajoutées par-dessus ; filet de sécurité si le JS échoue.
- Un seul fichier de styles : `app/globals.css`.

## Remplacer les visuels
Tous les médias sont centralisés dans **`lib/media.ts`** (photos Unsplash, vidéos Pexels : licences libres
pour un usage commercial). Pour mettre une vraie photo du club : déposer le fichier dans `public/media/`
et remplacer `src` par `/media/nom-du-fichier.jpg`. Les textes (cours, formules, zones, FAQ) sont dans
**`lib/content.ts`**.

## Avant la mise en production
1. Photos et vidéos réelles du club dans `lib/media.ts`.
2. Adresse exacte et horaires (à ajouter au JSON-LD dans `lib/content.ts`).
3. Tarifs définitifs (`plans` dans `lib/content.ts`).
4. Formulaire relié à un CRM (aujourd'hui : e-mail pré-rempli vers contact@ways-sport.fr).
5. Mentions légales, confidentialité, cookies.
6. Domaine définitif (`SITE_URL` dans `lib/content.ts`).

## Lancer en local
```bash
npm install
npm run dev
```
