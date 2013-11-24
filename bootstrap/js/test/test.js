
define([
'models/project'


],function(model){

	console.log('inside test');

	var assert = require("assert")
	describe('Array', function(){
	  describe('#indexOf()', function(){
	    it('should retrun string ', function(){
	      assert.equal('string', model.getType('Work') );
	      
	    })
	  })
	})


});