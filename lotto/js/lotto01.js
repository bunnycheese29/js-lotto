// [Object - 복합적인 데이터 key: value/ primitive type String, Number, Boolean]
//json javaScriptObjectNotification
const student01 = {
  name: "김남현",
  age: 20,
  iq: 80,
  isMarried: false,
  address: "서울",
};
const student02 = {
  name: "김지은",
  age: 20,
  iq: 80,
  isMarried: false,
  address: "당산",
};

const japanClass = [
  {
    name: "김남현",
    age: 20,
    iq: 80,
    isMarried: false,
    address: "서울",
  },
  {
    name: "김지은",
    age: 20,
    iq: 80,
    isMarried: false,
    address: "당산",
  },
  {
    name: "김세희",
    age: 20,
    iq: 80,
    isMarried: false,
    address: "당산",
  },
];
for (let i = 0; i < 3; i++) {
  console.log(japanClass[i].name, "===", japanClass[i].iq);
}
japanClass.forEach(function (item, idx) {
  console.log(
    idx,
    item.name,
    "==",
    item.age,
    "==",
    item.iq,
    "==",
    item.isMarried
  );
});

console.log(student01.address);
console.log(japanClass[1].name);

// [배열 - 단순한 데이터]
const animals = ["rabbit", "tiger", "lion"];
console.log(animals.splice(0, 2)); //0 ~ 시작 지점 2 ~ 몇 개를 빼낼거인지
console.log(animals);

const candidateNum = [];
const lotto = [];

for (let i = 1; i < 46; i++) {
  candidateNum.push(i);
}

for (let i = 0; i < 6; i++) {
  const selectedNum = candidateNum.splice(
    parseInt(Math.random() * candidateNum.length),
    1
  );
  lotto.push(selectedNum[0]); //selectedNum.pop 또 똑같음.
  //이걸 안 적어주면 배열인 상태로 나옴 [대괄호 안에 숫자/문자], 뽑는 개수가 1개(,1)니까
  //뽑는 개수인 한개 중에 첫번째 숫자인 [0]을 숫자 혹은 문자열로 나타내기 위해 적어줌
}
lotto.sort(function (a, b) {
  return a - b; //(둘중에 하나 적으면 됨 / b-a는 반대) 오름차순 내림내림
  // if (a > b) {
  //   return 1;
  // } else if (a < b) {
  //   return -1;
  // } else {
  //   return 0;
  // }
});
console.log(lotto);
