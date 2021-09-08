function hook_encode() {
    Java.perform(function x() {
        var Base64 = Java.use("android.util.Base64");
        var ByteString = Java.use("com.android.okhttp.okio.ByteString");
        Base64.encodeToString.overload('[B', 'int').implementation = function (v1, v2) {
            console.log("---------Base64 encodeToString start---------");
            console.log("v1:", ByteString.of(v1).utf8());
            console.log("v2:" + v2);
            var result = this.encodeToString(v1, v2);
            console.log("result:" + result);
            console.log("---------Base64 encodeToString end---------");
            return result
        };
    })
}


function hook_sha1() {
    Java.perform(function x() {
        var DeviceUtil = Java.use('com.bk.base.util.bk.DeviceUtil');
        DeviceUtil.SHA1ToString.implementation = function (s1) {
            console.log("---------DeviceUtil SHA1ToString start---------");
            console.log("s1:" + s1);
            var result = this.SHA1ToString(s1);
            console.log("result:" + result);
            console.log("---------DeviceUtil SHA1ToString end---------");
            return result
        }
    })
}

function main() {
    hook_sha1()
    hook_encode()
}

setImmediate(main);
