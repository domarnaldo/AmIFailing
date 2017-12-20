(function(a){skel.breakpoints({desktop:"(min-width: 737px)",tablet:"(min-width: 737px) and (max-width: 1200px)",mobile:"(max-width: 736px)"}).viewport({breakpoints:{tablet:{width:1080}}});a(function(){var c=a(window),b=a("body");b.addClass("is-loading");c.on("load",function(){b.removeClass("is-loading")});a("form").placeholder();skel.on("+mobile -mobile",function(){a.prioritize(".important\\28 mobile\\29",skel.breakpoint("mobile").active)});9>skel.vars.IEVersion&&a(":last-child").addClass("last-child");
a("#nav > ul").dropotron({mode:"fade",noOpenerFade:!0,speed:300,alignment:"center"});a('<div id="titleBar"><a href="#navPanel" class="toggle"></a><span class="title">'+a("#logo").html()+"</span></div>").appendTo(b);a('<div id="navPanel"><nav>'+a("#nav").navList()+"</nav></div>").appendTo(b).panel({delay:500,hideOnClick:!0,hideOnSwipe:!0,resetScroll:!0,resetForms:!0,side:"left",target:b,visibleClass:"navPanel-visible"});"wp"==skel.vars.os&&10>skel.vars.osVersion&&a("#titleBar, #navPanel, #page-wrapper").css("transition",
"none")})})(jQuery);

var gpa = {
	"A": 4.00,
	"A-": 3.70,
	"B+": 3.33,
	"B": 3.00,
	"B-": 2.70,
	"C+": 2.30,
	"C": 2.00,
	"C-": 1.70,
	"D+": 1.30,
	"D": 1.00,
	"F": 0.00
}

function calculateGPA(sem, retVal, setCum) {
	var semester = document.getElementById("semester-"+sem);
	var credits = semester.getElementsByClassName("credits");
	var grades = semester.getElementsByClassName("grade");
	var creditTotal = 0;
	var gradeTotal = 0;
	
	for (var i = 0; i<credits.length; i++) {
		if (!/^\d+$/.test(parseInt(credits[i].value)) || grades[i].value == "Choose a Grade") {
			alert("You must fill in all of the fields.");
			return;
		}
		creditTotal += parseFloat(credits[i].value);
		gradeTotal += (parseFloat(credits[i].value) * gpa[grades[i].value]);
	}
	
	var finalGPA = (gradeTotal / creditTotal).toFixed(2);
	
	if (retVal) return {gradeTotal: gradeTotal, creditTotal: creditTotal, gpa: finalGPA};
	else {
		document.getElementById("gpa-"+sem).innerHTML = finalGPA;
		if (finalGPA > 3.3) document.getElementById("gpa-"+sem).style.color = "green";
		else if (finalGPA <= 3.3 && finalGPA > 2.7) document.getElementById("gpa-"+sem).style.color = "limegreen";
		else if (finalGPA <= 2.7 && finalGPA > 1.7) document.getElementById("gpa-"+sem).style.color = "goldenrod";
		else if (finalGPA < 1.7) document.getElementById("gpa-"+sem).style.color = "tomato";
		
		if (setCum) {
			var cumGPA = cumulativeGPA(sem);
			document.getElementById("gpa-cum-"+sem).innerHTML = cumGPA;
			if (cumGPA > 3.3) document.getElementById("gpa-cum-"+sem).style.color = "green";
			else if (cumGPA <= 3.3 && cumGPA > 2.7) document.getElementById("gpa-cum-"+sem).style.color = "limegreen";
			else if (cumGPA <= 2.7 && cumGPA > 1.7) document.getElementById("gpa-cum-"+sem).style.color = "goldenrod";
			else if (cumGPA < 1.7) document.getElementById("gpa-cum-"+sem).style.color = "tomato";
		}
	}
	
}

