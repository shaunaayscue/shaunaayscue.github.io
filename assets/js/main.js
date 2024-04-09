jQuery(document).ready(function($) {


	/*======= Skillset *=======*/

	$('.level-bar-inner').css('width', '0');

	$(window).on('load', function() {

		$('.level-bar-inner').each(function() {

			var itemWidth = $(this).data('level');

			$(this).animate({
				width: itemWidth
			}, 800);

		});


		/* Bootstrap Tooltip for Skillset */
		$('.level-label').tooltip();


		let gitHubUsername = 'shaunaayscue';

		// Run GitHub API function, passing in the GitHub username
		requestUserRepos(gitHubUsername)
			// resolve promise then parse response into json
			.then(response => response.json())
			// resolve promise then iterate through json
			.then(data => {
				// update html with data from github
				let projectList = data.slice(0, 3); //limit to the last 3 repos.....
				for (let i in projectList) {
				
					// Get the div with id of projects
					let div = document.getElementById('projects');

					// Create variable that will create item's to be added to div
					let item = document.createElement('div');

					item.setAttribute('class', 'item');


					let langs = document.createElement('ul');

					//Get the list of languages for each repo
					requestRepoLanguages(projectList[i].languages_url).then(response => response.json()).then(langData => {

						for (let lang in langData) {

							let langItem = document.createElement('li');
							let name = document.createElement('p');

							name.innerHTML = `${lang}`;
							langItem.appendChild(name);
							langs.appendChild(langItem);

						};

					});


					// Create the html markup for each item
					item.innerHTML = (` <hr class="divider" /> <h3 class="title">${projectList[i].name} <span class="place" style="float:right;">
			   <a href="${projectList[i].html_url}"><i class="fa fa-github-alt"></i></a></span></h3>
                <p>
                               ${projectList[i].description}	</p> 
					`);


					//Append each language list to the item
					item.appendChild(langs);
					// Append each item to the div
					div.appendChild(item);

				}
			})

	});


	function requestUserRepos(username) {
		// create a variable to hold the `Promise` returned from `fetch`
		return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos?sort=created`));
	}


	function requestRepoLanguages(url) {
		// create a variable to hold the `Promise` returned from `fetch`
		return Promise.resolve(fetch(`${url}`));
	}
});