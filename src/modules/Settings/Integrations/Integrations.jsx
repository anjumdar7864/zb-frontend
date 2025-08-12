import React, { useState, useEffect } from "react";
import {
  CreateNewModalStyled,
  IntegrationStyleMain,
  ZapireModelStyle,
} from "./styles";
import { IntegrationCard } from "./components";
import Assets from "../../../assets";
import Components from "@/components";
import { IoClose } from "react-icons/io5";
import {
  getConnectedCrm,
  clearErrors,
  clearMessages,
  connectCrm,
  changeCrmStatus,
} from "./../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const Integrations = () => {
  const dispatch = useDispatch();
  const {
    connectedCrm,
    message,
    errors: error,
  } = useSelector((state) => state.dncReducer);
  const [isOpenZapirModel, setIsOpenZapirModel] = useState(false);
  const [isOpenRei, setIsOpenRei] = useState(false);
  const [isEditOpenZapirModel, setIsEditOpenZapirModel] = useState(false);
  const [isEditOpenRei, setIsEditOpenRei] = useState(false);

  const [generateApiKeyModal, setGenerateApiKeyModal] = useState(false);
  const [isReiSiftModel, setisReiSiftModel] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [currentTab, setCurrentTab] = useState("integration");

  useEffect(() => {
    dispatch(getConnectedCrm());
  }, []);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [error, message]);

  return (
    <>
      <Components.Common.ModalTop open={isReiSiftModel}>
        <Model
          onClose={() => {
            setisReiSiftModel(false);
            setIsConnected(false);
          }}
          name="Beast Mode Podio"
          icon={Assets.SettingsIcons.rei}
          link=""
          description="Set up Beast Mode Podio Webhook URL as the trigger event when creating the new
          Zap, copy the URL, paste it in the field below and hit the Save
          button. Send leads from Zeit Blast to any CRM or app after connecting
          it on the other end of the Zap."
          background="linear-gradient(119.67deg,#5867DD 0%,#6E7DF6 100%)"
          detail={``}
          inputValue={
            connectedCrm?.beastModePodio === true ? connectedCrm?.link : ""
          }
          isConnected={isConnected}
        />
      </Components.Common.ModalTop>

      <IntegrationStyleMain>
        <div className="grid-section">
          <div className="header">
            <div>
              <h6>Integration</h6>
            </div>
          </div>

          {currentTab == "integration" ? (
            <div className="grid">
              <IntegrationCard
                background="linear-gradient(119.67deg,#FF8A01 0%,#FFAB47 100%)"
                logo={Assets.SettingsIcons.zaiperLogoModel}
                heading="Zapier"
                content="Send your leads from Zeit Blast to any CRM via Zapier webhook."
                connectBtn={connectedCrm?.isZapier === true ? false : true}
                active={connectedCrm?.isZapier}
                onConnect={() => {
                  setIsOpenZapirModel(true);
                  setIsConnected(true);
                }}
                onEdit={() => {
                  setIsEditOpenZapirModel(true);
                  setIsConnected(true);
                }}
                onClick={() => setIsOpenZapirModel(true)}
                activated={
                  connectedCrm?.isZapier && connectedCrm?.isCrmActive
                    ? true
                    : false
                }
                handleDeActive={() =>
                  dispatch(
                    changeCrmStatus({
                      integratedObjectId: connectedCrm?._id,
                      isCrmActive: false,
                    })
                  )
                }
                handleActive={() =>
                  dispatch(
                    changeCrmStatus({
                      integratedObjectId: connectedCrm?._id,
                      isCrmActive: true,
                    })
                  )
                }
                crmActive={connectedCrm?.isCrmActive}
              />
              <IntegrationCard
                background="linear-gradient(119.67deg,#5867DD 0%,#6E7DF6 100%)"
                logo={Assets.SettingsIcons.rei2}
                heading="Beast Mode Podio"
                content="Send your leads to Beast Mode Podio CRM          "
                connectBtn={
                  connectedCrm?.beastModePodio === true ? false : true
                }
                active={connectedCrm?.beastModePodio}
                onConnect={() => {
                  setIsOpenRei(true);
                  setIsConnected(true);
                }}
                onEdit={() => {
                  setIsEditOpenRei(true);
                  setIsConnected(true);
                }}
                onClick={() => setIsOpenRei(true)}
                activated={
                  connectedCrm?.beastModePodio && connectedCrm?.isCrmActive
                    ? true
                    : false
                }
                handleDeActive={() =>
                  dispatch(
                    changeCrmStatus({
                      integratedObjectId: connectedCrm?._id,
                      isCrmActive: false,
                    })
                  )
                }
                handleActive={() =>
                  dispatch(
                    changeCrmStatus({
                      integratedObjectId: connectedCrm?._id,
                      isCrmActive: true,
                    })
                  )
                }
                crmActive={connectedCrm?.isCrmActive}
              />
            </div>
          ) : (
            <>
              <div style={{ flexGrow: 1 }} className="bottom">
                <div className="table">
                  <div
                    className="row"
                    style={{
                      position: "sticky",
                      top: "0px",
                      zIndex: 100,
                      backgroundColor: "white",
                      borderBottom: "1.5px solid #80808052",
                    }}
                  >
                    <h6 className="col sort">
                      <span className="text">API Name</span>
                    </h6>
                    <h6 className="col sort">
                      <span className="text">API ID</span>
                    </h6>
                    <h6 className="col sort">
                      <span className="text">Actions</span>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="top" style={{ paddingTop: 30 }}>
                  <button onClick={() => setGenerateApiKeyModal(true)}>
                    <span
                      className="text"
                      style={{
                        color: "#00BD82",
                        fontSize: "1.3rem",
                        fontWeight: 500,
                        marginLeft: "0.5rem",
                        marginTop: "0.3rem",
                      }}
                    >
                      Generate an API Key
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </IntegrationStyleMain>

      <Components.Common.ModalTop open={isOpenZapirModel} onClose={() => {}}>
        <CreateNewModal
          onClose={() => setIsOpenZapirModel(false)}
          modalOf={"Zapier"}
        />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop open={isOpenRei} onClose={() => {}}>
        <CreateNewModal
          onClose={() => setIsOpenRei(false)}
          modalOf={"Beast Mode Podio"}
        />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop
        open={isEditOpenZapirModel}
        onClose={() => {}}
      >
        <UpdateNewModal
          onClose={() => setIsEditOpenZapirModel(false)}
          modalOf={"Zapier"}
          crmLink={
            connectedCrm?.isZapier && connectedCrm?.isCrmActive
              ? connectedCrm?.link
              : ""
          }
        />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop open={isEditOpenRei} onClose={() => {}}>
        <UpdateNewModal
          onClose={() => setIsEditOpenRei(false)}
          modalOf={"Beast Mode Podio"}
          crmLink={
            connectedCrm?.beastModePodio && connectedCrm?.beastModePodio
              ? connectedCrm?.link
              : ""
          }
        />
      </Components.Common.ModalTop>

      {/* <Components.Common.ModalTop
        open={generateApiKeyModal}
        onClose={() => { }}
      >
        <GenerateApiKey
          onClose={() => setGenerateApiKeyModal(false)}
        />
      </Components.Common.ModalTop> */}
    </>
  );
};

export default Integrations;

const Model = (props) => {
  const { connectedCrm, loading, message } = useSelector(
    (state) => state.dncReducer
  );
  const dispatch = useDispatch();
  const [value, setValue] = useState(props.inputValue);
  const [isLinkVerified, setIsLinkVerified] = useState(false);

  useEffect(() => {
    if (message !== "") {
      props.onClose();
    }
  }, [message]);

  const handleVerifyLink = async (valueLink) => {
    if (!valueLink) {
      toast.error("Link required");
      setIsLinkVerified(false);
      return;
    }

    try {
      new URL(valueLink);
    } catch (_) {
      toast.error("Invalid URL");
      setIsLinkVerified(false);
      return;
    }
    try {
      let bodyResult = { link: value };
      let result = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/inbox/v1/api/inboxList/verify/crm`,
        bodyResult
      );
      if (result.data === "OK") {
        setIsLinkVerified(true);
        toast.success("Link is valid");
      } else {
        toast.error("Link is not valid");
        setIsLinkVerified(false);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else if (error.response) {
        toast.error(
          `Error: ${error.response.status} ${error.response.statusText}`
        );
        setIsLinkVerified(false);
      } else if (error.request) {
        toast.error("No response received from the server");
        setIsLinkVerified(false);
      } else {
        toast.error("Error in setting up the request");
        setIsLinkVerified(false);
      }
    }
  };

  const handleSave = () => {
    // if (props?.isConnected === true) {
    const crmMapping = {
      Zapier: "isZapier",
      "Left Main CRM": "leftMainCri",
      "Beast Mode Podio": "beastModePodio",
      "Forefront CRM": "foreFrontCrm",
      "REI Sift": "reiSift",
    };

    let finalResult = {
      link: value,
      isZapier: false,
      leftMainCri: false,
      beastModePodio: false,
      foreFrontCrm: false,
      reiSift: false,
    };

    const resultKey = crmMapping[props?.name];

    if (resultKey) {
      finalResult[resultKey] = true;
    }
    if (!resultKey) {
      toast.error("At least one true is required");
    }
    dispatch(connectCrm(finalResult));
    // }

    // else {
    //   dispatch(
    //     updateConnectedCrm({
    //       link: value,
    //       integratedObjectId: connectedCrm?._id,
    //     })
    //   );
    // }
  };
  return (
    <ZapireModelStyle>
      <div>
        <IoClose onClick={props.onClose} />
      </div>

      <section>
        <header style={{ backgroundImage: `${props.background}` }}>
          <a href={props.link} target="blank">
            <img src={props.icon} alt="logo" />
          </a>
        </header>

        <center>
          <h6>{props.name}</h6>
        </center>

        <p>{props.description}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: props.detail,
          }}
          style={{ marginTop: "1.7rem" }}
        ></p>

        <div>
          <label htmlFor="">{props.name} Webhook URL</label>
          <section>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={() => handleVerifyLink(value)}>Verify</button>
          </section>
        </div>
      </section>

      <blockquote>
        <button onClick={props.onClose}>Cancel</button>
        <button
          onClick={() => handleSave()}
          disabled={isLinkVerified === true ? false : true || loading}
        >
          {loading ? "..." : "Save"}
        </button>
      </blockquote>
    </ZapireModelStyle>
  );
};

const CreateNewModal = (props) => {
  const { connectedCrm, loading, message } = useSelector(
    (state) => state.dncReducer
  );
  const dispatch = useDispatch();
  const [value, setValue] = useState(props.inputValue);
  const [isLinkVerified, setIsLinkVerified] = useState(false);

  useEffect(() => {
    if (message !== "") {
      props.onClose();
    }
  }, [message]);

  const handleVerifyLink = async (e, valueLink) => {
    e.preventDefault();
    if (!valueLink) {
      toast.error("Link required");
      setIsLinkVerified(false);
      return;
    }

    try {
      new URL(valueLink);
    } catch (_) {
      toast.error("Invalid URL");
      setIsLinkVerified(false);
      return;
    }
    try {
      let bodyResult = { link: value };
      let result = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/inbox/v1/api/inboxList/verify/crm`,
        bodyResult
      );
      if (result.data === "OK") {
        setIsLinkVerified(true);
        toast.success("Link is valid");
      } else {
        toast.error("Link is not valid");
        setIsLinkVerified(false);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else if (error.response) {
        toast.error(
          `Error: ${error.response.status} ${error.response.statusText}`
        );
        setIsLinkVerified(false);
      } else if (error.request) {
        toast.error("No response received from the server");
        setIsLinkVerified(false);
      } else {
        toast.error("Error in setting up the request");
        setIsLinkVerified(false);
      }
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    // if (props?.isConnected === true) {
    const crmMapping = {
      Zapier: "isZapier",
      "Left Main CRM": "leftMainCri",
      "Beast Mode Podio": "beastModePodio",
      "Forefront CRM": "foreFrontCrm",
      "REI Sift": "reiSift",
    };

    let finalResult = {
      link: value,
      isZapier: false,
      leftMainCri: false,
      beastModePodio: false,
      foreFrontCrm: false,
      reiSift: false,
    };

    const resultKey = crmMapping[props?.modalOf];

    if (resultKey) {
      finalResult[resultKey] = true;
    }
    if (!resultKey) {
      return toast.error("At least one true is required");
    }
    dispatch(connectCrm(finalResult));
    // }
    // else {
    //   dispatch(
    //     updateConnectedCrm({
    //       link: value,
    //       integratedObjectId: connectedCrm?._id,
    //     })
    //   );
    // }
  };
  return (
    <CreateNewModalStyled>
      <div
        className="top"
        style={{
          borderBottom: "1px solid #efefef",
          borderRadius: " 12px 12px 0 0 ",
        }}
      >
        <h2>Connect {props?.modalOf}</h2>
        <div
          onClick={(e) => {
            props?.onClose(e);
          }}
          style={{ fontSize: "2rem" }}
        >
          <IoMdClose />
        </div>
      </div>
      <form className="bottom">
        <div className="top">
          <div className="row">
            <label>
              <span className="text">{props?.modalOf} Webhook URL</span>
              <input
                type="text"
                name="name"
                placeholder="Custom webhook"
                // maxLength={21}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {/* {formik.touched.name && formik.errors.name && (
                <p>{formik.errors.name}</p>
              )} */}
            </label>
            <button onClick={(e) => handleVerifyLink(e, value)}>Verify</button>
          </div>
        </div>
        <div
          className="bottom"
          style={{
            borderTop: "1px solid #efefef",
            borderRadius: "0 0 12px 12px ",
            gap: "15px",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              props?.onClose(e);
            }}
            style={{
              border: "solid 1px #777777",
              color: "#777777",
              height: "40px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              width: "100px",
              padding: "0px",
            }}
          >
            Cancel
          </button>
          <button
            // type="submit"
            onClick={(e) => handleSave(e)}
            disabled={isLinkVerified === true ? false : true || loading}
            style={{
              backgroundColor: "#00BD82",
              height: "40px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              width: "100px",
              color: "white",
            }}
          >
            {loading ? "..." : "Save"}
          </button>
        </div>
      </form>
    </CreateNewModalStyled>
  );
};

