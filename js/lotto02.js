//const candidateNum = Array(45); //45개짜리 빈 배열
//const candidateNum = Array(45).fill(0); //숫자로 채우겠다. 0을 안 쓰면 45개의 undefined가 뜸. 0,0,0,0,0
const candidateNum = Array(45)
  .fill(1)
  .map(function (item, idx) {
    //순서가 필요할 때 idx를 씀, 단 매개변수가 2개 이상이여야함.
    //map 함수는 무조건 return. 주어진 배열의 내용을 바꾸고 싶을 때 map을 사용
    return idx + 1;
  });
console.log("🚀 ~ file: lotto02.js:2 ~ candidateNum", candidateNum);
