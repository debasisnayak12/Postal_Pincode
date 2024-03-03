import React, { useEffect, useState } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import axios from "axios";

const PincodeDetails = ({pincode}) => {
    const [filter,setFilter] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const [data, setData] = useState(null);
    const [filteredData,setFilterData] = useState(null);
    const [message,setMessage] = useState("");


    async function fetchData() {
        if(!pincode) return;
        setLoading(true);
        setError("");
        try{
            const response = await axios.get(
              `https://api.postalpincode.in/pincode/${pincode}`
            );
            const responseData = response.data;
            // console.log(response.data[0].Message)
            if(responseData && responseData.length > 0 && responseData[0].Status !== 'Error') {
                setData(responseData[0].PostOffice);
                setFilterData(responseData[0].PostOffice);
                setMessage(responseData[0].Message);
            }else{
                setError('Error fetching pincode details.');
            }
        }
        catch(error){
            setError('Error fetching pincode details.');
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchData();
    },[pincode]);


    function handlefilter(e){
        const value = e.target.value;
        setFilter(value);
        if(!value){
            setFilterData(data);
        }else{
            const filtered = data.filter((office) =>(
                office.Name.toLowerCase().includes(value.toLowerCase())
            ));
            setFilterData(filtered);
        }
    };


    return (
      <div className="Pincode-details">
        <h3 className="header">{!loading && `Pincode: ${pincode}`}</h3>
        <h3 className="header">{!loading && `Message: ${message}`}</h3>
        <div className="inputArea">
          <span class="material-icons">search</span>
          <input
            type="text"
            placeholder="Filter"
            value={filter}
            onChange={handlefilter}
          />
        </div>

        <div className="loader">
          {loading && (
            <CircularProgress value={80} >
              <CircularProgressLabel>99%</CircularProgressLabel>
            </CircularProgress>
          )}
        </div>

        {error && <p className="error">{error}</p>}

        {!loading && !error && !filteredData && (
          <p>Couldn’t find the postal data you’re looking for…</p>
        )}

        <div className="cardContainer">
          {filteredData &&
            filteredData.map((office, index) => (
              <div key={index} className="office-details">
                <p>
                  <span>Name:</span> {office.Name}
                </p>
                <p>
                  <span>Branch Type:</span> {office.BranchType}
                </p>
                <p>
                  <span>Delivery Status:</span> {office.DeliveryStatus}
                </p>
                <p>
                  <span>District:</span> {office.District}
                </p>
                <p>
                  <span>State:</span> {office.State}
                </p>
              </div>
            ))}
        </div>
      </div>
    );

}

export default PincodeDetails;