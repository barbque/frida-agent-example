/*
在目标SO的JNIOnLoad刚执行完时再尝试一下call，如果存在初始化函数，
这个时机点样本的初始化函数应该也还没来得及运行，call 应该是没有结果的。
frida -U -f com.xxx.xxx -l code/game/alone/hook_lession7.js
*/


var android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");
if (android_dlopen_ext != null) {
    Interceptor.attach(android_dlopen_ext, {
        onEnter: function (args) {
            this.hook = false;
            var soName = args[0].readCString();
            if (soName.indexOf("libmtguard.so") !== -1) {
                this.hook = true;
            }
        },
        onLeave: function (retval) {
            if (this.hook) {
                var jniOnload = Module.findExportByName("libmtguard.so", "JNI_OnLoad");
                Interceptor.attach(jniOnload, {
                    onEnter: function (args) {
                        console.log("Enter Mtguard JNI OnLoad");
                    },
                    onLeave: function (retval) {
                        console.log("After Mtguard JNI OnLoad");
                        hook_mtso();
                    }
                });
            }
        }
    });
}


function hook_mtso() {
    Java.perform(function () {
        Java.use("com.meituan.android.common.mtguard.NBridge").main.implementation = function (arg1, arg2) {
            console.log("call com/meituan/android/common/mtguard/NBridge, main(I[Ljava/lang/Object;)[Ljava/lang/Object;");
            call_mtgsig();
            return this.main(arg1, arg2);
        }

        Java.use("com.meituan.android.common.mtguard.NBridge$SIUACollector").getHWProperty.implementation = function () {
            console.log("com/meituan/android/common/mtguard/NBridge$SIUACollector, getHWProperty()Ljava/lang/String;");
            call_mtgsig();
            return this.getHWProperty();
        }

        Java.use("com.meituan.android.common.mtguard.NBridge$SIUACollector").getEnvironmentInfo.implementation = function () {
            console.log("com/meituan/android/common/mtguard/NBridge$SIUACollector, getEnvironmentInfo()Ljava/lang/String;");
            call_mtgsig();
            return this.getEnvironmentInfo();
        }

        Java.use("com.meituan.android.common.mtguard.NBridge$SIUACollector").getEnvironmentInfoExtra.implementation = function () {
            console.log("com/meituan/android/common/mtguard/NBridge$SIUACollector, getEnvironmentInfoExtra()Ljava/lang/String;");
            call_mtgsig();
            return this.getEnvironmentInfoExtra();
        }

        Java.use("com.meituan.android.common.mtguard.NBridge$SIUACollector").getHWStatus.implementation = function () {
            console.log("com/meituan/android/common/mtguard/NBridge$SIUACollector, getHWStatus()Ljava/lang/String;");
            call_mtgsig();
            return this.getHWStatus();
        }

        Java.use("com.meituan.android.common.mtguard.NBridge$SIUACollector").getHWEquipmentInfo.implementation = function () {
            console.log("com/meituan/android/common/mtguard/NBridge$SIUACollector, getHWEquipmentInfo()Ljava/lang/String;");
            call_mtgsig();
            return this.getHWEquipmentInfo();
        }

        Java.use("com.meituan.android.common.mtguard.NBridge$SIUACollector").getUserAction.implementation = function () {
            console.log("com/meituan/android/common/mtguard/NBridge$SIUACollector, getUserAction()Ljava/lang/String;");
            call_mtgsig();
            return this.getUserAction();
        }

        Java.use("com.meituan.android.common.mtguard.NBridge$SIUACollector").getPlatformInfo.implementation = function () {
            console.log("com/meituan/android/common/mtguard/NBridge$SIUACollector, getPlatformInfo()Ljava/lang/String;");
            call_mtgsig();
            return this.getPlatformInfo();
        }

        Java.use("com.meituan.android.common.mtguard.NBridge$SIUACollector").getLocationInfo.implementation = function () {
            console.log("com/meituan/android/common/mtguard/NBridge$SIUACollector, getLocationInfo()Ljava/lang/String;");
            call_mtgsig();
            return this.getLocationInfo();
        }

        Java.use("com.meituan.android.common.mtguard.NBridge$SIUACollector").startCollection.implementation = function () {
            console.log("com/meituan/android/common/mtguard/NBridge$SIUACollector, startCollection()Ljava/lang/String;");
            call_mtgsig();
            return this.startCollection();
        }

        Java.use("com.meituan.android.common.mtguard.NBridge$SIUACollector").getExternalEquipmentInfo.implementation = function () {
            console.log("com/meituan/android/common/mtguard/NBridge$SIUACollector, getExternalEquipmentInfo()Ljava/lang/String;");
            call_mtgsig();
            return this.getExternalEquipmentInfo();
        }
    })
}


function call_mtgsig() {
    Java.perform(function () {
        var jinteger = Java.use("java.lang.Integer")
        var jstring = Java.use("java.lang.String");
        var NBridge = Java.use("com.meituan.android.common.mtguard.NBridge")
        // ArrayObject
        var objArr = [jstring.$new("9b69f861-e054-4bc4-9daf-d36ae205ed3e"), jstring.$new("GET /aggroup/homepage/display __reqTraceID=5ca01019-fafc-4f92-a80e-82ce1389aab7&abStrategy=d&allowToTrack=1&ci=1&cityId=1&clearTimeStamp=-1&clientName=android&clientType=android&firstPageAbtest=old&globalId=&limitForYouXuan=25&msid=96E3002678491E51616650388270&offsetForYouXuan=0&os_version=8.1.0&phone_model=Nexus%205X&scene=youxuanZhuanqu&showStyle=1&topic_session_id=4324505e-ccc6-4f7a-9943-d65223bbb9a7&userid=-1&utm_campaign=AgroupBgroupC0E0Ghomepage&utm_content=96E3002678491E5&utm_medium=android&utm_source=wandoujia&utm_term=1100090405&uuid=00000000000005FB514BD2BA040ABADC24C8D31AD4F18A162330366877733119&version_name=11.9.405&wifi-cur=0&wifi-mac=02%3A00%3A00%3A00%3A00%3A00%08&wifi-name=%3Cunknown%20ssid%3E%08&wifi-strength=-10%08&withRegion=0").getBytes(), jinteger.valueOf(2)]
        var result = NBridge.main(203, objArr);
        console.log("result:"+result);
    })
}

