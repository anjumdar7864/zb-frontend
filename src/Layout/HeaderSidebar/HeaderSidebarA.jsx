import { Outlet, useNavigate } from "react-router-dom";
// import { HeaderSidebarStyled } from "./styles";
import { HeaderSidebarStyled } from "./stylesA";
import Components from "@/components";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
import Assets from "@/assets";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { directImportConstants } from "@/store/constants";


const HeaderSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sidebarRef = useRef(null);
  const createSidebarRef = useRef(null);
  const dispatch = useDispatch()
  // const notify = () => toast.success('Always at the bottom.', {
  //   position: "bottom-left"
  // });

 
  const notify = () => toast((t) => (

    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ backgroundColor: "#C6E9D6", borderRadius: "100%", width: "46px", height: "46px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={Assets.Images.sealCheck} width={'20px'} height={'20px'} />
      </div>
      <div style={{ color: "#012635", fontSize: "18px", fontWeight: 500, lineHeight: "26px", paddingLeft: "20px" }}>File add successfully!</div>
      <div style={{ display: "flex", alignItems: "center" }}><IoMdClose style={{ fontSize: "24px", marginLeft: "16px", color: "#012635", cursor: "pointer" }} onClick={() => toast.dismiss(t.id)} /></div>
    </div>
  ), {
    position: "bottom-left",  // Custom position
    autoClose: false,         // Disable auto-close
    duration: Infinity,
    style: {
      marginLeft: "80px", 
  
    },
  });

  const { fileCompleted } = useSelector(
    (s) => s.directImportReducer
  );


  useEffect(() => {
    let directImportLocalStorage = localStorage.getItem("directImport");

    if (fileCompleted && directImportLocalStorage) {
      handleTest()
      console.log("Before setTimeout");
      setTimeout(() => {
          console.log("Inside setTimeout");
          toast.dismiss();
      }, 3000);

    }
  }, [fileCompleted])

  const handleTest = () => {
    notify()
    dispatch({
      type: directImportConstants.patchDirectImport.success,
      payload: false,  // Dispatch fileCompleted as true
    });

 
  }

  return (
    <HeaderSidebarStyled>
      <div ref={sidebarRef} style={{ display: sidebarOpen && "block" }} className="left">
        {/* <div className="left"> */}
        <Components.Common.Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* </div> */}

      </div>
      <div className="right">
        <div className="top">
          <Components.Common.Header setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="bottom">
          <Outlet />
        </div>
      </div>
    </HeaderSidebarStyled>
  );
};

export default HeaderSidebar;