const UpdateNewModal = (props) => {
  const { loading, message } = useSelector((state) => state.dncReducer);

  const dispatch = useDispatch();
  const [value, setValue] = useState(props?.crmLink);
  const [isLinkVerified, setIsLinkVerified] = useState(false);

  useEffect(() => {
    if (message !== "") {
      props.onClose();
    }
  }, [message]);

  const handleVerifyLink = async (e, valueLink) => {
    e.preventDefault();
    if (!valueLink) {
      toast.error("Link required");
      setIsLinkVerified(false);
      return;
    }

    try {
      new URL(valueLink);
    } catch (_) {
      toast.error("Invalid URL");
      setIsLinkVerified(false);
      return;
    }
    try {
      let bodyResult = { link: value };
      let result = await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }/inbox/v1/api/inboxList/verify/crm`,
        bodyResult
      );
      if (result.data === "OK") {
        setIsLinkVerified(true);
        toast.success("Link is valid");
      } else {
        toast.error("Link is not valid");
        setIsLinkVerified(false);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else if (error.response) {
        toast.error(
          `Error: ${error.response.status} ${error.response.statusText}`
        );
        setIsLinkVerified(false);
      } else if (error.request) {
        toast.error("No response received from the server");
        setIsLinkVerified(false);
      } else {
        toast.error("Error in setting up the request");
        setIsLinkVerified(false);
      }
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    // if (props?.isConnected === true) {
    const crmMapping = {
      Zapier: "isZapier",
      "Left Main CRM": "leftMainCri",
      "Beast Mode Podio": "beastModePodio",
      "Forefront CRM": "foreFrontCrm",
      "REI Sift": "reiSift",
    };

    let finalResult = {
      link: value,
      isZapier: false,
      leftMainCri: false,
      beastModePodio: false,
      foreFrontCrm: false,
      reiSift: false,
    };

    const resultKey = crmMapping[props?.modalOf];

    if (resultKey) {
      finalResult[resultKey] = true;
    }
    if (!resultKey) {
      return toast.error("At least one true is required");
    }
    dispatch(connectCrm(finalResult));
    // }
    // else {
    //   dispatch(
    //     updateConnectedCrm({
    //       link: value,
    //       integratedObjectId: connectedCrm?._id,
    //     })
    //   );
    // }
  };
  return (
    <CreateNewModalStyled>
      <div
        className="top"
        style={{
          borderBottom: "1px solid #efefef",
          borderRadius: " 12px 12px 0 0 ",
        }}
      >
        <h2>Edit {props?.modalOf}</h2>
        <div
          onClick={(e) => {
            props?.onClose(e);
          }}
          style={{ fontSize: "2rem" }}
        >
          <IoMdClose />
        </div>
      </div>
      <form className="bottom">
        <div className="top">
          <div className="row">
            <label>
              <span className="text">{props?.modalOf} Webhook URL</span>
              <input
                type="text"
                name="name"
                placeholder="Custom webhook"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {/* {formik.touched.name && formik.errors.name && (
                <p>{formik.errors.name}</p>
              )} */}
            </label>
            <button onClick={(e) => handleVerifyLink(e, value)}>Verify</button>
          </div>
        </div>
        <div
          className="bottom"
          style={{
            borderTop: "1px solid #efefef",
            borderRadius: "0 0 12px 12px ",
            gap: "15px",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              props?.onClose(e);
            }}
            style={{
              border: "solid 1px #777777",
              color: "#777777",
              height: "40px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              width: "100px",
              padding: "0px",
            }}
          >
            Cancel
          </button>
          <button
            // type="submit"
            onClick={(e) => handleSave(e)}
            disabled={isLinkVerified === true ? false : true || loading}
            style={{
              backgroundColor: "#00BD82",
              height: "40px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              width: "100px",
              color: "white",
            }}
          >
            {loading ? "..." : "Save"}
          </button>
        </div>
      </form>
    </CreateNewModalStyled>
  );
};
