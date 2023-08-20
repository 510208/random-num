$(document).ready(function () {
    // 使用 jQuery 攔截表單提交事件
    $("form").submit(function (event) {
        event.preventDefault();

        var minimumRange = parseInt($("#minimumRange").val());
        var maximumRange = parseInt($("#maximumRange").val());
        var numberQuantity = parseInt($("#numberQuantity").val());
        var numberType = $("input[name='numberType']:checked").val();
        var numberInterval = parseInt($("#numberInterval").val());

        var $resultTableBody = $("#resultTableBody");
        $resultTableBody.empty();

        for (var i = 0; i < numberQuantity; i++) {
            var number = generateNumber(minimumRange, maximumRange, numberType, numberInterval);
            var row = $("<tr>").append(`<td>數字 ${i + 1}</td><td class="text-left" style="width: 70%;">${number}</td><td class="text-right" style="width: 120px;"><button class="btn btn-primary copy-btn"><i class="far fa-copy"></i> 複製</button></td>`);
            $resultTableBody.append(row);
        }

        // 為複製按鈕添加點擊事件
        $(".copy-btn").click(function () {
            var numberToCopy = $(this).closest("tr").find("td:nth-child(2)").text();
            copyToClipboard(numberToCopy);
        });
    });

    $("#generateNumbers").click(function () {
        // 將進度條進度設為 0，並停止動畫
        $("#progressBar").css("width", "0%");
    
        var minimumRange = parseInt($("#minimumRange").val());
        var maximumRange = parseInt($("#maximumRange").val());
        var numberQuantity = parseInt($("#numberQuantity").val());
        var numberType = $("input[name='numberType']:checked").val();
        var numberInterval = parseInt($("#numberInterval").val());
    
        var $resultTableBody = $("#resultTableBody");
        $resultTableBody.empty();
    
        for (var i = 0; i < numberQuantity; i++) {
            var number = generateNumber(minimumRange, maximumRange, numberType, numberInterval);
            var row = $("<tr>").append(`<td>數字 ${i + 1}</td><td>${number}</td>`);
            $resultTableBody.append(row);
        }
    
        // 延遲 0.1 秒後將進度條設為 100%
        setTimeout(function () {
            $("#progressBar").css("width", "100%");
            
            // 延遲 0.2 秒後停止進度條動畫並移除斜線
            setTimeout(function () {
                $("#progressBar").removeClass("progress-bar-animated"); // 停止動畫
                $("#progressBar").addClass("no-animation"); // 移除斜線並設置純色
            }, 100);
        }, 100);
    });    

    $("#copyNumbers").click(function () {
        var $resultTableBody = $("#resultTableBody");
        var numbers = $resultTableBody.find("td:nth-child(2)").map(function () {
            return $(this).text();
        }).get();
        var copiedNumbers = numbers.join(",");

        var $textarea = $("<textarea>").val(copiedNumbers);
        $("body").append($textarea);
        $textarea.select();
        document.execCommand("copy");
        $textarea.remove();

        alert("已複製數字: " + copiedNumbers);
    });

    function generateNumber(minimumRange, maximumRange, numberType, numberInterval) {
        var number;
        do {
            number = Math.floor(Math.random() * (maximumRange - minimumRange + 1)) + minimumRange;
        } while ((numberType === "odd" && number % 2 === 0) || (numberType === "even" && number % 2 !== 0) || (numberInterval > 1 && number % numberInterval !== 0));
        return number;
    }

    // 複製文本到剪貼簿的函數
    function copyToClipboard(text) {
        var $textarea = $("<textarea>").val(text);
        $("body").append($textarea);
        $textarea.select();
        document.execCommand("copy");
        $textarea.remove();
        alert("已複製數字: " + text);
    }

    window.onload = function() {
        // 頁面完全載入後淡出載入中畫面
        setTimeout(function () {
            $('#loading-screen').fadeOut('slow');
        }, 1000);
    }
});
