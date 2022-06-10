<?php

// get content from the link
$time_txt = file_get_contents('https://time.com/');

// create the regex for getting latest stories
preg_match_all('/<li class="latest-stories__item">\n.*?<a href="(.*?)">\n.*?<h3 class="latest-stories__item-headline">(.*?)<\/h3>\n.*?<\/a>/i',$time_txt,$match);

$links = $match[1];
$names = $match[2];


//extra the data to put on array and get titles and links
$latest_stories_arr = [];
foreach ($links as $link_index => $link) {
    array_push($latest_stories_arr,array(
        "title" => $names[$link_index],
        "link" => $link
    ));
}

//return the data as json
echo json_encode($latest_stories_arr);

?>