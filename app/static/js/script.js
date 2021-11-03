var el = (x) => document.getElementById(x);

function showPicker() {
	el('image-picked').src = '';
	el('upload-label').className = 'hide';
	el('recommendations').className = 'hide';
	el('file-input').value = '';
	el('file-input').click();
}

function showPicked(input) {
	var reader = new FileReader();
	reader.readAsDataURL(input.files[0]);
	reader.onload = function (e) {
		el('card').className = 'card';
		el('image-picked').src = e.target.result;
		el('upload-label').innerText = input.files[0].name;
		el('upload-label').className =
			'card-title grey-text flow-text truncate black col s12';
		setTimeout(() => {
			el('analyze-button').scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest'
			});
			window.scrollBy(0, 50);
		}, 100);
	};
}

function showRecommendation() {
	el('recommendations').className = '';
	el('recommendations').scrollIntoView({
		behavior: 'smooth',
		block: 'start',
		inline: 'nearest'
	});
	window.scrollBy(0, 50);
}

function analyze() {
	var uploadFiles = el('file-input').files;
	if (uploadFiles.length !== 1) {
		alert('Please select a file to analyze!');
		return;
	}

	el('analyze-button').innerText = 'Analyzing... 🔍🔍🔍';
	var xhr = new XMLHttpRequest();
	var loc = window.location;
	xhr.open(
		'POST',
		`${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
		true
	);
	xhr.onerror = function () {
		alert(xhr.responseText);
	};
	xhr.onload = function (e) {
		if (this.readyState === 4) {
			var response = JSON.parse(e.target.responseText);

			el('result').innerText = `${response['result']}`;
			if (response['result'] == `extra_class`) {
				el(
					'result2'
				).innerText = `Strawberry Image uploaded is an Excellent Quality Product!
								\nStrawberries in this class must be of superior quality.
								They must be the characteristics of the variety.
								\nThey must be well formed and free from defects, with the exception of very slight superficial defects, provided these do not affect the general appearance of the produce, quality, keeping quality and presentation in the package.
                                \nThe Strawberry Image Uploaded is classified as an Extra Quality Class product.
								\nThis means that the strawberry has one or more of the following features:
								-Has no defects in shape
								-No presence of small white patch
								-No superficial pressure marks
								-No slight traces of soil and/or dry bruising.`;
				el(
					'customers'
				).innerText = `Recommendation: Strawberries are of great quality with ensured taste and vitamins, recommended to be bought at a higher price than average.
								\nStrawberries show only good traits with no blemishes and bruises.
								\nNote: Only buy if needed or if financially stable. `;
				el(
					'vendors'
				).innerText = `Recommendation: For Vendor, The Strawberries are of great quality with ensured taste and vitamins, recommended to be sold at a high price with a medium to high mark-up.
								\nStrawberries show only good traits and characteristics, showing no blemishes and bruises.
								\nRecommended to be sold at a higher price and could be sold as a small bundle or individually such as premium retail to restaurants.`;
				el(
					'farmers'
				).innerText = `Recommendation: Strawberries are of great quality show few imperfections and should be offered at a greater price than the normal.
								\nDue to the strawberries being great quality the soil, fertilizer and human resources should be noted and kept up to standards.
								\nNote: Weather should always be noted/monitored and added to the results of the strawberries.`;
				el(
					'agricultural'
				).innerText = `Recommendation: Strawberries are of great characteristics and traits showing no imperfections at all. Definitely should be used as the forefront of strawberries in the region.
								\nStrawberries show great quality with no imperfections showing only great characteristics. Recommended to study and adapt the environment said strawberries are in to further enhance other
								\nestablishments to result in better quality of strawberries.`;
			} else if (response['result'] == `class1`) {
				el(
					'result2'
				).innerText = `Strawberry Image uploaded is an Good Quality Product!
								\nStrawberries in this class must be of good quality. They must be the characteristics of the
								\nvariety. The following slight defects, however, may be allowed, provided these do not affect
								\nsuperficial defects, provided these do not affect the general appearance of the produce,
								\nthe general appearance of the produce, quality, keeping quality and presentation in the  package.
                                \nThe Strawberry Image Uploaded is classified as an Good Quality Class product.
								\nThis means that the strawberry has one or more of the following features:
								-Slight defects in shape
								-Presence of small white patch, not exceeding 10% of the total surface area of the fruit
								-Slight superficial marks.`;

				el(
					'customers'
				).innerText = `Recommendation: Strawberries are of good quality worth buying at an average price.
								\nStrawberries show good traits and characteristics with only small blemishes.`;

				el(
					'vendors'
				).innerText = `Recommendation: Strawberries are of good quality worth marketing at a average to semi-high price and recommended to mark-up at a average price.
								\nStrawberries show good traits and characteristics with only little blemishes. Recommended to be sold at a average price and sold medium sized bundle
								\nor as retail, sales confectioneries with exposed berries.`;

				el(
					'farmers'
				).innerText = `Recommendation: Strawberries are of good quality and are ready to be harvested and imported with less supervision.
								\nWith the strawberries being good quality the soil, fertilizer and human resources should be continued with constant monitoring.
								\nDue to strawberries being of good quality
								\nNote: Weather should always be noted/monitored and added to the results of the strawberries. `;
				el(
					'agricultural'
				).innerText = `Recommendation: Strawberries are of low to mediocre quality should not be made as forefront of strawberries in the region.
								\nStrawberries show many signs of  imperfections such as blemishes and bruises. Recommended to be contained and analyzed before shipping outside provincial area.
								\nRecommended to conduct investigations on why such imperfections were caused to supply needed goods for re-establishment.`;
			} else if (response['result'] == `class2`) {
				el(
					'result2'
				).innerText = `Strawberry Image uploaded is a Bad Quality Product! This class includes strawberries that do not qualify for inclusion in the higher classes but satisfy the minimum requirements.
								\nThe following defects may be allowed, provided the strawberries retain their essential characteristics with regards to quality, keeping quality and presentation.
								\nThe Strawberry Image Uploaded is classified as an Bad Quality Class product.
								\nThis means that the strawberry has one or more of the following features:
								-Defects in shape
								-White patch, not exceeding 20% of the total surface area of the fruit
								-Slight dry bruising not likely to spread
								-Slight traces of soil.`;
				el(
					'customers'
				).innerText = `Recommendation: Strawberries are of low to mediocre quality should avoid buying at a high price.
								\nStrawberries show many signs of abnormality such as bruises and blemishes.`;
				el(
					'vendors'
				).innerText = `Recommendation: Strawberries are of low to mediocre quality do not market at a high price and keep mark-up at a low.
								\nStrawberries show many signs of abnormality such as bruises and blemishes. Recommended to be sold at a reasonable price and sold as a large bundle
								\nor as flavoring agents, baking, jams, cures, wines.`;
				el(
					'farmers'
				).innerText = `Recommendation: Strawberries are of low to mediocre quality should either be left to ripen for few more days to a week and added supervision.
								\nDue to strawberries being low to mediocre quality the soil, fertilizer and human resources should be monitored regularly and worked on.
								\nNote: Weather should always be noted/monitored and added to the results of the strawberries. `;
				el(
					'agricultural'
				).innerText = `Recommendation: Strawberries are of good quality would be allowed to be used as forefront of strawberries in said region.
								\nStrawberries show some good traits and characteristics.
								\nRecommended to analyze and maintain said qualities of strawberries or even enhance them.`;
			}
		}
		el('analyze-button').innerText = 'Analyze 🔍';
		showRecommendation();
	};

	var fileData = new FormData();
	fileData.append('file', uploadFiles[0]);
	xhr.send(fileData);
}
