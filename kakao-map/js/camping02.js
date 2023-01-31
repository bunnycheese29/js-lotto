const container = document.querySelector("#map");
const mapOption = {
  center: new kakao.maps.LatLng(37.66826, 126.9786557),
  level: 14,
};
const map = new kakao.maps.Map(container, mapOption);

// 마커 클러스터러를 생성합니다 (맵보다 밑에 위치)
const clusterer = new kakao.maps.MarkerClusterer({
  map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
  averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
  minLevel: 10, // 클러스터 할 최소 지도 레벨
});

const customOverlay = new kakao.maps.CustomOverlay({
  map: map,
});

//x누르면 사라지게 하기 (container, customOverlay 보다 밑에 있어야함)
container.addEventListener("click", function (e) {
  // console.log(e.target)
  if (e.target.closest("button")) {
    customOverlay.setMap(null);
  }
});

fetch(
  "https://apis.data.go.kr/B551011/GoCamping/basedList?MobileOS=ETC&MobileApp=tis&serviceKey=5HKu4kuPdWNevK72BhiSuOykywU%2FpuEci%2B%2B9HHrq6GNpmDrjyujQeONuLB7OD3pG%2F3%2BGnxGg1UcyIx0724XM8Q%3D%3D&_type=json&numOfRows=3000"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    console.log(result);
    const campingList = result.response.body.items.item;
    const markers = []; //빈배열을 만들어놓기 (마커 뭉치기)
    campingList.forEach(function (item, idx) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(item.mapY, item.mapX),
      });

      //클릭 이벤트 추가 (카카오식)
      kakao.maps.event.addListener(marker, "click", function () {
        customOverlay.setMap(map); //맵 위에 나오게 하기
        customOverlay.setPosition(marker.getPosition()); //마커 포지션에 위치 조정
        customOverlay.setContent(
          `<div class="contents-box">
            <div class="title">${item.facltNm}</div>
            <div class="intro">${item.lineIntro}</div>
            <div class="address">${item.addr1}</div>
            <div class="tel">${item.tel}</div>
            <div class="info"><a href="${item.homepage}" target="_blank">홈페이지</a></div>
            <div class="reserve"><a href="${item.resveUrl}" target="_blank">예약하기</a></div>
            <button class="close" onClick="close()">
            <span class="material-icons">close</span></button>
        </div>`
        );
      });
      markers.push(marker); //반복문 안에서 빈배열에 마커 추가
    });
    clusterer.addMarkers(markers);
  });
