// 모달을 가져옵니다
var modal = document.getElementById("myModal");

// 모달을 여는 버튼을 가져옵니다
var btn = document.getElementById("mapBtn");

// 모달을 닫는 <span> 요소를 가져옵니다
var span = document.getElementsByClassName("close")[0];


console.log(btn);

btn.onclick = function () {
    modal.style.display = "block";
    // 모달이 열릴 때 지도를 가져오는 함수를 호출합니다.
    getLocation();
}

// 사용자가 <span> (x)를 클릭하면 모달을 닫습니다
span.onclick = function() {
    modal.style.display = "none";
}

// 사용자가 모달 외부를 클릭하면 모달을 닫습니다
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var map;
var geocoder = new kakao.maps.services.Geocoder();

        // 현재 위치를 받아오는 함수
        function displayMap(lat, lng) {
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = {
                    center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };  

            // 지도를 생성합니다    
            map = new kakao.maps.Map(mapContainer, mapOption); 

            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(lat, lng)
            });

            marker.setMap(map);
        }

        // 사용자의 현재 위치를 받아오는 함수
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var lat = position.coords.latitude, // 위도
                        lng = position.coords.longitude; // 경도

                    displayMap(lat, lng);
                });
            } else { 
                alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
            }
        }

        // 페이지 로드 시 사용자의 현재 위치를 기반으로 지도를 표시합니다.
        getLocation();

        // 키워드 검색을 실행하는 함수
        function searchPlaces() {
            var keyword = document.getElementById('keyword').value;

            if (!keyword.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요!');
                return false;
            }

            // 장소 검색 객체를 생성합니다
            var ps = new kakao.maps.services.Places(); 

            // 키워드로 장소를 검색합니다
            ps.keywordSearch(keyword, function(data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {
                    // 검색된 장소의 첫 번째 위치를 기반으로 지도 중심을 변경합니다
                    var coords = new kakao.maps.LatLng(data[0].y, data[0].x);
                    map.setCenter(coords);

                    // 검색된 위치에 마커를 생성하고 지도에 표시합니다
                    var marker = new kakao.maps.Marker({
                        position: coords
                    });

                    marker.setMap(map);
                } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                    alert('검색 결과가 존재하지 않습니다.');
                    return;
                } else if (status === kakao.maps.services.Status.ERROR) {
                    alert('검색 중 오류가 발생했습니다.');
                    return;
                }
            }); 
        }


// 관광지 공공데이터 API 키
var TOUR_API_KEY = 'ZsoCi%2FK48wNtjVwHY1B%2BOnCR04mhFvkKbMVzylo9gWZjKCa1NlI9KtoIE9sc%2F04h0kxe5MkXGlpaf%2BIQBhdAlQ%3D%3D';
    
// 카카오 맵 API 초기화
var map;
kakao.maps.load(function() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 7 // 지도의 확대 레벨
        };  

    // 지도를 생성합니다    
    map = new kakao.maps.Map(mapContainer, mapOption); 
});

// 지역 코드와 키워드로 관광지를 검색하는 함수
function searchTouristSpots() {
    var areaCode = document.getElementById('areaCode').value;
    var contentTypeId = document.getElementById('contentTypeId').value;

    var url = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${TOUR_API_KEY}&numOfRows=30&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&contentTypeId=${contentTypeId}&areaCode=${areaCode}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.response.header.resultCode === "0000") {
                displayTouristSpots(data.response.body.items.item);
                displaySearchResults(data.response.body.items.item);
            } else {
                console.error('Error:', data.response.header.resultMsg);
            }
        })
        .catch(error => console.error('Error:', error));
}

function displaySearchResults(spots) {
    var sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = ''; // Clear previous results

    spots.forEach((spot, index) => {
        var resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        var imageSrc = spot.firstimage ? spot.firstimage : '../img/main2.png'; // 이미지가 없으면 기본 이미지로 설정
        resultItem.innerHTML = `
            <div class="info-container">
                <div class="title">${spot.title}</div>
                <div class="description">${spot.addr1} ${spot.addr2 ? spot.addr2 : ''}</div>
            </div>
            <div class="image-container">
                <img src="${imageSrc}" alt="${spot.title}">
            </div>
        `;
        sidebar.appendChild(resultItem);

        // 결과 항목 클릭 이벤트 리스너 추가
        resultItem.addEventListener('click', function() {
            // 해당 관광지의 마커 클릭 이벤트를 트리거합니다.
            kakao.maps.event.trigger(markers[index], 'click');
        });
    });
}

// 검색 결과를 지도에 표시하는 함수
var markers = []; // 전역 변수로 마커를 관리할 배열 추가

function displayTouristSpots(spots) {
    var bounds = new kakao.maps.LatLngBounds();
    markers = []; // 새로운 검색 결과를 위해 마커 배열 초기화

    spots.forEach(spot => {
        var markerPosition  = new kakao.maps.LatLng(spot.mapy, spot.mapx); 
        
        // Custom image for marker
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
            imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
            imageOption = {offset: new kakao.maps.Point(12, 35)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage // 마커이미지 설정 
            });
        
        marker.setMap(map);
        bounds.extend(markerPosition);
        markers.push(marker); // 생성된 마커를 배열에 추가

        // 마커에 클릭 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 이미 열려있는 오버레이가 있다면 닫습니다.
            if (marker.overlay) {
                marker.overlay.setMap(null);
            }

            // 이미지가 없는 경우 대체 이미지 경로 설정
            var imageToShow = spot.firstimage ? spot.firstimage : '../img/main2.png';

            // 커스텀 오버레이에 표시할 컨텐츠 문자열
            var contentString = `<div class="wrap">` + 
                        `    <div class="info">` + 
                        `        <div class="title">` + 
                        `            ${spot.title}` + 
                        `            <div class="close" title="닫기"></div>` + 
                        `        </div>` + 
                        `        <div class="body">` + 
                        `            <div class="img">` +
                        `                <img src="${imageToShow}" width="73" height="70">` +
                        `           </div>` + 
                        `            <div class="desc">` + 
                        `                <div class="ellipsis">${spot.addr1} ${spot.addr2 ? spot.addr2 : ''}</div>` + 
                        `            </div>` + 
                        `        </div>` + 
                        `    </div>` +    
                        `</div>`;

            // 커스텀 오버레이를 생성합니다
            var overlay = new kakao.maps.CustomOverlay({
                content: contentString,
                map: map,
                position: marker.getPosition()
            });

            // 마커에 오버레이를 연결합니다.
            marker.overlay = overlay;

            // 오버레이의 컨텐츠를 DOM으로 변환합니다.
            var contentNode = document.createElement('div');
            contentNode.innerHTML = contentString;

            // close 버튼에 클릭 이벤트 리스너를 추가합니다.
            var closeBtn = contentNode.querySelector('.close');
            closeBtn.onclick = function() {
                overlay.setMap(null);
            };

            // 오버레이에 변환된 DOM 컨텐츠를 설정합니다.
            overlay.setContent(contentNode);

            // 마커가 열린 장소를 지도의 중심으로 이동시킵니다.
            map.setCenter(markerPosition);
        });
    });

    map.setBounds(bounds);
}