const root = document.getElementById('root');

let params = new URL(document.location).searchParams;
let userkey = params.get('userkey');

let feedbacks;

const getFeedbacks = async () => {
  const res = await fetch(`http://localhost:5050/feedback/get?userkey=${userkey}`);
  const data = await res.json();
  feedbacks = data;
};

window.onload = async () => {
  await getFeedbacks();

  if (feedbacks.message) {
    return (root.innerHTML = feedbacks.message);
  }

  const table = document.createElement('table');
  const tr = document.createElement('tr');
  const content = document.createElement('th');
  content.innerText = 'Content'
  const createDate = document.createElement('th');
  createDate.innerText = 'Create Date'

  tr.appendChild(content)
  tr.appendChild(createDate)
  table.appendChild(tr)
  
  feedbacks.feedbacks.forEach(feedback => {
  const trInner= document.createElement('tr');
  const tdContent = document.createElement('td');
  const tdCreatedAt = document.createElement('td');

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'2-digit',minute:'2-digit',hour12: false,};

  tdContent.innerText = feedback.content;
  tdCreatedAt.innerText = new Date(feedback.createdAt).toLocaleDateString("en-US", dateOptions,);
  trInner.appendChild(tdContent);
  trInner.appendChild(tdCreatedAt);
  table.appendChild(trInner);
  });

  return root.appendChild(table);
};
