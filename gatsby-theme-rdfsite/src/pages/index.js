import { Link, navigate, useStaticQuery } from 'gatsby';
import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import ContactForm from '../components/contact';
import Layout from '../components/layout';
import News from '../components/news';
import SEO from '../components/seo';
import SideMenu from '../components/sidemenu';
import Social from '../components/social';

export default function Home() {
  const heroRef = React.createRef();
  const fundedRef = React.createRef();
  const newsRef = React.createRef();
  const tweetsRef = React.createRef();
  const contactRef = React.createRef();

  const {
    site: { siteMetadata: site },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const menu = [
    { target: heroRef, title: 'About', url: 'about' },
    { target: fundedRef, title: 'Funded by', url: 'funded' },
    { target: tweetsRef, title: 'Latest tweets', url: 'tweets' },
    { target: newsRef, title: 'News', url: 'news' },
    { target: contactRef, title: 'Contact us', url: 'contact' },
  ];

  return (
    <Layout withContainer={false}>
      <SEO title="Home" />

      <SideMenu targets={menu} />
      <Social />

      <section id="about" className="hero hero-row is-medium" ref={heroRef}>
        <div className="hero-body">
          <div className="container content">
            <h1 className="title">Welcome to {site.title}</h1>
            <p className="hero-text">{site.description}</p>
            <button onClick={() => navigate('/news/')} className="button is-link action-button">
              Learn more
            </button>
          </div>
        </div>
      </section>

      <section id="funded" className="hero has-background-light is-medium" ref={fundedRef}>
        <div className="hero-body">
          <div className="container content">
            <div className="section-header">
              <h1 className="title">Custom area</h1>
            </div>

            <div className="research-areas-list">
              <div className="research-area-item research-area-rep">Some</div>
              <div className="research-area-item research-area-cnm">Custom</div>
              <div className="research-area-item research-area-op">Content</div>
              <div className="research-area-item research-area-expl">Here</div>
            </div>
          </div>
        </div>
      </section>

      <section id="tweets" className="hero has-background-white is-medium" ref={tweetsRef}>
        <div className="hero-body">
          <div className="container content">
            <div className="section-header">
              <h1 className="title">Latest tweets</h1>
              <a className="link-more" href="https://twitter.com/knowgraphs">
                Follow →
              </a>
            </div>

            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="KnowGraphs"
              noFooter
              noHeader
              noScrollbar
              autoHeight
              options={{ tweetLimit: 3, dnt: true }}
            />
          </div>
        </div>
      </section>

      <section id="news" className="hero has-background-light is-medium" ref={newsRef}>
        <div className="hero-body">
          <div className="container content">
            <div className="section-header">
              <h1 className="title">News</h1>
              <Link className="link-more" to="/news/">
                More news →
              </Link>
            </div>

            <News paginate={false} />
          </div>
        </div>
      </section>

      <section id="contact" className="hero has-background-white is-medium" ref={contactRef}>
        <div className="hero-body">
          <div className="container contact-section">
            <div className="section-header">
              <h1 className="title">Contact us</h1>
              <Link className="link-more" to="/contact/">
                More contact information →
              </Link>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
