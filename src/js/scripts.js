$(function() {
  var urls = JSON.parse(localStorage.urls);

  thumbnail_list(urls);

  $(document).bind('drop dragover', function (e) {
    e.preventDefault();
  });
  $(document).bind('drop', function (e) {
    var url = $(e.originalEvent.dataTransfer.getData('text/html'));
    if (url.filter('img').attr('class') == 'img-thumbnail') {
      var data = url.filter('img').attr('id');
      var el = document.getElementById(data);
      $(el).hide(600);
      el.parentNode.removeChild(el);
      url = url.filter('img').attr('src');
      urls.splice(urls.indexOf(url), 1);
      thumbnail_list(urls);
    } else {
     url = url.filter('img').attr('src');
      if (url) {
        urls.push(url);
        thumbnail_list(urls);
      }
    }
  });

  $('img').on("error", function() {
    url = $(this).attr('src');
    urls.splice(urls.indexOf(url), 1);
    thumbnail_list(urls);
  });

  $(this).dblclick(function () {
    var url = prompt("Add an URL for an image.");
    var re = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
    if (re.test(url)) {
      urls.push(url);
      thumbnail_list(urls);
    }
  });

  $(this).keypress(function(e) {
    if (e.which == 13 || e.which == 32) {
      $('#myCarousel').carousel();
    }
  });
});

function thumbnail_list(urls) {
  $('#thumbnail-row').empty();

  localStorage.name = 'urls';
  localStorage.urls = JSON.stringify(urls);

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
