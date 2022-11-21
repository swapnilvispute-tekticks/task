const {depositAmount}  = require('./../index');
var expect = require('chai').expect;

describe ("Deposit function", function(){
    const amount = 100;
    it("deposit amount should be greater than zero", function(){
        let data = depositAmount('swapnil',amount);
        expect(amount).to.be.above(0);
        expect(data).to.have.all.keys('depositAmount', 'balance');
    })

    it("deposit result", function(){
        let data = depositAmount('swapnil',amount);
        expect(amount).to.be.above(0);
     })
})