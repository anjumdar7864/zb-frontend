import React, { useEffect } from "react";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import styles from "./Careers.module.css";

const CareersValues = () => {
  useEffect(() => {
    const handleResize = () => window.dispatchEvent(new Event("resize"));
    setTimeout(handleResize, 100); // Fixes layout issues on load
  }, []);

  const slides = [
    { title: "Trust & Commit", text: "We trust each other and commit to our mutual success.", color: "#f8f9fa" },
    { title: "Excellence", text: "We aim high and focus on the details.", color: "#50e3c2" },
    { title: "Customer Obsession", text: "We evaluate every decision through the eyes of our customers.", color: "#2d9cdb" },
    { title: "Dare to be Bold", text: "We take risks and learn from failures.", color: "#f2c94c" },
    { title: "Thrive Together", text: "We grow by learning from each other.", color: "#f8f9fa" },
    { title: "Trust & Commit", text: "We trust each other and commit to our mutual success.", color: "#f8f9fa" },
    { title: "Excellence", text: "We aim high and focus on the details.", color: "#50e3c2" },
    { title: "Customer Obsession", text: "We evaluate every decision through the eyes of our customers.", color: "#2d9cdb" },
    { title: "Dare to be Bold", text: "We take risks and learn from failures.", color: "#f2c94c" },
    { title: "Thrive Together", text: "We grow by learning from each other.", color: "#f8f9fa" },
  ];

  return (
    <div>
           <div className={styles.sliderWrapper}>
      <Glider
        // className="glider-container"
        className="glide"
        draggable
        hasArrows
        slidesToShow={4}
        focusAt= 'center'
        // hasDots={false}
        // itemWidth={"400px"}
       
        foc
        slidesToScroll={1}
        rewind={true}
        scrollLock={true}
        responsive={[
          { breakpoint: 768, settings: { slidesToShow: 3, peek: { before: 50, after: 50 } } },
          { breakpoint: 1024, settings: { slidesToShow: 5, peek: { before: 100, after: 100 } } },
        ]}
      >
        {slides.map((item, index) => (
          <div key={index}  className={`${styles.slide}`} style={{ backgroundColor: item.color }}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </Glider>
    </div>
    </div>
 
  );
};

export default CareersValues;
