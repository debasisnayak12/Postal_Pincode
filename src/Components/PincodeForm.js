import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@chakra-ui/react";

const PincodeForm = ({onSubmit}) => {
    const [pincode, setPincode] = useState("");
    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

   async function handleSubmit(e){
      e.preventDefault();
      if(!pincode || pincode.length !== 6 || isNaN(pincode)){
        setError('Please enter a valid 6-digit Pincode.');
        return;
      }
      setLoading(true);
      setError("");
      try{
        await onSubmit(pincode);
        navigate("/pincodeDetails");
      }catch(error){
        setError("Error fetching pincode details.");
      }finally{
        setLoading(false);
      }
    };
    
    return (
      <div className="PincodeForm">
        <h1>Enter Pincode</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputArea">
            <span class="material-icons">search</span>
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          {error && <p className="err">{error}</p>}
          <button type="submit" >
            {loading ? <CircularProgress value={80} /> : "Lookup"}
          </button>
        </form>
      </div>
    );
}

export default PincodeForm;