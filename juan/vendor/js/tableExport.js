/*
 tableExport.jquery.plugin

 Copyright (c) 2015,2016 hhurz, https://github.com/hhurz/tableExport.jquery.plugin
 Original work Copyright (c) 2014 Giri Raj, https://github.com/kayalshri/

 Licensed under the MIT License, http://opensource.org/licenses/mit-license
*/
(function(d){d.fn.extend({tableExport:function(u){function P(b){var a=[];d(b).find("thead").first().find("th").each(function(b,f){void 0!==d(f).attr("data-field")?a[b]=d(f).attr("data-field"):a[b]=b.toString()});return a}function y(b,g,e,f,k){if(-1==d.inArray(e,a.ignoreRow)&&-1==d.inArray(e-f,a.ignoreRow)){var A=d(b).filter(function(){return"none"!=d(this).data("tableexport-display")&&(d(this).is(":visible")||"always"==d(this).data("tableexport-display")||"always"==d(this).closest("table").data("tableexport-display"))}).find(g),
Q=0;A.each(function(b){if("always"==d(this).data("tableexport-display")||"none"!=d(this).css("display")&&"hidden"!=d(this).css("visibility")&&"none"!=d(this).data("tableexport-display")){var g=b,f=!1;0<a.ignoreColumn.length&&("string"==typeof a.ignoreColumn[0]?H.length>g&&"undefined"!=typeof H[g]&&-1!=d.inArray(H[g],a.ignoreColumn)&&(f=!0):"number"!=typeof a.ignoreColumn[0]||-1==d.inArray(g,a.ignoreColumn)&&-1==d.inArray(g-A.length,a.ignoreColumn)||(f=!0));if(0==f&&"function"===typeof k){var f=0,
h,l=0;if("undefined"!=typeof v[e]&&0<v[e].length)for(g=0;g<=b;g++)"undefined"!=typeof v[e][g]&&(k(null,e,g),delete v[e][g],b++);d(this).is("[colspan]")&&(f=parseInt(d(this).attr("colspan")),Q+=0<f?f-1:0);d(this).is("[rowspan]")&&(l=parseInt(d(this).attr("rowspan")));k(this,e,b);for(g=0;g<f-1;g++)k(null,e,b+g);if(l)for(h=1;h<l;h++)for("undefined"==typeof v[e+h]&&(v[e+h]=[]),v[e+h][b+Q]="",g=1;g<f;g++)v[e+h][b+Q-g]=""}}});if("undefined"!=typeof v[e]&&0<v[e].length)for(c=0;c<=v[e].length;c++)"undefined"!=
typeof v[e][c]&&(k(null,e,c),delete v[e][c])}}function T(b){!0===a.consoleLog&&console.log(b.output());if("string"===a.outputMode)return b.output();if("base64"===a.outputMode)return E(b.output());try{var g=b.output("blob");saveAs(g,a.fileName+".pdf")}catch(e){G(a.fileName+".pdf","data:application/pdf;base64,",b.output())}}function U(b,a,e){var f=0;"undefined"!=typeof e&&(f=e.colspan);if(0<=f){for(var k=b.width,d=b.textPos.x,h=a.table.columns.indexOf(a.column),l=1;l<f;l++)k+=a.table.columns[h+l].width;
1<f&&("right"===b.styles.halign?d=b.textPos.x+k-b.width:"center"===b.styles.halign&&(d=b.textPos.x+(k-b.width)/2));b.width=k;b.textPos.x=d;"undefined"!=typeof e&&1<e.rowspan&&(b.height*=e.rowspan);if("middle"===b.styles.valign||"bottom"===b.styles.valign)e=("string"===typeof b.text?b.text.split(/\r\n|\r|\n/g):b.text).length||1,2<e&&(b.textPos.y-=(2-1.15)/2*a.row.styles.fontSize*(e-2)/3);return!0}return!1}function V(b,g,e){g.each(function(){var g=d(this).children();if(d(this).is("div")){var k=L(C(this,
"background-color"),[255,255,255]),A=L(C(this,"border-top-color"),[0,0,0]),h=M(this,"border-top-width",a.jspdf.unit),l=this.getBoundingClientRect(),m=this.offsetLeft*e.dw,n=this.offsetTop*e.dh,p=l.width*e.dw,l=l.height*e.dh;e.doc.setDrawColor.apply(void 0,A);e.doc.setFillColor.apply(void 0,k);e.doc.setLineWidth(h);e.doc.rect(b.x+m,b.y+n,p,l,h?"FD":"F")}"undefined"!=typeof g&&0<g.length&&V(b,g,e)})}function R(b,a,e){return b.replace(new RegExp(a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"),"g"),e)}
function aa(b){b=R(b||"0",a.numbers.html.decimalMark,".");b=R(b,a.numbers.html.thousandsSeparator,"");return"number"===typeof b||!1!==jQuery.isNumeric(b)?b:!1}function w(b,g,e){var f="";if(null!=b){b=d(b);var k;k=b[0].hasAttribute("data-tableexport-value")?b.data("tableexport-value"):b.html();"function"===typeof a.onCellHtmlData&&(k=a.onCellHtmlData(b,g,e,k));if(!0===a.htmlContent)f=d.trim(k);else{var A=k.replace(/\n/g,"\u2028").replace(/<br\s*[\/]?>/gi,"\u2060");k=d("<div/>").html(A).contents();
A="";d.each(k.text().split("\u2028"),function(b,a){0<b&&(A+=" ");A+=d.trim(a)});d.each(A.split("\u2060"),function(b,a){0<b&&(f+="\n");f+=d.trim(a).replace(/\u00AD/g,"")});if(a.numbers.html.decimalMark!=a.numbers.output.decimalMark||a.numbers.html.thousandsSeparator!=a.numbers.output.thousandsSeparator)if(k=aa(f),!1!==k){var h=(""+k).split(".");1==h.length&&(h[1]="");var l=3<h[0].length?h[0].length%3:0,f=(0>k?"-":"")+(a.numbers.output.thousandsSeparator?(l?h[0].substr(0,l)+a.numbers.output.thousandsSeparator:
"")+h[0].substr(l).replace(/(\d{3})(?=\d)/g,"$1"+a.numbers.output.thousandsSeparator):h[0])+(h[1].length?a.numbers.output.decimalMark+h[1]:"")}}!0===a.escape&&(f=escape(f));"function"===typeof a.onCellData&&(f=a.onCellData(b,g,e,f))}return f}function ba(b,a,e){return a+"-"+e.toLowerCase()}function L(b,a){var e=/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(b),f=a;e&&(f=[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]);return f}function W(b){var a=C(b,"text-align"),e=C(b,"font-weight"),f=C(b,"font-style"),
k="";"start"==a&&(a="rtl"==C(b,"direction")?"right":"left");700<=e&&(k="bold");"italic"==f&&(k+=f);""==k&&(k="normal");a={style:{align:a,bcolor:L(C(b,"background-color"),[255,255,255]),color:L(C(b,"color"),[0,0,0]),fstyle:k},colspan:parseInt(d(b).attr("colspan"))||0,rowspan:parseInt(d(b).attr("rowspan"))||0};null!==b&&(b=b.getBoundingClientRect(),a.rect={width:b.width,height:b.height});return a}function C(a,g){try{return window.getComputedStyle?(g=g.replace(/([a-z])([A-Z])/,ba),window.getComputedStyle(a,
null).getPropertyValue(g)):a.currentStyle?a.currentStyle[g]:a.style[g]}catch(e){}return""}function M(a,g,e){g=C(a,g).match(/\d+/);if(null!==g){g=g[0];a=a.parentElement;var f=document.createElement("div");f.style.overflow="hidden";f.style.visibility="hidden";a.appendChild(f);f.style.width=100+e;e=100/f.offsetWidth;a.removeChild(f);return g*e}return 0}function G(a,g,e){var f=window.navigator.userAgent;if(0<f.indexOf("MSIE ")||f.match(/Trident.*rv\:11\./)){if(g=document.createElement("iframe"))document.body.appendChild(g),
g.setAttribute("style","display:none"),g.contentDocument.open("txt/html","replace"),g.contentDocument.write(e),g.contentDocument.close(),g.focus(),g.contentDocument.execCommand("SaveAs",!0,a),document.body.removeChild(g)}else if(f=document.createElement("a")){f.style.display="none";f.download=a;0<=g.toLowerCase().indexOf("base64,")?f.href=g+E(e):f.href=g+encodeURIComponent(e);document.body.appendChild(f);if(document.createEvent)null==N&&(N=document.createEvent("MouseEvents")),N.initEvent("click",
!0,!1),f.dispatchEvent(N);else if(document.createEventObject)f.fireEvent("onclick");else if("function"==typeof f.onclick)f.onclick();document.body.removeChild(f)}}function E(a){var g="",e,f,k,d,h,l,m=0;a=a.replace(/\x0d\x0a/g,"\n");f="";for(k=0;k<a.length;k++)d=a.charCodeAt(k),128>d?f+=String.fromCharCode(d):(127<d&&2048>d?f+=String.fromCharCode(d>>6|192):(f+=String.fromCharCode(d>>12|224),f+=String.fromCharCode(d>>6&63|128)),f+=String.fromCharCode(d&63|128));for(a=f;m<a.length;)e=a.charCodeAt(m++),
f=a.charCodeAt(m++),k=a.charCodeAt(m++),d=e>>2,e=(e&3)<<4|f>>4,h=(f&15)<<2|k>>6,l=k&63,isNaN(f)?h=l=64:isNaN(k)&&(l=64),g=g+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l);return g}var a={consoleLog:!1,csvEnclosure:'"',csvSeparator:",",csvUseBOM:!0,
displayTableName:!1,escape:!1,excelstyles:[],fileName:"tableExport",htmlContent:!1,ignoreColumn:[],ignoreRow:[],jsonScope:"all",jspdf:{orientation:"p",unit:"pt",format:"a4",margins:{left:20,right:10,top:10,bottom:10},autotable:{styles:{cellPadding:2,rowHeight:12,fontSize:8,fillColor:255,textColor:50,fontStyle:"normal",overflow:"ellipsize",halign:"left",valign:"middle"},headerStyles:{fillColor:[52,73,94],textColor:255,fontStyle:"bold",halign:"center"},alternateRowStyles:{fillColor:245},tableExport:{onAfterAutotable:null,
onBeforeAutotable:null,onTable:null}}},numbers:{html:{decimalMark:".",thousandsSeparator:","},output:{decimalMark:".",thousandsSeparator:","}},onCellData:null,onCellHtmlData:null,outputMode:"file",tbodySelector:"tr",tfootSelector:"tr",theadSelector:"tr",tableName:"myTableName",type:"csv",worksheetName:"xlsWorksheetName"},r=this,N=null,t=[],n=[],p=0,v=[],l="",H=[];d.extend(!0,a,u);H=P(r);if("csv"==a.type||"txt"==a.type){u=function(b,g,e,f){n=d(r).find(b).first().find(g);n.each(function(){l="";y(this,
e,p,f+n.length,function(b,e,d){var g=l,f="";if(null!=b)if(b=w(b,e,d),e=null===b||""==b?"":b.toString(),b instanceof Date)f=a.csvEnclosure+b.toLocaleString()+a.csvEnclosure;else if(f=R(e,a.csvEnclosure,a.csvEnclosure+a.csvEnclosure),0<=f.indexOf(a.csvSeparator)||/[\r\n ]/g.test(f))f=a.csvEnclosure+f+a.csvEnclosure;l=g+(f+a.csvSeparator)});l=d.trim(l).substring(0,l.length-1);0<l.length&&(0<D.length&&(D+="\n"),D+=l);p++});return n.length};var D="",B=0,p=0,B=B+u("thead",a.theadSelector,"th,td",B),B=B+
u("tbody",a.tbodySelector,"td",B);a.tfootSelector.length&&u("tfoot",a.tfootSelector,"td",B);D+="\n";!0===a.consoleLog&&console.log(D);if("string"===a.outputMode)return D;if("base64"===a.outputMode)return E(D);try{var z=new Blob([D],{type:"text/"+("csv"==a.type?"csv":"plain")+";charset=utf-8"});saveAs(z,a.fileName+"."+a.type,"csv"!=a.type||!1===a.csvUseBOM)}catch(b){G(a.fileName+"."+a.type,"data:text/"+("csv"==a.type?"csv":"plain")+";charset=utf-8,"+("csv"==a.type&&a.csvUseBOM?"\ufeff":""),D)}}else if("sql"==
a.type){var p=0,q="INSERT INTO `"+a.tableName+"` (",t=d(r).find("thead").first().find(a.theadSelector);t.each(function(){y(this,"th,td",p,t.length,function(a,d,e){q+="'"+w(a,d,e)+"',"});p++;q=d.trim(q);q=d.trim(q).substring(0,q.length-1)});q+=") VALUES ";n=d(r).find("tbody").first().find(a.tbodySelector);a.tfootSelector.length&&n.push(d(r).find("tfoot").find(a.tfootSelector));n.each(function(){l="";y(this,"td",p,t.length+n.length,function(a,d,e){l+="'"+w(a,d,e)+"',"});3<l.length&&(q+="("+l,q=d.trim(q).substring(0,
q.length-1),q+="),");p++});q=d.trim(q).substring(0,q.length-1);q+=";";!0===a.consoleLog&&console.log(q);if("string"===a.outputMode)return q;if("base64"===a.outputMode)return E(q);try{z=new Blob([q],{type:"text/plain;charset=utf-8"}),saveAs(z,a.fileName+".sql")}catch(b){G(a.fileName+".sql","data:application/sql;charset=utf-8,",q)}}else if("json"==a.type){var I=[],t=d(r).find("thead").first().find(a.theadSelector);t.each(function(){var a=[];y(this,"th,td",p,t.length,function(d,e,f){a.push(w(d,e,f))});
I.push(a)});var S=[],n=d(r).find("tbody").first().find(a.tbodySelector);a.tfootSelector.length&&n.push(d(r).find("tfoot").find(a.tfootSelector));n.each(function(){var a={},g=0;y(this,"td",p,t.length+n.length,function(e,d,k){I.length?a[I[I.length-1][g]]=w(e,d,k):a[g]=w(e,d,k);g++});0==d.isEmptyObject(a)&&S.push(a);p++});u="";u="head"==a.jsonScope?JSON.stringify(I):"data"==a.jsonScope?JSON.stringify(S):JSON.stringify({header:I,data:S});!0===a.consoleLog&&console.log(u);if("string"===a.outputMode)return u;
if("base64"===a.outputMode)return E(u);try{z=new Blob([u],{type:"application/json;charset=utf-8"}),saveAs(z,a.fileName+".json")}catch(b){G(a.fileName+".json","data:application/json;charset=utf-8;base64,",u)}}else if("xml"===a.type){var p=0,x='<?xml version="1.0" encoding="utf-8"?>',x=x+"<tabledata><fields>",t=d(r).find("thead").first().find(a.theadSelector);t.each(function(){y(this,"th,td",p,n.length,function(a,d,e){x+="<field>"+w(a,d,e)+"</field>"});p++});var x=x+"</fields><data>",X=1,n=d(r).find("tbody").first().find(a.tbodySelector);
a.tfootSelector.length&&n.push(d(r).find("tfoot").find(a.tfootSelector));n.each(function(){var a=1;l="";y(this,"td",p,t.length+n.length,function(d,e,f){l+="<column-"+a+">"+w(d,e,f)+"</column-"+a+">";a++});0<l.length&&"<column-1></column-1>"!=l&&(x+='<row id="'+X+'">'+l+"</row>",X++);p++});x+="</data></tabledata>";!0===a.consoleLog&&console.log(x);if("string"===a.outputMode)return x;if("base64"===a.outputMode)return E(x);try{z=new Blob([x],{type:"application/xml;charset=utf-8"}),saveAs(z,a.fileName+
".xml")}catch(b){G(a.fileName+".xml","data:application/xml;charset=utf-8;base64,",x)}}else if("excel"==a.type||"xls"==a.type||"word"==a.type||"doc"==a.type){u="excel"==a.type||"xls"==a.type?"excel":"word";var B="excel"==u?"xls":"doc",m='xmlns:x="urn:schemas-microsoft-com:office:'+u+'"',F="";d(r).filter(function(){return"none"!=d(this).data("tableexport-display")&&(d(this).is(":visible")||"always"==d(this).data("tableexport-display"))}).each(function(){p=0;H=P(this);F+="<table><thead>";t=d(this).find("thead").first().find(a.theadSelector);
t.each(function(){l="";y(this,"th,td",p,t.length,function(b,g,e){if(null!=b){var f="";l+="<th";for(var k in a.excelstyles)if(a.excelstyles.hasOwnProperty(k)){var h=d(b).css(a.excelstyles[k]);""!=h&&"0px none rgb(0, 0, 0)"!=h&&(""==f&&(f='style="'),f+=a.excelstyles[k]+":"+h+";")}""!=f&&(l+=" "+f+'"');d(b).is("[colspan]")&&(l+=' colspan="'+d(b).attr("colspan")+'"');d(b).is("[rowspan]")&&(l+=' rowspan="'+d(b).attr("rowspan")+'"');l+=">"+w(b,g,e)+"</th>"}});0<l.length&&(F+="<tr>"+l+"</tr>");p++});F+=
"</thead><tbody>";n=d(this).find("tbody").first().find(a.tbodySelector);a.tfootSelector.length&&n.push(d(r).find("tfoot").find(a.tfootSelector));n.each(function(){l="";y(this,"td",p,t.length+n.length,function(b,g,e){if(null!=b){var f="",k=d(b).data("tableexport-msonumberformat");"undefined"==typeof k&&"function"===typeof a.onMsoNumberFormat&&(k=a.onMsoNumberFormat(b,g,e));"undefined"!=typeof k&&""!=k&&(f="style=\"mso-number-format:'"+k+"'");l+="<td";for(var h in a.excelstyles)a.excelstyles.hasOwnProperty(h)&&
(k=d(b).css(a.excelstyles[h]),""!=k&&"0px none rgb(0, 0, 0)"!=k&&(""==f&&(f='style="'),f+=a.excelstyles[h]+":"+k+";"));""!=f&&(l+=" "+f+'"');d(b).is("[colspan]")&&(l+=' colspan="'+d(b).attr("colspan")+'"');d(b).is("[rowspan]")&&(l+=' rowspan="'+d(b).attr("rowspan")+'"');l+=">"+w(b,g,e)+"</td>"}});0<l.length&&(F+="<tr>"+l+"</tr>");p++});a.displayTableName&&(F+="<tr><td></td></tr><tr><td></td></tr><tr><td>"+w(d("<p>"+a.tableName+"</p>"))+"</td></tr>");F+="</tbody></table>";!0===a.consoleLog&&console.log(F)});
m='<html xmlns:o="urn:schemas-microsoft-com:office:office" '+m+' xmlns="http://www.w3.org/TR/REC-html40">'+('<meta http-equiv="content-type" content="application/vnd.ms-'+u+'; charset=UTF-8">')+"<head>";"excel"===u&&(m+="\x3c!--[if gte mso 9]>",m+="<xml>",m+="<x:ExcelWorkbook>",m+="<x:ExcelWorksheets>",m+="<x:ExcelWorksheet>",m+="<x:Name>",m+=a.worksheetName,m+="</x:Name>",m+="<x:WorksheetOptions>",m+="<x:DisplayGridlines/>",m+="</x:WorksheetOptions>",m+="</x:ExcelWorksheet>",m+="</x:ExcelWorksheets>",
m+="</x:ExcelWorkbook>",m+="</xml>",m+="<![endif]--\x3e");m+="</head>";m+="<body>";m+=F;m+="</body>";m+="</html>";!0===a.consoleLog&&console.log(m);if("string"===a.outputMode)return m;if("base64"===a.outputMode)return E(m);try{z=new Blob([m],{type:"application/vnd.ms-"+a.type}),saveAs(z,a.fileName+"."+B)}catch(b){G(a.fileName+"."+B,"data:application/vnd.ms-"+u+";base64,",m)}}else if("png"==a.type)html2canvas(d(r)[0]).then(function(b){b=b.toDataURL();b=b.substring(22);for(var d=atob(b),e=new ArrayBuffer(d.length),
f=new Uint8Array(e),k=0;k<d.length;k++)f[k]=d.charCodeAt(k);!0===a.consoleLog&&console.log(d);if("string"===a.outputMode)return d;if("base64"===a.outputMode)return E(b);try{var h=new Blob([e],{type:"image/png"});saveAs(h,a.fileName+".png")}catch(l){G(a.fileName+".png","data:image/png,",b)}});else if("pdf"==a.type)if(!1===a.jspdf.autotable){var z={dim:{w:M(d(r).first().get(0),"width","mm"),h:M(d(r).first().get(0),"height","mm")},pagesplit:!1},Y=new jsPDF(a.jspdf.orientation,a.jspdf.unit,a.jspdf.format);
Y.addHTML(d(r).first(),a.jspdf.margins.left,a.jspdf.margins.top,z,function(){T(Y)})}else{var h=a.jspdf.autotable.tableExport;if("string"===typeof a.jspdf.format&&"bestfit"===a.jspdf.format.toLowerCase()){var J={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89]},O="",K="",Z=0;d(r).filter(":visible").each(function(){if("none"!=d(this).css("display")){var a=M(d(this).get(0),"width","pt");if(a>Z){a>J.a0[0]&&(O="a0",K="l");for(var g in J)J.hasOwnProperty(g)&&
J[g][1]>a&&(O=g,K="l",J[g][0]>a&&(K="p"));Z=a}}});a.jspdf.format=""==O?"a4":O;a.jspdf.orientation=""==K?"w":K}h.doc=new jsPDF(a.jspdf.orientation,a.jspdf.unit,a.jspdf.format);d(r).filter(function(){return"none"!=d(this).data("tableexport-display")&&(d(this).is(":visible")||"always"==d(this).data("tableexport-display"))}).each(function(){var b,g=0;H=P(this);h.columns=[];h.rows=[];h.rowoptions={};if("function"===typeof h.onTable&&!1===h.onTable(d(this),a))return!0;a.jspdf.autotable.tableExport=null;
var e=d.extend(!0,{},a.jspdf.autotable);a.jspdf.autotable.tableExport=h;e.margin={};d.extend(!0,e.margin,a.jspdf.margins);e.tableExport=h;"function"!==typeof e.beforePageContent&&(e.beforePageContent=function(a){1==a.pageCount&&a.table.rows.concat(a.table.headerRow).forEach(function(b){0<b.height&&(b.height+=(2-1.15)/2*b.styles.fontSize,a.table.height+=(2-1.15)/2*b.styles.fontSize)})});"function"!==typeof e.createdHeaderCell&&(e.createdHeaderCell=function(a,b){a.styles=d.extend({},b.row.styles);if("undefined"!=
typeof h.columns[b.column.dataKey]){var f=h.columns[b.column.dataKey];if("undefined"!=typeof f.rect){var g;a.contentWidth=f.rect.width;if("undefined"==typeof h.heightRatio||0==h.heightRatio)g=b.row.raw[b.column.dataKey].rowspan?b.row.raw[b.column.dataKey].rect.height/b.row.raw[b.column.dataKey].rowspan:b.row.raw[b.column.dataKey].rect.height,h.heightRatio=a.styles.rowHeight/g;g=b.row.raw[b.column.dataKey].rect.height*h.heightRatio;g>a.styles.rowHeight&&(a.styles.rowHeight=g)}"undefined"!=typeof f.style&&
!0!==f.style.hidden&&(a.styles.halign=f.style.align,"inherit"===e.styles.fillColor&&(a.styles.fillColor=f.style.bcolor),"inherit"===e.styles.textColor&&(a.styles.textColor=f.style.color),"inherit"===e.styles.fontStyle&&(a.styles.fontStyle=f.style.fstyle))}});"function"!==typeof e.createdCell&&(e.createdCell=function(a,b){var d=h.rowoptions[b.row.index+":"+b.column.dataKey];"undefined"!=typeof d&&"undefined"!=typeof d.style&&!0!==d.style.hidden&&(a.styles.halign=d.style.align,"inherit"===e.styles.fillColor&&
(a.styles.fillColor=d.style.bcolor),"inherit"===e.styles.textColor&&(a.styles.textColor=d.style.color),"inherit"===e.styles.fontStyle&&(a.styles.fontStyle=d.style.fstyle))});"function"!==typeof e.drawHeaderCell&&(e.drawHeaderCell=function(a,b){var d=h.columns[b.column.dataKey];return(1!=d.style.hasOwnProperty("hidden")||!0!==d.style.hidden)&&0<=d.rowIndex?U(a,b,d):!1});"function"!==typeof e.drawCell&&(e.drawCell=function(a,b){var d=h.rowoptions[b.row.index+":"+b.column.dataKey];if(U(a,b,d)){h.doc.rect(a.x,
a.y,a.width,a.height,a.styles.fillStyle);if("undefined"!=typeof d&&"undefined"!=typeof d.kids&&0<d.kids.length){var e=a.height/d.rect.height;if(e>h.dh||"undefined"==typeof h.dh)h.dh=e;h.dw=a.width/d.rect.width;V(a,d.kids,h)}h.doc.autoTableText(a.text,a.textPos.x,a.textPos.y,{halign:a.styles.halign,valign:a.styles.valign})}return!1});h.headerrows=[];t=d(this).find("thead").find(a.theadSelector);t.each(function(){b=0;h.headerrows[g]=[];y(this,"th,td",g,t.length,function(a,d,e){var f=W(a);f.title=w(a,
d,e);f.key=b++;f.rowIndex=g;h.headerrows[g].push(f)});g++});0<g&&d.each(h.headerrows[g-1],function(){obj=1<g&&null==this.rect?h.headerrows[g-2][this.key]:this;null!=obj&&h.columns.push(obj)});var f=0;n=d(this).find("tbody").find(a.tbodySelector);a.tfootSelector.length&&n.push(d(r).find("tfoot").find(a.tfootSelector));n.each(function(){var a=[];b=0;y(this,"td",g,t.length+n.length,function(e,g,l){if("undefined"===typeof h.columns[b]){var m={title:"",key:b,style:{hidden:!0}};h.columns.push(m)}"undefined"!==
typeof e&&null!=e?(m=W(e),m.kids=d(e).children()):(m=d.extend(!0,{},h.rowoptions[f+":"+(b-1)]),m.colspan=-1);h.rowoptions[f+":"+b++]=m;a.push(w(e,g,l))});a.length&&(h.rows.push(a),f++);g++});if("function"===typeof h.onBeforeAutotable)h.onBeforeAutotable(d(this),h.columns,h.rows,e);h.doc.autoTable(h.columns,h.rows,e);if("function"===typeof h.onAfterAutotable)h.onAfterAutotable(d(this),e);a.jspdf.autotable.startY=h.doc.autoTableEndPosY()+e.margin.top});T(h.doc);"undefined"!=typeof h.headerrows&&(h.headerrows.length=
0);"undefined"!=typeof h.columns&&(h.columns.length=0);"undefined"!=typeof h.rows&&(h.rows.length=0);delete h.doc;h.doc=null}return this}})})(jQuery);
