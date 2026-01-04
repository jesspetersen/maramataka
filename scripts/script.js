//Here's my shitty code!

//Global variables
var twwaPhases = ["Whiro", "Tirea", "Hoata", "Ōuenuku", "Okoro", "Tamatea Āio", "Tamatea a Ngana", "Tamatea Kai-Ariki", "Tamatea Tūhāhā", "Ariroa", "Huna", "Mawharu", "Ōhua", "Atua Whakahaehae", "Turu", "Te Rākaunui", "Rākaumatohi", "Takirau", "Oike", "Korekore Tuatahi",  "Korekore Rawea", "Korekore Whakapiri", "Tangaroa ā mua", "Tangaroa ā roto", "Tangaroa Whakapau", "Tangaroa Whāriki Kiokio", "Ōtāne", "Ōongonui", "Ōmutu", "Mutu Whenua"];

//Energy is a rating from 0 - 4 (0 is low, 4 is high)
var twwaEnergy = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 4, 0, 0, 4, 4, 4, 3, 2, 1, 0, 0, 0, 3, 4, 4, 4, 4, 4, 4, 4]

var moonImages = ["@","M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "@"];

var cityLatLong = [[-36.8, 174.7], [-41.2, -174.7], [-43.5, 172.6], [-37.7, 175.2], [-37.6, 176.1], [-39.6, 176.8], [-45.8, 170.5], [-40.3, 175.6], [-39.0, 174.0],  [-41.2, 173.2]];

getCurrentMoonDataTwwa = function(date) {
		var moonAge = SunCalc.getMoonPhase(date);

		//Get actual moon age from moon percentage
		moonAge = moonAge*30;
		moonAge = Math.round(moonAge);
		var moonTwwa = "";
		var moonEnergy = 0;

		//Translate moon phase to TWWA name
		if (moonAge < 1 || moonAge > 29){
			moonTwwa = "Whiro";
			moonEnergy = "orange";
		}
		else {
			moonTwwa = twwaPhases[moonAge];
			if (twwaEnergy[moonAge] == 1 || twwaEnergy[moonAge] == 2) {
				moonEnergy = "orange";
			}
			else if (twwaEnergy[moonAge] == 0) {
				moonEnergy = "darkslateblue";
			}
			else {
				moonEnergy = "deeppink";
			}
		}
		return [moonAge, moonTwwa, moonEnergy];
}

getMoonImage = function(moonAge) {
	return moonImages[moonAge-1];
}

getNextMoonTwwa = function(currentMoon) {
	return twwaPhases[currentMoon];
}

getMoonRiseTime = function (date, city) {
	//Get actual moonrise info
	return SunCalc.getNextMoonrise(date, cityLatLong[city][0], cityLatLong[city][1], false);
}

//Get next moonrise data
getNextMoonriseData = function(date, city, moonAge) {
	//Get date
	var nextMoonriseDate = new Date();
	nextMoonriseDate.setDate(date.getDate()+1);
	//Get city
	var selectedCity = document.getElementById("cityChoiceSelect");
	var cityValue = selectedCity.options[selectedCity.selectedIndex].value;

	//Get actual moonrise info
	var nextMoonriseInfo = SunCalc.getNextMoonrise(nextMoonriseDate, cityLatLong[cityValue][0], cityLatLong[cityValue][1], false);

	//Parse object to a readable date object
	var nextMoonriseDateTime = nextMoonriseInfo[0][0];

	//Get next moon phase
	var nextMoonTwwa = getNextMoonTwwa(moonAge);

	return [nextMoonriseDateTime, nextMoonTwwa];
}

getMonthData = function(month, year, city) {
		var baseDate = new Date('December 1, 1995 12:24:00');
		baseDate.setMonth(month);
		baseDate.setFullYear(year);
		month = [];

		var i = 0;
		while (i < daysInMonth(baseDate)) {
			var moonInfo = getCurrentMoonDataTwwa(baseDate);
			moonInfo.push(baseDate.getDate());
			moonInfo.push(getMoonRiseTime(baseDate, city)[0][0]);
			month.push(moonInfo);
			baseDate.setDate(baseDate.getDate()+1);
			i = i+1;
		}
		return month;
}

/*Following code is from: https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript 20190331*/
function daysInMonth(anyDateInMonth) {
    return new Date(anyDateInMonth.getFullYear(), 
                    anyDateInMonth.getMonth()+1, 
                    0).getDate();}