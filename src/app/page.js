export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>Anil Chitrapu</h1>
        <h2>Product Manager</h2>
        <p className="tagline">
          I enable teams to build impactful products that drive engagement and growth.
        </p>
        <div className="social">
          <a href="https://github.com/anilchitrapu" aria-label="GitHub">GitHub</a>
          <a href="https://www.linkedin.com/in/anilchitrapu" aria-label="LinkedIn">LinkedIn</a>
          <a href="https://x.com/anilchitrapu" aria-label="X">X</a>
          <a href="https://www.instagram.com/anilchitrapu" aria-label="Instagram">Instagram</a>
          <a href="https://www.facebook.com/anilcmusic" aria-label="Facebook">Facebook</a>
        </div>
      </header>

      <section className="about">
        <p>
          For as long as I can remember, I have been fascinated with learning how successful businesses find product-market fit and subsequent growth. 
          In my younger years, I taught myself Photoshop, SQL, AfterEffects, Final Cut, Logic, and more to bootstrap various side projects. 
          Since graduating in 2016, I have been fortunate to work directly on consumer-facing products and drive growth through user-centric product management.
        </p>
        <p>
          My main focus these days is building new products and features at The New York Times. I work as a product manager on Wirecutter, NYT's commerce arm, 
          as we seek to expand out our user base and improve the ways we provide the best recommendations to people.
        </p>
        <p>
          Before NYT, I worked on building features for Condé Nast's frontend application. We enabled Vogue, The New Yorker, WIRED, and 60+ other brands 
          across dozens of regions to ship features that let users have more engaging interactions with these online publications. 
          I particularly enjoyed working on products that are extensible to all brands, as this made the payoff far outweigh the complexity of solving for multiple tenants.
        </p>
        <p>
          Prior to that, I worked in growth at SeatGeek focused on user acquisition. I built out their paid social, display, and programmatic marketing portfolio 
          into $10M+ annualized revenue across user acquisition and retargeting.
        </p>
        <p>
          When I'm not at the computer, I'm usually running around McCarren Park, practicing Carnatic music, hanging out with my fiancé, 
          or stressing over the latest Arsenal/Eagles/Sixers game.
        </p>
      </section>

      <section className="experience">
        <h2>Experience</h2>
        
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
            <p className="period">2021 – PRESENT</p>
            <p>
              Responsible for the design system and content rendering engine for Condé Nast's 67 brand sites across 32 global markets. 
              Leading a distributed team of 7 engineers and 1 designer.
            </p>
            <div className="skills">
              <span className="tag">JIRA</span>
              <span className="tag">TypeScript</span>
              <span className="tag">GitHub</span>
              <span className="tag">Splunk</span>
              <span className="tag">Databricks</span>
              <span className="tag">Storybook</span>
            </div>
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
            <div className="skills">
              <span className="tag">Megaphone</span>
              <span className="tag">Chartable</span>
              <span className="tag">Databricks</span>
            </div>
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
            <div className="skills">
              <span className="tag">FBAM</span>
              <span className="tag">Looker</span>
              <span className="tag">SQL</span>
              <span className="tag">Google Analytics</span>
              <span className="tag">GAM</span>
            </div>
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
            <div className="skills">
              <span className="tag">Shopify</span>
              <span className="tag">Airtable</span>
              <span className="tag">Triple Whale</span>
            </div>
          </div>
        </div>
        
        <div className="project">
          <div className="item-image">
            <img 
              src="https://framerusercontent.com/images/TMVZAAEp5lvZkArw6zqGtJHc2zs.jpg" 
              alt="Penn Masala" 
              className="project-image"
            />
          </div>
          <div className="item-content">
            <h3>Marketing Director · Penn Masala</h3>
            <p>
              Led marketing strategy and growth for the band Penn Masala, a South Asian fusion music group. 
              We built out an engaged online audience of over 430k and executed on multiple marketing strategies that resulted in 
              11M+ views across channels, PR hits from WSJ, HuffPo, and CNN, and performances at an international awards show and Pitch Perfect 2.
            </p>
            <div className="skills">
              <span className="tag">YouTube Studio</span>
              <span className="tag">Final Cut Pro</span>
              <span className="tag">Photoshop</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 