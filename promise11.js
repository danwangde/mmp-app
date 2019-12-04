function timeout() {
  let promise
  return new Promise((resolve, reject) => {
    // setTimeout(resolve, ms, 'done');
    promise = new Promise((resolve, reject) => {
      resolve('123')
    })
    promise.then(function (response) {
      resolve(response)
    }).catch(function (error) {
      reject(error)
    })
  });
}

timeout().then(function (response) {
  console.log(response)
})
/*
let pro = new Promise((resolve, reject) => {
  resolve('123')
})

console.log(pro)*/