function cumulativeGPA(lim) {
	var semesters = (lim != undefined) ? lim : document.getElementsByClassName("semester").length;
	var creditTotal = 0;
	var gradeTotal = 0;
	var sem;
	for (var i = 1; i<=semesters; i++) {
		sem = calculateGPA(i, true, false);
		creditTotal += sem.creditTotal;
		gradeTotal += sem.gradeTotal;
	}
	return (gradeTotal / creditTotal).toFixed(2);
}

function addClass(sem) {
	document.getElementById("semester-" + sem).insertRow().innerHTML = '<td><input type="text" placeholder="Class Name" /></td><td><input type="number" class="credits" placeholder="Credits" /></td><td><select class="grade"><option selected="selected">Choose a Grade</option><option value="A">A</option><option value="A-">A-</option><option value="B+">B+</option><option value="B">B</option><option value="B-">B-</option><option value="C+">C+</option><option value="C">C</option><option value="C-">C-</option><option value="D+">D+</option><option value="D">D</option><option value="F">F</option></select></td><td style="padding-left: 1.5em;color: red"><a href="javascript:void()" onclick="removeClass(this, '+sem+');" class="button" style="padding: 2px 10px 2px 10px">X</a></td>';
}

function addSemester() {
	var newSem = document.getElementsByClassName("semester").length + 1;
	jQuery('.semester:last').after('<div class="semester"><header><h2>Semester '+newSem+'</h2><p>Enter Your Classes Below:</p></header><table id="semester-'+newSem+'"><tr><td>Class Name</td><td>Number of Credits</td><td>Grade</td></tr><tr class="class"><td><input type="text" placeholder="Class Name" /></td><td><input type="number" class="credits" placeholder="Credits" /></td><td><select class="grade"><option selected="selected">Choose a Grade</option><option value="A">A</option><option value="A-">A-</option><option value="B+">B+</option><option value="B">B</option><option value="B-">B-</option><option value="C+">C+</option><option value="C">C</option><option value="C-">C-</option><option value="D+">D+</option><option value="D">D</option><option value="F">F</option></select></td></tr></table><p class="gpa-wrap">Semester GPA: <span id="gpa-'+newSem+'">0.0</span></p><p class="cumulative-gpa">Cumulative GPA: <span id="gpa-cum-'+newSem+'">0.0</span></p><ul class="actions"><li><a href="javascript:addClass('+newSem+')" class="button big">Add Class</a></li><li><a href="javascript:void()" onclick="calculateGPA('+newSem+', false, true);" class="button big">Calculate</a></li><li><a href="javascript:removeSem('+newSem+')" class="button big">X</a></li></ul></div>');
}

function removeSem(sem) {
	jQuery('#semester-'+sem).parent().remove();
}

function removeClass(ele, sem) {
	document.getElementById("semester-"+sem).deleteRow(ele.parentNode.parentNode.rowIndex);
}

function removeScheduleClass(ele, classID) {
	document.getElementById("build-schedule").deleteRow(ele.parentNode.parentNode.rowIndex);
	updateSchedule();
}

function getDifference(end, begin) {
	return end.parentNode.rowIndex - begin.parentNode.rowIndex;
}

function parseTime(t, str) {
	if (str) {
		t = t.split("");
		if (t[0] == 0) return t[1] + ":" + t[2] + t[3] + "AM";
		else if (t[0] == 1 && t[1] < 2) return t[0] + t[1] + ":" + t[2] + t[3] + "AM";
		else if (t[0] == 1 && t[1] == 2) return t[0] + t[1] + ":" + t[2] + t[3] + "PM";
		else if (t[0] == 2 && t[1] == 4) return "12" + ":" + t[2] + t[3] + "AM";
		else return (parseInt(t[0] + t[1]) - 12) + ":" + t[2] + t[3] + "PM";
	} else return parseInt(t);
}

