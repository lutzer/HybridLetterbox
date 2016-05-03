class View {
	
    constructor(name) {
        this._name = name;
    }

    name(name) {
        if (!arguments.length) return this._name;
        this._name = name;
        return this;
    }

    print(msg) {
    	console.log(msg);
    }
}

module.exports = View;