import { useState, useEffect, useRef } from "react";
import { GoStack } from "react-icons/go";

const MergeFieldDropDown = ({ handlePlaceholderInsertion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { name: "First Name", value: "{FirstName}" },
    { name: "Last Name", value: "{LastName}" },
    { name: "Property Address", value: "{PropertyAddress}" },
    { name: "Property City", value: "{PropertyCity}" },
    { name: "Mailing Address", value: "{MailingAddress}" },
    { name: "Alias/Rep Name", value: "{AliasRepName}" },
    { name: "No# Address", value: "{No#Address}" },
    { name: "Company Name", value: "{CompanyName}" },
    { name: "APN", value: "{APN}" },
    { name: "Property County", value: "{PROPERTYCOUNTY}" },
    { name: "ACREAGE", value: "{ACREAGE}" },
  ];

  const toggleDropdown = (event) => {
    setIsOpen((prev) => !prev);
    event.stopPropagation();
  };

  const closeDropdown = (event) => {
    // Close dropdown if the click is outside the dropdown element
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <section ref={dropdownRef}>
      <header onClick={toggleDropdown} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
        <GoStack />
        <span style={{ marginLeft: "8px" }}>Add Merge Field</span>
      </header>
      {isOpen && (
        <div style={{ border: "1px solid #ddd", padding: "8px", marginTop: "4px", borderRadius: "4px", background: "#fff" }}>
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => handlePlaceholderInsertion(option.value)}
              style={{ display: "block", padding: "8px", width: "100%", textAlign: "left", border: "none", background: "none", cursor: "pointer" }}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default MergeFieldDropDown;
