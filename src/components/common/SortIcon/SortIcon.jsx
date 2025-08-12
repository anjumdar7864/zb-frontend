import Assets from "@/assets";
import { SortIconStyled } from "./styles";

const SortIcon = ({ direction, isSorted }) => {
    return (
        <SortIconStyled direction={direction} isSorted={isSorted}>
            <img src={Assets.Images.SortDefault} alt="Sort Default" />
            <img src={Assets.Images.SortUp} alt="SortUp" />
            <img src={Assets.Images.SortUpHover} alt="SortUpHover" />
            <img src={Assets.Images.SortDown} alt="SortDown" />
            <img src={Assets.Images.SortDownHover} alt="SortDownHover" />
        </SortIconStyled>
    );
};

export default SortIcon;
