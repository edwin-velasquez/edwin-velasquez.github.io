var scrollToLoc;
var toggleProject;

$(document).ready(function() {
    var project = {};
    var margin = 20;
    var location = {};
	
    function setLocations() {
		var nav_height = $(".nav").height();
        location = [
            ["#home", "#nav_home", getLocation("#home") - margin - nav_height],
            ["#projects", "#nav_projects", getLocation("#projects") - margin - nav_height],
            ["#articles", "#nav_articles", getLocation("#articles") - margin - nav_height],
            ["about", "#nav_about", getLocation("#about") - margin - nav_height],
            ["#contact", "#nav_contact", getLocation("#contact") - margin - nav_height]
        ];
    }

    function highlightNavigation(position) {
        for (var i = (location.length - 1); i >= 0; i--) {
            if (position >= (location[i][2])) {
                $('.selected').removeClass('selected');
                $(location[i][1]).addClass('selected');
                i = -1;
            }
        }
    }

    function getLocation(name) {
        return $(name).offset().top;
    }

    scrollToLoc = function(event_name, className) {
       if (event_name != null) {
	     event_name.preventDefault();
	   }
        var nav_height = $(".nav").height();
        var loc = $(className).offset().top - nav_height;
        var speed = (Math.abs($(document).scrollTop() - loc) / $(document).height()) * 1000;
        $('body,html').animate({
            scrollTop: (loc - margin)
        }, speed);
		
    }

    toggleProject = function(project_path) {
        if (project[project_path] == true) {
            $('#project_body').hide("fast", "linear", function(){
                setLocations();
            });
            project[project_path] = false;
        } else {
            negate_projects();
            project[project_path] = true;
            $.get(project_path, function(data) {
                var new_data = $(data, ".content")
                $("#project_body").html(new_data).promise().done(function() {
                    $("#project_body").show("fast", function(){
                        scrollToLoc(null, ".project_header");
                        setLocations();
                    });
                });
            });
        }
    }

    function negate_projects() {
        project["mapit.html"] = false;
        project["massmailer.html"] = false;
        project["newproject.html"] = false;
    }
    
	$.get("quotes.json", function(data) {
        var index = Math.random() * 4 - 1;
        index = Math.ceil(index);
        var quote = data[index]["quote"];
        var author = data[index]["author"];
        $(".quote").append(quote);
        $(".creator").append("- " + author);
    }, "json");

    $('.project_tile').on('mouseleave', function(event) {
        if (project["mapit.html"] == false) {
            $('#mapit_tile').find('.image_hover').hide();
        }
        if (project["massmailer.html"] == false) {
            $('#massmailer_tile').find('.image_hover').hide();
        }
        if (project["newproject.html"] == false) {
            $('#newproject_tile').find('.image_hover').hide();
        }
    });
    $(".project_tile").on('mouseenter', function(event) {
        $(this).find('.image_hover').show();
    });
	
    $(window).on('scroll', function() {
        scroll_stop = Math.round($(window).scrollTop());
        highlightNavigation(scroll_stop);
    });
	
	$( window ).resize(function() { setLocations(); });

    negate_projects();
    setLocations();
    $(".project_body").hide();
    $("#project_body").hide();
    $(".image_hover").hide();
    
	
});