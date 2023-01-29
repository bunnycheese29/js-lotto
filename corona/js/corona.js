const myFetch = fetch(
  "http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api?serviceKey=5HKu4kuPdWNevK72BhiSuOykywU%2FpuEci%2B%2B9HHrq6GNpmDrjyujQeONuLB7OD3pG%2F3%2BGnxGg1UcyIx0724XM8Q%3D%3D&pageNo=1&numOfRows=100&apiType=JSON&std_day=2023-01-26"
);

myFetch
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    console.log(result.items);
    const cities = [];
    const dates = [];
    result.items.forEach(function (item, idx) {
      cities.push(item.gubun);
      dates.push(item.incDec);
    });

    const ctx = document.querySelector("#myChart");
    new Chart(ctx, {
      type: "bar",
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
