const http      = require('http');
const url       = require("url");

const app = http.createServer(function(req,res){

    //strip url
    let url_string = req.url;
    let func = url_string.replace(/^\/api\/+|\/+$|\?.*/g,"");


    //check function if exist on routes
    if(typeof routes[func] !== "undefined")
    {
        routes[func](req,res);
    }else
    {
        console.log(func);
        routes.notFound(req,res);
    }
    

});

//set routes functions
const routes = {
    getTimeStories: function(req,res) {

        if(req.method != "GET")
        {
            routes.notFound(req,res);
            return;
        }

        const request   = require("request");

        //get content on time.com
        request({uri: "https://time.com/"}, 
        function(error, response, body) {

            //get only onn the latest storiees item
            let regex = /<li class="latest-stories__item">\n.*?<a href="(.*?)">\n.*?<h3 class="latest-stories__item-headline">(.*?)<\/h3>\n.*?<\/a>/g;
            let match = [...body.matchAll(regex)];

            
            let res_data = [];
            match.forEach(match_data => {

                //store the data on empty array and remove all html tags on the title
                res_data.push({
                    title: match_data[2].replace(/<.*?>|<\/.*?>/g,""),
                    link: match_data[1],
                });
            });

            //return 200 and result data
            res.writeHead(200,{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*"
            });
            res.write(JSON.stringify(res_data));
            res.end();

        });
        
    },
    notFound: function(req,res){

        let response = {
            message:"404 not found"
        }

        res.writeHead(400,{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
        });
        res.write(JSON.stringify(response));
        res.end();
    }
}


app.listen(3000, () => console.log("connected.."));