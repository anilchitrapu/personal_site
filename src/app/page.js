export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>Anil Chitrapu</h1>
        <h2>Product Manager</h2>
        <p className="tagline">
          I build products that meaningfully scale engagement and revenue – leading teams to deliver features used by millions and pioneering AI-driven experiences that transform workflows.
        </p>
        <div className="social">
          <a href="https://github.com/anilchitrapu" aria-label="GitHub" title="GitHub">
            <img alt="GitHub" src="https://cdn.simpleicons.org/github" width="24" height="24" />
          </a>
          <a href="https://www.linkedin.com/in/anilchitrapu" aria-label="LinkedIn" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
            </svg>
          </a>
          <a href="https://x.com/anilchitrapu" aria-label="X" title="X (Twitter)">
            <img alt="X" src="https://cdn.simpleicons.org/x" width="24" height="24" />
          </a>
        </div>
      </header>

      <section className="about">
        <p>
          I’m a Senior Product Manager at The New York Times (Wirecutter), where I drive growth by building impactful, user-centric products. My work spans AI features, personalization, newsletter growth, and more traditional growth initiatives that not only expand audience reach but also generate millions in commerce revenue. I’m particularly focused on AI’s potential in both shipping user-facing features that create tangible, measurable impact as well as 10x-ing internal workflows with advanced tools to ship faster and more frequently.
        </p>
        <p>
          Previously at Condé Nast, I scaled the design system and frontend platform powering 67 global brand sites - from Vogue to The New Yorker - leading teams that delivered extensible, high-impact solutions across dozens of markets. Earlier at SeatGeek, I built and scaled user acquisition programs that grew into $10M+ annualized revenue.
        </p>
        <p>
          Beyond my current role, I have advised startups on growth strategy, bridging user engagement with scalable marketing systems.
        </p>
        <p>
          Outside of work, you’ll find me running in McCarren Park, practicing Carnatic music, or stressing over the latest Arsenal, Eagles, and Sixers games.
        </p>
      </section>

      <section className="experience">
        <h2>Experience</h2>
        
        <div className="item">
          <div className="item-image">
            <img 
              src="https://cdn.thewirecutter.com/wp-content/media/2024/08/NYT-Wirecutter-Podcast-Trailer-Launch-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024" 
              alt="The New York Times Wirecutter" 
              className="project-image"
            />
          </div>
        <div className="item-content">
          <h3>Senior Product Manager, Growth · NYT Wirecutter</h3>
          <p className="period">June 2024 – Present</p>
          <p>
            Leading growth initiatives for Wirecutter, including building AI-powered frontend applications, driving top-of-funnel user acquisition, optimizing and expanding newsletters, and developing personalized user experiences. I also collaborate closely with New York Times teams on joint features and cross-brand initiatives to maximize impact.
          </p>
        </div>
      </div>

        <div className="item">
          <div className="item-image">
            <img 
              src="https://strapi-bus-eng-prod.s3.amazonaws.com/CN_DI_Report_75574b3cd0.jpg" 
              alt="Condé Nast" 
              className="project-image"
            />
          </div>
        <div className="item-content">
          <h3>Product Manager, Consumer Experiences · Condé Nast</h3>
          <p className="period">2021 – May 2024</p>
          <p>
            Responsible for the design system and content rendering engine for Condé Nast's 67 brand sites across 32 global markets. 
            Leading a distributed team of 7 engineers and 1 designer.
          </p>
        </div>
      </div>

        <div className="item">
          <div className="item-image">
            <img 
              src="https://redtechpro.b-cdn.net/wp-content/uploads/2022/06/Inside-Podcasting-3-Conde-Nast-Studio-A-copy.jpg" 
              alt="Condé Nast Audio" 
              className="project-image"
            />
          </div>
        <div className="item-content">
          <h3>Senior Manager, Growth · Condé Nast</h3>
          <p className="period">2020 – 2021</p>
          <p>
            Led growth, audience development, and analytics for podcasts and narrated audio across all Condé Nast brands.
          </p>
        </div>
      </div>

        <div className="item">
          <div className="item-image">
            <img 
              src="https://www.officelovin.com/wp-content/uploads/2020/01/seatgeek-nyc-office-mm.jpg" 
              alt="SeatGeek" 
              className="project-image"
            />
          </div>
        <div className="item-content">
          <h3>Senior Analyst, Growth Marketing · SeatGeek</h3>
          <p className="period">2017 – 2020</p>
          <p>
            Drove strategy and growth of paid social, display, and programmatic marketing across acquisition and retargeting objectives.
          </p>
        </div>
      </div>

        <div className="resume-link">
          <a href="https://drive.google.com/file/d/1EmPKpXSk6yHBAxmeR1PROx0BjkEZyMRN/view?usp=sharing">View Resumé</a>
        </div>
      </section>

      <section className="projects">
        <h2>Projects</h2>
        
        <div className="project">
          <div className="item-image">
            <img 
              src="https://framerusercontent.com/images/76GiSHhbknw0nesjh9UaICRqlHI.webp" 
              alt="Therapy Notebooks" 
              className="project-image"
            />
          </div>
          <div className="item-content">
            <h3>Growth Advisor · Therapy Notebooks</h3>
            <p>
              Guided mental health notebooks made by expert therapists and backed by research. 
              Advising on growth, influencer, and paid media strategy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 
