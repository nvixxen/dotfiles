require.config({
    paths: {
        "customize-ui" : "/home/nik/.config/Code - OSS/User/globalStorage/iocave.customize-ui/modules",
        "monkey-generated" : "/home/nik/.config/Code - OSS/User/globalStorage/iocave.monkey-patch/modules"
    }
});

define(["monkey-generated/entrypoint-main", "customize-ui/title-bar-main-process", "customize-ui/utils"], function (){});