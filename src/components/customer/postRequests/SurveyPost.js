import React, { useState } from "react";
import axios from "axios";
import { api, config } from "../../../endpoints";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const SurveyPost = ({
  userName,
  strainType,
  dominance,
  smellChoice,
  tasteChoice,
  condition,
  mostImportant,
  secondImportant,
  thirdImportant,
  thcLevels,
  cbdLevels,
}) => {
  const [strainAnswered, setStrainAnswered] = useState(false);
  const [success, setSuccess] = useState(false);
  const [surveyNumber, setsurveyNumber] = useState("");

  const choiceDataScoring = (choices) => {
    if (
      mostImportant === choices &&
      secondImportant === "" &&
      thirdImportant === ""
    ) {
      return 100;
    } else if (
      mostImportant === choices &&
      secondImportant !== "" &&
      thirdImportant !== ""
    ) {
      return 70;
    } else if (
      mostImportant === choices &&
      secondImportant === "" &&
      thirdImportant !== ""
    ) {
      return 70;
    } else if (
      mostImportant === choices &&
      secondImportant !== "" &&
      thirdImportant === ""
    ) {
      return 70;
    } else if (
      mostImportant !== choices &&
      secondImportant === choices &&
      thirdImportant === ""
    ) {
      return 30;
    } else if (
      mostImportant !== choices &&
      secondImportant === "" &&
      thirdImportant === choices
    ) {
      return 30;
    } else if (
      mostImportant !== choices &&
      secondImportant !== "" &&
      thirdImportant === choices
    ) {
      return 15;
    } else if (
      mostImportant !== choices &&
      secondImportant === choices &&
      thirdImportant !== ""
    ) {
      return 15;
    } else {
      return 0;
    }
  };

  const returnNan = (selectionNaN) => {
    if (Number.isNaN(parseInt(selectionNaN))) {
      return 0;
    } else {
      return parseInt(selectionNaN);
    }
  };

  let strain = [];

  console.log(strainType);

  for (let i = 0; i < strainType.length; i++) {
    const element = strainType[i].StrainTypeID;
    strain.push(element.toString());
    console.log(strain);
  }

  let finalStrain = strain.join(",");

  const surveyData = {
    SearchName: userName,
    SearchDesr: "",
    StrainTypeID: finalStrain,
    WeightingProperty: choiceDataScoring("WeightingProperty"),
    WeightingTaste: choiceDataScoring("WeightingTaste"),
    WeightingSmell: choiceDataScoring("WeightingSmell"),
    THCMin: thcLevels,
    THCMax: 100,
    CBDMin: cbdLevels,
    CBDMax: 100,
    Dominance: dominance.DominanceID,
    ConditionID: returnNan(condition),
    SmellID: returnNan(smellChoice),
    TasteID: returnNan(tasteChoice),
    ExcludedTerpenes: "",
    DispensaryID: 2,
  };
  console.log(surveyData);

  const handleAPI = () => {
    axios
      .post(`${api}/surveyadd`, surveyData, config)
      .then((response) => {
        const res = response.data[0];
        setsurveyNumber(res[Object.keys(res)[0]]);
        setSuccess(true);
      })
      .catch((error) => {
        console.error({ errorMessage: error.message });
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {success ? (
        <Alert severity="success">
          Your submission was successful! Your Budtender will have your results
          ready for you. Simply provide them with your nickname,{" "}
          <span style={{ fontWeight: "700", textDecoration: "underline" }}>
            {userName}
          </span>
          . Or submission number,{" "}
          <span style={{ fontWeight: "700", textDecoration: "underline" }}>
            #{surveyNumber}
          </span>
          <h3>Thank you for using Strain Seekr!</h3>
        </Alert>
      ) : (
        ""
      )}
      <div
        className="post-text"
        style={{
          textAlign: "center",
        }}
      >
        <h3>Great job, {userName}!</h3>
        <p style={{ marginTop: "40px" }}>
          Please hit submit so the Budtender can view your results
        </p>
      </div>
      <Button
        style={{ marginTop: "40px" }}
        variant="contained"
        color="success"
        disabled={strainAnswered}
        onClick={() => {
          handleAPI();
          setStrainAnswered(true);
        }}
      >
        Submit Request
      </Button>
    </div>
  );
};

export default SurveyPost;
