
export async function index() {
const result = await axios({
    method: 'get',
    url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
    withCredentials: true,
  });
  return result.data;
};


export async function create(bodyText) {
  const result = await axios({
      method: 'post',
      url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
      withCredentials: true,
      data: {
        "body": bodyText
      },
    });
    return result.data;
};

export async function Read(id) {
  const result = await axios({
  method: 'get',
  url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
  withCredentials: true,
});
return result;
};

export async function Update(id, bodyText) {
  const result = await axios({
    method: 'put',
    url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
    withCredentials: true,
    data: {
      "body": bodyText
    },
  });
  return result.data;
};

export async function destroy(id) {
  const result = await axios({
    method: 'delete',
    url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
    withCredentials: true,
  });
};

export async function like(id) {
  const result = await axios({
    method: 'put',
    url:`https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}/like`,
    withCredentials: true,
  });
};

export async function unlike(id) {
  const result = await axios({
    method: 'put',
    url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}/unlike`,
    withCredentials: true,
  });
};

export async function reply(parent, bodyText) {
const result = await axios({
  method: 'post',
  url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
  withCredentials: true,
  data: {
    "type": "reply",
    "parent": parent.id,
    "body": bodyText
  },
});
return result.data;
};

export async function retweet(parent, bodyText) {
const result = await axios({
  method: 'post',
  url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
  withCredentials: true,
  data: {
    "type": "retweet",
    "parent": parent.id,
    "body": bodyText
  },
});
return result.data;
};

export const renderTweet = function(tweet) {
  if (tweet.isLiked && !tweet.isMine){
    return `<div class="author">
    <p>${tweet.author}</p>
  </div>
  <div class="body">
    <p>${tweet.body}</p>
  </div>
  <div class="count">
    <p>♡ ${tweet.likeCount}</p>
    <p>Retweets: ${tweet.retweetCount}</p>
    <p>id ${tweet.id}</p>
  </div>
  <div class="buttons">
  <button class="unlike" id="${tweet.id}">Unlike</button>
  <button class="retweet" id="${tweet.id}">Retweet</button>
  <button class="reply" id="${tweet.id}">Reply</button>
  </div>
`;
  } else if (tweet.isMine) {
    return `<div class="author">
    <p>${tweet.author}</p>
  </div>
  <div class="body">
    <p>${tweet.body}</p>
  </div>
  <div class="count">
    <p>♡ ${tweet.likeCount}</p>
    <p>Retweets: ${tweet.retweetCount}</p>
    <p>id ${tweet.id}</p>
  </div>
  <div class="buttons">
  <button class="edit" id="${tweet.id}">Edit</button>
  <button class="destroy" id="${tweet.id}">Delete</button>
  <button class="retweet" id="${tweet.id}">Retweet</button>
  <button class="reply" id="${tweet.id}">Reply</button>
  </div>
`;
  } else { 
  return `<div class="author" data-"${tweet.id}">
    <p>${tweet.author}</p>
  </div>
  <div class="body">
    <p>${tweet.body}</p>
  </div>
  <div class="count">
    <p>♡ ${tweet.likeCount}</p>
    <p>Retweets: ${tweet.retweetCount}</p>
    <p>id ${tweet.id}</p>
  </div>
  <div class="buttons">
  <button class="like" id="${tweet.id}">Like</button>
  <button class="retweet" id="${tweet.id}">Retweet</button>
  <button class="reply" id="${tweet.id}">Reply</button>
  </div>
`;
  }
};

export const renderNewPost = function(event) {
  event.target.remove();
  return `<div>
  <form>
      <textarea class="text"></textarea>
      <button class="save">Post</button>
      <button class="cancel">Cancel</button>
  </form>
  </div>
  `;
};

export const renderCreatedPost = function(event){
  event.preventDefault();
  let tweet = create($(".text").val());
  $('.top').append(renderTweet(tweet));
  // $('.new').empty();
  setTimeout(() => {  
    location.reload()
  }, 300);
}

export const renderEditForm = function(event){
  // let tweet = tweetArr.find(t => t.id == event.target.id);
  // let tweet = tweetArr.filter(item=>item.id == event.target.id);
  // alert(tweet.id)
  let tweet;
  for (let i=0; i < tweetArr.length; i++){
    if (tweetArr[i].id == event.target.id){
      tweet = tweetArr[i]
      break;
    }
  }
  return `<div class="author">
    <p>${tweet.author}</p>
  </div>
  <form>
    <input class="bodyInput" type="text" value="${tweet.body}"></input>
  </form>
  <div class="count">
    <p>♡ ${tweet.likeCount}</p>
    <p>Retweets: ${tweet.retweetCount}</p>
  </div>
  <div class="editing">
    <button class="saveEdit" id="${tweet.id}">Save</button>
    <button class="cancelEdit">Cancel</button>
  </div>
`;
}

export const renderEditedPost = function(event){
  event.preventDefault();
  Update(event.target.id, $(".bodyInput").val());
  setTimeout(() => {  
    location.reload()
  }, 300);
}

export const deletePost = function(event){
  destroy(event.target.id);
  setTimeout(() => {  
    location.reload()
  }, 300);
}

export const updateLike = function(event){
    like(event.target.id);
  setTimeout(() => {  
    location.reload()
  }, 300);
}

export const updateUnlike = function(event){
    unlike(event.target.id);
  setTimeout(() => {  
    location.reload()
  }, 300);
}

export const renderReplyForm = function(event){
  let tweet;
  for (let i=0; i < tweetArr.length; i++){
    if (tweetArr[i].id == event.target.id){
      tweet = tweetArr[i];
      break;
    }
  }
  return `<form>
  <input class="replyInput" type="text"></input>
</form>
<button class="saveReply" id="${tweet.id}">Save</button>
  <button class="cancel">Cancel</button>
  `;
}

export const renderReplyPost = function(event){
  event.preventDefault();
  let parent;
  for (let i=0; i < tweetArr.length; i++){
    if (tweetArr[i].id == event.target.id){
      parent = tweetArr[i];
      break;
    }
  }
  let tweet = reply(parent, $(".replyInput").val());
  let x = document.createElement('div');
  x.innerHTML = renderTweet(tweet);
  event.target.parentNode.append(x);
  // setTimeout(() => {  
  //   location.reload()
  // }, 300);
}

export const renderRetweetForm = function(event){
  let tweet;
  for (let i=0; i < tweetArr.length; i++){
    if (tweetArr[i].id == event.target.id){
      tweet = tweetArr[i];
      break;
    }
  }
  return `<div class="author">
  <p>${tweet.author}</p>
</div>
<form>
  <input class="retweetInput" type="text" value="${tweet.body}"></input>
</form>
<button class="saveRetweet" id="${tweet.id}">Retweet</button>
  <button class="cancel">Cancel</button>
  `;
}

export const retweetPost = function(event){
  event.preventDefault();
  let parent;
  for (let i=0; i < tweetArr.length; i++){
    if (tweetArr[i].id == event.target.id){
      parent = tweetArr[i];
      break;
    }
  }
  let tweet = retweet(parent, $(".retweetInput").val())
  let x = document.createElement('div');
  x.innerHTML = renderTweet(tweet);
  event.target.parentNode.append(x);
  setTimeout(() => {  
  location.reload()
}, 300);
}

export const loadIntoDOM = function(tweetArr) {
  const $root = $('.root');
  for (let i=0; i < tweetArr.length; i++){
    $root.append(renderTweet(tweetArr[i]));
  }
  const $new = $('.new');

  $new.on("click", ".newButton", (event) => {
    $new.append(renderNewPost(event));
  })

  $new.on("click", ".save", (event) => {
    renderCreatedPost(event);
  })

  const $top = $('.top');
  $root.on("click", ".edit", (event) => {
    let x = document.createElement('div')
    x.innerHTML = renderEditForm(event)
    event.target.parentNode.append(x)
  })

  $root.on("click", ".saveEdit", (event) => {
    renderEditedPost(event);
  })

  $root.on("click", ".destroy", (event) => {
    deletePost(event);
  })

  $root.on("click", ".like", (event) => {
    updateLike(event);
  })

  $root.on("click", ".unlike", (event) => {
    $root.append(updateUnlike(event));
  })

  $root.on("click", ".retweet", (event) => {
    let x = document.createElement('div');
    x.innerHTML = renderRetweetForm(event);
    event.target.parentNode.append(x);
  })

  $root.on("click", ".saveRetweet", (event) => {
    retweetPost(event);
  })

  $root.on("click", ".reply", (event) => {
    let x = document.createElement('div');
    x.innerHTML = renderReplyForm(event);
    event.target.parentNode.append(x);
  })
  $root.on("click", ".saveReply", (event) => {
    renderReplyPost(event);
  })
}

let tweetArr = await index();

$(function() {
  loadIntoDOM(tweetArr);
});

