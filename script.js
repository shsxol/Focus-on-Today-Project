const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.error-label');
const progressLabel = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');

const allGoals = {
    first : {
        name: 'Learn JS',
        completed : false,
    },
    second : {
        name: 'Learn JS',
        completed : false,
    },
    third : {
        name: 'Learn JS',
        completed : false,
    }
}

checkBoxList.forEach((checkBox) => {
    checkBox.addEventListener('click' , (e) =>{
        const allGoalsAdded= [...inputFields].every(function(input){
            return input.value;
        })

        if (allGoalsAdded){
            checkBox.parentElement.classList.toggle('completed');
            progressValue.style.width = '33.33%' ;
        } else {
            progressLabel.classList.add('show-error')

        }

    })
})

inputFields.forEach((input) => {
    input.addEventListener('focus', ()=>{
        progressLabel.classList.remove('show-error');

    })
    input.addEventListener('input', (e) =>{
        console.log(e.target);
    })
})