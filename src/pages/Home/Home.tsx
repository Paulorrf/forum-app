import { Link } from "react-router-dom";

import { Container, List, ListItem } from "./Home.style";

const Home = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <Link to="/posts/general-discussion">General Discussion</Link>
        </ListItem>
        <ListItem>
          <Link to="/posts/off-topic">Off Topic</Link>
        </ListItem>

        <ListItem>
          <Link to="/posts/lore">Lore</Link>
        </ListItem>

        <ListItem>
          <Link to="/posts/questions">Q&A Questions</Link>
        </ListItem>
      </List>
    </Container>
  );
};

export default Home;
