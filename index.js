// ЗАДАНИЯ ДЛЯ РАЗМИНКИ!!!!!!)))

// EXERCISE-1
// Есть промис! что за параметры принимает функция? Зачем они? как вернуть обьект {id: 10, name: 'Sergei'} и 
// потом принять его с помощью функции промиса then? Как вернуть ошибку в промисе и потом ее перехватить?
// ANSWER:

// resolve
const pr = new Promise(function (resolve, reject) {
  resolve({id: 10, name: 'Sergei'});
})

pr.then(data => console.log(data))
.catch(error => console.error('ERROR'));

// reject
const pr = new Promise(function (resolve, reject) {
  reject({id: 10, name: 'Sergei'});
})

pr.then(data => console.log(data))
.catch(error => console.error('ERROR'));

// Promise создается при помощи ключевого слова new и своего конструктора.
// Конструктор Promise принимает в качестве параметра функцию (executor function).
// Executor принимает два коллбэка в качестве параметров и выполняется сразу, еще до того как конструктуор вернет созданый объект.
// Resolve вызывается, когда ассинхронная операция завершилась успешно и вернула результат своего исполнения в виде значения.
// Reject вызывается, когда операция не удалась, и возвращает значение, указывающее на причину неудачи, чаще всего объект ошибки.
// Executor описывает выполнение какой-то асинхронной работы, по завершении которой необходимо вызвать функцию resolve или reject.
// При создании Promise находится в ожидании (pending), а затем может стать исполненным (fulfilled), вернув полученный результат (значение),
// или отклоненным (rejected), вернув причину отказа. В любом из этих случаев вызывается обработчик, прикрепленный к промису методом then.
// Если в момент назначения обработчика Promise уже исполнен или отклонен, обработчик все равно будет вызван.
// data в методе then() - это что угодно, что мы передаем в функцию resolve(...).
// Метод catch() возвращает Promise и работает только в случае отклонения обещания. Ведет себя аналогично вызову.

// EXERCISE-2
// Есть код ! с помощью промисов написать таким образом чтобы выполнилось по порядку от одного до 5!
// На данный момент выполнятся setTimeout-ы вконце!!
// ANSWER:

const promise1 = new Promise((res, rej) => {
  setTimeout(()=> res('1'), 1300);
})

const promise2 = new Promise((res, rej) => {
  setTimeout(()=> res('4'), 300);
})

promise1.then(data => {
  console.log(data);
  console.log('2');
  console.log('3');
  return promise2;
}).then(data => {
  console.log(data);
  console.log('5');
})

// EXERCISE-3
// Есть код ! Нужно всего лишь написать комментарий что делает каждая из строчок!
// ANSWER:

const pr2 = new Promise(function (resolve, reject) {
  resolve({id: 2})
  // resolve вызывается, т.к. операция завершилась успешно и вернула результат своего исполнения в виде значения.
});

pr2.then((data) => data)
    // Вызывая метод then, мы возвращает Promise где data - это то, что мы передаем в функцию resolve(...), а именно {id: 2}
    .then((res) => { 
      // в res находитcя {id: 2}
      throw new Error('Something went wrong')
      // Конструктор Error создаёт объект ошибки. Экземпляры объекта Error выбрасываются при возникновении ошибок во время выполнения
      // Инструкция throw позволяет генерировать исключения, определяемые пользователем.
    })
    .catch((e) => console.log('ERROR', e) )
    // Метод catch() возвращает Promise и работает только в случае отклонения обещания

// EXERCISE-4
// Использую Promise.all получить массив из промисов и после чего отсортировать тот что возвращает массив!
// ANSWER:

const prom1 = new Promise(function (resolve, reject) {
  resolve(10);
})

const prom2 = new Promise(function (resolve, reject) {
  resolve({id: 3});
})

const prom3 = new Promise(function (resolve, reject) {
  resolve([6, 2, 4, 6]);
})

Promise.all([prom1, prom2, prom3])
  .then(data => {
    let newArr = data.find(el => Array.isArray(el));
    newArr.sort((a, b) => a - b);
    console.log(data)
  })

// EXERCISE-5
// Есть роуты!! С помощью fetch
// https://playwithpromise.herokuapp.com/api/order-review/last - вернет обьект с id такой
// после чего используя id делаем другой запрос
// https://playwithpromise.herokuapp.com/api/order-review/getid/{id} 
// ANSWER:

fetch('https://playwithpromise.herokuapp.com/api/order-review/last')
  .then(response1 => response1.json())
  .then(data1 => {
    console.log('SUCCESS', data1._id)
    return fetch(`https://playwithpromise.herokuapp.com/api/order-review/getid/${data1._id}`);
  })
  .then(response2 => response2.json())
  .then(data2 => console.log(data2))
  .catch(error => console.error('FAILURE', error));