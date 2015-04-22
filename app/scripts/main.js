/* jshint devel:true */

$(document).ready(function(){
    'use strict';
    var key = 'AIzaSyDSzUfv_Oq_3UBCcWsQLR5-uGQjDpj2cc4';
    var channelId = 'UCgnzeuaZ0p01TUB39fI20sA';
    var params = {
        'part':'snippet',
        'key':key,
        'channelId': channelId,
        maxResults:50,
        order:'date',
        type:'video'
        
    };
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var player;
    
    var displayVideo = function(video){
        var template = $('#template').clone();
        template.attr('id', video.id.videoId);
        template.removeClass('hidden');
        var img = template.find('.vthumb');
        img.attr('src', video.snippet.thumbnails.default.url);
        img.attr('title', video.snippet.description);
        template.find('.videoTitle').text(video.snippet.title);
        template.find('.videoTitle').attr('data-id', video.id.videoId);
        return template;
    };
    
    var processVideos = function(data){
       
        var videoId;
        $.each(data.items, function(i, item){
            if(i == 0){
                videoId = item.id.videoId;
            }
            var html =  displayVideo(item);
            $('#tube').append(html);
        });
        
        player = document.createElement('iframe');
        player.setAttribute('id', 'ytplayer');
        player.setAttribute('type','text/html');
        player.setAttribute('width', '640');
        player.setAttribute('height', '390');
        player.setAttribute('frameborder', '0');
        player.setAttribute('src', 'http://www.youtube.com/embed/' + videoId + '?html5=1');
        
        $('#player').append(player);
        
    };
    
    $.getJSON(url, params, processVideos);
    
    $('#tube').on('click', '.video', function(e){
        e.preventDefault();
        var videoId = $(this).find('.videoTitle').data('id');
        $('#ytplayer').attr('src', 'http://www.youtube.com/embed/' + videoId + '?autoplay=true&html5=1');
    });
    
});




