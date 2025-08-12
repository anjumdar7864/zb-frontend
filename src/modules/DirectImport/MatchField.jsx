import React, { useState, useMemo, useLayoutEffect } from 'react';
import styles from "./DirectImport.module.css";
import { LightTooltip } from '@/components/common';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { CgAsterisk } from 'react-icons/cg';
import { IoIosArrowDown, IoMdClose } from 'react-icons/io';
import Select, { components } from 'react-select';
import { FaSort } from 'react-icons/fa6';

import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const MatchField = ({ closeFunc, handleImport, fileData , check , setCheck }) => {
  const [isLandOwner, setIsLandOwner] = useState(false);
  const [mappingData, setMappingData] = useState({
    firstName: "",
    lastName: "",
    mailingAddress: "",
    mailingCity: "",
    mailingState: "",
    mailingZip: "",
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",
    phone1: "",
    phone2: "",
    phone3: "",
    apn: "",
    propertyCounty: "",
    acreage: "",
  });
  const [usedHeaders, setUsedHeaders] = useState([]);
  const allHeaders = useMemo(() => {
    if (!fileData || fileData.length === 0) {
      return [];
    }
    return Array.from(new Set(Object.keys(fileData[0])));
  }, [fileData]);


  // const getRemainingHeaders = (allHeaders, usedHeaders, name) => {
  //   const allHeadersSet = new Set(allHeaders);
  //   const usedHeadersSet = new Set(usedHeaders);
  //   const remainingHeaders = [...allHeadersSet].filter(
  //     (header) => !usedHeadersSet.has(header) || header === name
  //   );
  //   const result = remainingHeaders.map((header) => ({ value: header, label: header }));
  //   result.unshift({ value: "select field", label: "Open menu for select field" });
  //   return result;
  // };


  const getRemainingHeaders = (allHeaders, usedHeaders, name) => {
    const allHeadersSet = new Set(allHeaders);
    const usedHeadersSet = new Set(usedHeaders);
    return [...allHeadersSet].filter(
      (header) => !usedHeadersSet.has(header) || header === name
    );}

  // const handleChange = (e, name) => {
  //   console.log(e,name,'asdasdasd')
  //   setMappingData((prev) => ({
  //     ...prev,
  //     [name]: e.value,
  //   }));
  // };
  const handleChange = (e, name) => {
    setMappingData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  const getSomePreviewData = (name) => {
    if (!fileData || fileData.length === 0) {
      return [];
    }

    let size = fileData.length < 10 ? fileData.length : 10;

    return fileData
      .slice(0, size)
      .map((obj) => obj[mappingData[name]])
      .filter((v) => v)
      .join(", ");
  };

  useLayoutEffect(() => {
    const usedHeadersList = [];
    for (const key in mappingData) {
      if (mappingData[key]) usedHeadersList.push(mappingData[key]);
    }
    setUsedHeaders(usedHeadersList);
  }, [mappingData]);

  const requiredFields = [
    "firstName",
    "lastName",
    "mailingAddress",
    "mailingCity",
    "mailingState",
    "mailingZip",
    "propertyAddress",
    "propertyCity",
    "propertyState",
    "propertyZip",
    "phone1",
  ];



  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <IoIosArrowDown style={{ color: '#012635' }}/>
      </components.DropdownIndicator>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ padding: "16px" }}>
          <div style={{ fontWeight: 600, fontSize: "18px", lineHeight: "26px", }}>Match fields from file  </div>
          <div style={{ color: "#777777", fontSize: "14px", lineHeight: "22px", fontWeight: 500, }}>
            Please make sure that all fields are filled and matched correctly
          </div>
        </div>
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "end", height: "100%", alignItems: "center ", paddingRight: "20px" }}>
          <IoMdClose onClick={closeFunc} style={{ fontSize: "24px", color: "#012635", cursor: "pointer" }} />
        </div>
      </div>



      <div>
        <div style={{ color: "#012635", fontSize: "12px", lineHeight: "20px", fontWeight: 500, display: "flex", alignItems: "center", height: "28px", padding: "0px 20px", backgroundColor: "#F1F3F8", margin: "0px" }}>
          <div style={{ flexGrow: 1 }}>ZeitBlast Field</div>
          <div style={{ flexGrow: 1 }}>File Column Data</div>
          <div style={{ flexGrow: 1 }}>File Column Names</div>
        </div>
      </div>

      <div className={styles.custom_scrollbar} style={{ height: "420px", display: "flex", flexDirection: "column", gap: "20px", overflow: "auto", paddingBlock: "16px" }}>
        {Object.keys(mappingData).map((field, index) => {
          return (
            <div>
              {
                index == 13 &&
                <div>
                  <div style={{ width: "30rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p style={{ color: "white", fontSize: "12px", padding: ".4rem .8rem", backgroundColor: "#5BF1B2", borderRadius: "1.5rem", display: "block", width: "4.5rem", marginRight: "1rem", border: "solid 1px #5BF1B2" }}>
                      NEW
                    </p>
                    <LightTooltip
                      placement="top"
                      arrow
                      title={<p>Map these fields only if you are looking to buy land and you have this information in your imported file.</p>}
                    >
                      <button
                        onClick={() => setIsLandOwner(!isLandOwner)}
                        style={{ display: "flex", alignItems: "center", gap: ".7rem", justifyContent: "center" }}
                      >
                        {isLandOwner ? "Hide " : "Show "}
                        Landowner Fields
                        {isLandOwner ? (
                          <MdKeyboardArrowUp style={{ fontSize: "2rem" }} />
                        ) : (
                          <MdKeyboardArrowDown style={{ fontSize: "2rem" }} />
                        )}
                      </button>
                    </LightTooltip>
                  </div>
                </div>

              }

              <div key={index} style={{ display: index > 12 && !isLandOwner ? "none" : "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 20px" }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ color: "#012635", fontSize: "16px", fontWeight: 500, lineHeight: "24px", minWidth: "150px" }}>
                    {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                    <CgAsterisk style={{ color: "#EA3815", display: index > 10 && "none" }} />
                  </div>
                  <div className={styles.lineClamp}>{getSomePreviewData(field)}</div>
                  <div>
                  <select
                  className={styles.matchDropdown}
                  value={mappingData[field]}
                  style={{border:mappingData[field] && "solid 1px #5BF1B2" , cursor:"pointer"}}
                  onChange={(e) => handleChange(e, field)}
                >
                  <option>Open menu for select field</option>
                  {getRemainingHeaders(allHeaders, usedHeaders, mappingData[field]).map((header, i) => (
                    <option className={styles.listOption}  key={i} value={header}>{header}</option>
                  ))}
                </select>

                    {/* <Select
                      components={{
                        DropdownIndicator,
                        IndicatorSeparator: () => null,
                      }}
                      onChange={(e) => handleChange(e, field)}
                      options={getRemainingHeaders(allHeaders, usedHeaders, mappingData[field])}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      placeholder={"Open menu for select field"}
                      isSearchable={false}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: '#F7F8FC',
                          primary: '#00BD82',
                        },
                      })}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          width: 300,
                          height: '4rem',
                        }),
                      }}
                      IndicatorsContainer={false}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 16px 14px 16px", paddingBottom: "0px", gap: "10px", borderTop: "#F0F0F0 solid 1px" }}>
   <div style={{ display: "flex", fontWeight: 500, alignItems: "center" }}>
    {/* DNC
 <Checkbox {...label} defaultChecked color="success" onChange={(e) => setCheck(!check)} defaultChecked   sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}/> */}
   </div>
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
     <div onClick={closeFunc} style={{ color: "#777777", fontSize: "16px", fontWeight: 500, lineHeight: "24px", border: "1px solid var(--Extra-Text-Secondary, #777)", borderRadius: "8px", padding: "8px 12px", cursor: "pointer" }}>
          Cancel
        </div>
        <div onClick={() => handleImport(mappingData)} style={{ fontSize: "16px", fontWeight: 500, lineHeight: "24px", color: "white", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", width: "100px", textAlign: "center", backgroundColor: "#00BD82" }}>
          Import
        </div>
    </div>
   
      </div>
    </div>
  );
};

export default MatchField;
