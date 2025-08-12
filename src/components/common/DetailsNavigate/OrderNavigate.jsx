import { Logo , zeitBlast_logoA } from "@/assets/images";
import { DetailNav } from "./style";
import { OrderNavigateStyle } from "./style";

const OrderNavigate = ({ data, pageHeading }) => {
  return (
    <>
      <OrderNavigateStyle>
        <div>
          <center>
            <img src={zeitBlast_logoA} alt="logo" />
          </center>
          {pageHeading && <h1>{pageHeading}</h1>}
          <div className="orderNavigate-data">
            {data.map((item, index) => (
              <>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>

                  {item.lists.map((item, index) => (
                    <>
                      <div className="orderNavigate-data-list" key={index}>
                        <p>
                          <span>{index + 1}</span>
                          <b>{item.title}</b>

                          {item.text}
                        </p>
                      </div>
                      {item.list &&
                        item.list.map((el, indexsub) => (
                          <div
                            key={indexsub}
                            className="orderNavigate-data-list-sublist"
                          >
                            <p>
                              <span>{indexsub + 1}</span>
                              <b>{el.title}</b>
                              {el.text}
                            </p>
                          </div>
                        ))}
                    </>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </OrderNavigateStyle>
    </>
  );
};

export default OrderNavigate;
