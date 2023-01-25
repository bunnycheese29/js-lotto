const animals = ["rabbit", "tiger", "lion"];
console.log(animals.splice(0, 2)); //0 ~ 시작 지점 2 ~ 몇 개를 없앨거인지
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
