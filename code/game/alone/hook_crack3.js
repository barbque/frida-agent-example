// com.kanxue.crackme

function hook_19a60() {
    // base64加密
    var libbnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libbnative_addr)
    var addr_0x19a60 = libbnative_addr.add(0x19a60);
    console.log("addr_0x19a60 ->", addr_0x19a60)
    Interceptor.attach(addr_0x19a60, {
        onEnter: function (args) {
            // qq666
            console.log("args0:->", Memory.readCString(args[0]))
            // 5
            console.log("args1:->", args[1].toInt32())

        },
        onLeave: function (retval) {
            // base64加密结果
            console.log("retval:->", Memory.readCString(retval))
        }
    })
}


function hook_28EB8() {
    var libbnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libbnative_addr)
    var addr_0x28EB8 = libbnative_addr.add(0x28EB8);
    console.log("addr_0x28EB8 ->", addr_0x28EB8)
    Interceptor.attach(addr_0x28EB8, {
        onEnter: function (args) {
            console.log("args0:->", hexdump(args[0]))
            console.log("args1:->", args[1].toInt32())
            console.log("args2:->", hexdump(args[2])
            )

        },
        onLeave: function (retval) {
            console.log("retval:->", retval)
        }
    })
}


function hook_22478() {
    // hook寄存器地址，得到对比的正确的base64
    var libbnative_addr = Module.findBaseAddress('libnative-lib.so');
    console.log("so base address ->", libbnative_addr)
    var addr_0x22478 = libbnative_addr.add(0x22478);
    console.log("addr_0x22478 ->", addr_0x22478)
    Interceptor.attach(addr_0x22478, {
        onEnter: function (args) {
            console.log(hexdump(this.context.x0));
            console.log(hexdump(this.context.x1));
        },
        onLeave: function (retval) {
        }
    })
}


function main() {
    hook_19a60()
    hook_28EB8()
}


setImmediate(main)