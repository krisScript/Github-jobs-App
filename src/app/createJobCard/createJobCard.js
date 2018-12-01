const createJobCard = job => {
  const jobCard = document.createElement('div');
  jobCard.className = 'column is-one-quarter is-flex';
  jobCard.innerHTML = `
  <div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
    ${
      job.company_logo
        ? `<img src="${job.company_logo} " alt="Placeholder image"></img>`
        : '<p class="title is-size-4 has-text-centered">No logo available</p>'
    }
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-size-6"><Title: ${job.title}/p>
        <p class="title is-size-6">Location: ${job.location}; Berlin</p>
        <p class="title is-size-6">Type: ${job.type}; Berlin</p>
      </div>
    </div>
    <div class="content">
      <a href="${job.url}" target="_blank">Link</a>
      <br>
      <time>${job.created_at}</time>
    </div>
  </div>
</div>
</div>
  `;
  return jobCard;
};
export default createJobCard;
