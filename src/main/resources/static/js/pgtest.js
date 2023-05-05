$(function () {
    let number = document.querySelectorAll(".rds").length;//题目数量
    let c = document.querySelectorAll('.item_2').length
    //默认显示第一题
    $(".rds").eq(0).siblings(".rds").css("display", "none");
    const app = new Vue({
        el: '#root',
        data() {
            return {
                pageCount: 0,//页数
                number:number,
                data: {},
            }
        },
        methods: {
            fn() {
                this.pageCount++;
                this.pageCount = this.pageCount > this.number - 1 ? this.number - 1 : this.pageCount;
                $(".rds").eq(this.pageCount).fadeIn(1500).siblings(".rds").css("display", "none");
            },
            pgup() {
                this.fn();
            },
            pgdown() {
                this.pageCount--;
                this.pageCount = this.pageCount < 0 ? 0 : this.pageCount;
                $(".rds").eq(this.pageCount).fadeIn(1500).siblings(".rds").css("display", "none");
            },
            reset() {
                $(".rds").eq(0).slideDown().siblings(".rds").css("display", "none");
                $(".result").hide();
                this.pageCount = 0;
                $(".item_2").each(function (index, element) {
                    if ($(this).hasClass("active"))
                        $(this).removeClass("active");
                })
            },
            scorequiz()
            {
                var arrayObj =[];
                for(let i=1;i<this.number;i++){
                    arrayObj.push($(`input[name='${i}admin']:checked`).val());
                }
                var count = 0;
                var a=0
                for (var i = 0; i < arrayObj.length; i++) {
                    count += parseInt(arrayObj[i]);
                }
                count = parseInt((count /(5*this.number))*100);
                //设置文本
                if (count >= 90) {
                    a=4;
                    // $(":text").val("分数：" + count + "分," + "重度心理障碍");
                } else if (count >= 80 && count < 90) {
                    a=3;
                    // $(":text").val("分数：" + count + "分," + "严重心理障碍");
                } else if (count >= 70 && count < 80) {
                    a=2;
                    // $(":text").val("分数：" + count + "分," + "中度心理障碍");
                } else if (count >= 60 && count < 70) {
                    a=1;
                    // $(":text").val("分数：" + count + "分," + "轻度心理障碍");
                } else if(count >= 0 && count < 60){
                    a=0
                    // $(":text").val("分数：" + count + "分," + "您的心理很健康")
                }else{
                    layer.open({
                        title:"提示",
                        content: '你有未完成的题目，请完成后提交测试！',
                        anim:6,
                    });
                    a=-1;
                }
                if(a!=-1){
                    axios.get("../js/data.json").then(res => {
                        this.data = res.data[a];
                    })
                    if (count >= 0)
                    {
                        //发送ajax请求
                        $.ajax({
                            url: '/pgtest/add?count='+count,
                            type: 'GET',
                            success: function (result) {
                                if (result.status = true) {
                                    layer.closeAll();
                                    var index =layer.load(2,{time:1000})
                                    layer.msg('测试成功', {time: 1 * 1000}, function () {
                                        layer.close(index);
                                        $(".result").slideDown();
                                    });
                                } else {
                                    layer.closeAll();
                                    layer.msg('测试失败', {time: 1 * 1000}, function () {
                                    });
                                }
                            },
                            error: function (errorMsg) {
                                alert("数据异常！" + errorMsg);
                            },
                        });
                    }
                }
            }
        },
        mounted() {
            for (let i = 0; i < c; i++) {
                $(".item_2").eq(i).click(() => {
                    //点击选中子元素input
                    $(".item_2").eq(i).children("input[type='radio']").prop("checked", true)
                    //判断是否含有active类，没有添加，给其兄弟元素去除active类
                    if (!$(".item_2").eq(i).hasClass("active")) {
                        $(".item_2").eq(i).addClass("active").siblings('.item_2').removeClass("active")
                    }
                    if (i % 3 === 0) {
                        $(".gif").fadeIn(2000).fadeOut();
                        setTimeout(() => {
                            this.fn();
                            // $(".page").html(`${this.pageCount + 1} / ${count}`)
                        }, 2300)
                    } else {
                        setTimeout(() => {
                            this.fn();
                            // $(".page").html(`${this.pageCount + 1} / ${count}`)
                        }, 300)
                    }
                })
            }
        },
    });
})
