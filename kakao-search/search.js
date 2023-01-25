const ul = document.querySelector(".list");
const searchTxt = document.querySelector(".search-txt");
const btnSearch = document.querySelector(".btn-search");

btnSearch.addEventListener("click", function () {
  const txt = searchTxt.value;
  //외부에 있는 데이터 들고 오기. ajax (asynchronous 비동기 javascript and xml)
  const myFetch = fetch(`http://dapi.kakao.com/v2/search/image?query=${txt}`, {
    headers: { Authorization: "KakaoAK 5542a7bc13879dc10d6f4246ed65ab1c" },
  });
  //약속이 이루어진 상태는 then, 안 이뤄지면 catch.
  myFetch
    .then(function (response) {
      //console.log(response);
      const json = response.json();
      json.then(function (result) {
        //console.log(result);
        const list = result.documents;
        for (let i = 0; i < list.length; i++) {
          ul.innerHTML += `<li>
        <img
          src="${list[i].thumbnail_url}">
      </li>`;
        } //+=, =만 쓰면 하나밖에 안 나옴
      });
    })
    .catch(function () {
      console.log("");
    });
});

//console.log("🚀 ~ file: search.js:2 ~ fetch", myFetch);
