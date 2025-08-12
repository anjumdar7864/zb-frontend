import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BiBorderAll } from 'react-icons/bi';
import Assets from '@/assets';
import styles from './Coockies.module.css'
import { IoMdClose } from 'react-icons/io';
import CookiesOption from './CookiesOption';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
const CookiesSetting = ({ open, setOpen , setCookiesgOpen }) => {
  //   const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95vw",
    maxHeight: "95vh",
    maxWidth: "548px",
    borderRadius: '24px', // Fixed capitalization
    bgcolor: 'background.paper',
   display:"flex" , 
   flexDirection:"column"
    // border: '2px solid #000',
    // boxShadow: 24,
    //    padding:"28px"
  };

  const handleActive = () => {

  }
   const handleAccept = () => {
          Cookies.set("cookies", "accept", { expires: 365 });
          setCookiesgOpen(false)

          handleClose()
      }

        const handleReject = () => {
              Cookies.set("cookies", "reject", { expires: 365 });
              setCookiesgOpen(false)

              handleClose()
          }
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.settingHeader}>
            <div><img src={Assets.Images.zeitBlast_logoA} width={"121px"} alt="" /></div>
            <div onClick={handleClose}><IoMdClose size={24} style={{ cursor: "pointer" }} /></div>
          </div>
          <div className={`${styles.settingBody} ${styles.customScroll}`}>
            <div className={styles.settingBodyTop}>
              <div className={styles.settingBodyTitle}>Privacy Preference Center</div>
              <div className={styles.settingDiscription}>
                When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. The information does not usually directly identify you, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to find out more and change our default settings. However, blocking some types of cookies may impact your experience of the site and the services we are able to offer.
               <br/> <Link className={styles.link} to={"/privacy-policy"}>More information</Link>
              </div>
              <div style={{ padding: "20px 0px" }}>
                <button onClick={handleAccept} className={styles.accept}>Allow All</button>
              </div>
            </div>
            <div className={styles.settingBodyBottom}>
              <div className={styles.settingBodyTitle}>Manage Consent Preferences</div>
              <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <CookiesOption
                  title={"Strictly Necessary Cookies"}
                  discription={" These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information."}
                  handleActive={handleActive}
                />
                <CookiesOption
                  title={"Performance Cookies"}
                  discription={" These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance"}
                  handleActive={handleActive}
                />
                <CookiesOption
                  title={"Functional Cookies"}
                  discription={" These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly."}
                  handleActive={handleActive}
                />
                <CookiesOption
                  title={"Targeting Cookies"}
                  discription={" These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising."}
                  handleActive={handleActive}
                />
              </div>
            </div>
          </div>
          <div className={styles.settingFooter}>
            <button className={styles.settingsReject} onClick={handleReject}>Reject all</button>

            <button  className={styles.settingAccept} onClick={handleAccept}>Confirm My Choices</button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default CookiesSetting