function addScheduleClass() {
	var newClass = document.getElementById("build-schedule").insertRow();
	var classID = document.getElementsByClassName("class-time").length;
	newClass.id = "class-time-" + classID;
	newClass.className = "class-time";
	newClass.innerHTML = '<td><input type="text" class="class-name" placeholder="Name"/></td><td><ul class="class-days"><li><input type="checkbox" value="monday" /> M</li><li><input type="checkbox" value="tuesday" /> T</li><li><input type="checkbox" value="wednesday" /> W</li><li><input type="checkbox" value="thursday" /> R</li><li><input type="checkbox" value="friday" /> F</li><li><input type="checkbox" value="saturday" /> S</li><li><input type="checkbox" value="sunday" /> U</li></ul></td><td><select class="class-begin"><option selected="selected" value="default">Choose a Time</option><option value="0600">6:00AM</option><option value="0605">6:05AM</option><option value="0610">6:10AM</option><option value="0615">6:15AM</option><option value="0620">6:20AM</option><option value="0625">6:25AM</option><option value="0630">6:30AM</option><option value="0635">6:35AM</option><option value="0640">6:40AM</option><option value="0645">6:45AM</option><option value="0650">6:50AM</option><option value="0655">6:55AM</option><option value="0700">7:00AM</option><option value="0705">7:05AM</option><option value="0710">7:10AM</option><option value="0715">7:15AM</option><option value="0720">7:20AM</option><option value="0725">7:25AM</option><option value="0730">7:30AM</option><option value="0735">7:35AM</option><option value="0740">7:40AM</option><option value="0745">7:45AM</option><option value="0750">7:50AM</option><option value="0755">7:55AM</option><option value="0800">8:00AM</option><option value="0805">8:05AM</option><option value="0810">8:10AM</option><option value="0815">8:15AM</option><option value="0820">8:20AM</option><option value="0825">8:25AM</option><option value="0830">8:30AM</option><option value="0835">8:35AM</option><option value="0840">8:40AM</option><option value="0845">8:45AM</option><option value="0850">8:50AM</option><option value="0855">8:55AM</option><option value="0900">9:00AM</option><option value="0905">9:05AM</option><option value="0910">9:10AM</option><option value="0915">9:15AM</option><option value="0920">9:20AM</option><option value="0925">9:25AM</option><option value="0930">9:30AM</option><option value="0935">9:35AM</option><option value="0940">9:40AM</option><option value="0945">9:45AM</option><option value="0950">9:50AM</option><option value="0955">9:55AM</option><option value="1000">10:00AM</option><option value="1005">10:05AM</option><option value="1010">10:10AM</option><option value="1015">10:15AM</option><option value="1020">10:20AM</option><option value="1025">10:25AM</option><option value="1030">10:30AM</option><option value="1035">10:35AM</option><option value="1040">10:40AM</option><option value="1045">10:45AM</option><option value="1050">10:50AM</option><option value="1055">10:55AM</option><option value="1100">11:00AM</option><option value="1105">11:05AM</option><option value="1110">11:10AM</option><option value="1115">11:15AM</option><option value="1120">11:20AM</option><option value="1125">11:25AM</option><option value="1130">11:30AM</option><option value="1135">11:35AM</option><option value="1140">11:40AM</option><option value="1145">11:45AM</option><option value="1150">11:50AM</option><option value="1155">11:55AM</option><option value="1200">12:00PM</option><option value="1205">12:05PM</option><option value="1210">12:10PM</option><option value="1215">12:15PM</option><option value="1220">12:20PM</option><option value="1225">12:25PM</option><option value="1230">12:30PM</option><option value="1235">12:35PM</option><option value="1240">12:40PM</option><option value="1245">12:45PM</option><option value="1250">12:50PM</option><option value="1255">12:55PM</option><option value="1300">1:00PM</option><option value="1305">1:05PM</option><option value="1310">1:10PM</option><option value="1315">1:15PM</option><option value="1320">1:20PM</option><option value="1325">1:25PM</option><option value="1330">1:30PM</option><option value="1335">1:35PM</option><option value="1340">1:40PM</option><option value="1345">1:45PM</option><option value="1350">1:50PM</option><option value="1355">1:55PM</option><option value="1400">2:00PM</option><option value="1405">2:05PM</option><option value="1410">2:10PM</option><option value="1415">2:15PM</option><option value="1420">2:20PM</option><option value="1425">2:25PM</option><option value="1430">2:30PM</option><option value="1435">2:35PM</option><option value="1440">2:40PM</option><option value="1445">2:45PM</option><option value="1450">2:50PM</option><option value="1455">2:55PM</option><option value="1500">3:00PM</option><option value="1505">3:05PM</option><option value="1510">3:10PM</option><option value="1515">3:15PM</option><option value="1520">3:20PM</option><option value="1525">3:25PM</option><option value="1530">3:30PM</option><option value="1535">3:35PM</option><option value="1540">3:40PM</option><option value="1545">3:45PM</option><option value="1550">3:50PM</option><option value="1555">3:55PM</option><option value="1600">4:00PM</option><option value="1605">4:05PM</option><option value="1610">4:10PM</option><option value="1615">4:15PM</option><option value="1620">4:20PM</option><option value="1625">4:25PM</option><option value="1630">4:30PM</option><option value="1635">4:35PM</option><option value="1640">4:40PM</option><option value="1645">4:45PM</option><option value="1650">4:50PM</option><option value="1655">4:55PM</option><option value="1700">5:00PM</option><option value="1705">5:05PM</option><option value="1710">5:10PM</option><option value="1715">5:15PM</option><option value="1720">5:20PM</option><option value="1725">5:25PM</option><option value="1730">5:30PM</option><option value="1735">5:35PM</option><option value="1740">5:40PM</option><option value="1745">5:45PM</option><option value="1750">5:50PM</option><option value="1755">5:55PM</option><option value="1800">6:00PM</option><option value="1805">6:05PM</option><option value="1810">6:10PM</option><option value="1815">6:15PM</option><option value="1820">6:20PM</option><option value="1825">6:25PM</option><option value="1830">6:30PM</option><option value="1835">6:35PM</option><option value="1840">6:40PM</option><option value="1845">6:45PM</option><option value="1850">6:50PM</option><option value="1855">6:55PM</option><option value="1900">7:00PM</option><option value="1905">7:05PM</option><option value="1910">7:10PM</option><option value="1915">7:15PM</option><option value="1920">7:20PM</option><option value="1925">7:25PM</option><option value="1930">7:30PM</option><option value="1935">7:35PM</option><option value="1940">7:40PM</option><option value="1945">7:45PM</option><option value="1950">7:50PM</option><option value="1955">7:55PM</option><option value="2000">8:00PM</option><option value="2005">8:05PM</option><option value="2010">8:10PM</option><option value="2015">8:15PM</option><option value="2020">8:20PM</option><option value="2025">8:25PM</option><option value="2030">8:30PM</option><option value="2035">8:35PM</option><option value="2040">8:40PM</option><option value="2045">8:45PM</option><option value="2050">8:50PM</option><option value="2055">8:55PM</option><option value="2100">9:00PM</option><option value="2105">9:05PM</option><option value="2110">9:10PM</option><option value="2115">9:15PM</option><option value="2120">9:20PM</option><option value="2125">9:25PM</option><option value="2130">9:30PM</option><option value="2135">9:35PM</option><option value="2140">9:40PM</option><option value="2145">9:45PM</option><option value="2150">9:50PM</option><option value="2155">9:55PM</option><option value="2200">10:00PM</option><option value="2205">10:05PM</option><option value="2210">10:10PM</option><option value="2215">10:15PM</option><option value="2220">10:20PM</option><option value="2225">10:25PM</option><option value="2230">10:30PM</option><option value="2235">10:35PM</option><option value="2240">10:40PM</option><option value="2245">10:45PM</option><option value="2250">10:50PM</option><option value="2255">10:55PM</option><option value="2300">11:00PM</option><option value="2305">11:05PM</option><option value="2310">11:10PM</option><option value="2315">11:15PM</option><option value="2320">11:20PM</option><option value="2325">11:25PM</option><option value="2330">11:30PM</option><option value="2335">11:35PM</option><option value="2340">11:40PM</option><option value="2345">11:45PM</option><option value="2350">11:50PM</option><option value="2355">11:55PM</option></select></td><td><select class="class-end"><option selected="selected" value="default">Choose a Time</option><option value="0600">6:00AM</option><option value="0605">6:05AM</option><option value="0610">6:10AM</option><option value="0615">6:15AM</option><option value="0620">6:20AM</option><option value="0625">6:25AM</option><option value="0630">6:30AM</option><option value="0635">6:35AM</option><option value="0640">6:40AM</option><option value="0645">6:45AM</option><option value="0650">6:50AM</option><option value="0655">6:55AM</option><option value="0700">7:00AM</option><option value="0705">7:05AM</option><option value="0710">7:10AM</option><option value="0715">7:15AM</option><option value="0720">7:20AM</option><option value="0725">7:25AM</option><option value="0730">7:30AM</option><option value="0735">7:35AM</option><option value="0740">7:40AM</option><option value="0745">7:45AM</option><option value="0750">7:50AM</option><option value="0755">7:55AM</option><option value="0800">8:00AM</option><option value="0805">8:05AM</option><option value="0810">8:10AM</option><option value="0815">8:15AM</option><option value="0820">8:20AM</option><option value="0825">8:25AM</option><option value="0830">8:30AM</option><option value="0835">8:35AM</option><option value="0840">8:40AM</option><option value="0845">8:45AM</option><option value="0850">8:50AM</option><option value="0855">8:55AM</option><option value="0900">9:00AM</option><option value="0905">9:05AM</option><option value="0910">9:10AM</option><option value="0915">9:15AM</option><option value="0920">9:20AM</option><option value="0925">9:25AM</option><option value="0930">9:30AM</option><option value="0935">9:35AM</option><option value="0940">9:40AM</option><option value="0945">9:45AM</option><option value="0950">9:50AM</option><option value="0955">9:55AM</option><option value="1000">10:00AM</option><option value="1005">10:05AM</option><option value="1010">10:10AM</option><option value="1015">10:15AM</option><option value="1020">10:20AM</option><option value="1025">10:25AM</option><option value="1030">10:30AM</option><option value="1035">10:35AM</option><option value="1040">10:40AM</option><option value="1045">10:45AM</option><option value="1050">10:50AM</option><option value="1055">10:55AM</option><option value="1100">11:00AM</option><option value="1105">11:05AM</option><option value="1110">11:10AM</option><option value="1115">11:15AM</option><option value="1120">11:20AM</option><option value="1125">11:25AM</option><option value="1130">11:30AM</option><option value="1135">11:35AM</option><option value="1140">11:40AM</option><option value="1145">11:45AM</option><option value="1150">11:50AM</option><option value="1155">11:55AM</option><option value="1200">12:00PM</option><option value="1205">12:05PM</option><option value="1210">12:10PM</option><option value="1215">12:15PM</option><option value="1220">12:20PM</option><option value="1225">12:25PM</option><option value="1230">12:30PM</option><option value="1235">12:35PM</option><option value="1240">12:40PM</option><option value="1245">12:45PM</option><option value="1250">12:50PM</option><option value="1255">12:55PM</option><option value="1300">1:00PM</option><option value="1305">1:05PM</option><option value="1310">1:10PM</option><option value="1315">1:15PM</option><option value="1320">1:20PM</option><option value="1325">1:25PM</option><option value="1330">1:30PM</option><option value="1335">1:35PM</option><option value="1340">1:40PM</option><option value="1345">1:45PM</option><option value="1350">1:50PM</option><option value="1355">1:55PM</option><option value="1400">2:00PM</option><option value="1405">2:05PM</option><option value="1410">2:10PM</option><option value="1415">2:15PM</option><option value="1420">2:20PM</option><option value="1425">2:25PM</option><option value="1430">2:30PM</option><option value="1435">2:35PM</option><option value="1440">2:40PM</option><option value="1445">2:45PM</option><option value="1450">2:50PM</option><option value="1455">2:55PM</option><option value="1500">3:00PM</option><option value="1505">3:05PM</option><option value="1510">3:10PM</option><option value="1515">3:15PM</option><option value="1520">3:20PM</option><option value="1525">3:25PM</option><option value="1530">3:30PM</option><option value="1535">3:35PM</option><option value="1540">3:40PM</option><option value="1545">3:45PM</option><option value="1550">3:50PM</option><option value="1555">3:55PM</option><option value="1600">4:00PM</option><option value="1605">4:05PM</option><option value="1610">4:10PM</option><option value="1615">4:15PM</option><option value="1620">4:20PM</option><option value="1625">4:25PM</option><option value="1630">4:30PM</option><option value="1635">4:35PM</option><option value="1640">4:40PM</option><option value="1645">4:45PM</option><option value="1650">4:50PM</option><option value="1655">4:55PM</option><option value="1700">5:00PM</option><option value="1705">5:05PM</option><option value="1710">5:10PM</option><option value="1715">5:15PM</option><option value="1720">5:20PM</option><option value="1725">5:25PM</option><option value="1730">5:30PM</option><option value="1735">5:35PM</option><option value="1740">5:40PM</option><option value="1745">5:45PM</option><option value="1750">5:50PM</option><option value="1755">5:55PM</option><option value="1800">6:00PM</option><option value="1805">6:05PM</option><option value="1810">6:10PM</option><option value="1815">6:15PM</option><option value="1820">6:20PM</option><option value="1825">6:25PM</option><option value="1830">6:30PM</option><option value="1835">6:35PM</option><option value="1840">6:40PM</option><option value="1845">6:45PM</option><option value="1850">6:50PM</option><option value="1855">6:55PM</option><option value="1900">7:00PM</option><option value="1905">7:05PM</option><option value="1910">7:10PM</option><option value="1915">7:15PM</option><option value="1920">7:20PM</option><option value="1925">7:25PM</option><option value="1930">7:30PM</option><option value="1935">7:35PM</option><option value="1940">7:40PM</option><option value="1945">7:45PM</option><option value="1950">7:50PM</option><option value="1955">7:55PM</option><option value="2000">8:00PM</option><option value="2005">8:05PM</option><option value="2010">8:10PM</option><option value="2015">8:15PM</option><option value="2020">8:20PM</option><option value="2025">8:25PM</option><option value="2030">8:30PM</option><option value="2035">8:35PM</option><option value="2040">8:40PM</option><option value="2045">8:45PM</option><option value="2050">8:50PM</option><option value="2055">8:55PM</option><option value="2100">9:00PM</option><option value="2105">9:05PM</option><option value="2110">9:10PM</option><option value="2115">9:15PM</option><option value="2120">9:20PM</option><option value="2125">9:25PM</option><option value="2130">9:30PM</option><option value="2135">9:35PM</option><option value="2140">9:40PM</option><option value="2145">9:45PM</option><option value="2150">9:50PM</option><option value="2155">9:55PM</option><option value="2200">10:00PM</option><option value="2205">10:05PM</option><option value="2210">10:10PM</option><option value="2215">10:15PM</option><option value="2220">10:20PM</option><option value="2225">10:25PM</option><option value="2230">10:30PM</option><option value="2235">10:35PM</option><option value="2240">10:40PM</option><option value="2245">10:45PM</option><option value="2250">10:50PM</option><option value="2255">10:55PM</option><option value="2300">11:00PM</option><option value="2305">11:05PM</option><option value="2310">11:10PM</option><option value="2315">11:15PM</option><option value="2320">11:20PM</option><option value="2325">11:25PM</option><option value="2330">11:30PM</option><option value="2335">11:35PM</option><option value="2340">11:40PM</option><option value="2345">11:45PM</option><option value="2350">11:50PM</option><option value="2355">11:55PM</option></select></td><td><select class="class-color"><option selected="selected" value="skyblue">Blue 1</option><option value="dodgerblue">Blue 2</option><option value="tomato">Red</option><option value="green">Green</option><option value="goldenrod">Goldenrod</option><option value="plum">Plum</option><option value="slategray">Slate Gray</option></select></td><td style="padding-left: 1.5em;color: red"><a href="javascript:void()" onclick="removeScheduleClass(this, '+classID+');" class="button" style="padding: 2px 10px 2px 10px">X</a></td>';
}

