const {loginUser}  = require('./../index');
var expect = require('chai').expect;

describe("Login User", function(){
    const name = 'swapnil'
    const result = loginUser(name); 
    console.log('result', result);
    it("Result should be an object", function() {
        expect(result).to.be.an('object');
    })

    it("Result should have propeties id, name and balance", function(){
        expect(result).to.have.all.keys('id','name', 'balance');
    })

    it("Result should have name simillar to input", function(){
        expect(result).have.own.property('name', name);
    })
})