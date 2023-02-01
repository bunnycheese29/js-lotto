const searchTxt = document.querySelector(".search-txt"); //[2]찾아주기
searchTxt.addEventListener("keyup", function (e) {
  //[3] 검색창 입력
  if (e.keyCode === 13) {
    loadMap(searchTxt.value); //함수 호출
  }
});

//카카오맵
const container = document.querySelector("#map");
const mapOption = {
  center: new kakao.maps.LatLng(37.66826, 126.9786557),
  level: 12,
};
const map = new kakao.maps.Map(container, mapOption);

//clusterer
const clusterer = new kakao.maps.MarkerClusterer({
  //map보다 밑에 써줌
  map: map,
  averageCenter: true,
  minLevel: 10,
});

//커스텀 오버레이
const customOverlay = new kakao.maps.CustomOverlay({
  map: map,
  //content: `<h1>나는 커스텀 오버레이 info window 대신에 쓸 수 있다.</h1>`,
  position: new kakao.maps.LatLng(37.66826, 126.9786557),
  zIndex: 99,
});

//customOverlay.setMap(map);

//x버튼 눌러서 사라지게 하기 (이벤트 위임하기)
document.body.addEventListener("click", function (e) {
  //console.log(e.target);
  if (e.target.closest("button")) {
    customOverlay.setMap(null);
  }
});

function loadMap(address) {
  //[1]구멍뚫기
  fetch(
    `https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList?page=1&perPage=5000&cond[addr::LIKE]=${address}&serviceKey=5HKu4kuPdWNevK72BhiSuOykywU%2FpuEci%2B%2B9HHrq6GNpmDrjyujQeONuLB7OD3pG%2F3%2BGnxGg1UcyIx0724XM8Q%3D%3D`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log(result);
      const chargeList = result.data;
      const markers = [];
      chargeList.forEach(function (item, idx) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(item.lat, item.longi),
        });
        kakao.maps.event.addListener(marker, "click", function () {
          customOverlay.setMap(map);
          customOverlay.setPosition(marker.getPosition());
          customOverlay.setContent(`
          <div class="contents-box">
            <h2 class="title">${item.csNm}</h2>
            <p class="addr">${item.addr}</p>
            <p class="type">충전타입:${item.cpNm}</p>
            <button class="close"><span class="material-icons"> close </span></button>
        </div>
          `);
          map.panTo(marker.getPosition()); //눌렀을 때 중앙으로 이동
        });
        markers.push(marker);
      });
      clusterer.addMarkers(markers);
    });
}
