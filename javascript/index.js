$(document).ready(function() {
    var project = {};
    var margin = 20;
    var location = {}

    function setLocations() {
        location = [
            ["#nav_home", getLocation("#home") - margin],
            ["#nav_projects", getLocation("#projects") - margin],
            ["#nav_articles", getLocation("#articles") - margin],
            ["#nav_about", getLocation("#about") - margin],
            ["#nav_contact", getLocation("#contact") - margin]
        ];
    }

    function highlightNavigation(position) {
        var nav_height = $(".nav").height();
        for (var i = (location.length - 1); i >= 0; i--) {
            if (position > (location[i][1] - nav_height)) {
                console.log(position + "," + location[i]);
                $('.selected').removeClass('selected');
                $(location[i][0]).addClass('selected');
                i = -1;
                //console.log("highlight"+location[i][1]);
            }
        }
    }

    function getLocation(name) {
        return $(name).offset().top;
    }

    function scrollToLoc(event_name, className) {
       if (event_name != null) {
	     event_name.preventDefault();
	   }
        var nav_height = $(".nav").height();
        var loc = $(className).offset().top - nav_height;
        var speed = (Math.abs($(document).scrollTop() - loc) / $(document).height()) * 1000;
        $('body,html').animate({
            scrollTop: (loc - margin)
        }, speed);
        console.log(speed);
		
    }

    function toggleProject(project_path) {
        if (project[project_path] == true) {
            $('#project_body').hide();
            project[project_path] = false;
            $(window).ready(function() {
                setLocations();
            });
        } else {
            negate_projects();
            project[project_path] = true;
            $("#project_body").hide();
            $.get(project_path, function(data) {
                var new_data = $(data, ".content")
                $("#project_body").html(new_data);
                $(window).ready(function() {
                    $("#project_body").show();
                    scrollToLoc(null, ".project_header");
                    setLocations();
                });
            });
        }
    }

    function negate_projects() {
        project["mapit.html"] = false;
        project["massmailer.html"] = false;
        project["newproject.html"] = false;
    }
	
    negate_projects();
    setLocations();
    $(".project_body").hide();
    $(".image_hover").hide();
    $("#project_body").hide();
    
	$.get("quotes.json", function(data) {
        var index = Math.random() * 4 - 1;
        index = Math.ceil(index);
        var quote = data[index]["quote"];
        var author = data[index]["author"];
        $(".quote").append(quote);
        $(".creator").append("- " + author);
    }, "json");
    $('#nav_home').on('click', function(event) {
        scrollToLoc(event, "#home")
    });
    $('#nav_projects').on('click', function(event) {
        scrollToLoc(event, "#projects")
    });
    $('#nav_contact').on('click', function(event) {
        scrollToLoc(event, "#contact")
    });
    $('#nav_about').on('click', function(event) {
        scrollToLoc(event, "#about")
    });
    $('#nav_articles').on('click', function(event) {
        scrollToLoc(event, "#articles")
    });
    $('.project_tile').on('mouseleave', function(event) {
        if (project["mapit.html"] == false) {
            $('#mapit_tile').find('.image_hover').hide();
           // $('#mapit_tile').find('.image_normal').show()
        }
        if (project["massmailer.html"] == false) {
            $('#massmailer_tile').find('.image_hover').hide();
           // $('#massmailer_tile').find('.image_normal').show()
        }
        if (project["newproject.html"] == false) {
            $('#newproject_tile').find('.image_hover').hide();
           // $('#newproject_tile').find('.image_normal').show()
        }
    });
    $(".project_tile").on('mouseenter', function(event) {
      //  $(this).find('.image_normal').hide();
        $(this).find('.image_hover').show();
    });
    $("#mapit_tile").on("click", function(event) {
      //  $("#mapit_tile").find('.image_normal').hide();
        $("#mapit_tile").find('.image_hover').show();
        toggleProject("mapit.html");
    });
    $("#massmailer_tile").on("click", function(event) {
       // $("#massmailer_tile").find('.image_normal').hide();
        $("#massmailer_tile").find('.image_hover').show();
        toggleProject("massmailer.html");
    });
    $("#newproject_tile").on("click", function(event) {
       // $("#newproject_tile").find('.image_normal').hide();
        $("#newproject_tile").find('.image_hover').show();
        toggleProject("newproject.html");
    });
	
    $(window).on('scroll', function() {
        // we round here to reduce a little workload
        scroll_stop = Math.round($(window).scrollTop());
        highlightNavigation(scroll_stop);
    });
	
	$( window ).resize(function() {
  		setLocations();
	});
});