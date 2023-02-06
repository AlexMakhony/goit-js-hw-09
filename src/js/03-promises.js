// Step 1: import library for alarm sign
import Notiflix from 'notiflix';

// step 2: find our el
const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
};

// step 3: create listener 
refs.form.addEventListener('submit', onSubmitForm);


// step 4: change function

function createPromise(position, delay) {
  // step 4.1 create promise
  const promise = new Promise((resolve, reject) => {
    // step 4.2 create timeOut
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  // Warning do not forget return our prom
  return promise;
};

// step 5: create function for our form


function onSubmitForm(e) {
  e.preventDefault();
  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let amount = Number(refs.amount.value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(position);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

