import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import List from "./list";
import FeaturedMedia from "./featured-media";
import matt from "../images/matt.jpg";

const Profile = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get the data of the author.
  const author = state.source.author[post.author];
  // Get a human readable date.
  const date = new Date(post.date);

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, []);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <Headline>
        <HeadlineContent>
          <Action>
            <h2>Hi, I'm Matt</h2>
            <p>
              A Web developer from the Tampa Bay area. I create wonderful
              websites and apps to help bring client ideas to life.
            </p>
            <button>Contact Me</button>
          </Action>
          <img src={matt} alt="Logo" />
        </HeadlineContent>
      </Headline>
      <div>
        <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

        {/* Only display author and date on posts */}
        {data.isPost && (
          <div>
            {author && (
              <StyledLink link={author.link}>
                <Author>
                  By <b>{author.name}</b>
                </Author>
              </StyledLink>
            )}
            <DateWrapper>
              {" "}
              on <b>{date.toDateString()}</b>
            </DateWrapper>
          </div>
        )}
      </div>

      {/* Look at the settings to see if we should include the featured image */}
      {state.theme.featured.showOnPost && (
        <FeaturedMedia id={post.featured_media} />
      )}

      {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
      <Content>
        <Html2React html={post.content.rendered} />
      </Content>
    </Container>
  ) : null;
};

export default connect(Profile);

const Headline = styled.div`
  background-color: #8ccbfc;
  height: 600px;
  width: 100%;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 56%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);

  @media screen and (max-width: 900px) {
    height: 700px;
  }
`;

const HeadlineContent = styled.div`

box-sizing: border-box;
padding: 40px 0;
margin: 0 10%;
display: inline-block;
flex-direction: column;
justify-content: space-around;

@media screen and (max-width: 800px) {
  & {
    width: auto;
  }
}

img {
  width: 32%;
  margin-left: 5.8rem;
  border-radius: 50%;

  @media screen and (max-width: 800px) {
    & {
      width: 75%;
      margin: 30px 0 0 50px;
    }
  }
}

button {
  float: left;
  background-color: #49aeba;
  color: #fff;
    padding: .575rem .95rem;
    letter-spacing: var(--spacing);
    display: inline-block;
    font-weight: 500;
    transition: var(--transition);
    font-size: 1.575rem;
    border: 2px solid transparent;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    border-radius: 10px;
}

button:hover {
  background-color: #86e1ec;
}

p {
  float: left;
  font-size: 1.3rem;
  color: #102a42;
}

h2 {
  color: #102a42;
  font-size: 3.7rem;
  float: left;
  padding-bottom: 0;
  margin-bottom: 0;
  
  @media screen and (max-width: 800px) {
  & {
    font-size: 1.5rem;
  }
}
`;

const Action = styled.div`
  width: 55%;
  margin: 0 30px 0 0;

  @media screen and (max-width: 800px) {
    & {
      width: 100%;
      margin: 0 auto;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 0;
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: rgba(12, 17, 43);
  display: none;
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const Author = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const DateWrapper = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;
  margin: 2% 5%;

  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  .wp-block-column {
    display: inline-block;
    width: 50%;
    @media screen and (max-width: 800px) {
      & {
        width: 75%;
        margin: 5%;
      }
  }
    p {
      padding: 0;
    }

    .wp-block-image {
      width: 500px;

      @media screen and (max-width: 800px) {
        & {
          width: 100%;
        }
    }
  }

  .column-2 {
    width: 30%;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
