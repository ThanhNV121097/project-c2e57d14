# Tabimarket — the site

The owner gave no business name. The only name anywhere in the brief is the owner's own
address, `hello@tabimarket.jp`, so the site is **Tabimarket**. The plan's working title
("Marketplace for travel in Japan") is not put on the site.

The owner chose the direction **Make them want to go** after seeing it drawn. Its palette,
its faces and its scale are the whole site's — every page, header and footer included.

## What I looked at

| Site | What I watched | What I take |
|---|---|---|
| land-book.com (gallery) | Load, four scroll steps. Inter, two sticky elements, 26 running animations on load, no GSAP — plain CSS transitions on a card grid. | The gallery's card discipline: one picture ratio per grid and the whole card a picture, with the words under it on the page's own ground. No white card, no shadow. |
| awwwards.com/websites (gallery) | Load, three scroll steps. Inter Tight, no sticky, almost nothing animates. | Where the featured sites of this year are. Confirmed what the year looks like: heavy photography, hairline rules, small-caps metadata under the picture. Took nothing of theirs visually. |
| linear.app | Load, four scroll steps. Inter Variable + Berkeley Mono, 92 running animations on load rising to 520 on scroll, no library — IntersectionObserver reveals and CSS transforms. | The reveal timing and the hairline system: a section separated by a 1px rule, a small-caps label in the margin beside the heading, figures set in a tabular face. Used for my section rules and my register tables, not for the palette (theirs is violet-on-near-black; mine is amber on #0C0D0C). |
| obys.agency | Load, four scroll steps. One canvas, a custom face, a single-screen page. | One thing per screen, said at the ceiling of the type scale, with the picture doing the rest. That is the argument for a 72px h1 on the home page and nothing competing with it. |
| aman.com/hotels/amanemu | Load, four scroll steps. Lyon Display + Whitney, one sticky bar, slow full-bleed photography, a booking bar that stays. | The full-bleed photograph that is the page rather than an illustration of it, and a quiet persistent booking action. The travel grammar this business sells in — a day worth getting up at four for. Their palette and their serif are not taken; Shippori Mincho is a Japanese mincho, not a Western display serif. |
| airbnb.com/s/Kyoto--Japan/experiences | Load, three scroll steps. Airbnb Cereal, a pill filter row, a 4-up card carousel. | How a marketplace puts place, date and party size above the goods, and how a card carries operator, price and duration in one line. Rebuilt as a hairline register, not as their rounded white cards. |

Nothing above is a layout copied whole, and no reference's identity is borrowed: no violet, no
Cereal, no Aman cream. Three things on this site the references could not have: a mincho
display face carrying every heading at 72px, a tour page whose four required photographs are
laid out as one full-bleed picture and a 2/3–1/3 pair beneath it, and an approval register
where a pending listing is one amber dot in a column of hairlines.

## The direction

One ground, dark: `#0C0D0C`, with `#171816` for a raised surface, `#F1EEE7` ink and `#9A978F`
for everything secondary. A single accent, lantern amber `#E0A33C`, used on nothing but
actions and status — a button, a price that matters, a pending dot — so the photographs are
the only other colour on the page. Faces: **Shippori Mincho** for display and **Zen Kaku
Gothic New** for body and labels. This is the one house-style rule I take off: the display
face is a mincho serif rather than a sans, because what is being sold is a country, and a
mincho is what that country sets its own books in. It is carried through every heading on
every page, not one band. Scale at 1440: h1 72px / −0.025em / 1.04, h2 30px, supporting line
17px, labels 11px small-caps at 0.14em, prices in tabular figures. The home page has one thing
to say — go — so it says it at the ceiling; the catalogue, the booking panel and the back
office hold their headings at h2 and spend the room on tours, dates and prices.

Grid: a 1160px page with a left edge that everything hangs from, and pictures that leave it —
the hero fills the window, a tour's first photograph runs edge to edge of the viewport, and
place tiles sit over the picture rather than beside it. Pictures are a system: every tour
photograph is a landscape frame at one ratio per grid, cropped to the same distance from its
subject, read against #0C0D0C with no white box anywhere near it.

Motion: a short load moment (the hero picture settles from 1.04 scale and the headline's three
lines rise 16px at 70ms apart, all inside 700ms), reveals of 16px over 600ms on
`cubic-bezier(0.2, 0.7, 0.2, 1)` as sections enter, and hover that answers — a tile's picture
grows 2%, a row's rule goes amber. Native scrolling, nothing pinned or scrubbed, no marquee.
`prefers-reduced-motion` turns all of it off and shows everything in place.

## COMMITMENTS

1. The home page opens on one photograph filling the window, with a dark gradient coming in
   from the left, the headline and one supporting line on that left edge, and three tall place
   tiles sitting low on the right over the picture.
2. The hero headline's last line is set in amber and crosses off the gradient onto the
   photograph.
3. Every heading on the site — home, catalogue, tour, checkout, account, admin — is Shippori
   Mincho at weight 400. No page falls back to a sans heading.
4. Every section on every page is introduced by a full-width hairline rule with an 11px
   small-caps label sitting in the left margin beside the heading.
5. Every price on the site is tabular figures, right-aligned in any column of prices, and the
   tour page's price is the second-largest thing on its first screen.
6. A tour's photographs are laid out as one picture running edge to edge of the viewport and a
   2/3 – 1/3 pair beneath it — never four equal thumbnails.
7. The admin approval queue is a hairline-ruled register, prices right-aligned, with status as
   a single coloured dot rather than a pill.
8. One mode only: `#0C0D0C` ground everywhere, amber `#E0A33C` on actions and status and
   nothing else.
