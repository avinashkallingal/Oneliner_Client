/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[13],{581:function(xa,ta,h){function qa(){return!1}function oa(y,ba,ha){if(!(ba in w))return!0;ba=w[ba];for(var aa=0;aa<ba.length;aa++){var ea=y;var ca=ba[aa];var ma=ha;if(ca.name in ea){var la="",ia=!1;ea=ea[ca.name];switch(ca.type){case "s":la="String";ia=Object(ka.isString)(ea);break;case "a":la="Array";ia=Object(ka.isArray)(ea);break;case "n":la="Number";ia=Object(ka.isNumber)(ea)&&Object(ka.isFinite)(ea);break;case "o":la="Object",
ia=Object(ka.isObject)(ea)&&!Object(ka.isArray)(ea)}ia||ma.reject('Expected response field "'.concat(ca.name,'" to have type ').concat(la));ca=ia}else ma.reject('Response missing field "'.concat(ca.name,'"')),ca=!1;if(!ca)return!1}return!0}function na(y){for(var ba=0,ha=["locale","excelMaxAllowedCellCount","applyPageBreaksToSheet","excelDefaultCellBorderWidth","displayChangeTracking"];ba<ha.length;ba++){var aa=ha[ba],ea=aa;aa=aa.charAt(0).toUpperCase()+aa.slice(1);y[ea]&&(Object.defineProperty(y,
aa,Object.getOwnPropertyDescriptor(y,ea)),delete y[ea])}return y}h.r(ta);var ja=h(0),ka=h(1);h.n(ka);var fa=h(3);xa=h(58);var x=h(34),z=h(599),r=h(121),n=h(493),f=h(54),b=h(216),a=function(){function y(){this.request=this.result=null;this.state=0;var ba=this;ba.promise=new Promise(function(ha,aa){ba.resolve=function(){if(0===ba.state||4===ba.state)ba.state=1,ba.result=arguments[0],ha.apply(null,arguments)};ba.reject=function(){if(0===ba.state||4===ba.state)ba.state=2,aa.apply(null,arguments)}})}y.prototype.Oy=
function(){return 1===(this.state&1)};y.prototype.fAa=function(){return 2===(this.state&2)};y.prototype.Nl=function(){return!this.fAa()&&!this.Oy()};y.prototype.zza=function(){return 4===(this.state&4)};y.prototype.YX=function(){this.state|=4};return y}(),e=function(){function y(){this.zy={};this.Kc=[]}y.prototype.pop=function(){var ba=this.Kc.pop();this.zy[ba.key]=void 0;return ba};y.prototype.push=function(ba,ha){ha={key:ba,data:ha};this.Kc.push(ha);this.zy[ba]=ha.data};y.prototype.contains=function(ba){return!!this.zy[ba]};
y.prototype.get=function(ba){return this.zy[ba]};y.prototype.set=function(ba,ha){var aa=this;this.zy[ba]=ha;this.Kc.forEach(function(ea,ca){ea.key===ba&&(aa.Kc[ca]=ea)})};y.prototype.remove=function(ba){var ha=this;this.zy[ba]=void 0;this.Kc.forEach(function(aa,ea){aa.key===ba&&ha.Kc.splice(ea,1)})};y.prototype.length=function(){return this.Kc.length};return y}(),w={pages:[{name:"pages",type:"a"}],pdf:[{name:"url",type:"s"}],docmod:[{name:"url",type:"s"},{name:"rID",type:"s"}],health:[],tiles:[{name:"z",
type:"n"},{name:"rID",type:"n"},{name:"tiles",type:"a"},{name:"size",type:"n"}],cAnnots:[{name:"annots",type:"a"}],annots:[{name:"url",type:"s"},{name:"name",type:"s"}],image:[{name:"url",type:"s"},{name:"name",type:"s"},{name:"p",type:"n"}],text:[{name:"url",type:"s"},{name:"name",type:"s"},{name:"p",type:"n"}],ApString2Xod:[{name:"url",type:"s"},{name:"rID",type:"s"}]};h=function(){function y(ba,ha,aa){var ea=this;this.FY=this.f5=!1;this.wj=this.mO=this.rA=this.ig=this.OB=this.zs=this.NB=this.Lq=
null;this.jq=new a;this.au=new a;this.fJ=!1;this.Eh=this.ng=this.og=this.th=null;this.Yh=[];this.cK=[];this.cache={};this.timeStamp=0;this.qj=[];this.Xl=[];this.vS=null;this.R4=!1;this.Rca=this.id=null;this.wV=this.o8=qa;this.Rh=0;this.hU=!1;this.D$=1;this.Tl={};this.Qw=0;this.xz=new e;ha.endsWith("/")||(ha+="/");aa=aa||{};this.f5=aa.disableWebsockets||!1;this.FY=aa.singleServerMode||!1;null!=aa.customQueryParameters&&Object(f.b)("wvsQueryParameters",aa.customQueryParameters);ha.endsWith("blackbox/")||
(ha+="blackbox/");this.Lq=aa.uploadData||null;this.rA=aa.uriData||null;this.NB=aa.cacheKey||null;if(this.zs=aa.officeOptions||null)this.zs=na(this.zs);this.ig=aa.rasterizerOptions||null;this.OB=aa.cadOptions||null;this.Kg=ha;this.YR=ba;this.Ns(!0);this.ox=(new z.a(ha,null,this.mk())).lua(!this.f5,function(ca){ea.lCa(ca)},function(){return null},function(){ea.fJ=!1},function(){ea.fGa()})}y.prototype.kqa=function(){var ba=this;return new Promise(function(ha,aa){var ea=new XMLHttpRequest,ca="".concat(ba.Kg,
"ck");ea.open("GET",ca);ea.withCredentials=ba.mk();ea.onreadystatechange=function(){ea.readyState===XMLHttpRequest.DONE&&(200===ea.status?ha():aa())};ea.send()})};y.prototype.eIa=function(ba){this.o8=ba||qa;this.wV=qa};y.prototype.poa=function(){this.kca();return this.ox.ru()};y.prototype.kca=function(){Object(ja.b)(this,void 0,void 0,function(){return Object(ja.d)(this,function(ba){switch(ba.label){case 0:return this.au=new a,this.jq=new a,this.fJ=!1,this.id=null,this.R4=!1,[4,this.kqa().catch(function(){})];
case 1:return ba.aa(),[2]}})})};y.prototype.fGa=function(){this.o8();this.kca();this.th&&(this.th.Nl()?this.Bj(this.th.request):this.th.Oy()&&this.wV(this.th.result.url,"pdf")&&(this.th=null,this.hca()));this.Eh&&this.Eh.Nl()&&this.Bj(this.Eh.request);this.og&&this.og.Nl()?this.Bj(this.og.request):this.ng&&this.ng.Nl()&&this.W7();var ba;for(ba=0;ba<this.qj.length;ba++)this.qj[ba]&&(this.qj[ba].Nl()?this.Bj(this.qj[ba].request):this.qj[ba].Oy()&&this.wV(this.qj[ba].result.url,"image")&&(this.qj[ba]=
null,this.$M(Object(ka.uniqueId)(),ba)));for(ba=0;ba<this.Xl.length;ba++)this.Xl[ba]&&this.Xl[ba].Nl()&&!this.Xl[ba].zza()&&this.Bj(this.Xl[ba].request);for(ba=0;ba<this.Yh.length;ba++)this.Yh[ba]&&this.Yh[ba].Nl()&&this.Bj(this.Yh[ba].request)};y.prototype.Sya=function(){return this.fJ?Promise.resolve():(this.fJ=!0,this.timeStamp=Date.now(),this.ox.qL())};y.prototype.vLa=function(){var ba=this,ha,aa,ea,ca,ma;return new Promise(function(la,ia){if(ba.Lq)ha=new FormData,ha.append("file",ba.Lq.fileHandle,
ba.Lq.fileHandle.name),ba.zs&&ha.append("officeOptions",JSON.stringify(ba.zs)),ba.ig&&ha.append("rasterizerOptions",JSON.stringify(ba.ig)),ba.OB&&ha.append("cadOptions",ba.OB.getJsonString()),ba.NB&&ha.append("cacheKey",ba.NB),aa=ba.Lq.loadCallback,ca="upload",ea=ba.Lq.extension;else if(ba.rA)ha={uri:ba.rA.uri,rQa:ba.rA.shareId},ha=Object.keys(ha).map(function(sa){return"".concat(sa,"=").concat(ha[sa]?encodeURIComponent(ha[sa]):"")}).join("&"),ma="application/x-www-form-urlencoded; charset=UTF-8",
aa=ba.rA.loadCallback,ca="url",ea=ba.rA.extension;else{la();return}var ra=new XMLHttpRequest,pa=Object(x.k)(ba.Kg,"AuxUpload");pa=Object(b.a)(pa,{type:ca,ext:ea});ra.open("POST",pa);ra.withCredentials=ba.mk();ma&&ra.setRequestHeader("Content-Type",ma);ra.addEventListener("load",function(){if(ra.readyState===ra.DONE&&200===ra.status){var sa=JSON.parse(ra.response);ba.YR=sa.uri;aa(sa);la(sa)}});ra.addEventListener("error",function(){ia("".concat(ra.statusText," ").concat(JSON.stringify(ra)))});ba.Lq&&
null!=ba.Lq.onProgress&&(ra.upload.onprogress=function(sa){ba.Lq.onProgress(sa)});ra.send(ha)})};y.prototype.VFa=function(ba){this.password=ba||null;this.jq.Oy()||(this.jq=new a,this.Bj({t:"pages"}));return this.jq.promise};y.prototype.hF=function(ba){this.vS=ba||null;this.jq.Oy()||this.Bj({t:"pages"});return this.jq.promise};y.prototype.aC=function(ba){ba=Object.assign(ba,{uri:encodeURIComponent(this.YR)});this.vS&&(ba.ext=this.vS);this.wj&&(ba.c=this.wj);this.password&&(ba.pswd=this.password);this.NB&&
(ba.cacheKey=this.NB);this.zs&&(ba.officeOptions=this.zs);this.ig&&(ba.rastOptions=this.ig);this.OB&&(ba.cadOptions=this.OB.mImpl);return ba};y.prototype.MGa=function(){0<this.xz.length()&&10>=this.Qw&&this.NGa(this.xz.pop().data)};y.prototype.Ana=function(ba){0<this.xz.length()&&this.xz.contains(ba)&&this.xz.remove(ba)};y.prototype.Bj=function(ba){ba=this.aC(ba);this.ox.send(ba)};y.prototype.Mca=function(ba,ha){10<this.Qw?this.xz.push(ba,ha):(this.Qw++,ba=this.aC(ha),this.ox.send(ba))};y.prototype.NGa=
function(ba){this.Qw++;ba=this.aC(ba);this.ox.send(ba)};y.prototype.ip=function(ba){return ba};y.prototype.n8=function(ba){this.FY&&ba?Object(fa.j)("Server failed health check. Single server mode ignoring check."):!this.DOa&&ba&&3>=this.Rh?(this.hU=!0,this.ox.ru()):3<this.Rh&&(this.FY=!0)};y.prototype.lCa=function(ba){var ha=this,aa=ba.data,ea=ba.err,ca=ba.t;switch(ca){case "upload":ea?this.wLa.reject(ea):this.wLa.resolve("Success");break;case "pages":ea?this.jq.reject(ea):oa(aa,ca,this.jq)&&this.jq.resolve(aa);
break;case "config":if(ea)this.au.reject(ea);else if(oa(aa,ca,this.au)){this.n8(aa.unhealthy);aa.id&&(this.id=aa.id);if(aa.auth){var ma=Object(f.a)("wvsQueryParameters");ma.auth=aa.auth;Object(f.b)("wvsQueryParameters",ma)}aa.serverVersion&&(this.mO=aa.serverVersion,Object(fa.h)("[WebViewer Server] server version: ".concat(this.mO)));aa.serverID?(this.Rh=aa.serverID===this.Rca&&this.hU?this.Rh+1:0,this.Rca=aa.serverID):this.Rh=0;this.hU=!1;this.au.resolve(aa)}break;case "health":ea?this.au.reject(ea):
oa(aa,ca,this.au)&&this.n8(aa.unhealthy);break;case "pdf":aa.url=Object(b.a)("".concat(this.Kg,"../").concat(encodeURI(aa.url)));ea?this.th.reject(ea):oa(aa,ca,this.th)&&this.th.resolve(aa);break;case "ApString2Xod":aa.url=Object(b.a)("".concat(this.Kg,"../data/").concat(encodeURI(aa.url)));ea?this.Tl[aa.rID].reject(ea):oa(aa,ca,this.Tl[aa.rID])&&this.Tl[aa.rID].resolve(aa);break;case "docmod":aa.url=Object(b.a)("".concat(this.Kg,"../").concat(encodeURI(aa.url)));ea?this.Tl[aa.rID].reject(ea):oa(aa,
ca,this.th)&&this.Tl[aa.rID].resolve(aa);break;case "xod":if(ea)this.og&&this.og.Nl()&&this.og.reject(ea),this.ng&&this.ng.Nl()&&this.ng.reject(ea);else if(aa.notFound)aa.noCreate||this.og&&this.og.Nl()&&this.og.resolve(aa),this.ng&&this.ng.Nl()&&this.ng.resolve(aa);else{aa.url&&(aa.url=Object(b.a)("".concat(this.Kg,"../").concat(encodeURI(aa.url))));if(!this.ng||this.ng.Oy())this.ng=new a,this.ng.request={t:"xod",noCreate:!0};this.og||(this.og=new a,this.og.request={t:"xod"});this.ng.resolve(aa);
this.og.resolve(aa)}break;case "cAnnots":ma=this.Eh;if(ea)ma.reject(ea);else if(oa(aa,ca,ma)){ma.YX();var la=[],ia=aa.annots;aa=function(Ba){var Ca=ia[Ba].s,Aa=ia[Ba].e,Ja="".concat(ra.Kg,"../").concat(encodeURI(ia[Ba].xfdf)),Ea="true"===ia[Ba].hasAppearance?Object(b.a)("".concat(Ja,".xodapp")):null,La=Object(ka.range)(Ca,Aa+1);la[Ba]={range:La,promise:new Promise(function(Na,Oa){var Sa=new XMLHttpRequest;Sa.open("GET",Object(b.a)(Ja));Sa.responseType="text";Sa.withCredentials=ha.mk();Sa.addEventListener("load",
function(){Sa.readyState===Sa.DONE&&200===Sa.status&&Na({Yv:Sa.response,Xo:Ea,range:La})});Sa.addEventListener("error",function(){Oa("".concat(Sa.statusText," ").concat(JSON.stringify(Sa)))});Sa.send()})}};var ra=this;for(ea=0;ea<ia.length;ea++)aa(ea);ma.resolve(la)}break;case "annots":if(ea)this.Eh.reject(ea);else if(oa(aa,ca,this.Eh)){this.Eh.YX();var pa=new XMLHttpRequest;ma="".concat(this.Kg,"../").concat(encodeURI(aa.url));var sa=aa.hasAppearance?Object(b.a)("".concat(ma,".xodapp")):null;pa.open("GET",
Object(b.a)(ma));pa.responseType="text";pa.withCredentials=this.mk();pa.addEventListener("load",function(){pa.readyState===pa.DONE&&200===pa.status&&ha.Eh.resolve({Yv:pa.response,Xo:sa})});pa.addEventListener("error",function(){ha.Eh.reject("".concat(pa.statusText," ").concat(JSON.stringify(pa)))});pa.send()}break;case "image":this.Qw--;var ua=this.qj[aa.p];ea?ua.promise.reject(ea):oa(aa,ca,ua)&&(ua.result=aa,ua.result.url=Object(b.a)("".concat(this.Kg,"../").concat(encodeURI(ua.result.url))),ua.resolve(ua.result));
break;case "tiles":this.Qw--;ua=aa.rID;ma=this.Yh[ua];this.Yh[ua]=null;this.cK.push(ua);if(ea)ma.reject(ea);else if(oa(aa,ca,ma)){for(ea=0;ea<aa.tiles.length;ea++)aa.tiles[ea]=Object(b.a)("".concat(this.Kg,"../").concat(encodeURI(aa.tiles[ea])));ma.resolve(aa)}break;case "text":ua=this.Xl[aa.p];if(ea)ua.reject(ea);else if(oa(aa,ca,ua)){ua.YX();var wa=new XMLHttpRequest;aa=Object(b.a)("".concat(this.Kg,"../").concat(encodeURI(aa.url)));wa.open("GET",aa);wa.withCredentials=this.mk();wa.addEventListener("load",
function(){wa.readyState===wa.DONE&&200===wa.status&&(ua.result=JSON.parse(wa.response),ua.resolve(ua.result))});wa.addEventListener("error",function(Ba){ua.reject("".concat(wa.statusText," ").concat(JSON.stringify(Ba)))});wa.send()}break;case "progress":"loading"===aa.t&&this.trigger(r.a.Events.DOCUMENT_LOADING_PROGRESS,[aa.bytes,aa.total])}this.MGa();!ca&&ba.echo&&ba&&"apstring2xod"===ba.echo.t&&(ba=ba.echo.reqID)&&(2<=parseInt(this.mO,10)?this.Tl[ba].reject("Message unhandled by server"):this.Tl[ba].reject())};
y.prototype.Tua=function(){return Object(ja.b)(this,void 0,void 0,function(){return Object(ja.d)(this,function(ba){switch(ba.label){case 0:return[4,this.Sya()];case 1:return ba.aa(),[2,this.au.promise]}})})};y.prototype.yua=function(ba){for(var ha=this,aa=new XMLHttpRequest,ea=Object(b.a)("".concat(this.Kg,"aul"),{id:this.id}),ca=new FormData,ma={},la=0;la<ba.body.length;la++){var ia=ba.body[la];ma[ia.id]="".concat(ia.FQ.w,";").concat(ia.FQ.h);ca.append(ia.id,ia.FQ.dataString)}ba={t:"apstring2xod",
reqID:this.D$++,parts:ma};var ra=this.aC(ba);ca.append("msg",JSON.stringify(ra));this.Tl[ra.reqID]=new a;aa.open("POST",ea);aa.withCredentials=this.mk;ea=new Promise(function(pa,sa){aa.onreadystatechange=function(){4===aa.readyState&&(200===aa.status?pa():sa("An error occurred while sending down appearance strings to the server"))}});aa.send(ca);return ea.then(function(){return ha.Tl[ra.reqID].promise})};y.prototype.toa=function(){var ba=this.mO.split("-")[0].split("."),ha=["1","5","9"];if(3!==ba.length)throw Error("Invalid WVS version length.");
if(3!==ha.length)throw Error("Invalid version length.");for(var aa=0;aa<ba.length;++aa){if(ha.length===aa||ba[aa]>ha[aa])return-1;if(ba[aa]!==ha[aa])return 1}return 0};y.prototype.Wt=function(){return 0>=this.toa()};y.prototype.IS=function(){this.Eh||(this.Eh=new a,this.Wt()?this.Eh.request={t:"cAnnots"}:this.Eh.request={t:"annots"},this.Bj(this.Eh.request));return this.Eh.promise};y.prototype.$M=function(ba,ha){this.qj[ha]||(this.qj[ha]=new a,this.qj[ha].request={t:"image",p:ha},this.Mca(ba,this.qj[ha].request));
return this.qj[ha].promise};y.prototype.WFa=function(ba){this.Xl[ba]||(this.Xl[ba]=new a,this.Xl[ba].request={t:"text",p:ba},this.Bj(this.Xl[ba].request));return this.Xl[ba].promise};y.prototype.XFa=function(ba,ha,aa,ea,ca){var ma=this.Yh.length;this.cK.length&&(ma=this.cK.pop());this.Yh[ma]=new a;this.Yh[ma].request={t:"tiles",p:ha,z:aa,r:ea,size:ca,rID:ma};this.Mca(ba,this.Yh[ma].request);return this.Yh[ma].promise};y.prototype.hca=function(){this.th||(this.th=new a,this.th.request={t:"pdf"},this.R4?
this.th.resolve({url:this.YR}):this.Bj(this.th.request));return this.th.promise};y.prototype.b7=function(ba){var ha=this,aa=new XMLHttpRequest,ea=Object(b.a)("".concat(this.Kg,"aul"),{id:this.id}),ca=new FormData,ma={};ba.annots&&(ma.annots="xfdf");ba.watermark&&(ma.watermark="png");ba.redactions&&(ma.redactions="redact");ma={t:"docmod",reqID:this.D$++,parts:ma};ba.print&&(ma.print=!0);var la=this.aC(ma);ca.append("msg",JSON.stringify(la));return Promise.all([ba.annots,ba.watermark,ba.redactions].map(function(ia){return Promise.resolve(ia)})).then(function(ia){var ra=
ia[0],pa=ia[1];ia=ia[2];ra&&ca.append("annots",ra);pa&&ca.append("watermark",pa);ia&&ca.append("redactions",ia);ha.Tl[la.reqID]=new a;aa.open("POST",ea);aa.withCredentials=ha.mk;ra=new Promise(function(sa,ua){aa.onreadystatechange=function(){4===aa.readyState&&(200===aa.status?sa():ua("An error occurred while sending down annotation data to the server"))}});aa.send(ca);return ra.then(function(){return ha.Tl[la.reqID].promise})})};y.prototype.W7=function(){this.ng||(this.ng=new a,this.ng.request={t:"xod",
noCreate:!0},this.Bj(this.ng.request));return this.ng.promise};y.prototype.YFa=function(){this.og||(this.og=new a,this.og.request={t:"xod"},this.Bj(this.og.request));return this.og.promise};y.prototype.Is=function(){return!0};y.prototype.request=function(){};y.prototype.wba=function(){};y.prototype.abort=function(){for(var ba=0;ba<this.Yh.length;ba++)this.Yh[ba]&&(this.Yh[ba].resolve(null),this.Yh[ba]=null,this.cK.push(ba));this.close()};y.prototype.rN=function(ba){this.wj=this.wj||{};this.wj.headers=
ba};y.prototype.Ns=function(ba){this.wj=this.wj||{};this.wj.internal=this.wj.internal||{};this.wj.internal.withCredentials=ba};y.prototype.mk=function(){return this.wj&&this.wj.internal?this.wj.internal.withCredentials:null};y.prototype.getFileData=function(){return Promise.reject()};return y}();Object(xa.a)(h);Object(n.a)(h);Object(n.b)(h);ta["default"]=h},599:function(xa,ta,h){var qa=h(0),oa=h(3),na=h(34),ja=h(54),ka=h(216),fa=h(102),x=function(){function r(n,f,b,a,e,w){void 0===b&&(b=null);void 0===
a&&(a=null);void 0===e&&(e=null);void 0===w&&(w=null);this.kU=!1;this.Rh=0;this.fE=8;this.xca=3E3;this.KN=!1;this.n3=this.SLa(n);this.url=f?"".concat(this.n3,"/").concat(f):"".concat(this.n3,"/ws");this.JR=b;this.xE=a;this.ZB=e;this.ica=w}r.prototype.SLa=function(n){var f=n.indexOf("://"),b="ws://";0>f?f=0:(5===f&&(b="wss://"),f+=3);var a=n.lastIndexOf("/");0>a&&(a=n.length);return b+n.slice(f,a)};r.prototype.send=function(n){this.Xs.readyState===WebSocket.CLOSED||this.kU||this.Xs.send(JSON.stringify(n))};
r.prototype.qL=function(){return Object(qa.b)(this,void 0,void 0,function(){var n,f=this;return Object(qa.d)(this,function(){n=Object(ja.a)("wvsQueryParameters");n.bcid=Object(na.l)(8);Object(ja.b)("wvsQueryParameters",n);return[2,new Promise(function(b,a){var e=Object(ka.a)(f.url);f.KN=!1;f.Xs=new WebSocket(e);f.Xs.onopen=function(){f.kU=!1;f.Rh=0;f.xE&&f.xE();b()};f.Xs.onerror=function(){f.kU=!0};f.Xs.onclose=function(w){w=w.code;f.ZB&&f.ZB();1E3!==w&&3E3!==w&&f.mya(w,b,a)};f.Xs.onmessage=function(w){w&&
w.data&&(w=JSON.parse(w.data),w.hb?f.send({hb:!0}):w.end?close():f.JR(w))}})]})})};r.prototype.mya=function(n,f,b){Object(qa.b)(this,void 0,void 0,function(){var a=this;return Object(qa.d)(this,function(){if(this.KN)return f(),[2];this.Rh<this.fE?setTimeout(function(){a.KN?f():(a.Rh++,Object(oa.j)("Failed to connect to server with WebSocket close code ".concat(n,". Reconnecting to WebViewer Server, attempt ").concat(a.Rh," of ").concat(a.fE," ...")),a.qL().then(f).catch(b))},this.xca):b(fa.a);return[2]})})};
r.prototype.ru=function(){var n;void 0===n&&(n=!1);this.Rh=0;this.KN=!0;n?this.Xs.close(3E3):this.Xs.close();return Promise.resolve()};return r}(),z=function(){function r(n,f,b,a,e,w,y){void 0===a&&(a=null);void 0===e&&(e=null);void 0===w&&(w=null);void 0===y&&(y=null);this.Rh=this.ZM=this.id=0;this.xD=!1;this.request=null;this.fE=8;this.xca=3E3;n=this.ZDa(n);this.url=f?"".concat(n,"/").concat(f,"pf"):"".concat(n,"/pf");this.fO=b;this.JR=a;this.xE=e;this.ZB=w;this.ica=y}r.prototype.ZDa=function(n){var f=
n.lastIndexOf("/");0>f&&(f=n.length);return n.slice(0,f)};r.prototype.Npa=function(n){n=n.split("\n");for(n[n.length-1]&&n.pop();0<n.length&&3>n[n.length-1].length;)"]"===n.pop()&&(this.id=0);0<n.length&&3>n[0].length&&n.shift();for(var f=0;f<n.length;++f)n[f].endsWith(",")&&(n[f]=n[f].substr(0,n[f].length-1));return n};r.prototype.wca=function(){return Object(qa.b)(this,void 0,void 0,function(){var n=this;return Object(qa.d)(this,function(f){switch(f.label){case 0:return this.Rh++<this.fE?[4,new Promise(function(b){return setTimeout(function(){n.ica();
n.qL();b()},3E3)})]:[3,2];case 1:f.aa(),f.label=2;case 2:return[2]}})})};r.prototype.bEa=function(n){Object(qa.b)(this,void 0,void 0,function(){var f,b;return Object(qa.d)(this,function(a){switch(a.label){case 0:f=null,b=0,a.label=1;case 1:if(!(b<n.length))return[3,6];f=JSON.parse(n[b]);if(!f)return[3,5];if(!f.end)return[3,2];close();return[3,5];case 2:if(!f.id||Number(f.id)===this.id)return[3,4];Object(oa.j)("Reconnecting, new server detected");this.ru();return[4,this.wca()];case 3:return a.aa(),
[3,5];case 4:f.hb&&Number(f.id)===this.id?this.send({hb:!0}):this.xD||this.JR(f),a.label=5;case 5:return++b,[3,1];case 6:return[2]}})})};r.prototype.gCa=function(n){Object(qa.b)(this,void 0,void 0,function(){var f,b,a;return Object(qa.d)(this,function(e){switch(e.label){case 0:if(!(3<=n.readyState))return[3,2];try{f=n.responseText.length}catch(w){return Object(oa.h)("caught exception"),[2]}if(0<f)try{b=this.Npa(n.responseText),0===this.id&&0<b.length&&(a=JSON.parse(b.shift()),this.id=a.id,this.Rh=
0),this.bEa(b)}catch(w){}return this.xD?[3,2]:[4,this.V5()];case 1:e.aa(),e.label=2;case 2:return[2]}})})};r.prototype.V5=function(){return Object(qa.b)(this,void 0,void 0,function(){var n=this;return Object(qa.d)(this,function(){return[2,new Promise(function(f,b){function a(){return Object(qa.b)(n,void 0,void 0,function(){return Object(qa.d)(this,function(w){switch(w.label){case 0:b(),this.ru(),w.label=1;case 1:return this.xD&&this.Rh<this.fE?[4,this.wca()]:[3,3];case 2:return w.aa(),[3,1];case 3:return[2]}})})}
n.request=new XMLHttpRequest;n.request.withCredentials=n.fO;var e=Object(ka.a)(n.url,0!==n.id?{id:String(n.id),uc:String(n.ZM)}:{uc:String(n.ZM)});n.ZM++;n.request.open("GET",e,!0);n.request.setRequestHeader("Cache-Control","no-cache");n.request.setRequestHeader("X-Requested-With","XMLHttpRequest");n.request.onreadystatechange=function(){n.gCa(n.request)};n.request.addEventListener("error",a);n.request.addEventListener("timeout",a);n.request.addEventListener("load",function(){n.xE&&n.xE();f()});n.request.send()})]})})};
r.prototype.qL=function(){var n=Object(ja.a)("wvsQueryParameters");n.bcid=Object(na.l)(8);Object(ja.b)("wvsQueryParameters",n);this.ZM=this.id=0;this.xD=!1;return this.V5()};r.prototype.send=function(n){var f=this,b=new XMLHttpRequest;b.withCredentials=this.fO;var a=Object(ka.a)(this.url,{id:String(this.id)}),e=new FormData;e.append("data",JSON.stringify(n));b.addEventListener("error",function(){f.ru()});b.open("POST",a);b.setRequestHeader("X-Requested-With","XMLHttpRequest");b.send(e)};r.prototype.ru=
function(){this.id=0;this.xD=!0;this.ZB&&this.ZB();this.request.abort();return Promise.resolve()};return r}();xa=function(){function r(n,f,b){this.f4=n;this.target=f;this.fO=b}r.prototype.lua=function(n,f,b,a,e){void 0===n&&(n=!0);void 0===f&&(f=null);void 0===b&&(b=null);void 0===a&&(a=null);void 0===e&&(e=null);return n?new x(this.f4,this.target,f,b,a,e):new z(this.f4,this.target,this.fO,f,b,a,e)};return r}();ta.a=xa}}]);}).call(this || window)
