$(function() {
  var urls = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/1280px-Hopetoun_falls.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/44_-_Iguazu_-_D%C3%A9cembre_2007.jpg/1920px-44_-_Iguazu_-_D%C3%A9cembre_2007.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Ocean_from_Leblon.jpg/1280px-Ocean_from_Leblon.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Aravalli.jpg/1280px-Aravalli.jpg",
    "https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg"
  ];

  thumbnail_list(urls);

  $(document).bind('drop dragover', function (e) {
    e.preventDefault();
  });
  $(document).bind('drop', function (e) {
    var url = $(e.originalEvent.dataTransfer.getData('text/html')).filter('img').attr('src');
    if (url) {
      urls.push(url);
      thumbnail_list(urls);
    }
    $('#myCarousel').carousel();
  });

  $(this).dblclick(function () {
    var url = prompt("Add an URL for an image.");
    var re = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
    if (re.test(url)) {
      urls.push(url);
      thumbnail_list(urls);
    }
  });

});

function thumbnail_list(urls) {
  $('#thumbnail-row').empty();

  var thumbnail = document.getElementById('thumbnail-row');

  for (var i = 0; i < urls.length; i++) {
    var new_div = document.createElement('div');
    new_div.className = 'col-sm-6 col-md-4 col-lg-3';
    var new_img = document.createElement('img');
    new_img.className = 'img-thumbnail';
    new_img.src = urls[i];
    new_img.id = i;
    new_div.appendChild(new_img);

    thumbnail.appendChild(new_div);

    if (i % 2 == 1) {
      var new_clearfix = document.createElement('div');
      new_clearfix.className = 'clearfix visible-sm-block';
      thumbnail.appendChild(new_clearfix);
    }
    if (i % 3 == 2) {
      var new_clearfix = document.createElement('div');
      new_clearfix.className = 'clearfix visible-md-block';
      thumbnail.appendChild(new_clearfix);
    }
    if (i % 4 == 3) {
      var new_clearfix = document.createElement('div');
      new_clearfix.className = 'clearfix visible-lg-block';
      thumbnail.appendChild(new_clearfix);
    }
  }

  $('#thumbnail img').click(function () {
    var carousel_inner = document.getElementById('carousel-inner');
    load_images_to_carousel(urls, carousel_inner, this.id);

    $('#thumbnail').css('display', 'none');
    $('#carousel').css('display', 'block');

    $('.carousel img').css('max-height', $(window).height());  

    $('#carousel').css('cursor', 'none');
  
    $('#myCarousel').carousel();
  });
}

function load_images_to_carousel(urls, carousel_inner, active) {
  for (var i = 0; i < urls.length; i++) {
    var this_div = document.createElement('div');
    if (i == active)
      this_div.className = 'item active';
    else
      this_div.className = 'item';
    var this_img = document.createElement('img');
    this_img.src = urls[i];
    this_div.appendChild(this_img);
    carousel_inner.appendChild(this_div);
  }

  $('#carousel').click(function () {
    $('#carousel').css('display', 'none');
    $('#thumbnail').css('display', 'block');
    $('#carousel-inner').empty();
  });
}
