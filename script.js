const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    first:{
        name:'',
        completed:false,
    },
    second:{
        name:'',
        completed:false,
    },
    third:{
        name:'',
        completed:false,
    },
};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.style.width = `${(completedGoalsCount / 3) * 100} %`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;

// for progress label text
function updateProgressLabel(completedGoalsCount) {
  if (completedGoalsCount === 1) {
    progressLabel.firstElementChild.innerText = "Well begun is half done";
  } else if (completedGoalsCount === 2) {
    progressLabel.firstElementChild.innerText = "Just a step away, keep going!";
  } else if (completedGoalsCount === 3) {
    progressLabel.firstElementChild.innerText =
      "Woah! You just completed all the goals, time for chill Ϟ(๑⚈ ․̫ ⚈๑)⋆";
  } else if (completedGoalsCount === 0) {
    progressLabel.firstElementChild.innerText =
      "Raise the bar by completing your goals!";
  }
}

console.log(progressLabel.firstElementChild.innerText);

function initializeProgressBar() {
  // recalculating completed goals count
  completedGoalsCount = Object.values(allGoals).filter(
    (goal) => goal.completed
  ).length;

  //reupdate completed goals
  updateProgressLabel(completedGoalsCount);

  //updating the progress bar width
  progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;

  // for customizing progress value status
  progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;
}

initializeProgressBar();

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalsAdded) {
      checkBox.parentElement.classList.toggle("completed");

      const inputId = checkBox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;

      //updating localStroage first
      localStorage.setItem("allGoals", JSON.stringify(allGoals));

      //then recalculating completed goals count
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      //reupdating goals completed
      updateProgressLabel(completedGoalsCount);

      //updating the progress bar width
      progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;

      // for customizing progress value status
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name || ""; //handling undefined case

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    progressLabel.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      e.target.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id] = {
      name: input.value,
      completed: allGoals[input.id]?.completed || false, //retain completion status
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
