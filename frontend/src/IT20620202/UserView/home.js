import React from "react";
import { Header } from "./componenent/header";
import styled from "styled-components";

import home from "../UserView/images/Homepage1.jpg"
import home2 from "../UserView/images/Hope1.png"

export default function HomePage() {
  const HeroWrapper = styled.section`
    background: url(${home});
    height: calc(100vh - 93px);
    width: 100%;
    background-size: cover;
  `;
  return (
    <section>
      <Header />
      <HeroWrapper>

      </HeroWrapper>

      <section className="lg:px-20 py-10">
        <div className="container mx-auto">
          <h2 className="mt-1 mb-10 text-4xl text-center font-bold text-black">
            Donate A Hope With Us

          </h2>
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 text-center mt-6 p-5">
            <div className="bg-white">
              <div className="shadow-xl rounded-lg">
                <img
                  className="object-cover h-full w-full rounded-t-lg"

                  src={home}

              

                  alt=""
                />
                <div className="p-5">
                  <h5 className="text-2xl font-semibold mb-4">Access</h5>
                  <p className="card-text h-20">
                    Choose your parking spaces and access your bookings from
                    anywhere, at any time, around the world
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white">
              <div className="shadow-xl rounded-lg">
                <img
                  className="object-cover h-full w-full rounded-t-lg"

                  src={home2}


                  alt="Card images cap"
                />
                <div className="p-5">
                  <h5 className="text-2xl font-semibold mb-4">Convenience</h5>
                  <p className="card-text h-20">
                    Choose and pay for Parkfinda parking spaces through the app,
                    website or by simply calling “Call to Park’
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white">
              <div className="shadow-xl rounded-lg">
                <img
                  className="object-cover h-full w-full rounded-t-lg"

                  src={home2}

                  alt="Card images cap"
                />
                <div className="p-5">
                  <h5 className="text-2xl font-semibold mb-4">Options</h5>
                  <p className="card-text h-20">
                    Book your space in advance through &ldquo;Park Later&ldquo;
                    or &ldquo;Park Now&ldquo; when you arrive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
