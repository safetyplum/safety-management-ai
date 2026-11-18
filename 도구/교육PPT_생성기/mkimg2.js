const React=require('react');const {renderToStaticMarkup}=require('react-dom/server');const sharp=require('sharp');
const fa=require('react-icons/fa');const gi=require('react-icons/gi');const fs=require('fs');
const sets={
 img_m:{cover:[fa.FaIndustry,'#FFE680',1],p1:[fa.FaBalanceScale,'#BFE0F5'],p2:[fa.FaUserTie,'#BFE0F5'],p3:[fa.FaClipboardCheck,'#BFE0F5'],p4:[gi.GiGears,'#BFE0F5'],p5:[fa.FaUsers,'#BFE0F5'],p6:[fa.FaTasks,'#BFE0F5'],end:[fa.FaHandPaper,'#FFE680',1],x1:[fa.FaLock,'#FFE680'],x2:[gi.GiForklift,'#FFE680']},
 img_c:{cover:[fa.FaHardHat,'#FFE680',1],p1:[fa.FaBalanceScale,'#BFE0F5'],p2:[fa.FaUserTie,'#BFE0F5'],p3:[fa.FaClipboardCheck,'#BFE0F5'],p4:[gi.GiCrane,'#BFE0F5'],p5:[fa.FaUsers,'#BFE0F5'],p6:[fa.FaTasks,'#BFE0F5'],end:[fa.FaHandPaper,'#FFE680',1],x1:[gi.GiLadder,'#FFE680'],x2:[fa.FaExclamationTriangle,'#FFE680']}};
(async()=>{for(const [dir,list] of Object.entries(sets)){fs.mkdirSync(dir,{recursive:true});
 for(const [k,[I,bg,sky]] of Object.entries(list)){
  const icon=renderToStaticMarkup(React.createElement(I,{size:120,color:'#111111'})).replace('<svg ','<svg x="60" y="60" ');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect width="240" height="240" fill="${sky?'#EAF5FC':'#FFFFFF'}"/><circle cx="120" cy="120" r="112" fill="${bg}" stroke="#5A9BD0" stroke-width="4"/>${icon}</svg>`;
  await sharp(Buffer.from(svg)).jpeg({quality:60}).toFile(`${dir}/${k}.jpg`);}}
 console.log('ok');})();
