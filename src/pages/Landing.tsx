import React, { useEffect, useState } from "react";

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <>
      {loading === false ? (
        <section className="landing_page">
          <a href="/home" className="cstm_btn">
            Enter
          </a>
        </section>
      ) : (
        <div id="preloader">
          <img src="img/land_loader.png" alt="Logo Image" />
        </div>
      )}
    </>
  );
};

export default Landing;
