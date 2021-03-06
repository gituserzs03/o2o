$(function () {
    getlist();

    function getlist() {
        $.ajax({
            url: "/o2o/shopadmin/getshoplist",
            type: "get",
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    handleUser(data.user);
                    handleList(data.shopList);
                }
            }
        });
    }

    function handleUser(user) {
        $("#userName").text(user.name);
    }

    function handleList(shopList) {
        var html = '';
        shopList.map(function (item, index) {
            html += '<div class="row" style="border-top: 1px solid darkgray">' +
                '<div class="col-40">' + item.shopName + '</div>' +
                '<div class="col-40">' + shopStatus(item.enableStatus) + '</div>' +
                '<div class="col-20">' + goShop(item.enableStatus, item.shopId) + '</div>' +
                '</div>'
        });
        $(".shop-wrap").html(html);
    }

    function shopStatus(status) {
        if (status == 0) {
            return "审核中";
        } else if (status == -1) {
            return "店铺非法";
        } else if (status == 1) {
            return "审核通过";
        }
    }

    function goShop(status, shopId) {
        if (status == 1) {
            return '<a href="/o2o/shopadmin/shopmanagement?shopId=' + shopId + '">进入</a>'
        } else {
            return '';
        }
    }
})