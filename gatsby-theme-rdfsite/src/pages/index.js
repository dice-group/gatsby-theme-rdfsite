import { graphql, Link, navigate, useStaticQuery } from 'gatsby';
import React from 'react';
import ContactForm from '../components/contact';
import CustomSection from '../components/customSection';
import Layout from '../components/layout';
import News from '../components/news';
import SEO from '../components/seo';
import SideMenu from '../components/sidemenu';
import Social from '../components/social';
import TwitterFeed from '../components/twitterFeed';

export default function Home() {
  const heroRef = React.createRef();
  const customRef = React.createRef();
  const newsRef = React.createRef();
  const tweetsRef = React.createRef();
  const contactRef = React.createRef();

  const {
    site: { siteMetadata: site }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            headline
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  let menu = [
    { target: heroRef, title: 'About', url: 'about' },
    { target: customRef, title: 'Custom area', url: 'custom' },
    { target: tweetsRef, title: 'Latest tweets', url: 'tweets' },
    { target: newsRef, title: 'News', url: 'news' },
    { target: contactRef, title: 'Contact us', url: 'contact' }
  ];

  if (site.description && site.description.length > 0) {
    menu = [{ target: heroRef, title: 'About', url: 'about' }, ...menu];
  }

  return (
    <Layout withContainer={false}>
      <SEO title="Home" />

      <SideMenu targets={menu} style={{ margin: 'auto' }} />
      <Social style={{ maxWidth: 40, margin: 'auto' }} />

      {site.description && site.description.length > 0 && (
        <section id="about" className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title" ref={heroRef}>
                {site.headline || `Welcome to ${site.title}`}
              </h1>
              <p className="hero-text">{site.description}</p>
              <button
                onClick={() => navigate('/news/')}
                className="action-button"
              >
                Learn more
            </button>
            </div>
          </div>
        </section>)}

      <section id="custom" className="hero has-background-light">
        <CustomSection ref={customRef} />
      </section>

      <section id="tweets" className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="section-header">
              <h1 className="title" ref={tweetsRef}>
                Latest tweets
              </h1>
              <a className="link-more" href={site.social.twitter}>
                Follow →
              </a>
            </div>

            <TwitterFeed screenName={site.social.twitter.split('/').pop()} />
          </div>
        </div>
      </section>

      <section id="news" className="hero has-background-light">
        <div className="hero-body">
          <div className="container">
            <div className="section-header">
              <h1 className="title" ref={newsRef}>
                News
              </h1>
              <Link className="link-more" to="/news/">
                More news →
              </Link>
            </div>

            <News paginate={false} />
          </div>
        </div>
      </section>

      <section id="contact" className="hero">
        <div className="hero-body">
          <div className="container contact-section">
            <div className="section-header">
              <h1 className="title" ref={contactRef}>
                Contact us
              </h1>
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
