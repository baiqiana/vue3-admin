"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[712],{7990:(e,l,a)=>{a.d(l,{Z:()=>n});var t=a(7684),d=a.n(t),u=a(4420),o=a.n(u)()(d());o.push([e.id,".selectDown[data-v-41474dd8]{min-height:200px;overflow-y:auto}.selectDown .el-select-dropdown__item[data-v-41474dd8]{height:100%;padding:4px 12px}.selectDown .el-select-dropdown__item[data-v-41474dd8]:hover{background-color:#fff !important}.selectDown .hover[data-v-41474dd8]{background-color:#fff !important}[data-v-41474dd8] .el-form{display:unset !important}[data-v-41474dd8] .el-form .el-input{width:300px}",""]);const n=o},5757:(e,l,a)=>{a.d(l,{Af:()=>d,Hm:()=>o,RD:()=>r,ZT:()=>n,_6:()=>m,pz:()=>u});var t=a(7753);function d(e){return(0,t.Z)({url:"/permi/all",method:"GET",data:e})}function u(e){return(0,t.Z)({url:`/menuRole/${e.roleID}`,method:"GET"})}function o(e){return(0,t.Z)({url:"/menuRole",method:"PUT",data:e})}function n(e){return(0,t.Z)({url:"/permi",method:"POST",data:e})}function m(e){return(0,t.Z)({url:"/permi",method:"PUT",data:e})}function r(e){return(0,t.Z)({url:"/permi",method:"DELETE",data:e})}},9712:(e,l,a)=>{a.r(l),a.d(l,{default:()=>Z});var t=a(9300),d=(a(3379),a(8522)),u=(a(4939),a(8202)),o=(a(5698),a(451)),n=(a(1842),a(3239),a(8314)),m=(a(376),a(9679)),r=(a(5036),a(7129)),p=(a(7338),a(7690)),i=a(2025),s=a(5757),c=a(3948);const f={class:"selectDown"},U=(0,p.aZ)({__name:"form",props:{show:{type:Boolean,default:!1},editData:{type:Object,default:()=>{}},isEdit:{type:Boolean,default:!1},parent:{type:Object,default:()=>{}}},emits:["update:show","success"],setup(e,l){let{emit:a}=l;const U=e,w={label:"menuName",children:"children"},_=(0,i.qj)({list:[]});let b=h();function h(){return(0,i.qj)({parentID:"",parentName:"",menuType:1,icon:"",menuName:"",orderNum:1,isFrame:!1,path:"",visible:!0,status:!0,component:"",permi:""})}const y=(0,i.iH)({menuName:[{required:!0,message:"角色名称不能为空",trigger:"blur"}]}),k=(0,i.iH)(null),V=(0,i.iH)(null),S=(0,p.Fl)({get:()=>(U.show&&U.isEdit&&(b=Object.assign(b,U.editData)),U.show),set:e=>{e||(b=h()),a("update:show",e)}});function v(e){b.parentName=e.menuName,b.parentID=e._id,V.value.blur()}function W(){k.value?.validate((async e=>{e&&(U.isEdit?async function(){let e={menuID:U.editData._id,...b};const{code:l}=await(0,s._6)(e);200===l&&(a("success"),(0,c.bM)({title:"提示",message:"菜单编辑成功",type:"success"}),S.value=!1)}():async function(){const{code:e}=await(0,s.ZT)(b);200===e&&(a("success"),(0,c.bM)({title:"提示",message:"菜单创建成功",type:"success"}),S.value=!1)}())}))}return async function(){const{data:e}=await(0,s.Af)();_.list=e,_.list=_.list.map((e=>(e.label=e.menuName,e)))}(),(0,p.YP)((()=>U.parent),(e=>{e&&(b.parentID=e.parentID,b.parentName=e.parentName)})),(l,a)=>{const s=r.y,c=m.BT,U=n.nH,h=o.rh,T=o.KD,g=u.EZ,D=d.mi,N=t.zd;return(0,p.wg)(),(0,p.iD)("div",null,[(0,p.Wm)(N,{title:e.isEdit?"编辑菜单":"添加菜单",modelValue:(0,i.SU)(S),"onUpdate:modelValue":a[13]||(a[13]=e=>(0,i.dq)(S)?S.value=e:null),direction:"rtl",size:"800px"},{footer:(0,p.w5)((()=>[(0,p._)("div",null,[(0,p.Wm)(D,{onClick:a[12]||(a[12]=e=>S.value=!1)},{default:(0,p.w5)((()=>[(0,p.Uk)("取消")])),_:1}),(0,p.Wm)(D,{onClick:W,type:"primary"},{default:(0,p.w5)((()=>[(0,p.Uk)("确认")])),_:1})])])),default:(0,p.w5)((()=>[(0,p.Wm)((0,i.SU)(n.ly),{ref_key:"form",ref:k,model:(0,i.SU)(b),rules:y.value},{default:(0,p.w5)((()=>[(0,p.Wm)(U,{label:"上级菜单：",prop:"parentID"},{default:(0,p.w5)((()=>[(0,p.Wm)((0,i.SU)(m.km),{ref_key:"select",ref:V,placeholder:"请选择",onClear:a[0]||(a[0]=e=>(0,i.SU)(b).parentID=""),modelValue:(0,i.SU)(b).parentName,"onUpdate:modelValue":a[1]||(a[1]=e=>(0,i.SU)(b).parentName=e),clearable:""},{default:(0,p.w5)((()=>[(0,p._)("div",f,[(0,p.Wm)(c,{value:""},{default:(0,p.w5)((()=>[(0,p.Wm)(s,{ref:"menuTree",data:_.list,"node-key":"_id",props:w,onNodeClick:v},null,8,["data"])])),_:1})])])),_:1},8,["modelValue"])])),_:1}),(0,p.Wm)(U,{label:"菜单类型：",prop:"menuType"},{default:(0,p.w5)((()=>[(0,p.Wm)(T,{modelValue:(0,i.SU)(b).menuType,"onUpdate:modelValue":a[2]||(a[2]=e=>(0,i.SU)(b).menuType=e)},{default:(0,p.w5)((()=>[(0,p.Wm)(h,{label:1},{default:(0,p.w5)((()=>[(0,p.Uk)("目录")])),_:1}),(0,p.Wm)(h,{label:2},{default:(0,p.w5)((()=>[(0,p.Uk)("菜单")])),_:1}),(0,p.Wm)(h,{label:3},{default:(0,p.w5)((()=>[(0,p.Uk)("按钮")])),_:1})])),_:1},8,["modelValue"])])),_:1}),(0,p.Wm)(U,{label:"菜单名称：",prop:"menuName"},{default:(0,p.w5)((()=>[(0,p.Wm)(g,{modelValue:(0,i.SU)(b).menuName,"onUpdate:modelValue":a[3]||(a[3]=e=>(0,i.SU)(b).menuName=e),placeholder:"输入菜单名称"},null,8,["modelValue"])])),_:1}),3!==(0,i.SU)(b).menuType?((0,p.wg)(),(0,p.j4)(U,{key:0,label:"菜单图标：",prop:"icon"},{default:(0,p.w5)((()=>[(0,p.Wm)(g,{modelValue:(0,i.SU)(b).icon,"onUpdate:modelValue":a[4]||(a[4]=e=>(0,i.SU)(b).icon=e),placeholder:"输入iconfont类型，如icon-home, 输入home"},null,8,["modelValue"])])),_:1})):(0,p.kq)("",!0),(0,p.Wm)(U,{label:"显示排序：",prop:"orderNum"},{default:(0,p.w5)((()=>[(0,p.Wm)(g,{modelValue:(0,i.SU)(b).orderNum,"onUpdate:modelValue":a[5]||(a[5]=e=>(0,i.SU)(b).orderNum=e),placeholder:"请输入"},null,8,["modelValue"])])),_:1}),3!==(0,i.SU)(b).menuType?((0,p.wg)(),(0,p.j4)(U,{key:1,label:"是否外链",prop:"isFrame"},{default:(0,p.w5)((()=>[(0,p.Wm)(T,{modelValue:(0,i.SU)(b).isFrame,"onUpdate:modelValue":a[6]||(a[6]=e=>(0,i.SU)(b).isFrame=e)},{default:(0,p.w5)((()=>[(0,p.Wm)(h,{label:!0},{default:(0,p.w5)((()=>[(0,p.Uk)("是")])),_:1}),(0,p.Wm)(h,{label:!1},{default:(0,p.w5)((()=>[(0,p.Uk)("否")])),_:1})])),_:1},8,["modelValue"])])),_:1})):(0,p.kq)("",!0),2===(0,i.SU)(b).menuType?((0,p.wg)(),(0,p.j4)(U,{key:2,label:"路由地址：",prop:"path"},{default:(0,p.w5)((()=>[(0,p.Wm)(g,{modelValue:(0,i.SU)(b).path,"onUpdate:modelValue":a[7]||(a[7]=e=>(0,i.SU)(b).path=e),placeholder:"请输入"},null,8,["modelValue"])])),_:1})):(0,p.kq)("",!0),2===(0,i.SU)(b).menuType?((0,p.wg)(),(0,p.j4)(U,{key:3,label:"组件路径：",prop:"path"},{default:(0,p.w5)((()=>[(0,p.Wm)(g,{modelValue:(0,i.SU)(b).component,"onUpdate:modelValue":a[8]||(a[8]=e=>(0,i.SU)(b).component=e),placeholder:"请输入"},null,8,["modelValue"])])),_:1})):(0,p.kq)("",!0),(0,p.Wm)(U,{label:"权限标识",prop:"permi"},{default:(0,p.w5)((()=>[(0,p.Wm)(g,{modelValue:(0,i.SU)(b).permi,"onUpdate:modelValue":a[9]||(a[9]=e=>(0,i.SU)(b).permi=e),placeholder:"请输入"},null,8,["modelValue"])])),_:1}),3!==(0,i.SU)(b).menuType?((0,p.wg)(),(0,p.j4)(U,{key:4,label:"显示状态：",prop:"visible"},{default:(0,p.w5)((()=>[(0,p.Wm)(T,{modelValue:(0,i.SU)(b).visible,"onUpdate:modelValue":a[10]||(a[10]=e=>(0,i.SU)(b).visible=e)},{default:(0,p.w5)((()=>[(0,p.Wm)(h,{label:!0},{default:(0,p.w5)((()=>[(0,p.Uk)("显示")])),_:1}),(0,p.Wm)(h,{label:!1},{default:(0,p.w5)((()=>[(0,p.Uk)("隐藏")])),_:1})])),_:1},8,["modelValue"])])),_:1})):(0,p.kq)("",!0),3!==(0,i.SU)(b).menuType?((0,p.wg)(),(0,p.j4)(U,{key:5,label:"菜单状态：",prop:"visible"},{default:(0,p.w5)((()=>[(0,p.Wm)(T,{modelValue:(0,i.SU)(b).status,"onUpdate:modelValue":a[11]||(a[11]=e=>(0,i.SU)(b).status=e)},{default:(0,p.w5)((()=>[(0,p.Wm)(h,{label:!0},{default:(0,p.w5)((()=>[(0,p.Uk)("正常")])),_:1}),(0,p.Wm)(h,{label:!1},{default:(0,p.w5)((()=>[(0,p.Uk)("停用")])),_:1})])),_:1},8,["modelValue"])])),_:1})):(0,p.kq)("",!0)])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue"])])}}});var w=a(361),_=a.n(w),b=a(9254),h=a.n(b),y=a(3365),k=a.n(y),V=a(9979),S=a.n(V),v=a(7153),W=a.n(v),T=a(1556),g=a.n(T),D=a(7990),N={};N.styleTagTransform=g(),N.setAttributes=S(),N.insert=k().bind(null,"head"),N.domAPI=h(),N.insertStyleElement=W(),_()(D.Z,N),D.Z&&D.Z.locals&&D.Z.locals;const Z=(0,a(7818).Z)(U,[["__scopeId","data-v-41474dd8"]])}}]);