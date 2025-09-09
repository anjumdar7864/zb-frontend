
const PaginationDropDown = ({ limit, onLimitChange }) => {
    return (
      <div>
        <select
          value={limit} // Show the currently selected limit
          onChange={onLimitChange} // Trigger the limit change handler on selection
          style={{
            border: "solid 1px #D3D7DD",
            outline: "none",
            width: "75px",
            height: "32px",
            borderRadius: "8px",
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    );
  };
  
  export default PaginationDropDown;
