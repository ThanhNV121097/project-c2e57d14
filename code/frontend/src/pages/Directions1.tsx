import { CalendarDays, MapPin, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { tours, yen } from "./directions-data";
import "./directions.css";

const Mark = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M1 5h16M3.5 5v11M14.5 5v11M1 2.2 9 1l8 1.2" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

/** Direction 1 — "Pick a day, pick a tour". Booking tool: the panel first,
 *  the catalogue running off the right edge. */
export default function Directions1() {
  const wall = tours.filter((t) => t.photo).slice(0, 4);
  return (
    <div className="d1">
      <div className="d1__bar">
        <span className="d1__mark" style={{ color: "#D2362A" }}>
          <Mark />
          <span style={{ color: "#141417" }}>Tabimarket</span>
        </span>
        <nav className="d1__barlinks">
          <b>Tours</b>
          <span>Places</span>
          <span>List your tours</span>
          <span>Sign in</span>
        </nav>
      </div>

      <div className="d1__body">
        <div className="d1__left">
          <p className="d1__kicker rise">Full-day tours · booked direct with the operator</p>
          <h1 className="d1__h1 rise" style={{ animationDelay: "60ms" }}>
            One free day in Japan.<br />Book the day, not the trip.
          </h1>
          <p className="d1__sub rise" style={{ animationDelay: "120ms" }}>
            Pick the city, the date and how many are going. Prices are the operator&rsquo;s own,
            per person, paid by card.
          </p>

          <div className="d1__panel rise" style={{ animationDelay: "180ms" }}>
            <div className="d1__field">
              <MapPin size={17} strokeWidth={1.5} />
              <span>
                <span className="d1__fieldlab">Where</span>
                <span className="d1__fieldval">Kyoto</span>
              </span>
            </div>
            <div className="d1__field">
              <CalendarDays size={17} strokeWidth={1.5} />
              <span>
                <span className="d1__fieldlab">Date</span>
                <span className="d1__fieldval">Sat 18 Apr</span>
              </span>
            </div>
            <div className="d1__field">
              <Users size={17} strokeWidth={1.5} />
              <span>
                <span className="d1__fieldlab">Travellers</span>
                <span className="d1__fieldval">2 adults</span>
              </span>
            </div>
            <button className="d1__go" type="button">
              Show tours for that day
              <ArrowRight size={16} strokeWidth={1.6} />
            </button>
          </div>

          <p className="d1__note rise" style={{ animationDelay: "240ms" }}>
            <ShieldCheck size={15} strokeWidth={1.6} />
            Every tour here was read and approved by Tabimarket before it went up.
          </p>
        </div>

        <div className="d1__wall">
          {wall.map((t, i) => (
            <article className="d1__tile fade" key={t.id} style={{ animationDelay: `${120 + i * 80}ms` }}>
              <img src={t.photo} alt={`${t.name} — ${t.place}`} style={{ objectPosition: t.focal }} />
              <span className="d1__place">{t.place}</span>
              <div className="d1__meta">
                <span>
                  <span className="d1__name">{t.name}</span>
                  <span className="d1__hours">{t.hours} · {t.operator}</span>
                </span>
                <span className="d1__price">{yen(t.price)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <span className="dtag">Direction 1 — Pick a day, pick a tour</span>
    </div>
  );
}
