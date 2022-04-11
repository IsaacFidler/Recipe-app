import React from "react";

type Props = {
  nextStep: any;
  prevStep: any;
  handleFormData: any;
  values: any;
};

const Onboarding1 = ({ nextStep, prevStep, handleFormData, values }: Props) => {
  const submitFormData = (e: any) => {
    e.preventDefault();

    nextStep();
  };
  return (
    <>
      <h1>onboarding1</h1>
      <form onSubmit={submitFormData}>
        <input
          name="firstname"
          placeholder="First Name"
          onChange={handleFormData("firstName")}
        />
        <input
          name="lastname"
          placeholder="Last Name"
          onChange={handleFormData("lastName")}
        />
        <input
          name="company"
          placeholder="Company"
          onChange={handleFormData("company")}
        />
        <input
          name="farmname"
          placeholder="Farm name"
          onChange={handleFormData("farmName")}
        />
        <input
          name="regen"
          placeholder="Are you doing regen?"
          onChange={handleFormData("regen")}
        />
        <button type="submit" className="btn-green">
          Continue
        </button>
      </form>
    </>
  );
};

export default Onboarding1;
