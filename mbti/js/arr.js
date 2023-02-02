//reduce, map, forEach, find, filter

//map (배열 복제할 때 쓰임, 배열 한바퀴를 순회 (iteration)
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const objs = [
  { name: "장성호", id: 1 },
  { name: "남진", id: 2 },
];
// const newArr02 = [...arr];
const newArr = objs.map(function (item) {
  return item.name + "님";
});
console.log(newArr);

//reduce
//acc, prev, current(한바퀴 돌아주기)
console.log(arr === newArr);
const sum = arr.reduce(function (prev, current, idx) {
  console.log("prev===", prev, "current===", current);
  return (prev += current);
}, 0);
console.log(sum);

//filter
//해당되는 요소를 뽑아서 새로운 배열을 출력
const newArr02 = arr.filter(function (item, idx) {
  if (idx < 3) {
    //앞에서 세번째만 뽑으려면 item 대신 idx <3
    return item;
  }
  console.log("🚀 ~ file: arr.js:28 ~ newArr02 ~ item", item);
});

//find
//배열에서 찾아서 그 값을 그대로 출력
const newArr03 = arr.find(function (item, idx) {
  if (item % 2 === 0) {
    return item;
  }
  console.log("🚀 ~ file: arr.js:40 ~ newArr03 ~ item", item);
});
