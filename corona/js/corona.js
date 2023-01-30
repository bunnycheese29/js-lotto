const pickedDate = document.querySelector("#picked-date");
const loading = document.querySelector(".loading");
const picker = new easepick.create({
  element: document.querySelector("#picked-date"),
  css: ["./css/easepick.css"],
  setup(picker) {
    picker.on("select", (e) => {
      const { date } = e.detail; //{}니까 object.
      console.log(date);
      loadCoronaData(pickedDate.value);
    });
  },
});

let chart = null;
const now = dayjs().format("YYYY-MM-DD");
pickedDate.value = now;
loadCoronaData(now);

function loadCoronaData(pickedDate) {
  loading.classList.remove("off"); //다른 날짜 누르고 로딩 중일 때 로딩 아이콘
  if (chart !== null) {
    //다른 날짜 누르고 로딩 할 때 기존 차트 없애버림
    chart.destroy();
  }
  const myFetch = fetch(
    `http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api?serviceKey=5HKu4kuPdWNevK72BhiSuOykywU%2FpuEci%2B%2B9HHrq6GNpmDrjyujQeONuLB7OD3pG%2F3%2BGnxGg1UcyIx0724XM8Q%3D%3D&pageNo=1&numOfRows=100&apiType=JSON&std_day=${pickedDate}`
  );

  myFetch
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      loading.classList.add("off");
      console.log(result.items);
      const cities = [];
      const dates = [];

      //오름차순 정렬 (a,b 앞뒤 숫자를 비교)
      result.items.sort(function (a, b) {
        if (parseInt(a.incDec) > parseInt(b.incDec)) {
          return 1;
        }
        if (parseInt(a.incDec) < parseInt(b.incDec)) {
          return -1;
        }
        if (parseInt(a.incDec) === parseInt(b.incDec)) {
          return 0;
        }
      });
      //이름순 정렬
      // result.items.sort(function (a, b) {
      //   if (a.gubun > b.gubun) {
      //     return 1;
      //   }
      //   if (a.gubun < b.gubun) {
      //     return -1;
      //   }
      //   if (a.gubun === b.gubun) {
      //     return 0;
      //   }
      // });

      result.items.forEach(function (item, idx) {
        cities.push(item.gubun);
        dates.push(item.incDec);
      });

      Chart.defaults.font.size = 18;
      Chart.defaults.backgroundColor = "#FFE4EC";
      const ctx = document.querySelector("#myChart");
      chart = new Chart(ctx, {
        type: "bar", //bar, doughnut, line
        data: {
          labels: cities,
          datasets: [
            {
              label: "# of Votes",
              data: dates,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch(function () {
      console.log("안왔음");
    });
}
