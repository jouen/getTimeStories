const express   = require('express');
const http      = require('http');

const app = express();

app.get('/',(req,res) => {

    res.send("Get Time Stories");
});

app.get('/api/getTimeStories',(req,res) => {

    const request   = require("request");

    request({uri: "https://time.com/"}, 
        function(error, response, body) {
            let regex = /<li class="latest-stories__item">\n.*?<a href="(.*?)">\n.*?<h3 class="latest-stories__item-headline">(.*?)<\/h3>\n.*?<\/a>/g;
            let match = [...body.matchAll(regex)];

            let res_data = [];
            match.forEach(match_data => {
                res_data.push({
                    title: match_data[1],
                    link: match_data[2],
                });
            });

            res.send(res_data);
    });
});

app.listen(3000, () => console.log("connected.."));