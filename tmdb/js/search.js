const TMDB_KEY = "865d2c7cf961c548354ceb9274a4345d";
const list = document.querySelector(".list");
const searchTxt = document.querySelector(".search-txt");
const btnMore = document.querySelector(".btn-more");
const movieDetail = document.querySelector(".movie-detail");
let pageNum = 1;

searchTxt.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    searchTxt.value;
    const myFetch = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${searchTxt.value}`
    );
    myFetch
      .then(function (response) {
        // console.log("검색 됨");
        return response.json();
      })
      .then(function (result) {
        console.log(result);
        list.innerHTML = "";
        makeList(result);
      })
      .catch(function () {
        console.log("안옴");
      });
  }
});

btnMore.addEventListener("click", function () {
  pageNum++;
  loadMovie(pageNum);
});
loadMovie(pageNum);
function makeList(result) {
  result.results.forEach(function (item, idx) {
    list.innerHTML =
      list.innerHTML +
      `<li data-id="${item.id}">
    <div class="img-box">
    <img src="https://image.tmdb.org/t/p/original${item.poster_path}">
    </div>
    <div class="contents-box">
    <h2>${item.title}</h2>
    <p>${item.original_title}</p>
    <p>${item.release_date}</p>
    <p class="overview">${item.overview}</p>
    </div>
    </li>`;
  });

  //li 추가된 후의 코드
  gsap.from(".list li", { opacity: 0, stagger: 0.02 });
  const movieItems = document.querySelectorAll(".list li");
  movieItems.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      //위에 data-id를 통일 시킨 것
      //console.log(item.dataset.id);
      const movieID = item.dataset.id;
      const movieFetch =
        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${TMDB_KEY}&language=ko-KR
`);
      movieFetch
        .then(function (response) {
          console.log("디테일한 영화정보 받았음");
          return response.json();
        })
        .then(function (result) {
          console.log(result);
          movieDetail.classList.add("on");
          document.body.classList.add("off");
          gsap.fromTo(
            ".movie-detail",
            { y: "100%" },
            { y: 0, duration: 1, ease: "power4" }
          );
          let txtGenres = "";
          result.genres.forEach(function (item, idx) {
            if (idx === 0) {
              txtGenres += item.name;
            } else {
              txtGenres += "/" + item.name;
            }
          });
          movieDetail.innerHTML = `
      <div class="img-box">
              <img src="https://image.tmdb.org/t/p/original${result.backdrop_path}" alt="backdrop_path" />
      </div>
      <div class="contents-box">
              <h2 class="title">${result.title}</h2>
              <p>${result.original_title}</p>
              <p>genres</p>
              <p><a href="${result.homepage}" target="_black">${result.homepage}</a></p>
              <p>${result.release_date}</p>
              <p>${result.popularity}</p>
              <p>${result.runtime}</p>
              <p>${result.overview}</p>
      </div>
      <button class="btn-close"><span class="material-icons md-48">close</span></button>
      `;
          const btnClose = document.querySelector(".btn-close");
          btnClose.addEventListener("click", function () {
            movieDetail.classList.remove("on");
            document.body.classList.remove("off");
          });
        })
        .catch(function () {
          console.log("못 받았음");
        });
    });
  });
}
function loadMovie(pageNum = 1) {
  const myFetch = fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=ko-KR&page=${pageNum}`
  );
  myFetch
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (result) {
      //여기에 내가 필요한 코드 넣는 곳, console.log를 계속 찍어서 확인
      //포스터 이미지 넣을 때는 앞에 링크 넣기
      console.log("json으로 변환 완료");
      console.log(result.results);
      makeList(result);
    });
}
