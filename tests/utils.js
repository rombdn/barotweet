define([], function(){
	
	var module = {
		getErrorMsg: function(validationError) {
			return _.map(validationError, function(msg){
				console.log('getErrorMsg:'+ msg.message);
				return msg.message;
			}, this);
		}
	};

	return module;
});