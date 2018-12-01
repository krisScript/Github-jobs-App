'use strict';
import './style/index.scss';
import getData from './app/getData/getData';
import createJobCard from './app/createJobCard/createJobCard';
import classToggle from './app/classToggle/classToggle';
import displayAlert from './app/displayAlert/displayAlert';
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', e => {
  const submitBtb = document.querySelector('#submit-btn');
  e.preventDefault();
  classToggle(submitBtb, 'is-loading');
  const description = e.target.elements.description.value;
  const location = e.target.elements.location.value;
  const fulltime = e.target.elements.fulltime.value;
  const url = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${description}&full_time=${fulltime}&location=${location}`;

  getData(url).then(data => {
    if (data.length === 0) {
      displayAlert('No jobs were found!');
    } else {
      const jobCardsContainer = document.querySelector('#job-cards-container');

      if (jobCardsContainer.childElementCount > 0) {
        Array.from(jobCardsContainer.children).forEach(child => child.remove());
      }
      data.forEach(job => {
        jobCardsContainer.appendChild(createJobCard(job));
      });
    }
    classToggle(submitBtb, 'is-loading');
    e.target.reset();
  });
});
