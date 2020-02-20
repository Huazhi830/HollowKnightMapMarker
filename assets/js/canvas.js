//jshint esversion:6

const canvas = document.getElementById('canvas');

//檢測瀏覽器是否支援
if (canvas.getContext) {
    const context = canvas.getContext('2d');

    let Markers = [];

    //Map
    const map = new Image();
    var valueSelected = 2;
    map.src = "assets/img/" + valueSelected + ".png";

    $('select').on('change', function (e) {
        valueSelected = this.value;
        map.src = "assets/img/" + valueSelected + ".png";
        Markers = [];
    });

    //標記圖片src
    let imgSrc = "assets/img/mapMark00.png";

    //創建一個標記物件
    const Marker = function (xPos, yPos) {
        this.img = new Image();
        this.img.src = imgSrc;
        this.width = 48;
        this.height = 48;
        this.xPos = xPos;
        this.yPos = yPos;
    };

    //點擊li更改標記圖片src
    $('li').on("click", function () {
        let markValue = $(this).data("value");
        imgSrc = "assets/img/mapMark" + markValue + ".png";
    });

    //創建function待滑鼠點擊畫布區塊執行添加標記數組
    let mouseClicked = function (mouse) {

        // 獲取畫布中鼠標座標
        const rect = canvas.getBoundingClientRect(); //返回畫布的大小及其相對viewport的位置。
        let mouseXPos = (mouse.x - rect.left);
        let mouseYPos = (mouse.y - rect.top);

        // 將新的標籤座標移動至鼠標點擊的位置 (減去圖片的寬高/2以使其置中於鼠標)
        let markerXPos = mouseXPos - (48 / 2);
        let markerYPos = mouseYPos - (48 / 2);

        //每次滑鼠點擊時創建新位置的標記物件
        let marker = new Marker(markerXPos, markerYPos);

        Markers.push(marker);
    };

    // 當事件滑鼠按下時啟用函數
    canvas.addEventListener("mousedown", mouseClicked);

        const draw = function () {
        // Draw map
        // map, X位置, Y位置, 圖片寬度, 圖片高度
        context.drawImage(map, 0, 0, canvas.width, canvas.height);

        // Draw markers
        for (let i = 0; i < Markers.length; i++) {
            let tempMarker = Markers[i];
            // Draw marker
            context.drawImage(tempMarker.img, tempMarker.xPos, tempMarker.yPos, tempMarker.width, tempMarker.height);
        }
    };

    //每秒調用60次函數
    setInterval(draw, (1000 / 60));

} else {
    console.log("canvas-unsupported");
}