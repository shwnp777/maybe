import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { api, config } from "../../endpoints";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";

const StrainType = ({
  dominance,
  setStrainType,
  strainType,
  mostImportant,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.post(
        `${api}/V1_StrainType`,
        {
          DispensaryID: 2,
        },
        config
      );

      setData(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const finalLinks = () => {
    if (dominance.DominanceID === 1) {
      return "/thc-levels";
    } else if (dominance.DominanceID === 2) {
      return "/cbd-levels";
    } else if (mostImportant !== "") {
      return "/thc-levels";
    } else {
      return "/know-post";
    }
  };

  return (
    <div className="main-survey">
      <h3>Choose a Product Type:</h3>
      <div>
        {isLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div className="survey">
            {data &&
              data.map((strain, index) => (
                <div
                  key={index}
                  className="answers"
                  onClick={() => {
                    if (strainType.length === 0) {
                      setStrainType((strainType) => [...strainType, strain]);
                    } else if (strainType.length < 2) {
                      for (let i = 0; i < strainType.length; i++) {
                        const element = strainType[i];
                        if (element.StrainTypeID !== strain.StrainTypeID) {
                          setStrainType((strainType) => [
                            ...strainType,
                            strain,
                          ]);
                        } else {
                          setStrainType((current) =>
                            current.filter((s) => {
                              return s.StrainTypeID !== strain.StrainTypeID;
                            })
                          );
                        }
                      }
                    } else {
                      setStrainType([]);
                    }
                  }}
                  style={{
                    border: "3px solid rgb(192, 192, 192)",
                    color: "#383d3b",
                    cursor: "pointer",
                  }}
                >
                  {strain.StrainType}
                </div>
              ))}
          </div>
        )}
        <div className="strainList">
          <ul className="strainTypes">
            {strainType.map((st, index) => (
              <li key={index}>{st.StrainType}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="questionButtons">
        <div className="questionButtons">
          <Link to="/question-two">
            <Button aria-label="delete" className="iconBTN">
              <ArrowBackIcon /> Back
            </Button>
          </Link>
          <Link to={finalLinks()}>
            <Button aria-label="delete" className="iconBTN">
              Next <ArrowForwardIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StrainType;
