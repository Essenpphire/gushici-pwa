// // index.js
// const axios = require('axios').default;
// axios.get('https://v1.hitokoto.cn/')
//   .then(function (res) {
//     // 处理成功情况
//     const data = res.data;
//     console.log(data.hitokoto);
//     console.log(`——${data.from} ${data.from_who}`);
//   })
//   .catch(function (error) {
//     // 处理错误情况
//     console.log(error);
//   })
//   .then(function () {
//     // 总是会执行
//     console.log(`今天没吃药，感觉萌萌哒~`);
// });
const axios = require('axios').default;
const foo = async () => {
  try {
    const res = await axios.get('https://127.0.0.1:8888/');
    let hito = res.data.hitokoto;
    console.log(hito);
  } catch (err) {
    console.log(err);
  }
}
foo();