import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{M as r}from"./index-kfOEBCeW.js";import{r as i}from"./iframe-CCRDqoTr.js";import"./preload-helper-PPVm8Dsz.js";const p={component:r,tags:["autodocs"],parameters:{layout:"fullscreen"},args:{value:'console.log("Hello, world!")',language:"javascript",theme:"vitesse-dark",height:"100%"},argTypes:{language:{control:"select",options:["javascript","typescript","json","html","css"]},theme:{control:"select",options:["vitesse-dark","vitesse-light"]},height:{control:{type:"number",min:200,max:1e3,step:50}}}},e={render:t=>{const[o,a]=i.useState(String(t.value??""));return s.jsx("div",{style:{width:"100vw",height:"100vh",margin:0},children:s.jsx(r,{...t,value:o,onChange:n=>a(n)})})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [code, setCode] = useState<string>(String(args.value ?? ""));
    return <div style={{
      width: "100vw",
      height: "100vh",
      margin: 0
    }}>
                <Component {...args} value={code} onChange={v => setCode(v)} />
            </div>;
  }
}`,...e.parameters?.docs?.source}}};const g=["Basic"];export{e as Basic,g as __namedExportsOrder,p as default};
