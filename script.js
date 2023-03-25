const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const state = document.querySelector("#state");
const zip = document.querySelector("#zip");
const grossIncome = document.querySelector("#grossIncome");
const ei = document.querySelector("#ei");
const ccp = document.querySelector("#ccp");
const incomeTax = document.querySelector("#incomeTax");
const bonus = document.querySelector("#bonus");
const allowance = document.querySelector("#allowance");
const gender = document.querySelectorAll(".gender");
const dependents = document.querySelectorAll(".dependent");
const output = document.querySelector(".output");
const outputName = document.querySelector(".outputName");
output.style.display = "none";
let outputGross=document.querySelector('.outputGross');
let outputAdditions=document.querySelector('.outputAdditions');
let outputDeductions=document.querySelector('.outputDeductions');
let outputTotalSalary=document.querySelector('.outputTotalSalary');

const getDeductions = (income, percent) => {
  let deductions;
  deductions = income * (percent / 100);
  return deductions;
};

function sumbitTaxes(event) {
  event.preventDefault();
  console.log(grossIncome);
  let grossIncomeVal = Number(grossIncome.value);
  let incomeTaxPerVal = Number(incomeTax.value);
  let ccpVal = Number(ccp.value);
  let eiVal = Number(ei.value);
  let bonusVal = Number(bonus.value);
  let allowanceVal = Number(allowance.value);
  let totalDeductions;

 
  console.log(incomeTaxPerVal);
  if(validate(fname)&&validate(lname)&&validate(grossIncome)&&validate(incomeTax)){
    output.style.display = "block";
  switch (getSelectedRadio(gender)) {
    case "male":
      let numberOfDependent = Number(getSelectedRadio(dependents));
      if (numberOfDependent === 2) {
        //values stay the same
      } else if (numberOfDependent === 3) {
        incomeTaxPerVal -= 2;
      } else if (numberOfDependent === 4) {
        incomeTaxPerVal -= 4;
      }

      break;
    case "female":
      console.log("first");
      incomeTaxPerVal = incomeTaxPerVal - 1;
      break;
  }
  }
  let totalDeductionsInPer = incomeTaxPerVal + eiVal + ccpVal;

  let additionalIncome = bonusVal + allowanceVal;

  totalDeductions = getDeductions(
    grossIncomeVal + additionalIncome,
    totalDeductionsInPer
  );
  let netIncome = grossIncomeVal + bonusVal - totalDeductions;
   
  changeContent(fname.value+" "+lname.value,grossIncomeVal
  ,additionalIncome,totalDeductions,netIncome
  )
}

function changeContent(name,grossIncome,additionalIncome
  ,deductions,totalSalary
  ){
  outputName.innerHTML=name;
  outputGross.innerHTML=grossIncome.toFixed(2)+"$";
  outputAdditions.innerHTML=additionalIncome.toFixed(2)+"$";
  outputDeductions.innerHTML=deductions.toFixed(2)+"$";
  outputTotalSalary.innerHTML=totalSalary.toFixed(2)+"$";
}

function getSelectedRadio(elements) {
  let selectedElement;
  elements.forEach((element) => {
    if (element.checked) {
      selectedElement = element.value;
    }
  });

  return selectedElement;
}

function validate(input){
  if(input.value===""){
    input.focus();
    return false;
  }
  return true;
}