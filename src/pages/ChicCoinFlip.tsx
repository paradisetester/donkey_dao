import React from "react";

export interface IChicCoinFlipPageProps {}

const ChicCoinFlipPage: React.FunctionComponent<IChicCoinFlipPageProps> = (
  props
) => {
  return (
    <main>
      <section className="single_project">
        <div className="container">
          <h2 className="project_title wow fadeInDown">Chic Coinflip</h2>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 wow slideInLeft">
              <img src="img/cheetah3.jpg" alt="Image" />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 wow slideInRight">
              <p>
                Double or nothing. Chic Coinflip will be the first game in the
                Chic Casino ecosystem. Chic Coinflip will not only function as
                the place to be on the Algorand blockchain, but will also help
                fund the DAO. This is done by taking a small % on payouts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChicCoinFlipPage;
