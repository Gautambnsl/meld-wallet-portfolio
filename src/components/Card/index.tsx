/* eslint-disable @typescript-eslint/no-explicit-any */
const Card = ({ title, children }: any) => (
  <div className="card">
    <p className="title">{title}</p>
    <div className="card-stat">{children}</div>
  </div>
);

export default Card;
