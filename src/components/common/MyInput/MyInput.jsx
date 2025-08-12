import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { MyInputStyled } from "./styles";

const MyInput = ({
    disable = false,
    errormsg=true,
    error = "",
    title = "",
    placeholder = "",
    type = "",
    value = "",
    setShowPassword , 
    showPassword , 
    password=false , 
    onChange = () => {},
    onBlur = () => {},
    errorColor,
    ...rest 
   
}) => {
    const warning= (<svg viewBox="0 0 24 24" fill="none" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" stroke="#f50000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 8V12" stroke="#df0c0c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 16.0195V16" stroke="#df0c0c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="10" stroke="#df0c0c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> </g></svg>)
    return (
        <MyInputStyled color={error ? "#FF8DA8" : ""}>
            <div className="top">
                <div className="top">
                    <span>{title}</span>
                </div>
                <div className="bottom" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
               
                    disabled={disable}
                    type={type}
                    placeholder={placeholder}
                    onChange={(e) => onChange && onChange(e)}
                    onBlur={(e) => onBlur && onBlur(e)}
                    value={value}
                      autoComplete="new-password"
                    defaultValue={"eeeeeeeeeeeeee"}
                    style={{ paddingRight: '30px' ,  }} // ensure space for the icon
                    {...rest}
                    // autoComplete="off"
                /> <span style={{translate:-30 , display:password ? "":"none" , cursor:"pointer" , position:"absolute" , right:"-10px"}}>{showPassword ? <FaEyeSlash onClick={()=>setShowPassword(false)} /> : <FaEye  onClick={()=>setShowPassword(true)} />} </span> 
                {/* {(error && errormsg) && (
                    <div style={{ position: 'absolute', right: '10px', zIndex: '50' }}>
                        {warning}
                    </div>
                )} */}
            </div>
            </div>
            {error && (
                <div style={{userSelect:"none"}} className="bottom">
                    {errorColor ? (
                        <><p  style={{ color: errorColor }}>{error}</p></>
                    ):
                    (
                        <><p>{error}</p></>
                    )
                    }
                    
                </div>
            )}
        </MyInputStyled>
    );
};

export default MyInput;
