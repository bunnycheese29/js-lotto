const btnSearch = document.querySelector(".btn-search");
const searchTxt = document.querySelector(".search-txt");
const thumbList = document.querySelector(".list");
const recentSearchWord = document.querySelector(".recent-search-word");
//let recentSearchWordArray = [];

const recentSearchWordArray =
  //배열로 만들기, parse-원래대로 되돌리기
  // ??[]은 nullish coalescing 앞의 값이 null이면 빈배열을 넣어라
  JSON.parse(localStorage.getItem("recentSearchWord")) ?? [];

if (recentSearchWordArray !== null) {
  recentSearchWordArray.forEach(function (item, idx) {
    recentSearchWord.innerHTML += `<li>${item}</li>`;
  });
}

//실시간 검색 enter키 눌렀을 때
searchTxt.addEventListener("keyup", function (e) {
  const txt = searchTxt.value;
  console.log(e.keyCode);

  if (e.keyCode === 13) {
    //txt가 들어있지 않으면 (!가 들어갔기에)
    if (!recentSearchWordArray.includes(txt)) {
      recentSearchWordArray.push(txt);

      localStorage.setItem(
        "recentSearchWord",
        JSON.stringify(recentSearchWordArray) //stringify 문자처럼 만들기
      ); //"고유 키", value

      recentSearchWord.innerHTML += `<li>${txt}</li>`;
    }
    searchImg(txt);
  }
});

function searchImg(searchTxt) {
  thumbList.innerHTML = "";
  const myFetch = fetch(
    `http://dapi.kakao.com/v2/search/image?query=${searchTxt}`,
    {
      headers: {
        Authorization: "KakaoAK 5542a7bc13879dc10d6f4246ed65ab1c",
      },
    }
  );
  myFetch
    .then(function (response) {
      //약속 이뤄진 상태
      //console.log(response.json());
      return response.json();
    })
    .then(function (result) {
      //console.log(result.documents);
      result.documents.forEach(function (item, idx) {
        thumbList.innerHTML += `<li><a href="${item.image_url}" data-fancybox="gallery"><img src="${item.thumbnail_url}"</a></li>`;
      });
    })
    .catch(function () {
      //약속 거절된 상태
      console.log("카톡 프로필에 사진을 올리는 게 아니었는데...");
    })
    .finally(function () {
      console.log("주선자에게 연락하기");
    });
  console.log(myFetch);
}
