function getXmlHttp() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function strtojson(str) {
    var json = (new Function("return " + str))();
    return json;
}

function clear_log() {
    var xmlhttp = getXmlHttp();
    xmlhttp.open("GET",'/index/deldata', true);
    xmlhttp.send();
}

function getLogdata() {
    var xmlhttp = getXmlHttp();
    var dnslog = document.getElementById('dnslog');
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    xmlhttp.open("POST",'/index/getdata', true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "csrfmiddlewaretoken=" + csrf;
    xmlhttp.send(data)
    xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState==4 && xmlhttp.status==200){
             var logdata = strtojson(xmlhttp.responseText)['logdata'];

             if (logdata.length == 0){
                dnslog.innerHTML = "<div class=\"container\">\n" +
                    "        <h1 class=\"text-info text-center\">Sorry no data!!</h1>\n" +
                    "   </div>";
             }else {
                var mytable = "<table class=\"table\">\n" +
                    "    <caption>DNSLOG平台</caption>\n" +
                    "    <thead>\n" +
                    "        <tr>\n" +
                    "            <th>IP</th>\n" +
                    "            <th>qname</th>\n" +
                    "            <th>qtype</th>\n" +
                    "            <th>时间</th>\n" +
                    "        </tr>\n" +
                    "    </thead>\n" +
                    "    <tbody>\n";
                for(var i=0; i<logdata.length; i++){
                    var data = "<tr>\n" +
                        "            <td>"+ logdata[i].IP +"</td>\n" +
                        "            <td>" +logdata[i].text+ "</td>\n" +
                        "            <td>"+logdata[i].qtype+"</td>\n" +
                        "            <td>"+logdata[i].recvdate+"</td>\n" +
                        "        </tr>"
                    mytable += data;
                }
                mytable += "</tbody></table>";
                dnslog.innerHTML = mytable;
             }
         }
    }

}

var handler = setInterval(getLogdata, 1000);

function clear_hex() {
    document.getElementById("decodehex").value="";
}

// 16进制转字符串
function decode_hex() {
    var val = document.getElementById("decodehex").value;
    var trimedStr = val.trim();
　　 var rawStr = trimedStr.substr(0,2).toLowerCase() === "0x"?trimedStr.substr(2):trimedStr;
    var len = rawStr.length;
　　 if(len % 2 !== 0) {
　　　　alert("Illegal Format ASCII Code!");
　　　　return "";
　　 }
　　 var curCharCode;
　　 var resultStr = [];
　　 for(var i = 0; i < len;i = i + 2) {
　　　　curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
　　　　resultStr.push(String.fromCharCode(curCharCode));
　　 }
    document.getElementById("decodehex").value = resultStr.join("");
}