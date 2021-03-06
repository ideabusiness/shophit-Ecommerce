import React, { useEffect } from "react";
// import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col } from "react-bootstrap";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";

const Home = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => {
    return state.productList;
  });

  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <Meta />
      <h1>Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default Home;
