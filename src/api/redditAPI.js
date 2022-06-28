export const baseURL = 'https://www.reddit.com';

export const getPosts = async (subreddit) => {
  const response = await fetch(`${baseURL}${subreddit}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
}

export const getSubreddits = async () => {
  const response = await fetch(`${baseURL}/subreddits.json`);
  const json = await response.json();

  return json.data.children.map((sub) => sub.data);
};

export const getPostComments = async (permalink) => {
  const response = await fetch(`${baseURL}${permalink}.json`);
  const json = await response.json();

  return json[1].data.children.map((subreddit) => subreddit.data);
};