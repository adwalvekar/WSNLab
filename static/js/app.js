var batteries = [];
function addBattery(){
	var flag = false;
	var model = document.getElementById('modelid').value;
	var battery = document.getElementById('batteryid').value;
	var func = document.getElementById('funcid').value;
	var newBattery = {
		modelID : model,
		functionID :func,
		batteryID : battery
	};
	var index = batteries.indexOf(newBattery);
	if (newBattery.modelID == "none" || newBattery.functionID == "none" || newBattery.batteryID == "none" ){
		flag = true;
	}
	for (var i = batteries.length - 1; i >= 0; i--) {
		if (batteries[i].modelID == newBattery.modelID && batteries[i].functionID == newBattery.functionID && batteries[i].batteryID == newBattery.batteryID ){
			flag = true;
			break;
		}
	}
	if ( !flag) {
		batteries.push(newBattery);
		var batterychips = document.getElementById('BatteryChips');
		batterychips.innerHTML = batterychips.innerHTML + '<span class="mdl-chip mdl-chip--deletable"><span class="mdl-chip__text">'+model+'_'+battery+'_'+func+'</span><button type="button" onclick="removeBattery(this.parentNode)" class="mdl-chip__action"><i class="material-icons">cancel</i></button></span>';
	}
}

function removeBattery(element) {
	var id = element;
	element.remove();
	battery = element.children[0].innerHTML.split('_');
	removeBatteryElement = {
		modelID : battery[0],
		functionID :battery[1],
		batteryid : battery[2]
	};
	batteries.splice(batteries.indexOf(removeBatteryElement));

}

function downloadData(){
	var cyclefrom = document.getElementById('power_cycle_from').value;
	var cycleto = document.getElementById('power_cycle_to').value;
	var spinner = document.getElementById('spinner');

	var data = {
		cyclefrom : cyclefrom,
		cycleto: cycleto,
		batteries : batteries
	};
	var chart = document.getElementById('tester');
	if(cycleto == "" || cyclefrom == "" || batteries == []){
		alert("Please enter the appropriate data");
	}
	else{
		spinner.className+=" is-active";
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/downloadData');
		xhr.send(JSON.stringify(data));
		xhr.onload = function(e){
			var re = JSON.parse(xhr.response);
			for (var i = re.length - 1; i >= 0; i--) {
				window.open(re[i],'_blank');
			}
			spinner.classList.remove("is-active");
		};
	}
}

function loadData(){
	var spinner = document.getElementById('spinner');
	var cyclefrom = document.getElementById('power_cycle_from').value;
	var cycleto = document.getElementById('power_cycle_to').value;
	var voltage = document.getElementById('voltage-checkbox').checked;
	var current = document.getElementById('current-checkbox').checked;
	var power = document.getElementById('power-checkbox').checked;
	var ppc = document.getElementById('ppc-checkbox').checked;
	var temp = document.getElementById('temp-checkbox').checked;

	var data = {
		cyclefrom : cyclefrom,
		cycleto: cycleto,
		voltage:voltage,
		current:current,
		power:power,
		ppc:ppc,
		temp:temp,
		batteries : batteries
	};
	var chart = document.getElementById('tester');
	if(cycleto == "" || cyclefrom == "" || batteries == []){
		alert("Please enter the appropriate data");
	}
	else{
		spinner.className+=" is-active"
		console.log(spinner.classList)
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/loadData');
		xhr.send(JSON.stringify(data));
		xhr.onload = function(e){
			var re = JSON.parse(xhr.response);
			Plotly.newPlot('tester', re['traces'], re['layout']);
			spinner.classList.remove("is-active")
			console.log(spinner.classList)
		};
	}
}

function reloadPage(){
	location.reload(true);
}