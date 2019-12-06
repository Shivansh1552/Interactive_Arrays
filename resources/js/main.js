var observer = lozad();
observer.observe();

var frameworks = {
    'lodash': ["https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.core.js", '_.VERSION', '_'],
    'jquery': ["", "$.fn.jquery"],
    'underscore': ["https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore.js", "_.VERSION", '_'],
    'ramda': ["https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js", "", 'R'],
    'moment': ["https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js", "", 'moment'],
    'math': ["https://cdnjs.cloudflare.com/ajax/libs/mathjs/6.2.2/math.js", "", 'math'],
    'collect': ["https://cdnjs.cloudflare.com/ajax/libs/collect.js/4.16.6/collect.js", "", "collect"]
};
var loaded = [];


function _loadScript(selectedIds) {
    "use strict";

    var i, o = 0,
        pathes = [],
        versionPath = [],
        variablePath = [];
    for (i = 0; i < selectedIds.length; i++) {
        if (!window[selectedIds[i]]) {
            pathes[o] = frameworks[selectedIds[i]][0];
            versionPath[o] = frameworks[selectedIds[i]][1];
            variablePath[o] = frameworks[selectedIds[i]][2];
            o++;
        } else {
            selectedIds[i] = undefined;
        }

    }
    selectedIds = selectedIds.filter(function (el) {
        return el != undefined;
    });
    //            var scripts = new Array();
    var j, script;
    for (j = 0; j < selectedIds.length; j++) {
        var path = pathes[j],
            verPath = versionPath[j],
            varPath = variablePath[j];
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.newVarPath = selectedIds[j];
        script.verPath = verPath;
        script.varPath = varPath;
        script.startTime = new Date().getMilliseconds();
        script.onload = function (script) {
            var b = "color:#0F669D;font-weight:bold;";
            var endTime = new Date().getMilliseconds();
            console.log(this.newVarPath + '%c script loaded!' + 'in ' + (endTime - this.startTime) + ' ms', b);
            loaded.push(this.newVarPath);
            try {
                console.log('%cVersion:' + eval("window." + this.verPath), b);
            } catch (error) {
                console.error("failed identifying library's version");
            }
            try {
                // if the lib offers noConflict
                eval("window." + this.newVarPath + " = " + this.varPath + ".noConflict()");
            } catch (error2) {
                try {
                    eval("window." + this.newVarPath + " = " + this.varPath);
                } catch (error3) {
                    console.error("failed loading the script");
                }
                console.error("failed loading the script strcictly with no conflict");
            }

        };
        script.src = path;
        document.head.appendChild(script);
    }
}

function custom_loadScript() {
    "use strict";
    var arbLibrary = document.getElementById('arbLibrary').value;
    var arbURL = "https://cdnjs.cloudflare.com/" + document.getElementById('arbURL').value;
    var arbVersion = document.getElementById('arbVersion').value;
    var arbVariable = document.getElementById('arbVariable').value;
    if (frameworks[arbLibrary]) {
        console.log("known version with the initial variable was used instead");
    } else {
        frameworks[arbLibrary] = [arbURL, arbVersion, arbVariable];
    }
    _loadScript([arbLibrary]);
}

function unloadScripts() {
    "use strict";
    var j;
    for (j = 0; j < loaded.length; j++) {
        eval("delete window." + loaded[j]);
    }
    console.log('all libraries unloaded from windows context');
}
window.onload = function () {
    "use strict";
    var helloWorld = "font-size:21px; font-weight:200; letter-spacing:0.2em; line-height:1.4em; font-family:helvetica,arial; color:rgba(0,0,25,0.5); background: #222; color: #bada55";
    console.log("%cInteractive Arrays", helloWorld);
    console.log("Think of getting full advantage of Chrome 'console' object https://developers.google.com/web/tools/chrome-devtools/console/api");
    console.dir(console);
    var b = "color:#0F669D;font-weight:bold;";
    console.log('%cjquery script loaded! Version:' + $.fn.jquery, b);
    //    Sentry.init({
    //        dsn: 'https://b20d3fb31f5247b0b3873400bb4a28cf@sentry.io/1840726'
    //    });
}
$(document).ready(function ($) {
    "use strict";
    $("#Frameworks").hide();
    $("#Frameworks").click(function () {
        var selectedIds = $("#frameworks :checkbox:checked").map(function () {
            return $(this).val();
        }).get();
        _loadScript(selectedIds);
    });

    $("#frameworks :checkbox").click(function () {
        if ($("#frameworks :checkbox:checked").length > 0) {
            $("#Frameworks").show();
        } else {
            $("#Frameworks").hide();
        }
    });
});

