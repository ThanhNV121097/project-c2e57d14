import { ArrowRight, ShieldCheck } from "lucide-react";
import { tours, yen } from "./directions-data";
import "./directions.css";

const Mark = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M1 5h16M3.5 5v11M14.5 5v11M1 2.2 9 1l8 1.2" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

/** Direction 2 — "Make them want to go". One photograph fills the window; the
 *  headline's last line crosses off the dark panel onto the mountain. */
export default function Directions2() {
  const tiles = tours.filter((t) => t.photo && t.id !== "01").slice(0, 3);
  return (
    <div className="d2">
      <div className="d2__photo">
        <img src="/images/fuji-clouds.jpg" alt="Mount Fuji above the cloud line at first light" />
      </div>
      <div className="d2__scrim" />

      <div className="d2__bar">
        <span className="d2__mark">
          <span className="d2__markglyph"><Mark /></span>
          Tabimarket
        </span>
        <nav className="d2__barlinks">
          <span>Tours</span>
          <span>Places</span>
          <span>Sign in</span>
          <a className="d2__cta" href="#supplier">List your tours</a>
        </nav>
      </div>

      <div className="d2__body">
        <div className="d2__words">
          <p className="d2__kicker rise">Mount Fuji · Asagiri Tours · full day from {yen(18500)}</p>
          <h1 className="d2__h1 rise" style={{ animationDelay: "80ms" }}>
            The lakes are still<em>at half past four.</em>
          </h1>
          <p className="d2__sub rise" style={{ animationDelay: "160ms" }}>
            Full-day tours across Japan, run by operators we read before they list.
            Choose your date, choose how many are going, pay by card.
          </p>
          <div className="d2__actions rise" style={{ animationDelay: "220ms" }}>
            <button className="d2__button" type="button">
              See the day in full
              <ArrowRight size={16} strokeWidth={1.6} />
            </button>
            <span className="d2__aside">
              <ShieldCheck size={15} strokeWidth={1.6} />
              Approved listing · 4 photographs minimum
            </span>
          </div>
        </div>
      </div>

      <div className="d2__tiles">
        {tiles.map((t, i) => (
          <article className="d2__tile fade" key={t.id} style={{ animationDelay: `${300 + i * 90}ms` }}>
            <div className="d2__frame">
              <img src={t.photo} alt={`${t.name} — ${t.place}`} style={{ objectPosition: t.focal }} />
            </div>
            <div className="d2__rule" />
            <p className="d2__tplace">{t.place}</p>
            <p className="d2__tname">{t.name}</p>
            <p className="d2__tprice">{yen(t.price)} per person</p>
          </article>
        ))}
      </div>

      <span className="dtag">Direction 2 — Make them want to go</span>
    </div>
  );
}
