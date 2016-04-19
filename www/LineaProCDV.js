var exec = require('cordova/exec');

var LineaProCDV = {

    // results: [],
    barcodeCb: null,
    connectionCb: null,
    errorCb: null,
    cancelCb: null,

    init: function(connectionCb, barcodeCb, cancelCb, errorCb) {
        LineaProCDV.connectionCb = connectionCb;
        LineaProCDV.cancelCb = cancelCb;
        LineaProCDV.barcodeCb = barcodeCb;
        LineaProCDV.errorCb = errorCb;
        exec(null, errorCb, "LineaProCDV", "initDT", []);
        console.log('----------- init() ----------------');
    },

    barcodeStart: function() {
        exec(null, null, "LineaProCDV", "startBarcode", []);
        console.log('----- barcodeStart -----');
    },

    barcodeStop: function() {
        exec(null, null, "LineaProCDV", "stopBarcode", []);
        console.log('----- barcodeStop -----');
    },

    connectionChanged: function(state) {
        LineaProCDV.connectionCb(state);
        console.log('----- connectionChanged -----');
        console.log('----- state -----:', state);
    },

    // override the initialized callback with a new one.
    setBarcodeCallback: function(callback) {
        LineaProCDV.barcodeCb = callback;
        console.log('----- setBarcodeCallback -----');
    },

    onBarcodeData: function(data, type) {
        LineaProCDV.barcodeCb({
            data: data[0],
            type: type
        });
    }

};

module.exports = LineaProCDV;