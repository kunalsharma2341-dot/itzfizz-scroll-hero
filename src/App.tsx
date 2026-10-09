import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const metrics = [
  { value: "58%", text: "Increase in pickup point use", color: "lime" },
  { value: "23%", text: "Fewer customer phone calls", color: "blue" },
  { value: "27%", text: "Increase in pickup point use", color: "dark" },
  { value: "40%", text: "Fewer customer phone calls", color: "orange" },
];

export default function App() {
  const root = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".letter", {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.035,
          ease: "power3.out",
        });
        gsap.from(".metric", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          delay: 0.45,
          ease: "power3.out",
        });
        gsap.from(".car-image", { opacity: 0, duration: 1, delay: 0.25 });
        const road = root.current!.querySelector<HTMLElement>(".road")!;
        const car = root.current!.querySelector<HTMLElement>(".car")!;
        const trailEnd = () =>
          (road.clientWidth - car.clientWidth / 2 - 12) / road.clientWidth;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".journey",
            start: "top top",
            end: "+=180%",
            pin: ".hero",
            scrub: 0.75,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        timeline
          .to(
            car,
            {
              x: () => Math.max(0, road.clientWidth - car.clientWidth - 24),
              ease: "none",
              duration: 1,
            },
            0,
          )
          .fromTo(
            ".trail",
            { scaleX: () => (car.clientWidth / 2 + 12) / road.clientWidth },
            { scaleX: trailEnd, ease: "none", duration: 1 },
            0,
          )
          .fromTo(
            ".progress-fill",
            { scaleX: 0 },
            { scaleX: 1, ease: "none", duration: 1 },
            0,
          )
          .to(
            ".road-word",
            { xPercent: -12, opacity: 0.2, ease: "none", duration: 1 },
            0,
          );
      }, root);
      return () => context.revert();
    });
    media.add("(prefers-reduced-motion: reduce)", () => {
      setReduced(true);
      return () => setReduced(false);
    });
    return () => media.revert();
  }, []);

  return (
    <main ref={root}>
      <section className="journey" aria-label="Scroll-driven car animation">
        <div className="hero" id="top">
          <header className="flex items-center justify-between border-b border-black/15">
            <a href="#top" className="brand" aria-label="Itzfizz home">
              itzfizz<span>®</span>
            </a>
            <span className="header-note">
              Scroll to explore <span aria-hidden="true">↓</span>
            </span>
          </header>
          <div className="intro">
            <div className="eyebrow flex justify-between">
              <span>WELCOME TO ITZFIZZ</span>
              <span>SCROLL ↓</span>
            </div>
            <h1 aria-label="Welcome Itzfizz">
              {"WELCOME ITZFIZZ".split("").map((letter, i) => (
                <span
                  className={`letter ${letter === " " ? "space" : ""}`}
                  aria-hidden="true"
                  key={i}
                >
                  {letter === " " ? "\u00a0" : letter}
                </span>
              ))}
            </h1>
          </div>
          <div className="metrics grid grid-cols-2 md:grid-cols-4">
            {metrics.map((metric, i) => (
              <article className={`metric ${metric.color}`} key={i}>
                <div className="flex items-start justify-between">
                  <strong>{metric.value}</strong>
                  <span className="metric-index">0{i + 1} ↗</span>
                </div>
                <p>{metric.text}</p>
              </article>
            ))}
          </div>
          <div className="road" aria-hidden="true">
            <div className="road-lines" />
            <div className="trail" />
            <span className="road-word">ITZFIZZ</span>
            <div className="car">
              <img
                className="car-image"
                src="/car.png"
                alt=""
                width="3981"
                height="1901"
              />
            </div>
            <span className="start-label">START</span>
            <span className="finish-label">FINISH</span>
          </div>
          <div className="hero-footer flex items-center justify-between">
            <span>
              {reduced ? "REDUCED MOTION ENABLED" : "SCROLL DOWN TO DRIVE"}{" "}
              <span aria-hidden="true">↓</span>
            </span>
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
            <span>SCROLL PROGRESS</span>
          </div>
        </div>
      </section>
      <footer className="end-section flex items-center justify-between">
        <span>itzfizz®</span>
        <a className="back-top" href="#top">
          Back to top ↑
        </a>
      </footer>
    </main>
  );
}
