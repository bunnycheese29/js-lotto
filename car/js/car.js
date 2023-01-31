const container = document.querySelector("#map");
const mapOption = {
  center: new kakao.maps.LatLng(37.66826, 126.9786557),
  level: 14,
};
const map = new kakao.maps.Map(container, mapOption);

// const clusterer = new kakao.maps.MarkerClusterer({
//   map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
//   averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
//   minLevel: 10, // 클러스터 할 최소 지도 레벨
// });
const customOverlay = new kakao.maps.CustomOverlay({
  map: map,
});
container.addEventListener("click", function (e) {
  // console.log(e.target)
  if (e.target.closest("button")) {
    customOverlay.setMap(null);
  }
});
fetch(
  "https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList?page=1&perPage=10&returnType=json&serviceKey=5HKu4kuPdWNevK72BhiSuOykywU%2FpuEci%2B%2B9HHrq6GNpmDrjyujQeONuLB7OD3pG%2F3%2BGnxGg1UcyIx0724XM8Q%3D%3D"
)
  .then(function (response) {
    return response.json;
  })
  .then(function (result) {
    console.log(result);
    const gas = result.data;
    gas.forEach(function (item, idx) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(item.longi, item.lat),
      });
    });
  });