// <a href="#reduce">reduce</a>
var docURLs = {
    'lodash': 'https://lodash.com/docs/#',
    'underscore': 'https://underscorejs.org/#',
    'ramda': 'https://ramdajs.com/docs/#',
    'jQuery': 'https://api.jquery.com/jQuery.',
    '$': 'https://api.jquery.com/jQuery.'
}

function print(Obj, lib) {
    var functions = [],
        long = false,
        strObj;
    if (typeof Obj == 'string') {
        strObj = Obj;
    } else {
        if ((typeof Obj.prototype) == 'object') {
            console.info('Only logging functions in object');
            functions = Object.getOwnPropertyNames(Obj).filter(function (p) {
                return typeof Obj[p] === 'function';
            });
            strObj = functions.join(', ');
            console.info(strObj);
            long = true;
        }
        if ((typeof Obj.prototype) == undefined) {
            console.info("cannot log object in the web page");
            return;
        }
        for (o in window) {
            if (window[o] === Obj) {
                lib = o;
            }
        }
        if (lib && functions) {
            var j;
            for (j = 0; j < functions.length; j++) {
                functions[j] = '<a href=' + docURLs[lib] + functions[j] + '>' + functions[j] + '</a>';
            }
            strObj = functions.join(', ');
        }
    }
    var x = document.getElementById("loggingBar");
    //check if div exist
    //if not create it and also add a script
    //that scrolls on bottom on every change
    console.log("I put a debugger breakpoint so that you can see code running this webpage, ie: you could help me write a better code for this !")
    debugger;
    if (long)
        strObj = "<br />" + strObj + "<br />";
    if (x) {
        x.innerHTML += "<br />" + strObj;
        x.style.display = 'block'
    } else {
        let div = document.createElement("pre"),
            css = "display:block;" +
            "position:fixed;" +
            "z-index:99999999;" +
            "padding:5px;" +
            "bottom:15px;" +
            "left:15px;" +
            "right:15px;" +
            "max-height:300px;" +
            "background:#333;" +
            "color:#ddd;" +
            "overflow: auto;" +
            "margin:0;";
        div.id = "loggingBar";
        div.style.cssText = css;
        div.innerHTML = Obj;
        document.body.appendChild(div);
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = `var x=document.getElementById("loggingBar");
                        if(window.addEventListener) {
                          x.addEventListener('DOMSubtreeModified', if_changed, false);
                        }
                        function if_changed() {
                          x.scrollTop = x.scrollHeight;
                        }`;
        document.body.appendChild(script);
    }
}

function stringifyObject(e) {
    const obj = {};
    for (let k in e) {
        obj[k] = e[k];
    }
    var str = JSON.stringify(obj, (k, v) => {
        if (v instanceof Node) return 'Node';
        if (v instanceof Window) return 'Window';
        return v;
    }, ' ');
    var x = document.getElementById("loggingBar");
    x.innerHTML = str;
    document.body.appendChild(x);
    return str;
}

function Hide(divID) {
    divID.style.display = "none";
}

function Clear(divID) {
    divID.innerHTML = '    <div id="right">\
        <a href="#" onclick="Hide(loggingBar);">X</a>...\
        <a href="#" onclick="Clear(loggingBar);">Clear</a>\
    </div>\
    <div id="left">\
        Logging\
    </div>';
}


function toggleVisibility(id) {
    var el = document.getElementById(id);

    if (el.style.visibility == "visible") {
        el.style.visibility = "hidden";
    } else {
        el.style.visibility = "visible";
    }
}
