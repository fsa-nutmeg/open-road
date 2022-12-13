import OpenRoadLogo from "../OpenRoadLogo.png";

const Home = () => {
  return (
    <>
      <img
        className="background"
        src="https://www.mensjournal.com/wp-content/uploads/2018/07/Americas.jpg?quality=86&strip=all"
        alt="Open Road"
      />

      <div style={styles.title} className="header">
        <img src={OpenRoadLogo} alt="Open Road" className="logo2" />
        <p className="text-10xl">PEN ROAD</p>
      </div>
    </>
  );
};

const styles = {
  block: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: "#1f2937",
    borderBottom: "1px solid rgba(255,255,255,.2)",
  },
  title: {
    textAlign: "center",
    fontSize: 90,
    color: "#fff",
    fontFamily: "Lato, sans-serif",
    fontWeight: "bold",
  },
};

export default Home;
