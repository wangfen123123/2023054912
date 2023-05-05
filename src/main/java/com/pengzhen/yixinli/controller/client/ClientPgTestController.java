package com.pengzhen.yixinli.controller.client;

import com.pengzhen.yixinli.common.LoginSession;
import com.pengzhen.yixinli.entity.PgTest;
import com.pengzhen.yixinli.service.PgTestService;
import com.pengzhen.yixinli.service.TopicService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 心理评测
 */
@Controller
public class ClientPgTestController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private TopicService topicService;

    @Autowired
    private PgTestService pgTestService;

    @RequestMapping("/pgtestUi")
    public String clientArticleUi(Model model) {

        model.addAttribute("topicList", topicService.selectByList());
        //共享数据
        return "client/html/pgtest";
    }


    @ResponseBody
    @RequestMapping("/pgtest/add")
    public Map<String, Object> addPgTest(@RequestParam("count") Integer count) {
        Map<String, Object> mapData = new HashMap<>();
        PgTest pgTest = new PgTest();
        if (count >= 90) {
            pgTest.setPgtestResult("重度心理障碍");
            pgTest.setPgtestTime(new Date());
            //从session中获取
            pgTest.setUserOp(LoginSession.getCurrentUser().getUsername());
            pgTest.setPgtestScore(count);
            logger.info("------------------------------------");
            //插入数据库
            boolean insert = pgTestService.insert(pgTest);
            mapData.put("status", insert);
            return mapData;
        } else if (count >=80 && count < 90) {
            pgTest.setPgtestResult("严重心理障碍");
            pgTest.setPgtestTime(new Date());
            //从session中获取
            pgTest.setUserOp(LoginSession.getCurrentUser().getUsername());
            pgTest.setPgtestScore(count);
            logger.info("==========================================");
            //插入数据库
            boolean insert = pgTestService.insert(pgTest);
            mapData.put("status", insert);
            return mapData;
        } else if (count >= 70 && count < 80) {
            pgTest.setPgtestResult("中度心理障碍");
            pgTest.setPgtestTime(new Date());
            //从session中获取
            pgTest.setUserOp("test");
            pgTest.setPgtestScore(count);
            logger.info("=================");
            //插入数据库
            boolean insert = pgTestService.insert(pgTest);
            mapData.put("status", insert);
            return mapData;
        } else if (count >= 60 && count < 70) {
            pgTest.setPgtestResult("轻度心理障碍");
            pgTest.setPgtestTime(new Date());
            //从session中获取
            pgTest.setUserOp(LoginSession.getCurrentUser().getUsername());
            pgTest.setPgtestScore(count);
            logger.info("+++++++++++++++++++++");
            //插入数据库
            boolean insert = pgTestService.insert(pgTest);
            mapData.put("status", insert);
            return mapData;
        }else {
            pgTest.setPgtestResult("您的心理很健康");
            pgTest.setPgtestTime(new Date());
            //从session中获取
            pgTest.setUserOp(LoginSession.getCurrentUser().getUsername());
            pgTest.setPgtestScore(count);
            logger.info("+++++++++++++++++++++");
            //插入数据库
            boolean insert = pgTestService.insert(pgTest);
            mapData.put("status", insert);
            return mapData;
        }
    }


}
