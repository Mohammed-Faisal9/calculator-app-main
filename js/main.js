const themes = document.querySelectorAll(".theme-btn span");

let changeTheme = (theme) => {
  themes.forEach((e) => {
    e.style.backgroundColor = "inherit";
    document.body.classList.remove(e.dataset.theme);
  });
  console.log(theme.dataset.theme);
  window.localStorage.setItem("theme", theme.dataset.theme);
  document.body.classList.add(theme.dataset.theme);
  theme.style.backgroundColor = "var(--accent-clr-100)";
};

if (window.localStorage.getItem("theme")) {
  console.log("true");
  themes.forEach((e) => {
    e.style.backgroundColor = "inherit";

    if (e.dataset.theme == window.localStorage.getItem("theme")) {
      e.style.backgroundColor = "var(--accent-clr-100)";
      document.body.classList.add(e.dataset.theme);
    }
  });
  // changeTheme(window.localStorage.getItem("theme"));
  console.log(window.localStorage.getItem("theme"));
}

themes.forEach((theme) => {
  theme.addEventListener("click", () => {
    changeTheme(theme);
  });
});

// calc
const numbers = document.querySelectorAll("#number");
const operations = document.querySelectorAll("#operand");
const deleteNumber = document.getElementById("delete");
const reset = document.getElementById("reset");
const equal = document.getElementById("equal");

const previusOperand = document.querySelector(".previus-operand");
const currentOperand = document.querySelector(".current-operand");

let operationUnit;

let add = (number) => {
  number.addEventListener("click", () => {
    console.log(number);
    if (number.textContent === "." && currentOperand.textContent.includes("."))
      return;
    if (currentOperand.textContent.length > 10) return;
    currentOperand.textContent += number.textContent;
  });
};

let del = () => {
  currentOperand.textContent = currentOperand.textContent.slice(0, -1);
};

let clearAll = () => {
  previusOperand.textContent = "";
  currentOperand.textContent = "";
};

let selectOperation = (operation) => {
  if (currentOperand.textContent == "") return;

  if (previusOperand.textContent !== "") {
    compute();
  }

  operationUnit = operation;
  previusOperand.textContent = `${currentOperand.textContent} ${operationUnit}`;
  currentOperand.textContent = "";
};

let compute = () => {
  let computation;
  let prev = parseFloat(previusOperand.textContent);
  let current = parseFloat(currentOperand.textContent);
  if (isNaN(prev) || isNaN(current)) {
    return;
  }
  console.log(prev);
  console.log(current);

  switch (operationUnit) {
    case "+":
      computation = prev + current;
      break;

    case "-":
      computation = prev - current;
      break;

    case "×":
      computation = prev * current;
      break;

    case "/":
      computation = prev / current;
      break;

    default:
      return;
  }

  console.log(computation);
  if (computation == "Infinity") {
    computation = "∞";
  }

  operationUnit = undefined;
  currentOperand.textContent = computation;
  previusOperand.textContent = "";
};

// let displayNumber = () => {
//   if (operationUnit === undefined) {
//     console.log(currentOperand.textContent);
//   }
// };

numbers.forEach(add);

deleteNumber.addEventListener("click", del);

reset.addEventListener("click", clearAll);

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    selectOperation(operation.textContent);
  });
});

equal.addEventListener("click", () => {
  compute();
  console.log(operationUnit);
//   displayNumber();
});
