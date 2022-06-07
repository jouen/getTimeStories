<?php

// get content from the link
$time_txt = file_get_contents('https://time.com/');

// explode to get the target data on this sample we need to get the li element for the latest stories secton
$split_content_div = explode("partial latest-stories",$time_txt);
$split_content_ul = explode("<ul>",$split_content_div[1]);
$split_content_ul_end = explode("</ul>",$split_content_ul[1]);
$split_li = explode('<li class="latest-stories__item">',$split_content_ul_end[0]);


//extra the data to put on array and get titles and links
$latest_stories_arr = [];
foreach ($split_li as $li_index => $li) {
    if($li_index != 0)
    {
        $story_title = explode('<h3 class="latest-stories__item-headline">',$li);
        $story_title = explode('</h3>',$story_title[1]);
        $story_title = $story_title[0];

        $story_link = explode('<a href="',$li);
        $story_link = explode('">',$story_link[1]);
        $story_link = $story_link[0];

        array_push($latest_stories_arr,array(
            "title" => $story_title,
            "link" => $story_link
        ));

    }
}

//return the data as json
echo json_encode($latest_stories_arr);

?>