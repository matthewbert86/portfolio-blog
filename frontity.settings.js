const settings = {
  name: "portfolio-blog",
  state: {
    frontity: {
      url: "https://test.frontity.org",
      title: "Matthew Bert",
      description: "Full Stack Web Developer"
    }
  },
  packages: [
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          menu: [
            ["Home", "/"],
            ["Blog", "/blog/"],
            ["Portfolio", "/portfolio/"],
            ["Contact", "/contact/"]
          ],
          featured: {
            showOnList: true,
            showOnPost: true
          },
          autoPrefetch: "hover"
        }
      }
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          api:
            "https://matthewbert-60854f.ingress-comporellon.easywp.com/wp-json",
          homepage: "/profile/",
          postsPage: "/blog/",
          portfolio: "/portfolio/"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "frontity-contact-form-7"
  ]
};

export default settings;
