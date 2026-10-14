// Ported from kavish3D-Portofolio (MIT, (c) Rajesh Chityal)
import type { PropsWithChildren } from "react";
import "./styles/Landing.css";
import NameMarquee from "./NameMarquee";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-info">
            <div className="landing-arrow">↘</div>
            <h2>
              <span>Designer & Developer</span>
            </h2>
          </div>
        </div>

        {/* Card lives directly in .landing-section so left:0 = true screen edge */}
        <div className="location-card">
          <div className="location-text">
            <span>Located</span>
            <span>in</span>
            <span>India</span>
          </div>
          <div className="location-globe">
            <div className="digital-ball">
              <div className="overlay"></div>
              <div className="globe">
                <div className="globe-wrap">
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle-hor"></div>
                  <div className="circle-hor-middle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {children}
        <NameMarquee />
      </div>
    </>
  );
};

export default Landing;