function clearSchedule() {
    var schedule = document.getElementById("schedule").getElementsByTagName("tr");
    for (var i = 1; i<schedule.length; i++) {
        for (var x = 1; x<schedule[i].childNodes.length; x++) {
            schedule[i].childNodes[x].removeAttribute("style");
            schedule[i].childNodes[x].removeAttribute("class");
            schedule[i].childNodes[x].innerHTML = "";
        }
    }
}

function updateSchedule() {
    clearSchedule();
	var times = document.getElementById("build-schedule").getElementsByClassName("class-time");
    var earliest = 200;
    var latest = 0;
	for (var i = 0; i<times.length; i++) {
		if (times[i].getElementsByClassName("class-begin")[0].value == "default" || times[i].getElementsByClassName("class-end")[0].value == "default") {
			alert("You must enter all of the information.");
			return;
		}
           
		var classDays = times[i].getElementsByClassName("class-days")[0].getElementsByTagName("input");
        var name = times[i].getElementsByClassName("class-name")[0].value;
        var beginTime = times[i].getElementsByClassName("class-begin")[0].value;
        var endTime = times[i].getElementsByClassName("class-end")[0].value;
        
        if (parseTime(endTime, false) <= parseTime(beginTime, false)) {
            alert("Error: Class cannot end before it begins.");
            return;
        }
        
        var beginRow = document.getElementById("monday-" + beginTime).parentNode.id.substring(4);
        var endRow = document.getElementById("monday-" + endTime).parentNode.id.substring(4);
        
        if (parseInt(beginRow) < earliest) earliest = parseInt(beginRow);
        if (parseInt(endRow) > latest) latest = parseInt(endRow);
        
		for (var k = 0; k<classDays.length; k++) {
			if (classDays[k].checked == true) {
				var begin = classDays[k].value + '-' + beginTime;
				var end = classDays[k].value + '-' + endTime;
					
				var diff = getDifference(document.getElementById(end), document.getElementById(begin));

				var colorCode = times[i].getElementsByClassName("class-color")[0].value;
				
				if (document.getElementById(begin).className != "") {
					alert("Error: Classes cannot overlap.");
					return;
				}
				
				document.getElementById(begin).innerHTML = name;
				document.getElementById(begin).style.backgroundColor = colorCode;
				document.getElementById(begin).className = "class-" + i + " active";
                document.getElementById(begin).parentNode.removeAttribute("style");
				document.getElementById(end).innerHTML = parseTime(beginTime, true) + " - " + parseTime(endTime, true);
				document.getElementById(end).style.backgroundColor = colorCode;
				document.getElementById(end).className = "class-" + i + " active";
                document.getElementById(end).parentNode.removeAttribute("style");

				var day = document.getElementById(begin).id.split("-")[0];
				var currentTimeSlot = document.getElementById(begin).parentNode;

				for (var x = 0; x<(diff-1); x++) {
					currentTimeSlot = currentTimeSlot.nextSibling;
					var days = currentTimeSlot.getElementsByTagName("td");
					for (var z = 0; z<days.length; z++) {
						if (days[z].id.indexOf(day) !== -1) {
							days[z].className = "class-" + i;
							days[z].style.backgroundColor = colorCode;
							days[z].style.borderBottom = 0;
                            days[z].parentNode.removeAttribute("style");
							break;
						}
					}
				}
			}
		}
		
	}
    
    for (var i = (earliest - 1); i>0; i--) {
        document.getElementById("row-"+i).style.display = "none";
    }
    for (var i = (latest + 1); i<document.getElementById("schedule").getElementsByTagName("tr").length; i++) {
        document.getElementById("row-"+i).style.display = "none";
    }
    
}

function downloadSchedule(ele) {
    var div = document.getElementById("calendar");

    html2canvas(div, {
        scale: 2,
        onrendered: function (canvas) {
            var can = canvas;
            var d = can.toDataURL("image/png");
            var redirect = window.open(d, "_blank");
            redirect.location;
        }
    });
}