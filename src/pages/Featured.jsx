import FeaturedProducts from "../components/FeaturedProducts";

export default function Featured() {
  return (
    <div className="main-content">
      <div className="banner">
        <div className="content">
          <h1>
            <strong>Featured Products</strong>
          </h1>
        </div>
        <div className="banner-img-wrapper">
          <img
            className="banner-img"
            src="/images/banner-guy-featured.png"
            alt=""
          />
        </div>
      </div>
      <div className="display">
        <FeaturedProducts></FeaturedProducts>
      </div>
    </div>
  );
}
