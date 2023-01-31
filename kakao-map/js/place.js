const searchTxt = document.querySelector(".search-txt");
searchTxt.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    searchPlace(searchTxt.value);
  }
});

//이벤트 위임 (미리 존재하고 있는 곳에 이벤트 걸기)
//e.target.closest 이벤트가 닿는 가장 마지막 지점 (eg. body, container, div)
//e.currentTarget 내가 찍은 것

const container = document.querySelector("#map");
container.addEventListener("click", function (e) {
  // console.log(e.target)
  if (e.target.closest("button")) {
    customOverlay.setMap(null);
  }
});
let customOverlay = null;
function searchPlace(searchTxt) {
  container.innerHTML = "";
  const mapOption = {
    center: new kakao.maps.LatLng(37.66826, 126.9786567),
    level: 3, //확대 레벨
  };
  //검색 할 때마다 비우기
  container.innerHTML = "";
  const map = new kakao.maps.Map(container, mapOption);
  //   const infoWindow = new kakao.maps.InfoWindow({ zIndex: 99, removable: true });
  customOverlay = new kakao.maps.CustomOverlay({
    map: map,
  });
  const place = new kakao.maps.services.Places();
  place.keywordSearch(searchTxt, function (result, status) {
    console.log(status);
    if (status === "OK") {
      console.log(result);
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      const bounds = new kakao.maps.LatLngBounds();
      result.forEach(function (item, idx) {
        //여기다가 마커 표시
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(item.y, item.x),
        });
        /*
        kakao.maps.event.addListener(marker, "click", function () {
          //   alert("click");
          infoWindow.setContent(`
          <div>${item.place_name}</div>
          <div>${item.phone}</div>
          <div>${item.road_address_name}</div>
          <div><a href="${item.place_url}" target="_blank">매장 정보</a></div>
          `);
          infoWindow.open(map, marker);
        });*/

        kakao.maps.event.addListener(marker, "click", function () {
          customOverlay.setContent(
            `<div class="contents-box">
                <div class="title">${item.place_name}</div>
                <div class="phone">${item.phone}</div>
                <div class="address">${item.road_address_name}</div>
                <div class="info"><a href="${item.place_url}" target="_blank">매장 정보</a></div>
                <button class="close" onClick="close()">
                <span class="material-icons">close</span></button>
            </div>`
          );
          customOverlay.setMap(map);
          customOverlay.setPosition(marker.getPosition());
        });
        bounds.extend(new kakao.maps.LatLng(item.y, item.x));
      });
      map.setBounds(bounds);
    } else {
      alert("검색 결과가 존재하지 않습니다.");
    }
  });
}
