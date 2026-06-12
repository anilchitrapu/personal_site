import LocalTime from "./components/LocalTime";

const experience = [
  {
    role: "Senior Product Manager, Wirecutter",
    org: "The New York Times",
    url: "https://www.nytimes.com/wirecutter",
    period: "2024 – 2025",
    blurb: (
      <>
        Worked on growth across AI, experimentation, acquisition, and
        community. Shipped{" "}
        <a href="https://theaudiencers.com/how-nyt-wirecutter-shipped-a-personalized-newsletter-in-4-weeks/">
          Wirecutter For You
        </a>
        , the brand's first personalized newsletter, on an ML recommendation
        engine built in four weeks. Also launched chapter navigation across
        every review, recovered millions in annual search revenue, and brought
        Wirecutter onto the NYT Community platform.
      </>
    ),
  },
  {
    role: "Product Manager, Consumer Experiences",
    org: "Condé Nast",
    url: "https://www.condenast.com/",
    period: "2021 – 2024",
    blurb:
      "Owned the design system and content rendering engine behind 67 brand sites in 32 markets, Vogue and The New Yorker included. Led a distributed team of seven engineers and a designer.",
  },
  {
    role: "Senior Manager, Growth",
    org: "Condé Nast",
    url: "https://www.condenast.com/",
    period: "2020 – 2021",
    blurb:
      "Grew podcasts past 12 million monthly downloads and launched five chart-topping series with Vogue, WIRED, and Pitchfork.",
  },
  {
    role: "Senior Analyst, Growth Marketing",
    org: "SeatGeek",
    url: "https://seatgeek.com",
    period: "2017 – 2020",
    blurb:
      "Scaled paid acquisition from $50K to $1M+ a month and helped grow concerts into the company's biggest event category.",
  },
];

const lab = [
  {
    name: "breathwork",
    url: "/breathwork",
    blurb:
      "A WebGL breathing exercise: one sphere, custom shaders, a 4-7-8 cycle. Built in a weekend with Three.js.",
  },
  {
    name: "Therapy Notebooks",
    url: "https://www.therapynotebooks.com",
    blurb:
      "Growth advisor for guided mental health notebooks designed by therapists and backed by research.",
  },
];

export default function Home() {
  return (
    <div className="page">
      <header className="masthead">
        <h1>
          Anil Chitrapu<span className="cursor" aria-hidden="true" />
        </h1>
        <p className="role mono">product manager · apple news · new york</p>
        <p className="intro">
          I am a product manager for{" "}
          <a href="https://www.apple.com/apple-news/">Apple News</a>, getting
          great journalism in front of millions of readers. Before that I spent
          nine years building and growing products at The New York Times, Condé
          Nast, and SeatGeek. I work on and with AI: shipping features that put
          it in people's hands and using it to make teams faster.
        </p>
      </header>

      <section className="row">
        <h2 className="mono label">01 / now</h2>
        <div className="row-body">
          <p>
            At Apple, I work across news, sports, audio, food, and puzzles,
            bringing great journalism and experiences to millions of people
            around the world. My focus spans AI, growth, infrastructure, and
            analytics: taking journalism seriously as a product, then sweating
            the details until it feels effortless.
          </p>
        </div>
      </section>

      <section className="row">
        <h2 className="mono label">02 / before</h2>
        <div className="row-body">
          <ol className="timeline">
            {experience.map((job) => (
              <li key={`${job.org}-${job.role}`} className="entry">
                <div className="entry-head">
                  <h3>{job.role}</h3>
                  <span className="mono period">{job.period}</span>
                </div>
                <p className="mono org">
                  <a href={job.url}>{job.org}</a>
                </p>
                <p className="blurb">{job.blurb}</p>
              </li>
            ))}
          </ol>
          <p className="mono resume">
            <a href="https://drive.google.com/file/d/1d5WMImrpO66rsiQ7gQPctbGUKuTCHLuf/view?usp=sharing">
              full resume ↗
            </a>
          </p>
        </div>
      </section>

      <section className="row">
        <h2 className="mono label">03 / other work</h2>
        <div className="row-body">
          <ul className="lab-list">
            {lab.map((item) => (
              <li key={item.name} className="entry">
                <h3>
                  <a href={item.url}>{item.name}</a>
                </h3>
                <p className="blurb">{item.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="row">
        <h2 className="mono label">04 / about me</h2>
        <div className="row-body">
          <p>
            You can find me running loops around McCarren Park, practicing
            Carnatic music, and feeling personally responsible for Arsenal,
            Eagles, and Sixers results.
          </p>
        </div>
      </section>

      <footer className="footer mono">
        <nav className="footer-links" aria-label="Social links">
          <a href="https://github.com/anilchitrapu">github</a>
          <a href="https://www.linkedin.com/in/anilchitrapu">linkedin</a>
          <a href="https://x.com/anilchitrapu">x</a>
        </nav>
        <LocalTime />
      </footer>
    </div>
  );
}
