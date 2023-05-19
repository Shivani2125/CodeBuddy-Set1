import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

function Posts() {
  const [posts, setPosts] = useState([]);

  const columnsPerRow = 3;

  useEffect(() => {
    fetch('https://codebuddy.review/posts')
      .then(response => response.json())
      .then(data => {
        console.log('Get Data: ', data.data.posts);
        setPosts(data.data.posts);
        console.log('Get Data Post: ', posts);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const displayCards = () => {
    const items = posts.map(p => (
      <>
        <Col>
          <Card style={{ width: '18rem' }} key={p.id}>
            <Card.Img variant="top" src={`${p.image}`} />
            <Card.Body>
              <Card.Title>{`${p.firstName} ${p.lastName}`}</Card.Title>
              <Card.Text>{p.writeup}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </>
    ));

    return items;
  };

  return (
    <>
      <Container>
        <Row xs={1} md={columnsPerRow}>
          {displayCards()}
        </Row>
      </Container>
    </>
  );
}

export default Posts;
