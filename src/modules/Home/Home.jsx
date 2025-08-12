import { useRef, useEffect, useState } from "react";
import axios from "axios";
import Components from "@/components";
import { Questionsection } from "@/components/Home/QuestionsSection/Questionsection";
import { PackageDetails } from "@/components/Home/PackageDetails/PackageDetails";
import { HomeStyled } from "./styles";
import { useLocation, useParams } from "react-router-dom";
const Home = () => {
  const pricingSectionRef = useRef(null);
  const requestDemoSectionRef = useRef(null);
  const location = useLocation();
  
  // Ensure we extract the query parameters correctly
  const hashIndex = location.hash.indexOf("?");
  const queryString = hashIndex !== -1 ? location.hash.substring(hashIndex + 1) : "";

  const searchParams = new URLSearchParams(queryString);
  const section = searchParams.get("section");

  console.log("Full Hash:", location?.search); // "#/?section=price"
  console.log("Extracted Query:", queryString); // "section=price"
  console.log("Section:", section); // Example: "#/?section=pricing"
  
  // Store the fetched subscriptions
  const [subsData, setSubsData] = useState([]);
  // Keep track of loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subscription data once
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_APP_BACKEND_BASE_URL+"user/v1/api/subscription");
        const { results } = response.data;
        setSubsData(results);
      } catch (err) {
        setError(err.message || "Error fetching subscription data");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  // Smooth scroll to PricingSection
  const scrollToPricingSection = () => {
    
    
    if (pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToRequestDemoSection = () => {
    
    
    
    if (requestDemoSectionRef.current) {
    
      requestDemoSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(()=>{
if(location?.search == "?section=request"){
  scrollToRequestDemoSection()
}
  },[location])
  return (
    <>
      <Components.Common.HeaderSite onPricingButtonClick={scrollToPricingSection} />
      <Components.Home.HeroSection ref={requestDemoSectionRef} onPricingButtonClick={scrollToPricingSection} />
      <Components.Home.LeadersSection scrollToRequestDemoSection={scrollToRequestDemoSection} onPricingButtonClick={scrollToPricingSection} />
      <Components.Home.ReliableSection />
      {/* 
        1) If there's an error, show it.
        2) If still loading, show a "Loading..." or spinner.
        3) Otherwise, render the PricingSection + PackageDetails
      */}
      {error && <div>Something went wrong: {error}</div>}
      {loading && !error && <div>Loading...</div>}

      {!loading && !error && (
        <>
          <Components.Home.PricingSection  ref={pricingSectionRef} results={subsData} />
          <PackageDetails results={subsData} />
        </>
      )}

      <Questionsection  scrollToRequestDemoSection={scrollToRequestDemoSection} />
      <Components.Common.Footer round />
    </>
  );
};

export default Home;
