import Assets from "@/assets";
import { MyInputWithEndIconStyled } from "./styles";

const MyInputWithEndIcon = ({
    error = "",
    title = "",
    placeholder = "",
    type = "",
    value = "",
    onChange = () => {},
    onBlur = () => {},
    Icon = <Assets.Icons.Eye />,
    onIconClick = () => {},
    iconCSS = {},
    ...rest
}) => {
    return (
        <MyInputWithEndIconStyled color={error ? "#FF8DA8" : ""}>
            <div className="top">
                <div className="top">
                    <span>{title}</span>
                </div>
                <div className="bottom">
                    <input
                        type={type}
                        placeholder={placeholder}
                        onChange={(e) => onChange && onChange(e)}
                        onBlur={(e) => onBlur && onBlur(e)}
                        value={value}
                        {...rest}
                                      autoComplete="new-password"
                    />
                    <span onClick={onIconClick} style={iconCSS}>
                        <Icon />
                    </span>
                </div>
            </div>
            {error && (
                <div className="bottom">
                    <p>{error}</p>
                </div>
            )}
        </MyInputWithEndIconStyled>
    );
};

export default MyInputWithEndIcon;
