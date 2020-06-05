var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Visitor = require('./../models/visitor');


//오늘 방문자 수 반환 및 방문자 카운트 증가
//visit쿠키를 설정하여 해당 쿠키가 존재하면 방문자 수 증가
router.get('/',function(req,res,next){
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() +1);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    if(req.cookies === {}){
        console.log('no cookies');
    }
    else{
        if(req.cookies.visit){
            Visitor.findOne({date: today},(err, date)=>{
                if(err) console.log(err);
                else{
                    if(date == null){
                        res.cookie('visit', '1', { expires: tomorrow});
                        res.json({count : 1});
                    }else{
                        console.log(date);
                        res.cookie('visit', '1', { expires: tomorrow});
                        res.json({count : date.count});
                    }
                }
            });
            console.log('visited')
        }else{
            Visitor.findOne({date: today},(err, date)=>{
                if(err) console.log(err);
                else {

                    if(date == null){
                        var visit = new Visitor();
                        visit.count = 1;
                        visit.date = today;
                        visit.save((err)=>{
                            if(err){
                                console.log(err);
                            }else{
                                console.log("saved");
                                res.cookie('visit', '1', { expires: tomorrow});
                                res.json({count: 1});
                            }
                        });
                    }
                    else{
                        date.count += 1;
                        date.save((err)=>{
                            if(err){
                                console.log(err);
                            }else{
                                console.log("saved");
                                res.cookie('visit', '1', { expires: tomorrow});
                                res.json({res: date.count});
                            }
                        })
                    }
                }
            })
        }
    }

});

module.exports = router;
