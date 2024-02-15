import React from "react";
interface Iprops {
  heading: string;
  color: string;
}

const Header: React.FC<Iprops> = (props) => {
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <p className={`h3  ${props.color}`}>{props.heading} </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              quaerat dolor magnam, veniam sequi sint, nulla in, consectetur
              distinctio blanditiis voluptatum perferendis et ea sed obcaecati.
              Unde dolorem praesentium sit veniam cumque.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
