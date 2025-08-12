import { Helmet } from "react-helmet";

const RouteElementWithTitle = ({ element, title = "" }) => {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Zeit Blast` : `Zeit Blast`}</title>
      </Helmet>
      {element}
    </>
  );
};

export default RouteElementWithTitle;
