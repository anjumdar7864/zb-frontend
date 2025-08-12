import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import styles from "./DirectImport.module.css";
import { downloadFile, downloadFilterProspect, orignalDirectImport } from "@/store/actions";
import { useDispatch } from "react-redux";

const DownloadPopover = ({ children, singleDirectImport }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

const handleOrignalData = async (url) => {
  const getData = await dispatch(orignalDirectImport({ fileUrl: url }));

  console.log("data...", getData); // getData should now contain the resolved data.
};

  return (
    <div>
      <span onClick={handleClick}>{children}</span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div style={{ width: "147px", marginBottom: '4px' }}>
          <button
            style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'start'}}
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              downloadFile(
                {
                  name: singleDirectImport?.listName ?? "data.csv",
                  _id: singleDirectImport?._id,
                },
                () => {
                  setIsLoading(false);
                },
                () => {
                  setIsLoading(false);
                }
              );
              handleClose();
            }}
          >
            <p style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'start' }} className={styles.tableDownload}>
              {singleDirectImport?.totalPropspects
                ? `All (${singleDirectImport?.totalPropspects})`
                : "All (0)"}
            </p>
          </button>
        </div>
        <div style={{ width: "147px", marginBottom: '4px' }}
          onClick={() => {
            downloadFilterProspect(
              {
                name: singleDirectImport?.listName ?? "data.csv",
                _id: singleDirectImport?._id,
              },
              () => { },
              () => { }
            );
            handleClose();
          }}
        >
          <p className={styles.tableDownload}>
            Rejected Prospect
          </p>
        </div>
        <div
          style={{ width: "147px" }}
          // onClick={() => window.open(`${singleDirectImport?.orgFile}`)}
          onClick={()=> handleOrignalData(singleDirectImport?.orgFile)}
        >
          <p className={styles.tableDownload} >
            Original
          </p>

        </div>
      </Popover>
    </div>
  );
};

export default DownloadPopover;
