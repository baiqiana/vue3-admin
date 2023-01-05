"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[962],{2700:(e,r,a)=>{a.d(r,{Z:()=>n});var t=a(7684),l=a.n(t),o=a(4420),d=a.n(o)()(l());d.push([e.id,".el-drawer{--el-drawer-bg-color:var(--el-dialog-bg-color, var(--el-bg-color));--el-drawer-padding-primary:var(--el-dialog-padding-primary, 20px)}.el-drawer{position:absolute;box-sizing:border-box;background-color:var(--el-drawer-bg-color);display:flex;flex-direction:column;box-shadow:var(--el-box-shadow-dark);overflow:hidden;transition:all var(--el-transition-duration)}.el-drawer .rtl{transform:translate(0,0)}.el-drawer .ltr{transform:translate(0,0)}.el-drawer .ttb{transform:translate(0,0)}.el-drawer .btt{transform:translate(0,0)}.el-drawer__sr-focus:focus{outline:0!important}.el-drawer__header{align-items:center;color:#72767b;display:flex;margin-bottom:32px;padding:var(--el-drawer-padding-primary);padding-bottom:0}.el-drawer__header>:first-child{flex:1}.el-drawer__title{margin:0;flex:1;line-height:inherit;font-size:1rem}.el-drawer__footer{padding:var(--el-drawer-padding-primary);padding-top:10px;text-align:right}.el-drawer__close-btn{display:inline-flex;border:none;cursor:pointer;font-size:var(--el-font-size-extra-large);color:inherit;background-color:transparent;outline:0}.el-drawer__close-btn:focus i,.el-drawer__close-btn:hover i{color:var(--el-color-primary)}.el-drawer__body{flex:1;padding:var(--el-drawer-padding-primary);overflow:auto}.el-drawer__body>*{box-sizing:border-box}.el-drawer.ltr,.el-drawer.rtl{height:100%;top:0;bottom:0}.el-drawer.btt,.el-drawer.ttb{width:100%;left:0;right:0}.el-drawer.ltr{left:0}.el-drawer.rtl{right:0}.el-drawer.ttb{top:0}.el-drawer.btt{bottom:0}.el-drawer-fade-enter-active,.el-drawer-fade-leave-active{transition:all var(--el-transition-duration)}.el-drawer-fade-enter-active,.el-drawer-fade-enter-from,.el-drawer-fade-enter-to,.el-drawer-fade-leave-active,.el-drawer-fade-leave-from,.el-drawer-fade-leave-to{overflow:hidden!important}.el-drawer-fade-enter-from,.el-drawer-fade-leave-to{opacity:0}.el-drawer-fade-enter-to,.el-drawer-fade-leave-from{opacity:1}.el-drawer-fade-enter-from .rtl,.el-drawer-fade-leave-to .rtl{transform:translateX(100%)}.el-drawer-fade-enter-from .ltr,.el-drawer-fade-leave-to .ltr{transform:translateX(-100%)}.el-drawer-fade-enter-from .ttb,.el-drawer-fade-leave-to .ttb{transform:translateY(-100%)}.el-drawer-fade-enter-from .btt,.el-drawer-fade-leave-to .btt{transform:translateY(100%)}",""]);const n=d},610:(e,r,a)=>{a.d(r,{Z:()=>n});var t=a(7684),l=a.n(t),o=a(4420),d=a.n(o)()(l());d.push([e.id,".el-overlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2000;height:100%;background-color:var(--el-overlay-color-lighter);overflow:auto}.el-overlay .el-overlay-root{height:0}",""]);const n=d},5757:(e,r,a)=>{a.d(r,{Af:()=>l,Hm:()=>d,RD:()=>s,ZT:()=>n,_6:()=>i,pz:()=>o});var t=a(7753);function l(e){return(0,t.Z)({url:"/permi/all",method:"GET",data:e})}function o(e){return(0,t.Z)({url:`/menuRole/${e.roleID}`,method:"GET"})}function d(e){return(0,t.Z)({url:"/menuRole",method:"PUT",data:e})}function n(e){return(0,t.Z)({url:"/permi",method:"POST",data:e})}function i(e){return(0,t.Z)({url:"/permi",method:"PUT",data:e})}function s(e){return(0,t.Z)({url:"/permi",method:"DELETE",data:e})}},6962:(e,r,a)=>{a.r(r),a.d(r,{default:()=>u});var t=a(9300),l=(a(3379),a(8522)),o=(a(4939),a(7690)),d=a(2025),n=a(4112),i=a(5757),s=a(3948),f=a(7129);const c={style:{flex:"auto"}},u=(0,o.aZ)({__name:"index",props:{show:{type:Boolean,default:!1},role:{type:Object,required:!0}},emits:["update:show"],setup(e,r){let{emit:a}=r;const u=e,m=(0,d.iH)(),w=(0,d.qj)({list:[],chooseIDs:[]}),p={label:"menuName",children:"children"},h=(0,o.Fl)({get:()=>u.show,set:e=>{a("update:show",e)}});async function v(){let e=m.value.getCheckedKeys(),r=m.value.getHalfCheckedKeys(),a=e.concat(r);200===(await(0,i.Hm)({menuIDs:a,roleID:u.role._id})).code&&(h.value=!1,(0,s.bM)({title:"提示",type:"success",message:"角色权限更改成功"}))}return(0,o.YP)((()=>u.show),(async e=>{if(e){const e=await Promise.all([(0,i.Af)(),(0,i.pz)({roleID:u.role._id})]);w.list=e[0].data,m.value?.setCheckedKeys(e[1].data),w.chooseIDs=e[1].data}})),(e,r)=>{const a=l.mi,i=t.zd;return(0,o.wg)(),(0,o.j4)(i,{modelValue:(0,d.SU)(h),"onUpdate:modelValue":r[1]||(r[1]=e=>(0,d.dq)(h)?h.value=e:null),direction:"rtl",size:"800px"},{header:(0,o.w5)((()=>[(0,o._)("h4",null,(0,n.zw)(u.role.roleName)+"-权限管理",1)])),default:(0,o.w5)((()=>[(0,o.Wm)((0,d.SU)(f.y),{ref_key:"menuTree",ref:m,data:w.list,"show-checkbox":"","node-key":"_id",props:p,"default-checked-keys":w.chooseIDs},null,8,["data","default-checked-keys"])])),footer:(0,o.w5)((()=>[(0,o._)("div",c,[(0,o.Wm)(a,{onClick:r[0]||(r[0]=e=>h.value=!1)},{default:(0,o.w5)((()=>[(0,o.Uk)("取消")])),_:1}),(0,o.Wm)(a,{onClick:v,type:"primary"},{default:(0,o.w5)((()=>[(0,o.Uk)("确认")])),_:1})])])),_:1},8,["modelValue"])}}})},3379:(e,r,a)=>{a(5534);var t=a(361),l=a.n(t),o=a(9254),d=a.n(o),n=a(3365),i=a.n(n),s=a(9979),f=a.n(s),c=a(7153),u=a.n(c),m=a(1556),w=a.n(m),p=a(2700),h={};h.styleTagTransform=w(),h.setAttributes=f(),h.insert=i().bind(null,"head"),h.domAPI=d(),h.insertStyleElement=u(),l()(p.Z,h),p.Z&&p.Z.locals&&p.Z.locals,a(4450)},4450:(e,r,a)=>{a(5534);var t=a(361),l=a.n(t),o=a(9254),d=a.n(o),n=a(3365),i=a.n(n),s=a(9979),f=a.n(s),c=a(7153),u=a.n(c),m=a(1556),w=a.n(m),p=a(610),h={};h.styleTagTransform=w(),h.setAttributes=f(),h.insert=i().bind(null,"head"),h.domAPI=d(),h.insertStyleElement=u(),l()(p.Z,h),p.Z&&p.Z.locals&&p.Z.locals}}]);