////////////////////////////////////////////////////////////////////////////
// city_state.js ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

var countries = Object();

countries['Africa'] = '|Algeria|Angola|Benin|Botswana|Burkina Faso|Burundi|Cameroon|Cape Verde|Central African Republic|Chad|Comoros|Congo, Dem.|Congo, Rep.|Djibouti|Egypt|Equatorial Guinea|Eritrea|Ethiopia|Gabon|Gambia|Ghana|Guinea|Guinea-Bissau|Kenya|Lesotho|Liberia|Libya|Madagascar|Malawi|Mali|Mauritania|Mauritius|Morocco|Mozambique|Namibia|Niger|Nigeria|Rwanda|Sao Tome/Principe|Senegal|Seychelles|Sierra Leone|Somalia|South Africa|Sudan|Swaziland|Tanzania|Togo|Tunisia|Uganda|Zambia|Zimbabwe';
countries['Antarctica'] = '|Amundsen-Scott';
countries['Asia'] = '|Bangladesh|Bhutan|Brunei|Burma (Myanmar)|Cambodia|China|East Timor|India|Indonesia|Japan|Kazakhstan|Korea (north)|Korea (south)|Laos|Malaysia|Maldives|Mongolia|Nepal|Philippines|Russian Federation|Singapore|Sri Lanka|Taiwan|Thailand|Vietnam';
countries['Australia/Oceania'] = '|Australia|Fiji|Kiribati|Micronesia|Nauru|New Zealand|Palau|Papua New Guinea|Samoa|Tonga|Tuvalu|Vanuatu';
countries['Caribbean'] = '|Anguilla|Antigua/Barbuda|Aruba|Bahamas|Barbados|Cozumel|Cuba|Dominica|Dominican Republic|Grenada|Guadeloupe|Haiti|Jamaica|Martinique|Montserrat|Netherlands Antilles|Puerto Rico|St. Barts|St. Kitts/Nevis|St. Lucia|St. Martin/Sint Maarten|St Vincent/Grenadines|San Andres|Trinidad/Tobago|Turks/Caicos';
countries['Central America'] = '|Belize|Costa Rica|El Salvador|Guatemala|Honduras|Nicaragua|Panama';
countries['Europe'] = '|Albania|Andorra|Austria|Belarus|Belgium|Bosnia-Herzegovina|Bulgaria|Croatia|Czech Republic|Denmark|Estonia|Finland|France|Georgia|Germany|Greece|Hungary|Iceland|Ireland|Italy|Latvia|Liechtenstein|Lithuania|Luxembourg|Macedonia|Malta|Moldova|Monaco|Netherlands|Norway|Poland|Portugal|Romania|San Marino|Serbia/Montenegro (Yugoslavia)|Slovakia|Slovenia|Spain|Sweden|Switzerland|Ukraine|United Kingdom|Vatican City';
countries['Islands'] = '|Arctic Ocean|Atlantic Ocean (North)|Atlantic Ocean (South)|Assorted|Caribbean Sea|Greek Isles|Indian Ocean|Mediterranean Sea|Oceania|Pacific Ocean (North)|Pacific Ocean (South)';
countries['Middle East'] = '|Afghanistan|Armenia|Azerbaijan|Bahrain|Cyprus|Iran|Iraq|Israel|Jordan|Kuwait|Kyrgyzstan|Lebanon|Oman|Pakistan|Qatar|Saudi Arabia|Syria|Tajikistan|Turkey|Turkmenistan|United Arab Emirates|Uzbekistan|Yemen';
countries['North America'] = '|Bermuda|Canada|Greenland|Mexico|United States';
countries['South America'] = '|Argentina|Bolivia|Brazil|Chile|Colombia|Ecuador|Guyana|Paraguay|Peru|Suriname|Uruguay|Venezuela';

////////////////////////////////////////////////////////////////////////////

var city_states = Object();


city_states['India'] = '|New Delhi||Andaman/Nicobar Islands|Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chandigarh|Chhattisgarh|Dadra/Nagar Haveli|Daman/Diu|Goa|Gujarat|Haryana|Himachal Pradesh|Jammu/Kashmir|Jharkhand|Karnataka|Kerala|Lakshadweep|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Orissa|Pondicherry|Punjab|Rajasthan|Sikkim|Tamil Nadu|Tripura|Uttaranchal|Uttar Pradesh|West Bengal';


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function setRegions()
{
	for (region in countries)
		document.write('<option value="' + region + '">' + region + '</option>');
}

function set_country(oRegionSel, oCountrySel, oCity_StateSel)
{
	var countryArr;
	oCountrySel.length = 0;
	oCity_StateSel.length = 0;
	var region = oRegionSel.options[oRegionSel.selectedIndex].text;
	if (countries[region])
	{
		oCountrySel.disabled = false;
		oCity_StateSel.disabled = true;
		oCountrySel.options[0] = new Option('SELECT COUNTRY','');
		countryArr = countries[region].split('|');
		for (var i = 0; i < countryArr.length; i++)
			oCountrySel.options[i + 1] = new Option(countryArr[i], countryArr[i]);
		document.getElementById('txtregion').innerHTML = region;
		document.getElementById('txtplacename').innerHTML = '';
	}
	else oCountrySel.disabled = true;
}

function set_city_state(oCountrySel, oCity_StateSel)
{
	var city_stateArr;
	oCity_StateSel.length = 0;
	var country = oCountrySel.options[oCountrySel.selectedIndex].text;
	if (city_states[country])
	{
		oCity_StateSel.disabled = false;
		oCity_StateSel.options[0] = new Option('SELECT NEAREST DIVISION','');
		city_stateArr = city_states[country].split('|');
		for (var i = 0; i < city_stateArr.length; i++)
			oCity_StateSel.options[i+1] = new Option(city_stateArr[i],city_stateArr[i]);
		document.getElementById('txtplacename').innerHTML = country;
	}
	else oCity_StateSel.disabled = true;
}

function print_city_state(oCountrySel, oCity_StateSel)
{
	var country = oCountrySel.options[oCountrySel.selectedIndex].text;
	var city_state = oCity_StateSel.options[oCity_StateSel.selectedIndex].text;
	if (city_state && city_states[country].indexOf(city_state) != -1)
		document.getElementById('txtplacename').innerHTML = city_state + ', ' + country;
	else document.getElementById('txtplacename').innerHTML = country;
}