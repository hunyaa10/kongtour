import React, { useRef, useState } from "react";
import styled from "styled-components";

import XIcon from "assets/icons/x-mark.svg";
import { useColors } from "context/ColorContext";
import CustomButton from "components/custom/CustomButton";

const EmailVerifymodal = ({ setShowEmailModal, onContinueClick }) => {
  const colors = useColors();
  const inputRefs = useRef([]);

  const [verifyNumber, setVerifyNumber] = useState(Array(6).fill(""));
  const [numberError, setNumberError] = useState("");

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const updatedVerifyNumber = [...verifyNumber];
    updatedVerifyNumber[index] = value;

    setVerifyNumber(updatedVerifyNumber);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClickNumberBox = (index) => {
    const updatedVerifyNumber = [...verifyNumber];
    updatedVerifyNumber[index] = "";
    setVerifyNumber(updatedVerifyNumber);
  };

  const handleContinueClick = () => {
    if (verifyNumber.includes("")) {
      setNumberError("Please enter all your authentication numbers");
    } else {
      setNumberError("");
      onContinueClick();
    }
  };

  const handleClickResendBtn = () => {
    alert("The authentication number has been retransmitted.");
    setNumberError("");
    setVerifyNumber(Array(6).fill(""));
  };

  return (
    <Wrapper onClick={() => setShowEmailModal(false)}>
      <EmailModal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={() => setShowEmailModal(false)}>
          <img src={XIcon} alt="x-icon" />
        </CloseBtn>
        <Title>Email Verification</Title>

        <Script>Please check the authentication number.</Script>

        <NumberWrapper>
          <NumberContainer>
            {Array(6)
              .fill("")
              .map((_, index) => (
                <NumberBox
                  key={index}
                  type="text"
                  value={verifyNumber[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  onClick={() => handleClickNumberBox(index)}
                  maxLength={1}
                  color={colors.sub}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
          </NumberContainer>
          {numberError && <ErrorMessage>{numberError}</ErrorMessage>}
        </NumberWrapper>

        <BtnContainer>
          <ContinueBtn onClick={handleContinueClick}>
            <CustomButton>Continue</CustomButton>
          </ContinueBtn>
          <ResendBtn onClick={handleClickResendBtn}>
            <CustomButton bgColor={"#ececec"} textColor={"#333"}>
              Resend Verification Code
            </CustomButton>
          </ResendBtn>
        </BtnContainer>
      </EmailModal>
    </Wrapper>
  );
};

export default EmailVerifymodal;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
`;

const EmailModal = styled.div`
  width: 20%;
  height: 45%;
  background-color: #fff;
  border: 2px solid #ececec;
  border-radius: 0.5rem;
  padding: 2rem 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0.7;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
const Title = styled.h5``;

const Script = styled.div`
  font-size: 1rem;
`;

const NumberWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NumberContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const NumberBox = styled.input`
  width: 3rem;
  height: 3rem;
  text-align: center;
  line-height: 2rem;
  border: 1px solid ${(props) => props.color};
  font-size: 1.2rem;
  color: ${(props) => props.color};
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const ContinueBtn = styled.div`
  width: 100%;
`;
const ResendBtn = styled.div`
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;
