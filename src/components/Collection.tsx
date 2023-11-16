import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { HeadersDefaults } from "axios";
import mergeImages from "merge-images";

type SearchSubmitForm = {
  head: string;
  eyes: string;
  mouth: string;
  clothing: string;
  type: string;
  background: string;
};

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
  "Content-Type": string;
  accept: string;
}

const Collection: React.FC = () => {
  const myContainer = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const validationSchema = Yup.object().shape({});

  useEffect(() => {
    setIsLoaded(true);
    console.log("just loadied");
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const button: HTMLButtonElement = document.getElementById(
        "submit"
      ) as HTMLButtonElement;
      button.click();
    }
  }, [isLoaded]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: SearchSubmitForm) => {
    const canvas: HTMLImageElement = document.getElementById(
      "scream"
    ) as HTMLImageElement;
    let fruits: string[] = [
      "/img/layers/background/" + data.background + ".png",
      "/img/layers/clothing/" + data.clothing + ".png",
      "/img/layers/eyes/" + data.eyes + ".png",
      "/img/layers/head/" + data.head + ".png",
      "/img/layers/mouth/" + data.mouth + ".png",
      "/img/layers/type/" + data.type + ".png",
    ];
    mergeImages(fruits).then((b64) => (canvas.src = b64));
  };

  return (
    <section className="ape_playground">
      <h2 className="project_title wow fadeInDown">Collection</h2>
      <div className="container">
        <div className="ape_pg_outr wow fadeInDown">
          <h2 className="sec_title">Chic Playground</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>{serverErrorMessage}</div>
            <div className="ape_img">
              <img
                id="scream"
                width="500"
                src="img_the_scream.jpg"
                alt="The Scream"
              ></img>
            </div>
            <div className="select_options">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="select_outr">
                    <div className="slct_left">
                      <label>Background</label>
                      <select {...register("background")}>
                        <option value="lime">Lime</option>
                        <option value="gray">Gray</option>
                        <option value="pink">Pink</option>
                        <option value="blue">Blue</option>
                        <option value="cosmo">Cosmo</option>
                        <option value="town">Town</option>
                        <option value="space">Space</option>
                        <option value="sun">Sun</option>
                      </select>
                    </div>
                    <div className="slct_right">
                      <h4 className="percent">15.84%</h4>
                    </div>
                    <div className="attribute">Common</div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="select_outr">
                    <div className="slct_left">
                      <label>Type</label>
                      <select {...register("type")}>
                        <option value="brown">Brown</option>
                        <option value="gold">Gold</option>
                        <option value="white">White</option>
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                        <option value="solana">Solana</option>
                      </select>
                    </div>
                    <div className="slct_right">
                      <h4 className="percent">9.18%</h4>
                      <div className="attribute">Common</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="select_outr">
                    <div className="slct_left">
                      <label>Clothing</label>
                      <select {...register("clothing")}>
                        <option value="none">None</option>
                        <option value="ying_yang">Ying Yang</option>
                        <option value="orange_cosmo">Orange Cosmo</option>
                        <option value="green_cosmo">Green Cosmo</option>
                        <option value="eclipse_suit">Eclipse Suit</option>
                        <option value="sun_suit">Sun Suit</option>
                        <option value="commander">Commander</option>
                        <option value="warrior">Warrior</option>
                        <option value="winter_suit">Winter Suit</option>
                        <option value="moon_suit">Moon Suit</option>
                        <option value="neptune_suit">Neptune Suit</option>
                        <option value="captain_aperica">Captain Aperica</option>
                      </select>
                    </div>
                    <div className="slct_right">
                      <h4 className="percent">3.06%</h4>
                      <div className="attribute">Common</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="select_outr">
                    <div className="slct_left">
                      <label>Mouth</label>
                      <select {...register("mouth")}>
                        <option value="normal">Normal</option>
                        <option value="cigar">Cigar</option>
                        <option value="pipe">Pipe</option>
                        <option value="bubblegum">Bubblegum</option>
                      </select>
                    </div>
                    <div className="slct_right">
                      <h4 className="percent">38.43%</h4>
                      <div className="attribute">Common</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="select_outr">
                    <div className="slct_left">
                      <label>Eyes</label>
                      <select {...register("eyes")}>
                        <option value="normal">Normal</option>
                        <option value="moon_glasses">Moon Glasses</option>
                        <option value="cyborg">Cyborg</option>
                        <option value="one_eyed">One-eyed</option>
                        <option value="sunglasses">Sunglasses</option>
                        <option value="third_eye">Third Eye</option>
                        <option value="cyclops_visor">Cyclops Visor</option>
                      </select>
                    </div>
                    <div className="slct_right">
                      <h4 className="percent">36.90%</h4>
                      <div className="attribute">Common</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="select_outr">
                    <div className="slct_left">
                      <label>Head</label>
                      <select {...register("head")}>
                        <option value="none">None</option>
                        <option value="blue_cap">Blue Cap</option>
                        <option value="black_cap">Black Cap</option>
                        <option value="moon_hat">Moon Hat</option>
                        <option value="eyes">Eyes</option>
                        <option value="captain_hat">Captain Hat</option>
                        <option value="purple_mohawk">Purple Mohawk</option>
                        <option value="horns">Horns</option>
                        <option value="red_mohawk">Red Mohawk</option>
                        <option value="band">Band</option>
                        <option value="unicorn">Unicorn</option>
                        <option value="slime">Slime</option>
                        <option value="among_apes">Among Apes</option>
                        <option value="ape_wars">Ape Wars</option>
                      </select>
                    </div>
                    <div className="slct_right">
                      <h4 className="percent">18.09%</h4>
                      <div className="attribute">Common</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="connect_wallet">
              <button id="submit" type="submit" className="cstm_btn">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Collection;
