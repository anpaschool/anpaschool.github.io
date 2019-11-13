var map = {};

jsonData = '[{"partyId":"1234","parentId":"-1", "level":"0"},{"partyId":"5678","parentId":"2345",  "level":"1"}, {"partyId":"9012","parentId":"3456",  "level":"2"}, {"partyId":"3456","parentId":"7890",  "level":"1"}, {"partyId":"7890","parentId":"-1",  "level":"0"}, {"partyId":"2345","parentId":"-1",  "level":"0"}]';

jsonData2 = '[{"partyId":"4321","parentId":"7777", "level":"4"},{"partyId":"7777","parentId":"9012",  "level":"3"}]';


function PartyView(partyId) {
    this.partyId = ko.observable(partyId);
	this.partyName = ko.observable('Trial');
	this.dunsNumber = ko.observable('Duns');
	this.createdBy = ko.observable('sumit.binnani');
	
    this.children = ko.observableArray([]);
	this.children.subscribe(function(changes){
								changes.forEach(function(change){
									if(change.status=='added') map[change.value.partyId()] = ko.observable(change.value);
								});
							}, null, "arrayChange");
}

var modelView = new PartyView();
map["-1"] = ko.observable(modelView); 
ko.applyBindings(modelView);

/*
* Populate Model with Flat JSON Structure
*/
function constructTree(jsonData){
	var parsedJSON = JSON.parse(jsonData);
	var levelMap ={};
	for(i=0; i < parsedJSON.length; i++){
		if(!Object.prototype.hasOwnProperty.call(levelMap,parsedJSON[i].level)){
			levelMap[parsedJSON[i].level]=[];
		}
		levelMap[parsedJSON[i].level].push(parsedJSON[i]);
	}
	
	key = Object.keys(levelMap).sort();
	
	for (i=0; i<key.length; i++){
		for(j=0; j<levelMap[key[i]].length; j++){
			var currentLevel = levelMap[key[i]];
			if(key[i]==0) parentId="-1";
			else parentId = currentLevel[j].parentId;
			
			if( map[parentId] === undefined){
				console.log("Parent ID: " + parentId + " not yet been fetched");
				break;
			}
			
			if(map[currentLevel[j].partyId] === undefined){			
				map[parentId]().children.push(new PartyView(currentLevel[j].partyId));
			}
		}
	}
}


/* Generate Model from Tree JSON */

jsonModel = '{"children":[{"partyId":23567,"partyName":"Trial","dunsNumber":"Duns","createdBy":"sumit.binnani","children":[{"partyId":43567,"partyName":"Trial","dunsNumber":"Duns","createdBy":"sumit.binnani","children":[]}]},{"partyId":43557,"partyName":"Trial","dunsNumber":"Duns","createdBy":"sumit.binnani","children":[{"partyId":22557,"partyName":"Trial","dunsNumber":"Duns","createdBy":"sumit.binnani","children":[{"partyId":72681,"partyName":"Trial","dunsNumber":"Duns","createdBy":"sumit.binnani","children":[{"partyId":57844,"partyName":"Trial","dunsNumber":"Duns","createdBy":"sumit.binnani","children":[]},{"partyId":27844,"partyName":"Trial","dunsNumber":"Duns","createdBy":"sumit.binnani","children":[]}]}]}]}]}';

function addChildren(parentModel, children) {
    if (typeof children === "undefined")
        return;

    for (var i = 0; i < children.length; i++) { 
        var child = children[i];
        var childModel = new PartyView(child.partyId);
        parentModel.children.push(childModel);
        addChildren(childModel, child.children);
    }
}

function initialiseModel(jsonModel){
	var parsedModel = JSON.parse(jsonModel);
	for(i=0; i<parsedModel.children.length; i++){
		var child = parsedModel.children[i];
        var childModel = new PartyView(child.partyId);
		modelView.children.push(childModel);
		addChildren(childModel, child.children);
	}
}
