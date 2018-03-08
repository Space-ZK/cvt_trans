var DataUnit = function(len, sel) {
	this.length = len;
	this.selected = sel;
}

var DataList = function(socket) {
	this.data = new Array();
}

DataList.prototype.AddDataUnit = function (unit) {
	for(var i = 0; i < this.data.length(); i++) {
		if(this.data[i].length === unit.length) {
			return false;
		}
	}
	this.data.push(unit);
	return true;
}

DataList.prototype.LoadDataList = function(datLst) {
	this.data.clear();
	for(var i = 0; i < datLst.length(); i++) {
		this.data.push(datLst[i]);
	}
}

DataList.prototype.RemoveDataUnit = function (unit) {
	for(var i = 0; i < this.data.length(); i++) {
		if(this.data[i].length === unit.length) {
			delete this.data[i];
			return true;
		}
	}
	return false;
}
