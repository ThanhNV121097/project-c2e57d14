import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { tours, yen } from "./directions-data";
import "./directions.css";

const Mark = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M1 5h16M3.5 5v11M14.5 5v11M1 2.2 9 1l8 1.2" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

/** Direction 3 — "Nothing listed we haven't checked". No hero photograph: a
 *  hairline register with oversized tabular prices, one vertical picture band. */
export default function Directions3() {
  return (
    <div className="d3">
      <div className="d3__main">
        <div className="d3__bar">
          <span className="d3__mark">
            <span style={{ color: "#6FD3A6" }}><Mark /></span>
            Tabimarket
          </span>
          <nav className="d3__barlinks">
            <span>Register</span>
            <span>How approval works</span>
            <span>List your tours</span>
            <span>Sign in</span>
          </nav>
        </div>

        <div className="d3__head">
          <div>
            <p className="d3__kicker rise">
              <ShieldCheck size={13} strokeWidth={1.7} />
              Every listing read by a person before it goes up
            </p>
            <h1 className="d3__h1 rise" style={{ animationDelay: "60ms" }}>
              Nothing is listed here we haven&rsquo;t checked.
            </h1>
            <p className="d3__sub rise" style={{ animationDelay: "120ms" }}>
              Full-day tours in Japan, each submitted by its operator with four photographs,
              approved or sent back with a reason. Prices are per person, paid by card.
            </p>
          </div>
          <div className="d3__counts rise" style={{ animationDelay: "160ms" }}>
            <p className="d3__count">5</p>
            <p className="d3__countlab">Approved today</p>
          </div>
        </div>

        <div className="d3__reg">
          <div className="d3__rhead">
            <span>No.</span>
            <span>Place</span>
            <span>Tour</span>
            <span>Operator</span>
            <span style={{ textAlign: "right" }}>Per person</span>
          </div>
          {tours.map((t, i) => (
            <article className="d3__row rise" key={t.id} style={{ animationDelay: `${180 + i * 60}ms` }}>
              <span className="d3__idx">{t.id}</span>
              <span className="d3__place">{t.place}</span>
              <span>
                <span className="d3__name">{t.name}</span>
              </span>
              <span className="d3__op">
                <Check size={13} strokeWidth={2} />
                {t.operator}
              </span>
              <span>
                <span className="d3__amount">{yen(t.price)}</span>
                <span className="d3__per">{t.hours}</span>
              </span>
            </article>
          ))}
        </div>

        <div className="d3__foot">
          <span className="d3__footnote">
            <ShieldCheck size={15} strokeWidth={1.6} />
            Rejected listings never reach this page. Operators are told why.
          </span>
          <button className="d3__button" type="button">
            Choose your dates
            <ArrowRight size={15} strokeWidth={1.7} />
          </button>
        </div>
      </div>

      <div className="d3__band">
        <img src="/images/fuji-sunrise.jpg" alt="Mount Fuji at sunrise from the Five Lakes" />
        <span className="d3__bandlab">Approved · Mount Fuji · Asagiri Tours</span>
      </div>

      <span className="dtag">Direction 3 — Nothing listed we haven&rsquo;t checked</span>
    </div>
  );
}
