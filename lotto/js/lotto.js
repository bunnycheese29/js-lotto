// const candidate = Array(45)
//   .fill(0)
//   .map(function (item, idx) {
//     return idx + 1;
//   });

//한 줄일 때 화살표 가능, 리턴 생략 갸능
const candidate = Array(45)
  .fill(0)
  .map((item, idx) => idx + 1);

//순서바꾸기
// let a = 10;
// let b = 20;
// let c = a;
// a = b;
// b = a;

//c없이 바꾸는 방법
let a = 10;
let b = 20;

//오브젝트의 구조분해
const obj = { name: "장성호", age: 20 };
const { name, age } = obj;
console.log(name);
const newArr = [a, b];
[b, a] = newArr;

[b, a] = [a, b];
console.log(a, "===", b);

// for (let i = 0; i < 46; i++) {
//   const First = parseInt(Math.random() * 45);
//   const Second = parseInt(Math.random() * 45);
//   const num = candidate[First];
//   candidate[First] = candidate[Second];
//   candidate[Second] = num;
//   //   const second = candidate[Math.floor(Math.random() * 45)];
// }

//배열로 로또 순서 바꾸기
// for (let i = 0; i < 46; i++) {
//   const First = parseInt(Math.random() * 45);
//   const Second = parseInt(Math.random() * 45);
//   [candidate[Second], candidate[First]] = [candidate[First], candidate[Second]];
// }

// for (let i = 0; i < 6; i++) {
//   console.log(candidate[i]);
// }

const paper = document.querySelector(".paper");
const colors = ["yellow", "blue", "red", "gray", "green"];
function makeLotto(num) {
  paper.innerHTML = "";
  for (let i = 0; i < num; i++) {
    const lotto = _.shuffle(candidate).filter(function (item, idx) {
      if (idx < 6) {
        return item;
      }
    });
    const myLotto = _.sortBy(lotto);
    const html = myLotto.reduce(function (acc, item, idx) {
      const selectColor = Math.ceil(item / 10) - 1;
      if (idx < myLotto.length - 1) {
        return (acc += `<li class="${colors[selectColor]}">${item}</li>`);
      } else {
        return (acc += `<li class="${colors[selectColor]}">${item}</li></ul>`);
      }
    }, "<ul>");
    paper.innerHTML += html;
  }
}

const radios = document.querySelectorAll(".btns input");
radios.forEach(function (item, idx) {
  item.addEventListener("change", function () {
    //console.log(idx + 1);
    makeLotto(idx + 1);
  });
});
