const container = document.querySelector("#map");
const mapOption = {
  center: new kakao.maps.LatLng(37.66826, 126.9786567),
  level: 3, //확대 레벨
};

const map = new kakao.maps.Map(container, mapOption);
customOverlay = new kakao.maps.CustomOverlay({
  map: map,
});
container.addEventListener("click", function (e) {
  // console.log(e.target)
  if (e.target.closest("button")) {
    customOverlay.setMap(null);
  }
});

const myFetch = fetch(
  "https://apis.data.go.kr/B551011/GoCamping/basedList?MobileOS=ETC&MobileApp=tis&serviceKey=5HKu4kuPdWNevK72BhiSuOykywU%2FpuEci%2B%2B9HHrq6GNpmDrjyujQeONuLB7OD3pG%2F3%2BGnxGg1UcyIx0724XM8Q%3D%3D&_type=json&numOfRows=300"
);

myFetch
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    console.log(result);

    const campingList = result.response.body.items.item;
    const bounds = new kakao.maps.LatLngBounds();
    campingList.forEach(function (item, idx) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(item.mapY, item.mapX),
      });
      kakao.maps.event.addListener(marker, "click", function () {
        customOverlay.setContent(
          `<div class="contents-box">
                  <div class="title">${item.facltNm}</div>
                  <div class="intro">${item.lineIntro}</div>
                  <div class="address">${item.addr1}</div>
                  <div class="tel">${item.tel}</div>
                  <div class="info"><a href="${item.homepage}" target="_blank">${item.homepage}</a></div>
                  <div class="info"><a href="${item.resveUrl}" target="_blank">예약하기</a></div>
                  <button class="close" onClick="close()">
                  <span class="material-icons">close</span></button>
              </div>`
        );
        customOverlay.setMap(map);
        customOverlay.setPosition(marker.getPosition());
      });

      // markerList.push(marker);
      bounds.extend(new kakao.maps.LatLng(item.mapY, item.mapX));
    });
    // clusterer.addMarkerList();
    map.setBounds(bounds);
  })
  .catch(function () {
    console.log("안옴");
  });
