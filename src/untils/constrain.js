let apiRoot = '';
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017';
}
if (process.env.BUILD_MODE === 'prod') {
  apiRoot = 'https://trello-api-alzh.onrender.com';
}
console.log('🚀 ~ apiRoot:', apiRoot);
// export const API_ROOT = 'http://localhost:8017'
export const API_ROOT = apiRoot;
