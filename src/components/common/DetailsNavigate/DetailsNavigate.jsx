import { Logo , zeitBlast_logoA } from "@/assets/images";
import { DetailNav } from "./style";

const DetailsNavigate = ({ data, pageHeading }) => {
  return (
    <DetailNav>
      <div className="detail-navigation">
        <center>
          <img src={zeitBlast_logoA} alt="logo" />
        </center>
        {pageHeading && <h1>{pageHeading}</h1>}
        <div>
          {data?.map((ls, index) => {
            const { title, lists } = ls;
            return (
              <div
                id={title}
                key={index}
                className="detail-navigation-container"
              >
                <h2>{title}</h2>
                {lists?.map((lst, lstIndex) => {
                  const { title } = lst;
                  return (
                    <div key={lstIndex}>
                      <p
                        dangerouslySetInnerHTML={{ __html: title }}
                        className="detail-navigation-container-list-pr"
                      ></p>
                      <div>
                        {lst?.subList?.map((subList, subListIndex) => {
                          const checkList = subList.slice(0, 4);
                          return (
                            <>
                              {checkList.includes(index) ? (
                                <ol
                                  style={{ listStyle: "none" }}
                                  key={subListIndex}
                                  className="detail-navigation-container-list-ul"
                                >
                                  <li
                                    dangerouslySetInnerHTML={{
                                      __html: subList,
                                    }}
                                    className="detail-navigation-container-list-pr"
                                  ></li>
                                </ol>
                              ) : (
                                <ul
                                  key={subListIndex}
                                  className="detail-navigation-container-list-ul"
                                >
                                  <li
                                    className="detail-navigation-container-list-pr"
                                    dangerouslySetInnerHTML={{
                                      __html: subList,
                                    }}
                                  ></li>
                                </ul>
                              )}
                            </>
                          );
                        })}
                      </div>
                      {lst?.description && (
                        <p className="detail-navigation-container-list-pr">
                          {lst?.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </DetailNav>
  );
};
export default DetailsNavigate;
