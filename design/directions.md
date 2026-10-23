# Tabimarket — three directions

CHOSEN: Make them want to go — a traveller arrives with a week in Japan and no plan for it,
and what makes them book a whole day with a stranger is seeing Fuji above the cloud line at
five in the morning. The marketplace's job here is not to list, it is to convince.

The owner gave no name. The only name anywhere in the brief is the owner's own email
address, `hello@tabimarket.jp`, so the site is called **Tabimarket**. The working title in
the plan ("Marketplace for travel in Japan") is not put on the site.

## The reading

This is a marketplace for full-day tours in Japan, and the person paying is a traveller who
has already decided to come: they have dates, they have a city or two, and they have one or
two free days inside a trip that is otherwise booked. They are not choosing between Japan and
Portugal — they are choosing between the operator who will take them up to Lake Kawaguchi on
the Saturday and the one who will not answer their email. So the thing being sold is not
inspiration and not the lowest price: it is a reliable, bookable day, run by an operator
someone has checked. The brief makes that the product — every tour is submitted by a supplier,
read by an admin, approved or rejected with a reason, and carries at least four photographs
before a traveller ever sees it — and the site's whole credibility rests on that gate being
visible. It is also a two-sided business: without operators listing there is nothing to book,
so "list your tours here" has to be reachable from the first screen without being louder than
the tours themselves. What it is not: not a flight-and-hotel OTA, not a discount aggregator,
not a travel magazine with a booking button bolted on, and not a single operator's brochure —
no "we" voice, because the operators are the we.

Three readings of that survive contact with the brief, and they are genuinely different
businesses to be: a **booking tool** for someone who already knows the day, a **shop window**
for Japan that sells the day before it sells the operator, and a **vetted register** whose
whole pitch is the gate. Each gets a page below.

---

## Pick a day, pick a tour

- **Suits you if:** your traveller already knows they have the Saturday free in Kyoto, and
  what they want from you is to find the day's tour, see the price, and book it before they
  close the tab — not to be sold on Japan.
- **Palette (light):** `--ground #FFFFFF` · `--surface #F2F2EF` · `--ink #141417` ·
  `--ink-soft #5B5B62` · `--accent #D2362A` (torii vermilion) · `--accent-ink #FFFFFF` ·
  `--line rgba(20,20,23,0.12)`
- **Faces:** Schibsted Grotesk for display and body — one family, a grotesk with squarer
  bowls and tight apertures, so it holds at 13px inside a booking panel and still has an edge
  at 44px. No serif. (No house-style unlock taken; this direction wants none.)
- **Scale at 1440:** h1 44px / −0.03em / 1.04 · h2 26px · price 22px tabular · field labels
  10px small-caps at 0.14em. The h1 is deliberately far under the 76px ceiling: this screen
  has to carry a date picker, four tours and four prices above the fold, and a 72px headline
  would push every one of them under it.
- **First screen:** a hairline bar with the wordmark, then a 396px left edge carrying the
  headline and a real where/when/how-many panel, and to the right a 2×2 wall of tour
  photographs, edge to edge with the name and the price set over them — no white card, no grey
  caption.
- **Device:** the tour wall breaks the page margin and runs off the right edge of the
  viewport; the catalogue visibly continues past the screen.

## Make them want to go

- **Suits you if:** your traveller lands with a week in Japan and no plan for it, and the
  thing that makes them book is seeing Fuji at five in the morning — they come to be told what
  is worth a whole day.
- **Palette (dark):** `--ground #0C0D0C` · `--surface #171816` · `--ink #F1EEE7` ·
  `--ink-soft #9A978F` · `--accent #E0A33C` (lantern amber) · `--accent-ink #0C0D0C` ·
  `--line rgba(241,238,231,0.16)`
- **Faces:** Shippori Mincho for display, Zen Kaku Gothic New for body and labels. **This is
  the one house-style unlock this direction takes:** the display face is a mincho serif, not a
  sans, because the thing being sold is a country and a mincho is what that country sets its
  own書 in — Inter says nothing about a mountain at dawn. Carried through every heading, not
  one band.
- **Scale at 1440:** h1 72px / −0.025em / 1.04 · h2 30px · supporting line 17px · place tiles
  14px with a 13px tabular price. One thing to say, said at the ceiling.
- **First screen:** one photograph filling the window, a dark gradient coming in from the
  left, the headline and one supporting line on that left edge, and three tall place tiles
  sitting low on the right over the picture.
- **Device:** the headline runs past the end of the dark panel and crosses onto the
  photograph — the last line is read against the mountain, not against the ground.

## Nothing listed we haven't checked

- **Suits you if:** your traveller has been burned by a tour that was nothing like its
  photographs, is spending real money on one day of a once-in-a-decade trip, and will choose
  you because a person at Tabimarket read the listing before it went up.
- **Palette (indigo ground):** `--ground #152138` (kachi indigo) · `--surface #1C2A44` ·
  `--ink #EDEFF3` · `--ink-soft #93A0B5` · `--accent #6FD3A6` (approved) ·
  `--accent-ink #0C1626` · `--line rgba(237,239,243,0.14)`
- **Faces:** Archivo for display and body, with tabular figures switched on everywhere a
  number appears. Archivo's numerals are wide and even, which is the whole point of a
  direction whose argument is a register.
- **Scale at 1440:** h1 52px / −0.025em / 1.05 · row name 21px · **price 44px tabular** ·
  row numerals 13px · small-caps labels 10px at 0.16em. The price is the second-largest thing
  on the screen on purpose.
- **First screen:** no hero photograph — a left column of type over the indigo, with the
  approved tours set as a hairline-ruled register (index, place, tour, operator, price), and a
  single photograph standing as a full-height vertical band against the right edge.
- **Device:** oversized tabular numerals, right-aligned on a hairline rule system, so the
  prices line up digit under digit down the register.

---

## Notes

- **Pictures.** Five stock photographs (Pixabay licence, credited in `src/credits.json`) stand
  in for the suppliers' own: Fuji at sunrise, Fuji in cloud, the Arashiyama bamboo, a Shinjuku
  street at night, snow country. No file is framed the same way twice: the bamboo is a 4:3
  crop in direction 1 and a 3:4 tile in direction 2; Fuji at sunrise is a 4:3 card in direction
  1 and a full-height portrait band in direction 3. One photograph, one tour — the Osaka food
  tour has no honest picture yet and so is not shown as a card anywhere.
- **Tours, operators and prices are sample records**, in yen, in the shape the brief
  describes (one travel product, supplier-set dates, full-day slots). The owner supplied none.
- **Looked at while deciding:** Airbnb's experiences listings (how a marketplace puts a date
  and a party size above the goods), Linear and Vercel (hairline rule systems, small-caps
  labels, tabular numerals at size). Structure and timing taken; no palette, pairing or
  arrangement that anyone would recognise as theirs.
