var AppRouter = Backbone.Router.extend ({
	routes: {
		"" : "home",
		"home" : "home",
		"projects" : "projects",
		"articles" : "articles",
		"about" : "about",
		"contact" : "contact",
		"projects" : "projects",
		"projects/:project" : "project_tile"
	},
	
	home: function() {
		 scrollToLoc(null, "#home");
	},
	
	articles: function() {
		 scrollToLoc(null, "#articles");
	},

	projects: function() {
		 scrollToLoc(null, "#projects");
	},
	
	project_tile: function(project) {
		$(".image_hover").hide();
		$("#"+project+"_tile").find('.image_hover').show();
		toggleProject(project+".html");

	},
	
	about: function() {
		 scrollToLoc(null, "#about");
	},
	
	contact: function() {
		 scrollToLoc(null, "#contact");
	}

});

var app = new AppRouter();

$(function(){
	Backbone.history.start();
});