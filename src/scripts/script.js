const root = document.getElementById('root');

let params = new URL(document.location).searchParams;
let userkey = params.get('userkey');

let feedbacks;

const getFeedbacks = async () => {
  const res = await fetch(`http://localhost:5050/feedback/get?userkey=${userkey}`);
  const data = await res.json();
  console.log(data);
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

  let tableHead;
  
  feedbacks.feedbacks.forEach(feedback => {
  const trInner= document.createElement('tr');
  const tdContent = document.createElement('td');
  const tdCreatedAt = document.createElement('td');

  tdContent.innerText = feedback.content;
  tdCreatedAt.innerText = new Date(feedback.createdAt);
  trInner.appendChild(tdContent);
  trInner.appendChild(tdCreatedAt);
  table.appendChild(trInner);
  });

  

  return root.appendChild(table);
};
